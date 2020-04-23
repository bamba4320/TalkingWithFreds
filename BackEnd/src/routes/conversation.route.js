const router = require('express').Router();
const errorController = require('../BL/Controllers/error.controller');
const conversationController = require('../BL/Controllers/conversation.controller');

// get all conversations of user
router.get('/', (req, res) => {
	try {
		conversationController
			.getUserConversations(req.token)
			.then((conversations) => {
				res.status(200).json({conversations});
			})
			.catch((err) => {
				errorController.sendError(res, err);
			});
	} catch (err) {
		errorController.sendError(res, err);
	}
});

// add new conversation
router.put('/:uid', (req, res) => {
	try {
		conversationController
			.addNewConversation(req.token, req.params.uid)
			.then((newConv) => {
				res.sendStatus(200);
			})
			.catch((err) => errorController.sendError(res, err));
	} catch (err) {
		errorController.sendError(res, err);
	}
});

// add new group conversation
router.post('/group', (req, res) => {
	try {
		conversationController
			.addNewGroupConversation(req.token, req.body.users, req.body.groupName, req.body.groupPicture)
			.then((newConv) => {
				res.sendStatus(200);
			})
			.catch((err) => errorController.sendError(res, err));
	} catch (err) {
		errorController.sendError(res, err);
	}
});

// get conversation messages
router.get('/:convId', (req, res) => {
	try {
		conversationController
			.getConversationMessages(req.params.convId)
			.then((messages) => {
				res.status(200).json(messages);
			})
			.catch((err) => {
				errorController.sendError(res, err);
			});
	} catch (err) {
		errorController.sendError(res, err);
	}
});

module.exports = router;
