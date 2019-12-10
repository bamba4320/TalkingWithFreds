import {FilterGiftsProps} from 'common/generalconsts/giftFilters.enums';
import OptionsDTO from 'common/models/DTOs/Options.dto';
import GiftsFilterModel from 'common/models/GiftsFilter.model';
import SearchedCategoriesModel from 'common/models/SearchedCategories.model';
import {observer} from 'mobx-react';
import React, {Component} from 'react';
import CustomResponsiveWrapper from 'UI/components/CustomResponsiveWrapper';
import DesktopMainGiftsContainer from './DesktopMainGifts.container';
import MobileMainGiftsContainer from './MobileMainGifts.container';
interface IProps {
	[FilterGiftsProps.filterdGifts]: SearchedCategoriesModel[];
	[FilterGiftsProps.filters]: GiftsFilterModel;
	[FilterGiftsProps.categoryName]: string;
	mobileDetect: MobileDetect;
	areaFilters: OptionsDTO[];
	tagsFilters: OptionsDTO[];
	shouldLazyLoad?: boolean;
}
interface IState {}

@observer
export default class MainGiftsContainer extends Component<IProps, IState> {
	constructor(props: Readonly<IProps>) {
		super(props);
		this.state = {};
	}

	public render() {
		return (
			<CustomResponsiveWrapper
				mobileDetect={this.props.mobileDetect}
				desktopComponent={
					<DesktopMainGiftsContainer
						filterdGifts={this.props[FilterGiftsProps.filterdGifts]}
						filters={this.props[FilterGiftsProps.filters]}
						categoryName={this.props[FilterGiftsProps.categoryName]}
						areaFilters={this.props.areaFilters}
						tagsFilters={this.props.tagsFilters}
						shouldLazyLoad={this.props.shouldLazyLoad ? this.props.shouldLazyLoad : false}
					/>
				}
				mobileComponent={
					<MobileMainGiftsContainer
						filterdGifts={this.props[FilterGiftsProps.filterdGifts]}
						filters={this.props[FilterGiftsProps.filters]}
						areaFilters={this.props.areaFilters}
						tagsFilters={this.props.tagsFilters}
						shouldLazyLoad={this.props.shouldLazyLoad ? this.props.shouldLazyLoad : false}
					/>
				}
			/>
		);
	}
}
