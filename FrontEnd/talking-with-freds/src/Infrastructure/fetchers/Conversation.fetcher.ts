import BaseFetcher from './Base.fetcher';

class ConversationFetcher extends BaseFetcher {
	public async getUserConversations() {
		return await this.get('/');
	}

	public createNewConversation(userId: string) {
		return this.put(`/${userId}`);
	}
}

export default new ConversationFetcher('conversation');
