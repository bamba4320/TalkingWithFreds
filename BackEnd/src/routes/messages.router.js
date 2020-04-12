const router = require('express').Router();
const errorController = require('../BL/Controllers/error.controller');
const messageController = require('../BL/Controllers/messages.controller');

// add new message
router.put('/', (req, res) => {
	try {
		messageController
			.addNewMessage(req.body.senderId, req.body.convId, req.body.content, req.body.sendTime)
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
