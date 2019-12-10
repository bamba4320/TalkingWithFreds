import {FilterGiftsProps} from 'common/generalconsts/giftFilters.enums';
import SearchedCategoriesModel from 'common/models/SearchedCategories.model';
import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import {Grid, Header} from 'semantic-ui-react';
import GiftCategoryComponent from 'UI/components/GiftsCategories/GiftCategory.component';
interface IProps {
	[FilterGiftsProps.filterdGifts]: SearchedCategoriesModel[]; // the gifts categories we get from the backend
	shouldLazyLoad?: boolean;
}
interface IState {}

class SearchedCategoriesComponent extends Component<IProps, IState> {
	constructor(props: Readonly<IProps>) {
		super(props);
		this.state = {};
	}

	public render() {
		return this.props[FilterGiftsProps.filterdGifts].length > 0 ? (
			<Grid className='search-grid'>
				{this.props[FilterGiftsProps.filterdGifts].map((categoryCard) => {
					return (
						<Grid.Column
							computer={6}
							largeScreen={6}
							widescreen={5}
							tablet={8}
							mobile={16}
							style={{padding: '8px 0'}}
							key={categoryCard.categoryId}>
							<GiftCategoryComponent
								key={categoryCard.categoryId}
								categoryCardDetailes={categoryCard}
								shouldLazyLoad={this.props.shouldLazyLoad ? this.props.shouldLazyLoad : false}
							/>
						</Grid.Column>
					);
				})}
			</Grid>
		) : (
			<div>
				<Header textcentered='1' size='huge' margin180pxtopandbottom='1'>
					<FormattedMessage id='gifts.NoResults' />
				</Header>
			</div>
		);
	}
}
export default SearchedCategoriesComponent;
