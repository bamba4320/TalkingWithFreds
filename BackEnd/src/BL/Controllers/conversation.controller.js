const ConversationSchema = require('../../common/models/conversation.model');
const jwtUtils = require('../../common/utils/jwt.utils');
const userController = require('./User.controller');

class ConversationController {
	// find all the conversations thats the user is part of
	async getUserConversations(token) {
		try {
			// verify the sending user token and extract his id
			return jwtUtils
				.verifyToken(token)
				.then(async (authData) => {
					const conversations = await ConversationSchema.find({participants: authData.id});
					return Promise.all(
						conversations.map(async (conv) => {
							/**
							 * for each conversation check if group
							 * if not, change name and image to the
							 * other user's username and profile image
							 */
							if (!conv.isGroup) {
								if (conv.participants.length === 2) {
									// find whom of the users are not
									// the requesting user
									const otherIndex = conv.participants[0] == authData.id ? 1 : 0;
									// get user document
									const user = await userController.getUserById(conv.participants[otherIndex]);
									// set the conversation values.
									conv.convName = user.username;
									conv.profileImg = user.profileImage;
									console.log(conv);
									return conv;
								}
							}
							console.log(conv);
							return conv;
						})
					);
				})
				.catch((err) => {
					throw new Error(err);
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
						// check if already has private chat
						this.checkPrivateChat(authData.id, uid2).then((result) => {
							if (result) {
								const newConversation = new ConversationSchema({
									convName: ' ',
									isGroup: false,
									messages: [],
									participants: [authData.id, uid2],
								});
								newConversation.save();
								resolve();
							} else {
								reject(new Error('private chat already exists'));
							}
						});
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

	// check if users has already private chat
	async checkPrivateChat(uid1, uid2) {
		try {
			// find all conversations with those two users and if
			// one participants length is two return true
			const sharedConvs = await ConversationSchema.find({participants: [uid1, uid2]});
			sharedConvs.forEach((conv) => {
				if (conv.participants.length === 2) {
					return true;
				}
			});
			return false;
		} catch (err) {
			throw new Error(err.message);
		}
	}
}

module.exports = new ConversationController();
