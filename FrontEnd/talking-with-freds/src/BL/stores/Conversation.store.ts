import ConversationFetcher from '../../Infrastructure/fetchers/Conversation.fetcher';
import {observable, action, computed, observe} from 'mobx';
import ConversationModel from '../../common/models/Conversation.model';
import ConversationDTO from '../../common/dto/conversation.dto';
import ConversationConverter from '../../common/convertors/conversation.converter';
import MessagesStore from './Messages.store';
import WebSocketStore from './webSocket/webSocket.store';

export default class ConversationStore {
	@observable
	private currentUserConversations: ConversationModel[];

	@observable
	private currentSelectedConversation?: ConversationModel;

	private messageStore: MessagesStore;
	private webSocketStore:WebSocketStore;

	constructor(messageStore: MessagesStore, webSocketStore:WebSocketStore) {
		this.currentUserConversations = [];
		this.messageStore = messageStore;
		this.webSocketStore = webSocketStore;

		const newMessageObserverDisposer = observe(this.webSocketStore.socketEventObserver, (change)=>{
			if(change.name === 'event' && change.object[change.name] === 'newMessage'){
				console.log('got new message');
			}
		});
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
}
