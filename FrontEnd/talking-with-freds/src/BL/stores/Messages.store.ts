import MessagesFetcher from '../../Infrastructure/fetchers/Messages.fetcher';
import {observable, action, computed} from 'mobx';
import MessageModel from '../../common/models/Message.model';

export default class MessagesStore {
	@observable
	private currentConversationMessages: MessageModel[];

	@observable
	private isInitCurrentConversationMessages: boolean;

	constructor() {
		this.currentConversationMessages = [];
		this.isInitCurrentConversationMessages = false;
	}

	@action
	public initCurrentMessages(messages: MessageModel[]) {
		this.isInitCurrentConversationMessages = true;
		this.currentConversationMessages = messages;
		setTimeout(() => {
			this.isInitCurrentConversationMessages = false;
		}, 200);
	}

	@action
	public async addNewMessage(message: MessageModel) {
		await MessagesFetcher.addNewMessage(message);
		this.pushNewMessage(message);
	}

	@action
	public pushNewMessage(message: MessageModel) {
		this.isInitCurrentConversationMessages = false;
		this.currentConversationMessages.push(message);
	}

	@computed
	get getCurrentConvMessages() {
		return this.currentConversationMessages;
	}

	@computed
	get getIsInitCurrentConversationMessages() {
		return this.isInitCurrentConversationMessages;
	}
}
