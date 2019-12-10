import {VariantTypes} from 'common/generalconsts/benefitType.enums';

export class VariantDTO {
	public name: string = '';
	public expireDate: string = '';
	public expireDateDesc: string = '';
	public price: number = 0;
	public redimTypeName: string = '';
	public barCode: string = '';
	public description: string = '';
	public isEmpty: boolean = false;
	public isSendToFriend?: boolean;
	public showCardBalanceRestaurants: boolean = false;
	public showCardBalanceVerifone: boolean = false;
	public orderLimit?: number;
	public monthlyLimit?: number;
	public yearlyLimit?: number;
	public generalLimit?: number;
	public irgunPrice?: number;
	public benefitTypeId?: VariantTypes;
	public giftCardValue?: any;
	public redimTypeId?: number;
	public kupaPrice?: number;
	public business?: any;
	public isCampaign?: boolean;
	public businessSubTypeId?: number;
	public loadingAmount?: number;
	public loadingAmountMin?: number;
	public loadingAmountMax?: number;
	public isLoadingFree?: boolean;
	public chargingRanks?: string;
}
