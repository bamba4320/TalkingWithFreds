import {BaseFetcher} from './base/Base.fetcher';

class CardsFetcher extends BaseFetcher {
	public async getVerifone(orderGuid: string) {
		try {
			return await this.get(`/GeneratePayCode?transferGuid=${orderGuid}`);
		} catch (e) {
			throw e;
		}
	}
}
export default new CardsFetcher(`cards`);
