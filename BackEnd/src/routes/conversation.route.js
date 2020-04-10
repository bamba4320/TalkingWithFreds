const router = require('express').Router();
const errorController = require('../BL/Controllers/error.controller');
const conversationController = require('../BL/Controllers/conversationController');

// get all conversations of user
router.get('/', (req, res) => {
	try {
		conversationController
			.getUserConversations(req.token).then((conversations) => {
				res.status(200).json({conversations});
			})
			.catch((err) => {
				errorController.sendError(res, err);
			});
	} catch (err) {
		errorController.sendError(res, err);
	}
});

router.put('/:uid', (req, res) => {
	try {
		conversationController
			.addNewConversation(req.token, req.params.uid)
			.then(() => {
				res.sendStatus(200);
			})
			.catch((err) => errorController.sendError(res, err));
	} catch (err) {
		errorController.sendError(res, err);
	}
});

module.exports = router;
