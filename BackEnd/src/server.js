// start express app
const express = require('express');
const app = express();

// import all routes
const loginRoute = require('./routes/login.route');

// * server routes:
// * base url: http://localhost:4320/api/

// base route
app.use('/api', (req, res) => {
	res.status(200).send("Welcome to Talkin' With Freds main route!");
});
// login route
app.use('/api/login', loginRoute);

//handle errors:
app.use((err, req, res, next) => {
	const errorStatus = err.status || 500;
	const errorMessage = err.message;

	console.log(`response failed with status ${errorStatus}`);
	console.log(`response failed with message ${errorMessage}`);

	const errObj = {
		error: true,
		status: errorStatus,
		id: err.id,
		message: errorMessage,
	};

	res.status(errorStatus);
	res.send(errObj);
});

// mongoDB database url
const dbURL = 'mongodb://localhost:27017/TalkingWithFredsLocal';
require('mongoose')
	.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => {
		app.listen(4320, () => {
			console.log('Server is ready and listening on port 4320');
		});
	});

module.exports = app;
