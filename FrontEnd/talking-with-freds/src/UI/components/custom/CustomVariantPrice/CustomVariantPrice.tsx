import {PageToRender} from 'common/generalconsts/purchase.enums';
import {VariantDTO} from 'common/models/DTOs/Variant.dto';
import PurchaseUtils from 'common/utils/purchase/PurchaseUtils';
import React from 'react';
import {FormattedNumber} from 'react-intl';
import {isNullOrUndefined} from 'util';
import CustomRangePrice from '../CustomRangePrice/CustomRangePrice.custom';
interface IProps {
	variant: VariantDTO;
	pageToRender?: PageToRender;
	sumToLoad?: number;
}

export default class CustomVariantPrice extends React.Component<IProps> {
	public render() {
		if (this.props.variant.loadingAmountMin && this.props.variant.loadingAmountMax) {
			if (!isNullOrUndefined(this.props.pageToRender)) {
				if (this.props.pageToRender === PageToRender.sendGift) {
					return (
						<CustomRangePrice
							minPrice={this.props.variant.loadingAmountMin}
							maxPrice={this.props.variant.loadingAmountMax}
						/>
					);
				} else {
					return (
						<>
							<div className='coin-text'>₪</div>
							<FormattedNumber value={this.props.sumToLoad ? this.props.sumToLoad : 0} currency='ILS' />
						</>
					);
				}
			} else {
				return (
					<CustomRangePrice
						minPrice={this.props.variant.loadingAmountMin}
						maxPrice={this.props.variant.loadingAmountMax}
					/>
				);
			}
		} else {
			const loadingAmount: number = PurchaseUtils.loadingAmount(this.props.variant);
			if (loadingAmount > 0) {
				return (
					<div className='price-range-div'>
						<FormattedNumber value={loadingAmount} currency='ILS' />
						<div className='coin-text'>₪</div>
					</div>
				);
			} else {
				return (
					<div className='price-range-div'>
						<FormattedNumber value={this.props.variant.price} currency='ILS' />
						<div className='coin-text'>₪</div>
					</div>
				);
			}
		}
	}
}
