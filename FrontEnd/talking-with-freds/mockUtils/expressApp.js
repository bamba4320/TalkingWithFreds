const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.post('/users/authenticate', (req, res, next) => {
	res.send({
		id: 'ididiidid123123id',
		token: 'this is the token from dev',
		email: 'gal.madar@ls-techs.com',
		identityNumber: '132123123',
		birthDate: '12/12/1212',
		mobilePhone: '0501231231',
		allowSmsAndMail: true,
		memberName: 'gal madar',
	});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use((err, req, res, next) => {
	const errorStatus = err.status || 500;
	const errorMessage = err.message;
	console.error(`response failed with status ${errorStatus}`);
	console.error(`response failed with message ${errorMessage}`);

	const errObj = {
		error: true,
		status: errorStatus,
		id: err.id,
		message: errorMessage,
	};

	res.status(errorStatus);
	res.send(errObj);
});

module.exports = app;
