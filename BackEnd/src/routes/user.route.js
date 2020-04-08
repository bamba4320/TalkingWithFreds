const router = require('express').Router();
const userController = require('../BL/Controllers/User.controller');
const errorController = require('../BL/Controllers/error.controller');

// base route
router.get('/', (req, res) => {
	res.status(200).send('Welcome to User Route!');
});

// get user deatails
router.get('/getUser', (req, res) => {
	try {
		userController
			.getUserDetailsFromToken(req.token)
			.then((user) => {
				res.status(200).json(user);
			})
			.catch((err) => {
				errorController.sendError(res, err);
			});
	} catch (err) {
		errorController.sendError(res, err);
	}
});

// get all other users
router.get('/getFriends', (req, res) => {
	try {
		console.log('in get friends');
		userController
			.getFriends(req.token)
			.then((users) => {
				res.status(200).json(users);
			})
			.catch((err) => {
				errorController.sendError(res, err);
			});
	} catch (err) {
		errorController.sendError(res, err);
	}
});

module.exports = router;
