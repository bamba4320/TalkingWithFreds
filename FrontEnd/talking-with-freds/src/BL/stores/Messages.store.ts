import MessagesFetcher from '../../Infrastructure/fetchers/Messages.fetcher';
import {observable, action, computed} from 'mobx';
import MessageModel from '../../common/models/Message.model';
import {isNullOrUndefined} from 'util';

export default class MessagesStore {
	@observable
	private currentConversationMessages: MessageModel[];

	constructor() {
		this.currentConversationMessages = [];
	}

	@action
	public async getConversationMessagesById(convId: string | undefined) {
		try {
			if (!isNullOrUndefined(convId)) {
				this.currentConversationMessages = await MessagesFetcher.getConversationsMessages(convId);
			}
		} catch (err) {
			throw new Error(err.message);
		}
	}

	@action
	public async addNewMessage(message: MessageModel) {
		this.currentConversationMessages.push(message);
	}

	@computed
	get getCurrentConvMessages() {
		return this.currentConversationMessages;
	}
}
