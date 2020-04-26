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

export default class ConversationStore {
	@observable
	private currentUserConversations: ConversationModel[];

	@observable
	private currentSelectedConversation?: ConversationModel;

	private messageStore: MessagesStore;
	private webSocketStore: WebSocketStore;

	constructor(messageStore: MessagesStore, webSocketStore: WebSocketStore) {
		this.currentUserConversations = [];
		this.messageStore = messageStore;
		this.webSocketStore = webSocketStore;

		// const newMessageObserverDisposer = observe(this.webSocketStore.getSocketEventsObserver, (change) => {
		// 	console.log(change);
		// 	if (change.name === 'event' && change.object[change.name] === 'new-message') {
		// 		console.log('got new message');
		// 	}
		// });

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
					const conv = ConversationConverter.convertConversationDTOToModel(event.data);
					// move it to front
					this.moveConvercationToTop(conv);
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
	public async initUserConversations() {
		const preSortedConversations: ConversationModel[] = (
			await await ConversationFetcher.getUserConversations()
		).conversations.map((conversation: ConversationDTO) => {
			return ConversationConverter.convertConversationDTOToModel(conversation);
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

	@action
	public async selectConversation(conv: ConversationModel) {
		this.currentSelectedConversation = conv;
		if (conv && conv.convId) {
			this.messageStore.initCurrentMessages(await ConversationFetcher.getConversationMessages(conv.convId));
		}
	}

	@action
	public cleanConversations() {
		this.currentUserConversations = [];
		this.currentSelectedConversation = undefined;
	}

	@action
	public CreateNewConversation(userId: string) {
		ConversationFetcher.createNewConversation(userId);
	}

	@action
	public CreateNewGroupConversation(users: string[], groupName: string, groupPicture: any) {
		ConversationFetcher.createNewGroupConversation(users, groupName, groupPicture);
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
		const convIndex = this.currentUserConversations.findIndex((conv) => {
			return conv.convId == message.convId;
		});
		this.currentUserConversations[convIndex].lastMessage = message.messageContent;
		this.currentUserConversations[convIndex].lastMessageTime = message.messageSendingTime;
		this.currentUserConversations[convIndex].lastMessageUser = message.senderUsername;

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
}
