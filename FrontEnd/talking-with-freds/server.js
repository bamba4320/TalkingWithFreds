// Polyfill Node with `Intl` that has data for all locales.
// See: https://formatjs.io/guides/runtime-environments/#server
const IntlPolyfill = require('intl');
Intl.NumberFormat = IntlPolyfill.NumberFormat;
Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;

// This file doesn't go through babel or webpack transformation.
// Make sure the syntax and sources this file requires are compatible with the current node version you are running
// See https://github.com/zeit/next.js/issues/1245 for discussions on Universal Webpack or universal Babel
const next = require('next');
const express = require('express');
const {useStaticRendering} = require('mobx-react');
const {join, basename} = require('path');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const compression = require('compression');

const dev = process.env.NODE_ENV !== 'production';
const nextServer = next({dev});
const handle = nextServer.getRequestHandler();

const {readFileSync} = require('fs');
const accepts = require('accepts');
const glob = require('glob');
const configurationJson = require('./configuration');

// We need to expose React Intl's locale data on the request for the user's
// locale. This function will also cache the scripts by lang in memory.
const localeDataCache = new Map();
const reactIntlLocaleDataPath = (lang) => `react-intl/locale-data/${lang}`;
const getLocaleDataScript = (locale) => {
	// Get the "first part" of the locale
	// * For instance, if the locale is "he-il", the first part is "he". as in "he" only (as locale)
	const lang = locale.split('-')[0];
	if (!localeDataCache.has(lang)) {
		const localeDataFile = require.resolve(reactIntlLocaleDataPath(lang));
		const localeDataScript = readFileSync(localeDataFile, 'utf8');
		localeDataCache.set(lang, localeDataScript);
	}
	return localeDataCache.get(lang) || '';
};

// We need to load and expose the translations on the request for the user's
// locale. These will only be used in production, in dev the `defaultMessage` in
// each message description in the source code will be used.
const localeMessages = new Map();
const getMessages = (locale) => {
	const lang = locale.split('-')[0];
	if (dev) {
		return require(`./lang/${locale}.json`);
	}
	if (!localeMessages.has(lang)) {
		const localeMessagesJson = require(`./lang/${locale}.json`);
		localeMessages.set(lang, localeMessagesJson);
	}
	return localeMessages.get(lang) || {};
};

// Get the supported languages by looking for translations in the `lang/` dir.
const supportedLanguages = glob.sync('./lang/*.json').map((f) => basename(f, '.json'));

const port = process.env.PORT || 4001;

useStaticRendering(true);

const logsDirPath = join(__dirname, 'logs');

// create a rotating write stream
const serverLogStream = rfs('server.log', {
	size: '10M', // rotate every 10 MegaBytes written
	interval: '1d', // rotate daily
	path: logsDirPath,
});

const routingWithParam = (expressApp, pageName) => {
	expressApp.get(`/${pageName}/:id*?`, (req, res) => {
		setSiteMiddlewares(req);
		const actualPage = `/${pageName}`;
		const queryParams = {id: req.params.id ? req.params.id : undefined, ...req.query};
		nextServer.render(req, res, actualPage, queryParams);
	});
};

const setSiteMiddlewares = (req) => {
	setLangOnRequset(req);
	setConfigurationOnRequset(req);
};

/**
 * Adding the configuration from configuration.json
 * and gtm key
 * @param {Request} req from the client
 */
const setConfigurationOnRequset = (req) => {
	req.gtmId = configurationJson.gtmId;
	req.configuration = configurationJson;
};

/**
 * Adding the `locale` & `localeDataScript` on the request
 * @param {Request} req from the client
 */
const setLangOnRequset = (req) => {
	const accept = accepts(req);
	const locale = accept.languages(supportedLanguages) || 'he';
	req.locale = locale;
	req.localeDataScript = getLocaleDataScript(locale);
	req.messages = getMessages(locale);
};
nextServer.prepare().then(() => {
	const expressApp = express();

	// setup morgan - logger for requests
	expressApp.use(
		morgan('dev', {
			stream: serverLogStream,
			skip: (req) => {
				const isStaticFile = req && req.url && req.url.startsWith('/_next/static/');
				return isStaticFile;
			},
		})
	);

	// use compression which enable GZIP. this will make
	// our JSON and other responses smaller.
	expressApp.use(
		compression({
			// what level of compression do we want
			// 6 is the default value of the library, and the best
			// middle-man between speed and compression.
			level: 6,
			filter: function(req, res) {
				// filter function - what respose should be compressed
				if (req.headers['x-no-compression']) {
					// don't compress responses whit this header
					return false;
				}
				// fallback to standart compression
				return compression.filter(req, res);
			},
			// threshold is the byte threshold for the response body size
			// before compression is considered, the default is 1kb
			threshold: 0,
		})
	);

	routingWithParam(expressApp, 'benefitPage');
	routingWithParam(expressApp, 'gifts');
	routingWithParam(expressApp, 'purchase');
	routingWithParam(expressApp, 'productToMember');

	expressApp.get('*', (req, res) => {
		setSiteMiddlewares(req);
		return handle(req, res);
	});

	expressApp.listen(port, (err) => {
		if (err) {
			throw err;
		}
		console.log(`> Ready on port ${port}`);
	});
});
