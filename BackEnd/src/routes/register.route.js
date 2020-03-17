// start router
const router = require('express').Router();
const userController = require('../BL/Controllers/User.controller');
// base route
router.get('/', (req, res) => {
	res.status(200).send('Welcome to Register route!');
});

// Add new user
router.post('/', (req, res) => {
	try {
		console.log(req.body.password);
		userController.addNewUser(req.body.username, req.body.email, req.body.password).then(() => {
			res.sendStatus(200);
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

module.exports = router;
