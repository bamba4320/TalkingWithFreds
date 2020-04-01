// start router
const router = require('express').Router();
const userController = require('../BL/Controllers/User.controller');
// base route
router.get('/', (req, res) => {
	res.status(200).send('Welcome to Login route!');
});

router.post('/authenticateLogin', (req, res) => {
	try {
		userController.authenticateLogin(req.body.email, req.body.password).then((user) => {
			res.status(200).json({user});
		});
	} catch (err) {
		console.error(err);
		if (err.message === 'Not Found') {
			res.status(404).json({Error: err.message});
		} else {
			res.status(400).json({Error: err.message});
		}
	}
});

// export route
module.exports = router;
