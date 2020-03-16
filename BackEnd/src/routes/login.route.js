// start router
const router = require('express').Router();

// base route
router.get('/', (req, res) => {
	res.status(200).send('Welcome to Login route!');
});

// export route
module.exports = router;
