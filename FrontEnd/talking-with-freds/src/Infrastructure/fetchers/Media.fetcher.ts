import MessageDTO from 'common/models/DTOs/Message.dto';
import {BaseFetcher} from './base/Base.fetcher';

class MediaFetcher extends BaseFetcher {
	public async GetMessagesByKeyList(messagesKeys: number[]): Promise<MessageDTO[]> {
		return this.post('/GetMessagesByKeyList', messagesKeys);
	}

	public async GetMessagesByContext(context: string): Promise<MessageDTO[]> {
		try {
			return await this.get(`/GetMessagesByContext?context=${context}`);
		} catch (err) {
			return [];
		}
	}
	public async getFAQ() {
		return this.get('/getFAQ').catch((_err) => {
			return [];
		});
	}
	public async getImagesSlider(context: string) {
		try {
			return await this.get(`/GetImagesSlider?imageMessageContext=${context}`);
		} catch (err) {
			return [];
		}
	}

	public async getBlessing() {
		return await this.get(`/getBlessing`);
	}

	public async getMediaForBlessings() {
		return await this.get(`/getMedia`);
	}
}

export default new MediaFetcher(`media`);
