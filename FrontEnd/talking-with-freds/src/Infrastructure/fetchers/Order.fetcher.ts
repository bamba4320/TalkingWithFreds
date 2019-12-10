import {PurchaseDTO} from 'common/models/DTOs/Purchase.dto';
import {BaseFetcher} from './base/Base.fetcher';

class OrderFetcher extends BaseFetcher {
	public async purchase(purchaseDto: PurchaseDTO) {
		return await this.post('/purchase', purchaseDto);
	}
}

export default new OrderFetcher(`order`);
