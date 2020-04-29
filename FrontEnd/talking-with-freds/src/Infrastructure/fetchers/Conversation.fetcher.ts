import BaseFetcher from './Base.fetcher';

class ConversationFetcher extends BaseFetcher {
	public async getUserConversations() {
		return await this.get('/');
	}

	public createNewConversation(userId: string) {
		return this.put(`/${userId}`);
	}

	public createNewGroupConversation(users: string[], groupName: string, groupPicture: any) {
		return this.post(`/group`, {users, groupName, groupPicture});
	}

	public getConversationMessages(convId: string) {
		return this.get(`/${convId}`);
	}

	public deleteConversation(convId:string){
		return this.del(`/${convId}`);
	}

	public changeConvName(convId:string, newName:string){
		return this.post(`/changeName/${convId}`, {newName});
	}

	public changeConvImage(convId:string, imageNumber:number){
		return this.post(`/changeImage/${convId}`, {imageNumber});
	}
}

export default new ConversationFetcher('conversation');
