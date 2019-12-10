import ImageDTO from './DTOs/Image.dto';
import Lang from 'Infrastructure/Language/Language';

export default class SearchedCategoriesModel {
	public categoryId: number = 0;

	public categoryName: string = Lang.format('Gifts.allCategories');

	public sortOrder: number = 0;

	public images?: ImageDTO[];

	public categoryType: number = 0;

	public categoryUrl: string = '';

	public minPrice: number = 0;

	public maxPrice: number = 0;

	public businessesCount: number = 0;

	public stripName?: string = '';

	public categoryDescription: string = '';

	public categoryShowType: number = 0;
}
