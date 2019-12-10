import {CONFIGURATION_STORE, MENU_STORE, UI_STORE} from 'BL/stores';
import ConfigurationStore from 'BL/stores/Configuration.store';
import MenuStore from 'BL/stores/Menu.store';
import UiStore from 'BL/stores/Ui.store';
import {FilterGiftsProps} from 'common/generalconsts/giftFilters.enums';
import GiftsFilterModel from 'common/models/GiftsFilter.model';
import {routesPaths} from 'common/routes/routesPaths.consts';
import {inject, observer} from 'mobx-react';
import {Component} from 'react';
import {InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import {Header, Image, Segment} from 'semantic-ui-react';
import CustomCarousel from 'UI/components/custom/customCarousel/CustomCarousel.component';
import CustomIdLinkComponent from 'UI/components/custom/customLink/CustomIdLink.component';

interface IProps {
	[MENU_STORE]?: MenuStore;
	[UI_STORE]?: UiStore;
	[CONFIGURATION_STORE]?: ConfigurationStore;
	[FilterGiftsProps.filters]: GiftsFilterModel;
	intl: InjectedIntl;
}
interface IState {}

@inject(MENU_STORE, CONFIGURATION_STORE)
@observer
class PopularCategoriesContainer extends Component<IProps, IState> {
	private carouselBreakPoints: Array<{width: number; itemsToShow: number; itemsToScroll?: number}>;
	private menuStore: MenuStore;
	public configurationStore: ConfigurationStore;
	constructor(props: Readonly<IProps>) {
		super(props);
		this.menuStore = this.props[MENU_STORE] as MenuStore;
		this.configurationStore = this.props[CONFIGURATION_STORE] as ConfigurationStore;
		this.carouselBreakPoints = [
			{width: 513, itemsToShow: 3},
			{width: 1150, itemsToShow: 4},
			{width: 1360, itemsToShow: 5},
			{width: 1600, itemsToShow: 6},
			{width: 1850, itemsToShow: 7},
		];
		this.state = {};
	}

	public render() {
		return this.menuStore.menuCategories.length === 0 && this.menuStore.getIsLoaded ? (
			<Header textcentered='1' size='huge'>
				{this.props.intl.formatMessage({id: 'popularCategories.noCategories'})}
			</Header>
		) : (
			<Segment placeholder className='popular-categories-container' maxwidth100percent='1'>
				<CustomCarousel
					carouselId='popular_categories'
					showArrows
					enableMouseSwipe
					breakPoints={this.carouselBreakPoints}
					isAutoPlay={false}
					itemsToShow={4}
					initialFirstItem={this.getActiveIndex()}
					isPagination={false}
					enlargeOnHover={true}>
					{this.mapCategoriesHeader()}
				</CustomCarousel>
			</Segment>
		);
	}

	private mapCategoriesHeader = () => {
		const categories = [...this.menuStore.menuCategories];
		// puts the last item as the first
		categories.unshift(categories.pop()!);
		return categories.map((category) => {
			return (
				category && (
					<CustomIdLinkComponent
						key={category.categoryId}
						id={category.categoryId}
						pathname={routesPaths.gifts.root}
						notScroll>
						<Segment
							key={category.categoryId}
							placeholder
							nopadding='1'
							className='inner-segment'
							disabled={
								this.props[FilterGiftsProps.filters].categoryIdFilter.toString() !== category.categoryId.toString()
							}>
							<Image
								size7rem='1'
								automargin='1'
								circular
								alt={category.images && category.images.length > 0 && category.images[0] ? category.images[0].alt : ''}
								src={
									category.images && category.images[0] && category.images[0].file
										? category.images[0].file
										: '/static/placeholders/image-placeholder.png'
								}
							/>
							<Header className='segment-header' fontsize2p2rem='1'>
								{category.categoryName}
							</Header>
						</Segment>
					</CustomIdLinkComponent>
				)
			);
		});
	};

	private getActiveIndex = () => {
		const categories = [...this.menuStore.menuCategories];
		// puts the last item as the first
		categories.unshift(categories.pop()!);
		for (let i: number = 0; i < categories.length; i++) {
			if (
				categories[i] &&
				this.props[FilterGiftsProps.filters].categoryIdFilter.toString() === categories[i].categoryId.toString()
			) {
				return i;
			}
		}
	};
}
export default withIntl(PopularCategoriesContainer);
