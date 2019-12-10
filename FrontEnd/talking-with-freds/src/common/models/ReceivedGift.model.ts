import CategoryDTO from './DTOs/Category.dto';
import ImageDTO from './DTOs/Image.dto';

export default class ReceivedGiftModel {
	public categoryNumber!: number;

	public category!: CategoryDTO;

	public image?: ImageDTO;

	public sendFrom!: string;
	public expiredDate!: string;
	public sentDate!: string;
	public price!: number;
	public status!: string;
	public transferGuid!: string;
}
