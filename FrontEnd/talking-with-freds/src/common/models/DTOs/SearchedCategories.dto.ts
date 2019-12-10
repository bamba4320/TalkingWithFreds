import CategoryDTO from 'common/models/DTOs/Category.dto';
export default class SearchedCategoriesDTO {
	public stripName?: string;

	public categoriesCount: number = 0;

	public innerFilterData: {
		businessesCount: number;

		isFavorite: boolean;

		categories: Array<{maxPrice: number; minPrice: number; category: CategoryDTO}>;
	} = {businessesCount: 0, categories: [], isFavorite: false};
}
