const ConversationSchema = require('../../common/models/conversation.model');
const MessageSchema = require('../../common/models/message.model');
const jwtUtils = require('../../Infrustructure/utils/jwt.utils');
const userController = require('./User.controller');
const socketManager = require('../../socket/socketManager');
const profileImageUtils = require('../../Infrustructure/utils/profileImage.utils');

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
									unseemMessagesAmount: [0, 0],
								});
								newConversation.save().then((newConv) => {
									this.sendNewConversationViaSocket(newConv, authData.id);
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
							profileImg: profileImageUtils.getImagePath(groupPicture),
							unseemMessagesAmount: users.map((user) => {
								return 0;
							}),
						});
						newConversation.save().then((newConv) => {
							this.sendNewConversationViaSocket(newConv, authData.id);
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
	async addMessageToConversation(convId, messageId, content, sendTime, senderUsername, senderId) {
		try {
			const conv = await ConversationSchema.findById(convId);
			conv.messages.push(messageId);
			conv.lastMessage = content;
			conv.lastMessageTime = sendTime;
			conv.lastMessageUser = senderUsername;

			// find participant index
			const participantIndex = conv.participants.findIndex((userId) => {
				return userId == senderId;
			});
			if (participantIndex !== -1) {
				const tempArray = [];
				for (let i = 0; i < conv.unseemMessagesAmount.length; i++) {
					if (i !== participantIndex) {
						tempArray.push(conv.unseemMessagesAmount[i] + 1);
					} else {
						tempArray.push(conv.unseemMessagesAmount[i]);
					}
				}
				conv.unseemMessagesAmount = tempArray;
			}
			conv
				.save()
				.then((conv) => {
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
			const sharedConvs = await ConversationSchema.find({$and: [{participants: uid1}, {participants: uid2}]});
			let found = false;
			sharedConvs.forEach((conv) => {
				if (!found) {
					if (conv.participants.length === 2) {
						if (conv.participants[0] == uid2 || conv.participants[1] == uid2) {
							found = true;
						}
					}
				}
			});
			return found;
		} catch (err) {
			throw new Error(err.message);
		}
	}

	/**
	 * after create new conversation send it to all
	 * participants
	 * @param {newConv} Conversation created conversation
	 */
	async sendNewConversationViaSocket(newConv, uid1) {
		try {
			/**
			 * for each conversation check if group
			 * if not, change name and image to the
			 * other user's username and profile image
			 */
			if (!newConv.isGroup) {
				if (newConv.participants.length === 2) {
					// find whom of the users are not
					// the requesting user
					const otherIndex = newConv.participants[0] == uid1 ? 1 : 0;
					// get user document
					const user = await userController.getUserById(newConv.participants[otherIndex]);
					// set the conversation values.
					newConv.convName = user.username;
					newConv.profileImg = user.profileImage;
				}
			}
			newConv.participants.forEach((userId) => {
				socketManager.emit(userId, 'new-conversation', newConv);
			});
		} catch (err) {
			throw new Error(err.message);
		}
	}

	async clearUserUnseenInConv(data) {
		try {
			const conv = await ConversationSchema.findById(data.convId);
			const userIndex = conv.participants.findIndex((id) => {
				return data.userId == id;
			});
			if (userIndex !== -1) {
				const tempArray = [];
				for (let i = 0; i < conv.unseemMessagesAmount.length; i++) {
					if (i === userIndex) {
						tempArray.push(0);
					} else {
						tempArray.push(conv.unseemMessagesAmount[i]);
					}
				}
				conv.unseemMessagesAmount = tempArray;
			}
			conv.save().then(() => {});
		} catch (err) {
			throw new Error(err.message);
		}
	}

	/**
	 * delete conversation for user
	 * @param {Document} conv conversation model object
	 * @param {string} token delete requesting user token
	 */
	async deleteConv(convId, token) {
		try {
			jwtUtils
				.verifyToken(token)
				.then(async (authData) => {
					const toDeleteConv = await ConversationSchema.findById(convId);
					// if the conversation is a private chat,
					// delete conversation and all messages
					if (!toDeleteConv.isGroup) {
						await ConversationSchema.deleteOne({_id: convId});
						MessageSchema.deleteMany({convId: convId});

					} else {
						// if group, remove user from participants array

						const tempParticipants = toDeleteConv.participants;

						// find user
						const userIndex = tempParticipants.findIndex((id) => {
							return authData.id == id;
						});
						// if exists
						if (userIndex !== -1) {
							tempParticipants.splice(userIndex, 1);
							// check if down to 0 participants
							// if true, delete cobversation and messages
							if (tempParticipants.length === 0) {
								await ConversationSchema.deleteOne({_id: convId});
								MessageSchema.deleteMany({convId: convId});
							} else {
								// if false, just remove the user
								toDeleteConv.participants = tempParticipants;
								toDeleteConv.save();
							}
						}
					}
				})
				.catch((err) => {
					throw new Error(err.message);
				});
		} catch (err) {
			throw new Error(err.message);
		}
	}

	/**
	 * change group name
	 * @param {string} convId
	 * @param {string} newName
	 */
	async changeGroupName(convId, newName) {
		try {
			// find conversation
			const converastion = await ConversationSchema.findById(convId);
			// verify it's a group
			if (converastion.isGroup) {
				// change the group name
				converastion.convName = newName;
				converastion
					.save()
					.then((conv) => {
						conv.participants.forEach((userId) => {
							socketManager.emit(userId, 'conversation-name-change', {convId, newName});
						});
					})
					.catch((err) => {
						throw new Error(err.message);
					});
			} else {
				throw new Error('Changeing name at private chat is forbidden');
			}
		} catch (err) {
			throw new Error(err.message);
		}
	}

	/**
	 * change group image
	 * @param {string} convId
	 * @param {number} imageNumber
	 */
	async changeGroupImage(convId, imageNumber) {
		try {
			// find conversation
			const converastion = await ConversationSchema.findById(convId);
			// verify it's a group
			if (converastion.isGroup) {
				// change the group image
				converastion.profileImg = profileImageUtils.getImagePath(imageNumber);
				converastion
					.save()
					.then((conv) => {
						conv.participants.forEach((userId) => {
							socketManager.emit(userId, 'conversation-image-change', {convId, imagePath: conv.profileImg});
						});
					})
					.catch((err) => {
						throw new Error(err.message);
					});
			} else {
				throw new Error('Changeing name at private chat is forbidden');
			}
		} catch (err) {
			throw new Error(err.message);
		}
	}
}

module.exports = new ConversationController();
