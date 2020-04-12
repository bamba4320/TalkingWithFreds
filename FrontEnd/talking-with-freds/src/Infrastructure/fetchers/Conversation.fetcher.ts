import BaseFetcher from './Base.fetcher';

class ConversationFetcher extends BaseFetcher {
	public async getUserConversations() {
		return await this.get('/');
	}

	public createNewConversation(userId: string) {
		return this.put(`/${userId}`);
	}

	public getConversationMessages(convId:String){
		return this.get(`/${convId}`);
	}
}

export default new ConversationFetcher('conversation');
