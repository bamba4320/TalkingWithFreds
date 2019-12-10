import {sortBy} from 'lodash';
import BenefitPageModel from '../BenefitPage.model';
import {BusinessesInfoDTO} from '../DTOs/BusinessesInfo.dto';
import CategoryDTO from '../DTOs/Category.dto';
import ImageDTO from '../DTOs/Image.dto';

export default class CategoryConverter {
	public static DtoToBenefitModel(category: CategoryDTO): BenefitPageModel {
		const converted: BenefitPageModel = new BenefitPageModel();
		converted.breadcrumbs = category.breadCrumbs;
		converted.businessesCount = category.businessesCount;
		converted.supplierName = category.supplierName;
		converted.categoryShowType = category.categoryShowType;
		converted.additionalInfo = category.additionalInfo;
		converted.redimType = category.redimType;
		converted.categoryDescription = category.categoryDescription;
		converted.categoryId = category.categoryId;
		converted.categoryName = category.categoryName;
		converted.categoryType = category.categoryType;
		converted.categoryUrl = category.categoryUrl;
		converted.description = category.description;
		converted.image = category.images && category.images.length > 0 ? category.images[0] : new ImageDTO();
		converted.maxPrice = category.maxPrice;
		converted.minPrice = category.minPrice;
		converted.mustKnow = category.mustKnow;
		converted.shortDescription = category.shortDescription;
		converted.shortMarketingDescription = category.shortMarketingDescription;
		converted.stripName = category.stripName;
		converted.variants = category.variants;
		return converted;
	}

	public static businessesInfoDtoToBenefitModel(category: BenefitPageModel, businessesInfo: BusinessesInfoDTO[]) {
		category.businessesInfo = businessesInfo.map((buisness: BusinessesInfoDTO) => {
			const buisnessInfo = new BusinessesInfoDTO();
			buisnessInfo.aliasID = buisness.aliasID;
			buisnessInfo.aliasName = buisness.aliasName;
			buisnessInfo.aliasDescription = buisness.aliasDescription;
			buisnessInfo.businesses = sortBy(buisness.businesses, (item) => {
				return item.sortOrder;
			});
			return buisnessInfo;
		});
		return category;
	}

	public static BenefitModelToDto(category: BenefitPageModel): CategoryDTO {
		const converted: CategoryDTO = new CategoryDTO();
		converted.breadCrumbs = category.breadcrumbs;
		converted.businessesCount = category.businessesCount;
		converted.categoryShowType = category.categoryShowType;
		converted.businessInfo = category.businessesInfo.map((buisness) => {
			const buisnessInfo = new BusinessesInfoDTO();
			buisnessInfo.aliasName = buisness.aliasName;
			buisnessInfo.businesses = sortBy(buisness.businesses, (item) => {
				return item.sortOrder;
			});
			return buisnessInfo;
		});
		converted.categoryDescription = category.categoryDescription;
		converted.categoryId = category.categoryId;
		converted.categoryName = category.categoryName;
		converted.categoryType = category.categoryType;
		converted.categoryUrl = category.categoryUrl;
		converted.description = category.description ? category.description : '';
		converted.images = [category.image];
		converted.maxPrice = category.maxPrice;
		converted.minPrice = category.minPrice;
		converted.mustKnow = category.mustKnow;
		converted.shortDescription = category.shortDescription;
		converted.stripName = category.stripName;
		converted.variants = category.variants;
		converted.expireDate = category.expireDate;
		converted.eventDate = category.eventDate;
		return converted;
	}
}
