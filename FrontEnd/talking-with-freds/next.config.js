// Node process requires
const path = require('path');
const fs = require('fs');

// dotenv calls
const dotenv = require('dotenv');
configDotEnv(dotenv);

// nextjs plugins
const withPlugins = require('next-compose-plugins');
const withTypescript = require('@zeit/next-typescript');
const withSass = require('@zeit/next-sass');
const withCss = require('@zeit/next-css');
const withLess = require('@zeit/next-less');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// // Analyze
// const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
// const bundleAnalyzerConfiguration = {
// 	analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
// 	analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
// 	bundleAnalyzerConfig: {
// 		server: {
// 			analyzerMode: 'static',
// 			reportFilename: '../bundles/server.html',
// 		},
// 		browser: {
// 			analyzerMode: 'static',
// 			reportFilename: '../bundles/client.html',
// 		},
// 	},
// };
// module.exports = withPlugins([withTypescript, withLess, withSass, withCss, withBundleAnalyzer(bundleAnalyzerConfiguration)], {

/**
 * configure the environment variables from `.env` files
 * you need to run `node server.js` with:
 * `NODE_ENV=`development/production - "development" is for debugging. "production" is for "full" build
 * `APP_ENV=`the name of the `.env` file to use the variables
 * for instance, if you run `NODE_ENV=development APP_ENV=production node server.js` - this will run in debug mode and use the `.env.production` env-file
 * ***** in `NODE_ENV=development` the `.env` file will override the env variables
 * @param {object} dotenv `require('dotenv')`
 */
function configDotEnv(dotenv) {
	dotenv.config({path: `.env.${process.env.APP_ENV}`});
	const isNodeEnvProd = process.env.NODE_ENV === 'production';
	if (!isNodeEnvProd) {
		overrideDotEnv(dotenv, '.env');
	}
}

function overrideDotEnv(dotenv, overrideEnvFileName) {
	if (fs.existsSync(overrideEnvFileName)) {
		const envConfig = dotenv.parse(fs.readFileSync(overrideEnvFileName));
		for (var k in envConfig) {
			process.env[k] = envConfig[k];
		}
	}
}

module.exports = withPlugins([withTypescript, withLess, withSass, withCss], {
	webpack(config, {isServer, webpack, buildId}) {
		const isProduction = config.mode === 'production';
		const buildIdFromNextBuildId = JSON.stringify(buildId);

		// console.log('isServer', isServer);
		// console.log('isProduction', isProduction);
		// console.log('buildId', buildIdFromWebpack);
		// console.log('process.env.NODE_ENV', process.env.NODE_ENV);
		// console.log('process.env.APP_ENV', process.env.APP_ENV);
		// console.log('');

		/** Plugins */
		config.plugins.push(
			new webpack.DefinePlugin({
				/**
				 * Define `BUILD_ID` in env
				 * this variable can be used in server & client
				 */
				'process.env.BUILD_ID': buildIdFromNextBuildId,
			})
		);

		/** Rules */

		// In order to use static files (url-loader)
		config.module.rules.push({
			test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/,
			use: {
				loader: 'url-loader',
				options: {
					limit: 8192,
					publicPath: '/_next/static/',
					outputPath: 'static/',
					name: '[name].[ext]',
				},
			},
		});

		/** Optimization */

		if (isProduction) {
			if (Array.isArray(config.optimization.minimizer)) {
				config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}));
			}
		}

		/** Alias */
		config.resolve.alias = {
			...config.resolve.alias,

			// For semantic-ui
			'../../theme.config$': require('path').join(__dirname, '/src/semantic-ui/theme.config'),

			// For our project
			Infrastructure: path.resolve(__dirname, 'src', 'Infrastructure'),
			BL: path.resolve(__dirname, 'src', 'BL'),
			common: path.resolve(__dirname, 'src', 'common'),
			UI: path.resolve(__dirname, 'src', 'UI'),
			NextJsComponents: path.resolve(__dirname, 'src', 'NextJsComponents'),
			ReactIntlComponents: path.resolve(__dirname, 'src', 'ReactIntlComponents'),
		};

		/** Polyfill */
		// sets the config entry to call the polyfill file we created when the site
		// loads on the client side(happens once on the client side)
		const originalEntry = config.entry;
		config.entry = async () => {
			const entries = await originalEntry();
			if (entries['main.js'] && !entries['main.js'].includes('./static/polyfills/index.js')) {
				// sets the entry array to have the polyfill file first in the array
				// (in this project the entry array is empty all the times)
				entries['main.js'].unshift('./static/polyfills/index.js');
			}
			return entries;
		};

		return config;
	},
	generateBuildId: async () => {
		return '0.1.0';
	},
	env: {
		/**
		 * Export process.env variables **to client side**
		 * This way, we can use `EnvConfig.getXXX()` in components
		 */
		APP_ENV: process.env.APP_ENV,
		APP_API_URL_CLIENT: process.env.APP_API_URL_CLIENT,
		APP_API_URL_SERVER: process.env.APP_API_URL_SERVER,
		APP_FACEBOOK_APP_ID: process.env.APP_FACEBOOK_APP_ID,
		APP_GOOGLE_CLIENT_ID: process.env.APP_GOOGLE_CLIENT_ID,
	},
});
