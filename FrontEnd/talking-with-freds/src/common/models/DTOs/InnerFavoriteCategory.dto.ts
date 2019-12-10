import ImageDTO from './Image.dto';

export default class InnerFavoriteCategoryDTO {
	public categoryId: number = 0;
	public categoryName: string = '';
	public isSelfPrint: boolean = false;
	public parentId: number = 0;
	public description: string = '';
	public shortDescription?: string;
	public categoryDesign: number = 0;
	public categoryType: number = 0;
	public sortOrder: number = 1;
	public businessId: number = 1001035;
	public supplierName: string = '';
	public categoryHTML?: any;
	public categoryUrl?: any;
	public termsOfUse?: any;
	public redimType?: any;
	public campaignDetails?: any;
	public mustKnow?: any;
	public images?: ImageDTO[];
	public variants?: any;
	public events?: any;
	public isLeaf: boolean = false;
	public isAllGrandchildren?: any;
	public isEvents: boolean = false;
	public subCategories?: any;
	public locations?: any;
	public business?: any;
	public breadcrumbs?: any;
	public sameLevelCategories?: any;
	public isConsumption: boolean = false;
}
