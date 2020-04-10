import ConversationFetcher from '../../Infrastructure/fetchers/Conversation.fetcher';
import {observable, action, computed} from 'mobx';
import ConversationModel from '../../common/models/Conversation.model';
import ConversationDTO from '../../common/dto/conversation.dto';
import ConversationConverter from '../../common/convertors/conversation.converter';
import MessagesStore from './Messages.store';

export default class ConversationStore {
	@observable
	private currentUserConversations: ConversationModel[];

	@observable
	private currentSelectedConversation?: ConversationModel;

	private messageStore:MessagesStore;

	constructor( messageStore:MessagesStore) {
		this.currentUserConversations = [];
		this.messageStore = messageStore;
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
	public selectConversation(conv: ConversationModel) {
		this.currentSelectedConversation = conv;
		this.messageStore.getConversationMessagesById(conv.convId);
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
