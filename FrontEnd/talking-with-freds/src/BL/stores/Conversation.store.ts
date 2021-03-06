import ConversationFetcher from '../../Infrastructure/fetchers/Conversation.fetcher';
import {observable, action, computed, observe, reaction, IReactionPublic} from 'mobx';
import ConversationModel from '../../common/models/Conversation.model';
import ConversationDTO from '../../common/dto/conversation.dto';
import ConversationConverter from '../../common/convertors/conversation.converter';
import MessagesStore from './Messages.store';
import WebSocketStore from './webSocket/webSocket.store';
import {events} from './webSocket/events';
import {isNullOrUndefined} from 'util';
import MessageModel from '../../common/models/Message.model';
import ImageModel from '../../common/models/Image.model';
import {imagePreURL} from '../../common/generalConsts';

export default class ConversationStore {
	@observable
	private currentUserConversations: ConversationModel[];

	@observable
	private currentSelectedConversation?: ConversationModel;

	private messageStore: MessagesStore;
	private webSocketStore: WebSocketStore;
	private currentUserId?: string;

	constructor(messageStore: MessagesStore, webSocketStore: WebSocketStore) {
		this.currentUserConversations = [];
		this.messageStore = messageStore;
		this.webSocketStore = webSocketStore;

		const socketEventObserverDisposer = reaction(
			() => this.webSocketStore.getSocketEventsObserver,
			(event) => {
				// verify that the event is new message
				if (event.event === events.newMessage) {
					// find the message's conversation and set the
					// message as new last message there
					this.setNewLastMessageToConv(event.data);

					// if the message is sent to the current conversation
					// also push the message in the UI
					if (!isNullOrUndefined(this.getCurrentSelectedConversation)) {
						if (event.data.convId === this.getCurrentSelectedConversation.convId) {
							this.messageStore.pushNewMessage(event.data);
						}
					}
				}

				// for new conversation event
				if (event.event === events.newConversation) {
					// make sure the data is in conversation model format
					const conv = ConversationConverter.convertConversationDTOToModel(event.data, this.currentUserId!);
					// move it to front
					this.moveConvercationToTop(conv);
				}

				// for conversation name change
				if (event.event === events.conversationNameChange) {
					// find the conversation and change the name
					const convIndex = this.currentUserConversations.findIndex((conv) => {
						if (!isNullOrUndefined(conv) && !isNullOrUndefined(event.data.convId)) {
							return conv.convId == event.data.convId;
						} else {
							return false;
						}
					});
					// change the name in founded index
					if (convIndex !== -1 && this.currentUserConversations[convIndex].isGroup) {
						const tempConversationsArray = this.currentUserConversations;
						const tempConversation = tempConversationsArray[convIndex];
						tempConversation.convName = event.data.newName;
						tempConversationsArray.splice(convIndex, 1, tempConversation);
						this.currentUserConversations = tempConversationsArray;
					}
				}

				// for conversation image change
				if (event.event === events.conversationImageChange) {
					// find the conversation and change the name
					const convIndex = this.currentUserConversations.findIndex((conv) => {
						if (!isNullOrUndefined(conv) && !isNullOrUndefined(event.data.convId)) {
							return conv.convId == event.data.convId;
						} else {
							return false;
						}
					});
					// change the name in founded index
					if (convIndex !== -1 && this.currentUserConversations[convIndex].isGroup) {
						const tempConversationsArray = this.currentUserConversations;
						const tempConversation = tempConversationsArray[convIndex];
						tempConversation.profileImg = imagePreURL + event.data.imagePath;
						tempConversationsArray.splice(convIndex, 1, tempConversation);
						this.currentUserConversations = tempConversationsArray;
					}
				}

				// for user profile update
				if (event.event === events.userProfileUpdate) {
					// find the conversation and change the name
					const convIndex = this.currentUserConversations.findIndex((conv) => {
						if (!isNullOrUndefined(conv) && !isNullOrUndefined(event.data.convId)) {
							return conv.convId == event.data.convId;
						} else {
							return false;
						}
					});
					// change the name in founded index
					if (convIndex !== -1 && !this.currentUserConversations[convIndex].isGroup) {
						const tempConversationsArray = this.currentUserConversations;
						const tempConversation = tempConversationsArray[convIndex];
						tempConversation.convName = event.data.newName;
						tempConversation.profileImg = imagePreURL + event.data.imagePath;
						tempConversationsArray.splice(convIndex, 1, tempConversation);
						this.currentUserConversations = tempConversationsArray;
					}
				}
			}
		);

		const setNewLastMessageDisposer = reaction(
			() => this.messageStore.getCurrentConvMessages,
			(currentMessagesShown: MessageModel[]) => {
				this.setNewLastMessageToConv(currentMessagesShown[currentMessagesShown.length - 1]);
			}
		);
	}

	@action
	public async initUserConversations(userId: string) {
		this.initCurrentUserId(userId);
		const preSortedConversations: ConversationModel[] = (
			await await ConversationFetcher.getUserConversations()
		).conversations.map((conversation: ConversationDTO) => {
			return ConversationConverter.convertConversationDTOToModel(conversation, userId);
		});
		this.currentUserConversations = preSortedConversations.sort((a, b) => {
			if (!isNullOrUndefined(a.lastMessageTime)) {
				if (!isNullOrUndefined(b.lastMessageTime)) {
					const bDate = new Date(b.lastMessageTime);
					const aDate = new Date(a.lastMessageTime);
					return bDate > aDate ? 1 : bDate == aDate ? 0 : -1;
				} else {
					return -1;
				}
			} else {
				return 1;
			}
		});
	}

