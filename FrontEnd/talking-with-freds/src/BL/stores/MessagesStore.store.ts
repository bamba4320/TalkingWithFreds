import MessagesFetcher from '../../Infrastructure/fetchers/MessagesFetcher.fetcher';
import {observable} from 'mobx';
import MessageModel from '../../common/models/MessageModel.model';

export default class MessagesStore {
	@observable
	private currentConversationMessages: MessageModel[];

	constructor() {
		this.currentConversationMessages = [];
	}

	public async getConversationMessagesById(convid: number) {
		this.currentConversationMessages = await MessagesFetcher.getConversationsMessages(convid);
	}
}
