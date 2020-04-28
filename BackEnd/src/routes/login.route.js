// start router
const router = require('express').Router();
const userController = require('../BL/Controllers/User.controller');
const errorController = require('../BL/Controllers/error.controller');
// base route
router.get('/', (req, res) => {
	res.status(200).send('Welcome to Login route!');
});

router.post('/authenticateLogin', (req, res) => {
	try {
		userController
			.authenticateLogin(req.body.email, req.body.password)
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

router.post('/recoverPassword', (req, res) => {
	try {
		userController
			.recoverPassword(req.body.email)
			.then(() => {
				res.sensStatus(200);
			})
			.catch((err) => {
				errorController.sendError(res, err);
			});
	} catch (err) {
		errorController.sendError(res, err);
	}
});

// export route
module.exports = router;
