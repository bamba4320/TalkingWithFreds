import {VariantTypes} from 'common/generalconsts/benefitType.enums';
import {VariantDTO} from 'common/models/DTOs/Variant.dto';
import NofhonitCookies from 'Infrastructure/storage/NofhonitCookies';
import {isNullOrUndefined} from 'util';

export default class PurchaseUtils {
	public static isMoneyVariant(variant: VariantDTO): boolean {
		const isLoadingFree: boolean = !isNullOrUndefined(variant.isLoadingFree) && variant.isLoadingFree;
		const notLoadingAmount: boolean = isNullOrUndefined(variant.loadingAmount) || variant.loadingAmount === 0;
		return (
			(variant.benefitTypeId === VariantTypes.GiftCardVerifone && notLoadingAmount) ||
			(variant.benefitTypeId === VariantTypes.RestaurantMoneyBL && isLoadingFree)
		);
	}

	public static addPurchaseCookie() {
		NofhonitCookies.savePurchase('modal');
	}

	public static loadingAmount(variant: VariantDTO): number {
		if (
			(variant.benefitTypeId === VariantTypes.GiftCardVerifone ||
				variant.benefitTypeId === VariantTypes.RestaurantMoneyBL) &&
			variant.loadingAmount &&
			variant.loadingAmount > 0
		) {
			return variant.loadingAmount;
		}
		return 0;
	}

	public static isInRange(variant: VariantDTO, price: number): boolean {
		return (
			!isNullOrUndefined(variant.loadingAmountMin) &&
			!isNullOrUndefined(variant.loadingAmountMax) &&
			variant.loadingAmountMin <= price &&
			variant.loadingAmountMax >= price
		);
	}
}
