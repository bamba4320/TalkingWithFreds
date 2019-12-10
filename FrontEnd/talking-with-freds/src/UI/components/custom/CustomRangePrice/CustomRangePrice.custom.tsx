import React from 'react';
import {FormattedNumber} from 'react-intl';
interface IProps {
	minPrice: number;
	maxPrice: number;
}

export default class CustomRangePrice extends React.Component<IProps> {
	public render() {
		if (this.props.minPrice && !this.props.maxPrice) {
			return (
				<div className='price-range-div'>
					<FormattedNumber value={this.props.minPrice} currency='ILS' />
					<div className='coin-text'>₪</div>
				</div>
			);
		} else if (!this.props.minPrice && this.props.maxPrice) {
			return (
				<div className='price-range-div'>
					<FormattedNumber value={this.props.maxPrice} currency='ILS' />
					<div className='coin-text'>₪</div>
				</div>
			);
		} else if (this.props.minPrice !== this.props.maxPrice) {
			return (
				<div className='price-range-div'>
					<FormattedNumber value={this.props.maxPrice} currency='ILS' />
					{' - '}
					<FormattedNumber value={this.props.minPrice} currency='ILS' />
					<div className='coin-text'>₪</div>
				</div>
			);
		} else {
			return (
				<div className='price-range-div'>
					<FormattedNumber value={this.props.minPrice} currency='ILS' />
					<div className='coin-text'>₪</div>
				</div>
			);
		}
	}
}
