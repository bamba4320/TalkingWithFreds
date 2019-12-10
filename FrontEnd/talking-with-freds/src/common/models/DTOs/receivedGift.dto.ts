import CategoryDTO from './Category.dto';
import ImageDTO from './Image.dto';

export default class ReceivedGiftDTO {
	public categoryDetails!: Array<{
		categoryId: number;
		category: CategoryDTO;
		images?: ImageDTO[];
	}>;

	public transferDetails!: {
		sendFrom: string;
		expiredDate: string;
		sentDate: string;
		price: number;
		eStatusOfUse: number;
		transferGuid: string;
	};
}
