import {eStatusOfUse} from 'common/generalconsts/purchase.enums';
import {BusinessesInfoDTO} from 'common/models/DTOs/BusinessesInfo.dto';
import CategoryDTO from './Category.dto';
import HistoryDTO from './History.dto';

export default class ProductToMemberDTO {
	public fromMemberName: string = '';

	public toMemberName: string = '';

	public productType: number = 0;

	public blessing?: string;

	public category: {category: CategoryDTO} = {category: new CategoryDTO()};

	public sumToLoad?: number;

	public media?: string;

	public code: string = '';

	public isUsed: boolean = false;

	public eStatusOfUse: eStatusOfUse = 0;

	public history: HistoryDTO[] = [];

	public logo?: string;

	public businesses?: BusinessesInfoDTO[];

	public expiredDate: string = '';
}
