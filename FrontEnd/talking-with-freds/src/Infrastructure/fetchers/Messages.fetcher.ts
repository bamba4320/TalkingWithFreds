import BaseFetcher from './Base.fetcher';

class MessagesFetcher extends BaseFetcher {
	public async getConversationsMessages(convId: string) {
		return this.get(`/${convId}`);
	}

	public async addNewMessage(message:any){
		return this.put('/', {message});
	}
}
export default new MessagesFetcher('messages');
