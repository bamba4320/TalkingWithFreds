// Node process requires
const path = require("path");
const fs = require("fs");

// nextjs plugins
const withPlugins = require("next-compose-plugins");
const withTypescript = require("@zeit/next-typescript");
const withSass = require("@zeit/next-sass");
const withCss = require("@zeit/next-css");
const withLess = require("@zeit/next-less");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = withPlugins([withTypescript, withLess, withSass, withCss], {
  webpack(config, { isServer, webpack, buildId }) {
    const buildIdFromNextBuildId = JSON.stringify(buildId);
    
    /** Rules */

	// In order to use static files (url-loader)
    config.module.rules.push({
      test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/,
      use: {
        loader: "url-loader",
        options: {
          limit: 8192,
          publicPath: "/_next/static/",
          outputPath: "static/",
          name: "[name].[ext]"
        }
      }
    });
    config.resolve.alias = {
      ...config.resolve.alias,

      // For semantic-ui
      "../../theme.config$": require("path").join(
        __dirname,
        "/src/semantic-ui/theme.config"
      ),

      // For our project
      Infrastructure: path.resolve(__dirname, "src", "Infrastructure"),
      BL: path.resolve(__dirname, "src", "BL"),
      common: path.resolve(__dirname, "src", "common"),
      UI: path.resolve(__dirname, "src", "UI"),
      NextJsComponents: path.resolve(__dirname, "src", "NextJsComponents"),
      ReactIntlComponents: path.resolve(__dirname, "src", "ReactIntlComponents")
    };

    /** Polyfill */
	// sets the config entry to call the polyfill file we created when the site
	// loads on the client side(happens once on the client side)
    const originalEntry = config.entry;
    config.entry = async () => {
      const entries = await originalEntry();
      if (
        entries["main.js"] &&
        !entries["main.js"].includes("./static/polyfills/index.js")
      ) {
        // sets the entry array to have the polyfill file first in the array
        // (in this project the entry array is empty all the times)
        entries["main.js"].unshift("./static/polyfills/index.js");
      }
      return entries;
    };

    return config;
  },
  generateBuildId: async () => {
    return "0.0.1";
  }
});
