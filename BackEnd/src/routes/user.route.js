const router = require('express').Router();
const userController = require('../BL/Controllers/User.controller');

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
				throw err;
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
