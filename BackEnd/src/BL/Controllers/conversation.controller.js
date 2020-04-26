const ConversationSchema = require('../../common/models/conversation.model');
const jwtUtils = require('../../Infrustructure/utils/jwt.utils');
const userController = require('./User.controller');
const socketManager = require('../../socket/socketManager');

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
									return conv;
								}
							}
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
							if (!result) {
								const newConversation = new ConversationSchema({
									convName: ' ',
									isGroup: false,
									messages: [],
									participants: [authData.id, uid2],
								});
								newConversation.save().then((newConv) => {
									this.sendNewConversationViaSocket(newConv);
									resolve();
								});
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

	// add new group converastion
	async addNewGroupConversation(token, users, groupName, groupPicture) {
		try {
			return new Promise((resolve, reject) => {
				// verify the sending user token and extract his id
				jwtUtils
					.verifyToken(token)
					.then((authData) => {
						users.push(authData.id);
						const newConversation = new ConversationSchema({
							convName: groupName,
							isGroup: true,
							messages: [],
							participants: users,
							groupPicture: groupPicture,
						});
						newConversation.save().then((newConv) => {
							this.sendNewConversationViaSocket(newConv);
							resolve();
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
	async addMessageToConversation(convId, messageId, content, sendTime, senderUsername) {
		try {
			const conv = await ConversationSchema.findById(convId);
			conv.messages.push(messageId);
			conv.lastMessage = content;
			conv.lastMessageTime = sendTime;
			conv.lastMessageUser = senderUsername;
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
			const sharedConvs = await ConversationSchema.find({participants: [uid1]});
			sharedConvs.forEach((conv) => {
				if (conv.participants.length === 2) {
					if (conv.participants[0] === uid2 || conv.participants[1] === uid2) {
						return true;
					}
				}
			});
			return false;
		} catch (err) {
			throw new Error(err.message);
		}
	}

	/**
	 * after create new conversation send it to all
	 * participants
	 * @param {newConv} Conversation created conversation
	 */
	sendNewConversationViaSocket(newConv) {
		try {
			newConv.participants.forEach((userId) => {
				socketManager.emit(userId, 'new-conversation', newConv);
			});
		} catch (err) {
			throw new Error(err.message);
		}
	}
}

module.exports = new ConversationController();
