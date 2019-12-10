import FavoriteCategoryDTO from '../DTOs/FavoriteCategory.dto';
import FavoriteCategoryModel from '../FavoriteCategory.model';

export default class FavoriteCategoryConverter {
	public static ConvertDTOToModel(convert: FavoriteCategoryDTO): FavoriteCategoryModel {
		const newModel: FavoriteCategoryModel = new FavoriteCategoryModel();
		newModel.categoryId = convert.categoryId;
		newModel.categoryName = convert.category.categoryName;
		newModel.businessesCount = convert.businessesCount;
		newModel.categoryDescription = convert.category.description;
		newModel.categoryType = convert.category.categoryType;
		newModel.categoryUrl = convert.category.categoryUrl;
		newModel.images = convert.category.images;
		newModel.maxPrice = convert.maxPrice;
		newModel.minPrice = convert.minPrice;
		newModel.sortOrder = convert.category.sortOrder;
		newModel.stripName = '';

		return newModel;
	}
}
