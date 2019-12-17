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
