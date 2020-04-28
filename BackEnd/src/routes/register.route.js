// start router
const router = require('express').Router();
const userController = require('../BL/Controllers/User.controller');
const errorController = require('../BL/Controllers/error.controller');

// base route
router.get('/', (req, res) => {
	res.status(200).send('Welcome to Register route!');
});

// Add new user
router.post('/', (req, res) => {
	try {
		userController
			.addNewUser(req.body.username, req.body.email, req.body.password)
			.then(() => {
				res.sendStatus(200);
			})
			.catch((err) => {
				errorController.sendError(res, err);
			});
	} catch (err) {
		errorController.sendError(res, err);
	}
});

module.exports = router;
