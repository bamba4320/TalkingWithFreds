import GiftsConverter from 'common/models/converters/Gifts.convertor';
import ReceivedGiftDTO from 'common/models/DTOs/receivedGift.dto';
import SentGiftDTO from 'common/models/DTOs/SentGift.dto';
import ReceivedGiftModel from 'common/models/ReceivedGift.model';
import SentGiftModel from 'common/models/SentGift.model';
import CategoriesFetcher from 'Infrastructure/fetchers/Categories.fetcher';
import {action, IObservableArray, observable} from 'mobx';
import {NextContext} from 'next';

export default class MyGiftsStore {
	@observable
	public SentGifts: IObservableArray<SentGiftModel> = observable([]);

	@observable
	public ReceivedGifts: IObservableArray<ReceivedGiftModel> = observable([]);

	constructor(giftsInitData?: MyGiftsStore) {
		if (giftsInitData) {
			this.SentGifts.replace(giftsInitData.SentGifts);
			this.ReceivedGifts.replace(giftsInitData.ReceivedGifts);
		}
	}

	@action
	public async init(ctx?: NextContext) {
		try {
			await this.getReceivedGifts(ctx);
		} catch (err) {}
		try {
			await this.getSentGifts(ctx);
		} catch (err) {}
	}

	@action
	private async getSentGifts(ctx?: NextContext) {
		const res: SentGiftDTO[] = await CategoriesFetcher.getSentGifts(ctx);
		this.SentGifts.replace(
			res.map((dto: SentGiftDTO) => {
				return GiftsConverter.SentDtoToModel(dto);
			})
		);
	}

	@action
	private async getReceivedGifts(ctx?: NextContext) {
		const res: ReceivedGiftDTO[] = await CategoriesFetcher.getReceivedGifts(ctx);
		this.ReceivedGifts.replace(
			res.map((dto: ReceivedGiftDTO) => {
				return GiftsConverter.receivedDtoToModel(dto);
			})
		);
	}

	@action
	public emptyGifts() {
		this.ReceivedGifts = observable([]);
		this.SentGifts = observable([]);
	}
}