	public initCurrentUserId(uid: string | undefined) {
		this.currentUserId = uid;
	}

	@action
	public async selectConversation(conv: ConversationModel) {
		this.currentSelectedConversation = conv;
		if (conv && conv.convId) {
			this.messageStore.initCurrentMessages(await ConversationFetcher.getConversationMessages(conv.convId));
			conv.unseemMessagesAmount = 0;
			this.webSocketStore.sendConvRead({convId: conv.convId, userId: this.currentUserId!});
		}
	}

	@action
	public cleanConversations() {
		this.currentUserConversations = [];
		this.currentSelectedConversation = undefined;
	}

	@action
	public CreateNewConversation(userId: string) {
		try {
			return ConversationFetcher.createNewConversation(userId);
		} catch (err) {
			throw new Error(err.message);
		}
	}

	@action
	public CreateNewGroupConversation(users: string[], groupName: string, groupPicture: number) {
		try {
			return ConversationFetcher.createNewGroupConversation(users, groupName, groupPicture);
		} catch (err) {
			throw new Error(err.message);
		}
	}

	@computed
	get getUserConversations() {
		return this.currentUserConversations;
	}

	@computed
	get getCurrentSelectedConversation() {
		return this.currentSelectedConversation;
	}

	@action
	public setNewLastMessageToConv(message: MessageModel) {
		console.log('setting last message');
		const convIndex = this.currentUserConversations.findIndex((conv) => {
			return conv.convId == message.convId;
		});
		this.currentUserConversations[convIndex].lastMessage = message.messageContent;
		this.currentUserConversations[convIndex].lastMessageTime = message.messageSendingTime;
		this.currentUserConversations[convIndex].lastMessageUser = message.senderUsername;
		if (!isNullOrUndefined(this.getCurrentSelectedConversation)) {
			if (this.currentUserConversations[convIndex].convId !== this.getCurrentSelectedConversation.convId) {
				console.log('message not in selected conv');
				this.currentUserConversations[convIndex].unseemMessagesAmount += 1;
			} else {
				console.log('message in selected conv');
				if (!isNullOrUndefined(this.currentUserConversations[convIndex].convId)) {
					this.webSocketStore.sendConvRead({
						convId: this.currentUserConversations[convIndex].convId,
						userId: this.currentUserId!,
					});
				}
			}
		} else {
			this.currentUserConversations[convIndex].unseemMessagesAmount += 1;
		}

		// also, move the conversation to top if not init of current messages
		if (!this.messageStore.getIsInitCurrentConversationMessages) {
			this.moveConvercationToTop(this.currentUserConversations[convIndex]);
		}
	}

	@action
	public moveConvercationToTop(conversation: ConversationModel) {
		// find conversation location.
		// if it's a new one, the index would be -1.
		// else, it would be other index in range.
		const convIndex = this.currentUserConversations.findIndex((conv) => {
			return conv.convId == conversation.convId;
		});
		// if the conversation is a new one
		if (convIndex === -1) {
			this.currentUserConversations = [conversation].concat(this.currentUserConversations);
		} else {
			// if the conversation is an old conversation
			// remove it from it's current position
			const tempConv = this.currentUserConversations.splice(convIndex, 1);
			// insert as first in array
			this.currentUserConversations = tempConv.concat(this.currentUserConversations);
		}
	}

	@action
	public deleteConversationForUser() {
		// find current selected conversation index
		const convIndex = this.currentUserConversations.findIndex((conv) => {
			if (!isNullOrUndefined(this.currentSelectedConversation)) {
				return conv.convId == this.currentSelectedConversation.convId;
			} else {
				return false;
			}
		});

		// verify exists
		if (convIndex !== -1) {
			// remove conversation from current user's array
			// and send delete request
			const tempConversationsArray = this.currentUserConversations;
			const deletedConv: ConversationModel[] = tempConversationsArray.splice(convIndex, 1);
			if (!isNullOrUndefined(deletedConv[0]) && !isNullOrUndefined(deletedConv[0].convId)) {
				ConversationFetcher.deleteConversation(deletedConv[0].convId);
				// set current selected to null
				this.currentSelectedConversation = undefined;
				// remove from array
				this.currentUserConversations = tempConversationsArray;
			}
		}
	}

	public changeGroupName(newName: string) {
		try {
			// find current selected conversation index
			const convIndex = this.currentUserConversations.findIndex((conv) => {
				if (!isNullOrUndefined(this.currentSelectedConversation)) {
					return conv.convId == this.currentSelectedConversation.convId;
				} else {
					return false;
				}
			});

			// send change name to API and set new name to current user
			if (convIndex !== -1) {
				if (
					!isNullOrUndefined(this.currentSelectedConversation) &&
					!isNullOrUndefined(this.currentSelectedConversation.convId)
				) {
					ConversationFetcher.changeConvName(this.currentSelectedConversation.convId, newName);
					const tempConversationsArray = this.currentUserConversations;
					const tempConversation = tempConversationsArray[convIndex];
					tempConversation.convName = newName;
					tempConversationsArray.splice(convIndex, 1, tempConversation);
					this.currentUserConversations = tempConversationsArray;
				}
			}
		} catch (err) {
			console.log(err);
		}
	}

	public changeConversationImage(selectedImage?: ImageModel) {
		if (
			!isNullOrUndefined(this.currentSelectedConversation) &&
			!isNullOrUndefined(this.currentSelectedConversation.convId) &&
			!isNullOrUndefined(selectedImage) &&
			!isNullOrUndefined(selectedImage.imageNumber)
		) {
			return ConversationFetcher.changeConvImage(this.currentSelectedConversation?.convId, selectedImage.imageNumber);
		}
	}
}
