const router = require('express').Router();
const userController = require('../BL/Controllers/User.controller');
const errorController = require('../BL/Controllers/error.controller')

// base route
router.get('/', (req, res) => {
	res.status(200).send('Welcome to User Route!');
});

// get user deatails
router.get('/getUser', (req, res) => {
	try {
		console.log(req.token);
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

module.exports = router;
