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
			            console.log(conversations);
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
}

module.exports = new ConversationController();
