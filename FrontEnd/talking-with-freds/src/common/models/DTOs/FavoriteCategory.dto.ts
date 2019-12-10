import ImageDTO from './Image.dto';
import InnerFavoriteCategoryDTO from './InnerFavoriteCategory.dto';

export default class FavoriteCategoryDTO {
	public categoryId: number = 0;
	public category: InnerFavoriteCategoryDTO = new InnerFavoriteCategoryDTO();
	public images?: ImageDTO[];
	public minPrice: number = 0.0;
	public maxPrice: number = 0.0;
	public businessesCount: number = 1;
}
