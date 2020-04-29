import BaseFetcher from './Base.fetcher';

class ImagesFetcher extends BaseFetcher {
	public getUserImages() {
		return this.get('/user');
	}
	public getConversationImages() {
		return this.get('/conversation');
	}
	public getAllImages() {
		return this.get('/');
	}
}

export default new ImagesFetcher('images');
