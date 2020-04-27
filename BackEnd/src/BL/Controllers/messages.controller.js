const MessageSchema = require('../../common/models/message.model');
const conversationController = require('./conversation.controller');
const socketManager = require('../../socket/socketManager');

class MessagesController {
	async addNewMessage(senderId, convId, content, sendTime, senderUsername) {
		return new Promise((reslove, reject) => {
			try {
				const message = new MessageSchema({
					senderId: senderId,
					convId: convId,
					messageContent: content,
					messageSendingTime: sendTime,
					senderUsername: senderUsername,
				});
				message
					.save()
					.then(async (message) => {
						await conversationController.addMessageToConversation(
							convId,
							message._id,
							content,
							sendTime,
							senderUsername,
							senderId
						);
						// get all participants
						const participants = await conversationController.getAllParticipants(convId);
						// for each on of them, if not the sender user, send new message event
						participants.forEach((userId) => {
							if (userId != senderId) {
								socketManager.emit(userId, 'new-message', message);
							}
						});
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

	async deleteMessages(convId) {
		try {
			await MessageSchema.deleteMany({convId: convId});
		} catch (err) {
			throw new Error(err.messaeg);
		}
	}
}

module.exports = new MessagesController();
