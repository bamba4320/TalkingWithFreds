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

// change user password
router.post('/changePassword', (req, res) => {
	try {
		userController
			.changePassword(req.token, req.body.oldPassword, req.body.newPassword)
			.then((token) => {
				res.status(200).json({token});
			})
			.catch((err) => {
				errorController.sendError(res, err);
			});
	} catch (err) {
		errorController.sendError(res, err);
	}
});

// update user
router.post('/updateUser', (req, res) => {
	try {
		userController
			.updateUser(req.token, req.body.newUsername, req.body.profileImage)
			.then((user) => {
				res.status(200).json({user});
			})
			.catch((err) => {
				errorController.sendError(res, err);
			});
	} catch (err) {
		errorController.sendError(res, err);
	}
});

module.exports = router;
