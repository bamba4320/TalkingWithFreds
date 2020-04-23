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

		const newMessageObserverDisposer = reaction(
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
		this.currentUserConversations = (await await ConversationFetcher.getUserConversations()).conversations.map(
			(conversation: ConversationDTO) => {
				return ConversationConverter.convertConversationDTOToModel(conversation);
			}
		);
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
		console.log(message.messageContent);
		const convIndex = this.currentUserConversations.findIndex((conv) => {
			return conv.convId == message.convId;
		});
		this.currentUserConversations[convIndex].lastMessage = message.messageContent;
		this.currentUserConversations[convIndex].lastMessageTime = message.messageSendingTime;
	}
}
