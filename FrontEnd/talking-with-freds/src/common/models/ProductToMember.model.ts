import {VariantTypes} from 'common/generalconsts/benefitType.enums';
import {eStatusOfUse} from 'common/generalconsts/purchase.enums';
import {BusinessesInfoDTO} from 'common/models/DTOs/BusinessesInfo.dto';
import CategoryDTO from './DTOs/Category.dto';
import HistoryDTO from './DTOs/History.dto';

export default class ProductToMemberModel {
	public fromMemberName: string = '';

	public toMemberName: string = '';

	public productType: VariantTypes = VariantTypes.Regular;

	public blessing?: string;

	public category: CategoryDTO = new CategoryDTO();

	public sumToLoad?: number;

	public media?: string;

	public code: string = '';

	public isUsed: boolean = false;

	public eStatusOfUse: eStatusOfUse = 0;

	public history: HistoryDTO[] = [];

	public logo?: string;

	public businessInfo: BusinessesInfoDTO[] = [];

	public expiredDate: string = '';

	public orderGuid: string = '';
}
