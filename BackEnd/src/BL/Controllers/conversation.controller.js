const ConversationSchema = require('../../common/models/conversation.model');
const jwtUtils = require('../../common/utils/jwt.utils');

class ConversationController {
	// find all the conversations thats the user is part of
	async getUserConversations(token) {
		try {
			return new Promise((resolve, reject) => {
				// verify the sending user token and extract his id
				jwtUtils
					.verifyToken(token)
					.then(async (authData) => {
						const conversations = await ConversationSchema.find({participants: authData.id});
						resolve(conversations);
					})
					.catch((err) => {
						reject(err);
					});
			});
		} catch (err) {
			console.error(err);
			throw new Error(err.message);
		}
	}

	// add new converastion
	async addNewConversation(token, uid2) {
		try {
			return new Promise((resolve, reject) => {
				// verify the sending user token and extract his id
				jwtUtils
					.verifyToken(token)
					.then((authData) => {
						const newConversation = new ConversationSchema({
							convName: 'test Name',
							isGroup: false,
							messages: [],
							participants: [authData.id, uid2],
						});
						newConversation.save();
						resolve();
					})
					.catch((err) => {
						reject(err);
					});
			});
		} catch (err) {
			console.error(err);
			throw new Error(err.message);
		}
	}

	// get all conversation messages
	async getConversationMessages(convId) {
		try {
			const conv = await ConversationSchema.findById(convId).populate('messages');
			return conv.messages;
		} catch (err) {
			throw new Error(err.message);
		}
	}

	// add new message to conversation
	async addMessageToConversation(convId, messageId) {
		try {
			const conv = await ConversationSchema.findById(convId);
			conv.messages.push(messageId);
			conv
				.save()
				.then(() => {
					return;
				})
				.catch((err) => {
					throw new Error(err);
				});
		} catch (err) {
			throw new Error(err.message);
		}
	}

	// get all conversation participants except for sender
	async getAllParticipants(convId) {
		try {
			return (await ConversationSchema.findById(convId)).participants;
		} catch (err) {
			throw new Error(err.message);
		}
	}
}

module.exports = new ConversationController();
