import MessagesFetcher from '../../Infrastructure/fetchers/MessagesFetcher.fetcher';
import {observable, action, computed} from 'mobx';
import MessageModel from '../../common/models/MessageModel.model';

export default class MessagesStore {
	@observable
	private currentConversationMessages: MessageModel[];

	constructor() {
		this.currentConversationMessages = [];
	}

	@action
	public async getConversationMessagesById(convid: string) {
		this.currentConversationMessages = await MessagesFetcher.getConversationsMessages(convid);
	}

	@action
	public async addNewMessage(message:MessageModel){
		this.currentConversationMessages.push(message);
	}


	@computed
	get getCurrentConvMessages(){
		return this.currentConversationMessages;
	}
}
