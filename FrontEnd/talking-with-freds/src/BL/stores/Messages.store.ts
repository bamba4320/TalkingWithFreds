import MessagesFetcher from '../../Infrastructure/fetchers/Messages.fetcher';
import {observable, action, computed} from 'mobx';
import MessageModel from '../../common/models/Message.model';

export default class MessagesStore {
	@observable
	private currentConversationMessages: MessageModel[];

	constructor() {
		this.currentConversationMessages = [];
	}

	@action
	public initCurrentMessages(messages: MessageModel[]) {
		this.currentConversationMessages = messages;
	}

	@action
	public async addNewMessage(message: MessageModel) {
		await MessagesFetcher.addNewMessage(message);
		this.currentConversationMessages.push(message);
	}

	@action
	public pushNewMessage(message:MessageModel){
		this.currentConversationMessages.push(message);
	}

	@computed
	get getCurrentConvMessages() {
		return this.currentConversationMessages;
	}
}
