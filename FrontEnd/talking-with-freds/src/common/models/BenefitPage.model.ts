import {observable} from 'mobx';
import {BreadcrumbDTO} from './DTOs/Breadcrumb.dto';
import {BusinessesInfoDTO} from './DTOs/BusinessesInfo.dto';
import ImageDTO from './DTOs/Image.dto';
import {MustToKnowDTO} from './DTOs/MustToKnow.dto';
import {VariantDTO} from './DTOs/Variant.dto';
import Lang from 'Infrastructure/Language/Language';

export default class BenefitPageModel {
	@observable
	public categoryId: number = 0;

	@observable
	public categoryName: string = Lang.format('Gifts.allCategories');

	@observable
	public categoryShowType: number = 0;

	@observable
	public description?: string;

	@observable
	public image: ImageDTO = new ImageDTO();

	@observable
	public categoryType: number = 0;

	@observable
	public categoryUrl: string = '';

	@observable
	public categoryDescription: string = '';

	@observable
	public minPrice: number = 0;

	@observable
	public maxPrice: number = 0;

	@observable
	public businessesCount: number = 0;

	@observable
	public supplierName: string = '';

	@observable
	public stripName: string = '';

	@observable
	public shortDescription: string = '';

	@observable
	public shortMarketingDescription: string = '';

	@observable
	public expireDate?: string = '';

	@observable
	public eventDate?: string = '';

	@observable
	public additionalInfo: string = '';

	@observable
	public redimType: string = '';

	@observable
	public breadcrumbs: BreadcrumbDTO[] = new Array<BreadcrumbDTO>();

	@observable
	public variants: VariantDTO[] = new Array<VariantDTO>();

	@observable
	public businessesInfo: BusinessesInfoDTO[] = new Array<BusinessesInfoDTO>();

	@observable
	public mustKnow: MustToKnowDTO[] = new Array<MustToKnowDTO>();

	@observable // not in use
	public mustKnowArray: MustToKnowDTO[] = new Array<MustToKnowDTO>();
}
