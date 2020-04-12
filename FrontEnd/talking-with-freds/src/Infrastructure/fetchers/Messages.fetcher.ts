import BaseFetcher from './Base.fetcher';
import MessageModel from '../../common/models/Message.model';

class MessagesFetcher extends BaseFetcher {
	public async getConversationsMessages(convId: string) {
		return this.get(`/${convId}`);
	}

	public async addNewMessage(message:MessageModel){
		return this.put('/', {senderId:message.senderId, convId:message.convId,content:message.messageContent, sendTime:message.messageSendingTime});
	}
}
export default new MessagesFetcher('messages');
