import {CONFIGURATION_STORE, FAVORITES_STORE} from 'BL/stores';
import ConfigurationStore from 'BL/stores/Configuration.store';
import FavoritesStore from 'BL/stores/Favorites.store';
import {BenefitPageTypes} from 'common/generalconsts/benefitPageTypes.enum';
import SearchedCategoriesModel from 'common/models/SearchedCategories.model';
import {routesPaths} from 'common/routes/routesPaths.consts';
import _ from 'lodash';
import {inject} from 'mobx-react';
import {Component} from 'react';
import {FormattedMessage, InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import {Card, Image, Placeholder} from 'semantic-ui-react';
import CustomLazyLoad from '../custom/customLazyLoad/CustomLazyLoad.component';
import CustomIdLinkComponent from '../custom/customLink/CustomIdLink.component';
import CustomRangePrice from '../custom/CustomRangePrice/CustomRangePrice.custom';
import FavoriteFlagComponent from '../Favorites/favoriteFlag.component';

interface IProps {
	categoryCardDetailes: SearchedCategoriesModel;
	[FAVORITES_STORE]?: FavoritesStore;
	[CONFIGURATION_STORE]?: ConfigurationStore;
	intl: InjectedIntl;
	shouldLazyLoad?: boolean;
}
interface IState {}

@inject(FAVORITES_STORE, CONFIGURATION_STORE)
class GiftCategoryComponent extends Component<IProps, IState> {
	private configurationStore: ConfigurationStore;
	constructor(props: Readonly<IProps>) {
		super(props);
		this.configurationStore = this.props[CONFIGURATION_STORE] as ConfigurationStore;
	}

	public cardMeta() {
		if (this.props.categoryCardDetailes.categoryDescription) {
			if (this.props.categoryCardDetailes.categoryDescription.length > 100) {
				return this.props.categoryCardDetailes.categoryDescription.slice(0, 100) + '...';
			} else {
				return this.props.categoryCardDetailes.categoryDescription;
			}
		} else {
			return '';
		}
	}

	public businessesCount() {
		if (this.props.categoryCardDetailes.businessesCount > 50) {
			return `${_.round(this.props.categoryCardDetailes.businessesCount / 50 - 0.5) * 50}+`;
		}
		return this.props.categoryCardDetailes.businessesCount;
	}

	public render() {
		return (
			<Card className='gift-category-container' smallershadow='1'>
				<CustomIdLinkComponent pathname={routesPaths.giftPage.root} id={this.props.categoryCardDetailes.categoryId}>
					<CustomLazyLoad
						shouldLazyLoad={this.props.shouldLazyLoad ? this.props.shouldLazyLoad : false}
						placeHolder={
							<Placeholder>
								<Placeholder.Image square className='card-image-placeholder' />
							</Placeholder>
						}>
						<Image
							className='card-image'
							categorycardimage='1'
							wrapped
							src={
								this.props.categoryCardDetailes.images &&
								this.props.categoryCardDetailes.images[0] &&
								this.props.categoryCardDetailes.images[0].file
									? this.configurationStore.configuration.imagesPath + this.props.categoryCardDetailes.images[0].file
									: '/static/placeholders/image-placeholder.png'
							}
						/>
					</CustomLazyLoad>
				</CustomIdLinkComponent>
				<Card.Content>
					<Card.Content className='favorite-indicator'>
						<FavoriteFlagComponent categoryId={this.props.categoryCardDetailes.categoryId} />
					</Card.Content>
					<CustomIdLinkComponent pathname={routesPaths.giftPage.root} id={this.props.categoryCardDetailes.categoryId}>
						<Card.Header className='main-card-header'>
							{this.props.categoryCardDetailes.categoryName ? this.props.categoryCardDetailes.categoryName : ''}
						</Card.Header>
						<Card.Meta className='card-meta'>{this.cardMeta()}</Card.Meta>
						<Card.Content className='lower-content'>
							<Card.Header as='h3' className='price-header' primaryheader='1' inlineheader='1'>
								{this.props.categoryCardDetailes.categoryShowType !== BenefitPageTypes.informativePage ? (
									<CustomRangePrice
										minPrice={this.props.categoryCardDetailes.minPrice}
										maxPrice={this.props.categoryCardDetailes.maxPrice}
									/>
								) : (
									<FormattedMessage id='gifts.showOnly' />
								)}
							</Card.Header>

							<Card.Meta className='card-small-text'>
								{this.props.categoryCardDetailes.businessesCount && this.props.categoryCardDetailes.businessesCount > 1
									? `${this.businessesCount()} ${this.props.intl.formatMessage({
											id: 'GiftCategory.Branches',
									  })}`
									: ''}
							</Card.Meta>
						</Card.Content>
					</CustomIdLinkComponent>
				</Card.Content>
			</Card>
		);
	}
}
export default withIntl(GiftCategoryComponent);
