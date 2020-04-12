const MessageSchema = require('../../common/models/message.model');
const conversationController = require('./conversation.controller');

class MessagesController {
	async addNewMessage(senderId, convId, content, sendTime) {
		return new Promise((reslove, reject) => {
			try {
				const message = new MessageSchema({
					senderId: senderId,
					convId: convId,
					messageContent: content,
					messageSendingTime: sendTime,
				});
				message
					.save()
					.then(async (message) => {
						await conversationController.addMessageToConversation(convId, message._id);
						reslove();
					})
					.catch((err) => {
						reject(err);
					});
			} catch (err) {
				reject(err);
			}
		});
	}
}

module.exports = new MessagesController();
