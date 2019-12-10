import CategoryDTO from './Category.dto';
import ImageDTO from './Image.dto';

export default class SentGiftDTO {
	public categoryDetails!: Array<{
		categoryId: number;
		category: CategoryDTO;
		images?: ImageDTO[];
	}>;
	public transferDetails!: {
		sendTo: string;
		transferBy: string[];
		sentDate: string;
		price: number;
		transferGuid: string;
	};
}
