import {BreadcrumbDTO} from './Breadcrumb.dto';
import {BusinessesInfoDTO} from './BusinessesInfo.dto';
import ImageDTO from './Image.dto';
import {MustToKnowDTO} from './MustToKnow.dto';
import {VariantDTO} from './Variant.dto';
import Lang from 'Infrastructure/Language/Language';

export default class CategoryDTO {
	public categoryId: number = 0;

	public categoryName: string = '';

	public sortOrder: number = 0;

	public children?: CategoryDTO[];

	public description: string = Lang.format('categoryDTO.noDescription');

	public images?: ImageDTO[];

	public isAllGrandchildren?: boolean;

	public categoryType: number = 0;

	public categoryShowType: number = 0;

	public isLeaf: boolean = false;

	public categoryUrl: string = '';

	public categoryDescription: string = '';

	public shortMarketingDescription: string = '';

	public expireDate?: string;

	public eventDate?: string;

	public minPrice: number = 0;

	public maxPrice: number = 0;

	public price: number = 0;

	public businessesCount: number = 0;

	public stripName: string = '';

	public shortDescription: string = '';

	public supplierName: string = '';

	public additionalInfo: string = '';

	public redimType: string = '';

	public subCategories?: CategoryDTO[];

	public breadCrumbs: BreadcrumbDTO[] = new Array<BreadcrumbDTO>();

	public variants: VariantDTO[] = new Array<VariantDTO>();

	public businessInfo: BusinessesInfoDTO[] = new Array<BusinessesInfoDTO>();

	public mustKnow: MustToKnowDTO[] = new Array<MustToKnowDTO>();

	public mustKnowArray: MustToKnowDTO[] = new Array<MustToKnowDTO>();
}
