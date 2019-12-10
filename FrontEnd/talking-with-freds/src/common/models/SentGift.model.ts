import CategoryDTO from './DTOs/Category.dto';
import ImageDTO from './DTOs/Image.dto';

export default class SentGiftModel {
	public categoryNumber!: number;

	public category!: CategoryDTO;

	public image?: ImageDTO;

	public transferDetails!: {
		sendTo: string;
		transferBy: string[];
		sentDate: string;
		price: number;
		transferGuid: string;
	};
}
