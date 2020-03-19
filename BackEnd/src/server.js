// start express app
const express = require('express');
const app = express();

// import all routes
const loginRoute = require('./routes/login.route');
const registerRoute = require('./routes/register.route');
const userRouter = require('./routes/user.route');

// body parser is used to decode http/s post body.
const bodyParser = require('body-parser');

// enable access from all origins
const cors = require('cors');

app.use(cors());
// apply body parser to requests recived
app.use(bodyParser.json());

/**
 * extended points to the ability to post nested objects.
 * if false, you can not post those.
 * if true, you can post whatever and however you like to.
 */
app.use(bodyParser.urlencoded({extended: true}));

// * server routes:
// * base url: http://localhost:4320/api/

// login route
app.use('/api/login', loginRoute);
// register route
app.use('/api/register', registerRoute);
// user route
// * protected by token varification
app.use('/api/user', verifyToken, userRouter);

// base route
app.use('/api', (req, res) => {
	res.status(200).send("Welcome to Talkin' With Freds main route!");
});

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

/**
 * Verify Token
 * FORMAT:
 * Authorization: Bearer <access_token>
 */
function verifyToken(req, res, next) {
	// Get auth header value
	const bearerHeader = req.headers['authorization'];
	// check if bearer is undefined
	if (typeof bearerHeader !== 'undefined') {
		// split at space
		const bearer = bearerHeader.split(' ');
		// Get Token from array
		const bearerToken = bearer[1];
		// Set token
		req.token = bearerToken;
		// continue
		next();
	} else {
		res.sendStatus(403);
	}
}

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
