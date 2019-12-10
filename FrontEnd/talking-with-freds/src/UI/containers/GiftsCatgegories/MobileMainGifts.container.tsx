import {CONFIGURATION_STORE, CURRENT_USER_STORE, MENU_STORE, MODAL_STORE, SEARCH_STORE, UI_STORE} from 'BL/stores';
import ConfigurationStore from 'BL/stores/Configuration.store';
import CurrentUserStore from 'BL/stores/CurrentUser.store';
import MenuStore from 'BL/stores/Menu.store';
import ModalStore from 'BL/stores/Modal.store';
import SearchStore from 'BL/stores/Search.store';
import UiStore from 'BL/stores/Ui.store';
import {
	CategoriesSort,
	FilterGiftsProps,
	FilterQueryOptions,
	GiftsKosherFilter,
	GiftsPriceFilter,
	mobileFilterScrollOption,
	MobileModalfilterOptions,
	PricesTextsArray,
} from 'common/generalconsts/giftFilters.enums';
import OptionsDTO from 'common/models/DTOs/Options.dto';
import GiftsFilterModel from 'common/models/GiftsFilter.model';
import SearchedCategoriesModel from 'common/models/SearchedCategories.model';
import {addQueryParam} from 'common/routes/historyUtils';
import Lang from 'Infrastructure/Language/Language';
import _ from 'lodash';
import {inject, observer} from 'mobx-react';
import {SingletonRouter, withRouter} from 'next/router';
import {Component, createRef, RefObject} from 'react';
import {FormattedMessage} from 'react-intl';
import {Icon, Image, Menu, Pagination, Segment, Sticky} from 'semantic-ui-react';
import SearchedCategoriesComponent from 'UI/components/GiftsCategories/SearchedCategories.component';
import MobileMainFiltersContainer from './MobileMainFilters.container';

interface IProps {
	[FilterGiftsProps.filterdGifts]: SearchedCategoriesModel[];
	[FilterGiftsProps.filters]: GiftsFilterModel;
	areaFilters: OptionsDTO[];
	tagsFilters: OptionsDTO[];
	router: SingletonRouter;
	[MODAL_STORE]?: ModalStore;
	[MENU_STORE]?: MenuStore;
	[CURRENT_USER_STORE]?: CurrentUserStore;
	[UI_STORE]?: UiStore;
	[SEARCH_STORE]?: SearchStore;
	[CONFIGURATION_STORE]?: ConfigurationStore;
	shouldLazyLoad?: boolean;
}
interface IState {}

@inject(MODAL_STORE, MENU_STORE, CURRENT_USER_STORE, UI_STORE, SEARCH_STORE, CONFIGURATION_STORE)
@observer
class MobileMainGiftsContainer extends Component<IProps, IState> {
	public modalStore: ModalStore;
	public menuStore: MenuStore;
	public currentUserStore: CurrentUserStore;
	public uiStore: UiStore;
	public searchStore: SearchStore;
	public configurationStore: ConfigurationStore;
	public contextRef = createRef();
	constructor(props: Readonly<IProps>) {
		super(props);
		this.menuStore = this.props[MENU_STORE] as MenuStore;
		this.modalStore = this.props[MODAL_STORE] as ModalStore;
		this.currentUserStore = this.props[CURRENT_USER_STORE] as CurrentUserStore;
		this.uiStore = this.props[UI_STORE] as UiStore;
		this.searchStore = this.props[SEARCH_STORE] as SearchStore;
		this.configurationStore = this.props[CONFIGURATION_STORE] as ConfigurationStore;
		this.state = {};
	}

	public render() {
		const categoryFilterText =
			this.props[FilterGiftsProps.filters].categoryIdFilter.toString() !== '0'
				? this.menuStore.menuCategories.find((category) => {
						return category.categoryId.toString() === this.props[FilterGiftsProps.filters].categoryIdFilter.toString();
				  })
				: null;
		return (
			<div className='mobile-main-gifts-container'>
				<div
					className={this.currentUserStore.isNotLoggedIn ? 'menu-container-not-logged-in' : 'menu-container-logged-in'}>
					<div ref={this.contextRef as RefObject<HTMLDivElement>}>
						<Sticky context={this.contextRef}>
							<Menu
								fluid
								widths={3}
								borderless
								noborderradius='1'
								className={`menu-container-not-logged-in ${
									this.currentUserStore.isNotLoggedIn ? '' : 'menu-container-logged-in'
								}`}>
								<Menu.Item
									cursorpointer='1'
									onClick={() =>
										this.modalStore.openModal(
											<MobileMainFiltersContainer
												filterModalType={MobileModalfilterOptions.priceModal}
												filters={this.props[FilterGiftsProps.filters]}
												areaFilters={this.props.areaFilters}
												tagsFilters={this.props.tagsFilters}
											/>,
											{
												title: Lang.format('gifts.FilterByPrice'),
												fullScreen: true,
												isNoMarginFromTop: true,
												isNoPaddingFromTop: true,
											}
										)
									}>
									{this.props[FilterGiftsProps.filters].priceFilter.toString() !==
									GiftsPriceFilter.allPrices.toString() ? (
										<div className='menu-text'>
											{PricesTextsArray[parseInt(this.props[FilterGiftsProps.filters].priceFilter, 10) - 2]}
										</div>
									) : (
										<FormattedMessage id='gifts.Price' />
									)}
								</Menu.Item>
								<div className='menu-divider' />
								<Menu.Item
									cursorpointer='1'
									onClick={() =>
										this.modalStore.openModal(
											<MobileMainFiltersContainer
												filterModalType={MobileModalfilterOptions.categoriesModal}
												filters={this.props[FilterGiftsProps.filters]}
												areaFilters={this.props.areaFilters}
												tagsFilters={this.props.tagsFilters}
											/>,
											{
												title: Lang.format('gifts.FilterByCategory'),
												fullScreen: true,
												isNoMarginFromTop: true,
												isNoPaddingFromTop: true,
											}
										)
									}>
									{categoryFilterText ? (
										<div className='more-div'>
											<div className='menu-text'>{categoryFilterText.categoryName}</div>
											<Icon name='check' color='orange' />
										</div>
									) : (
										<FormattedMessage id='general.Categories' />
									)}
								</Menu.Item>
								<div className='menu-divider' />
								<Menu.Item
									cursorpointer='1'
									onClick={() =>
										this.modalStore.openModal(
											<MobileMainFiltersContainer
												filterModalType={MobileModalfilterOptions.moreModal}
												filters={this.props[FilterGiftsProps.filters]}
												areaFilters={this.props.areaFilters}
												tagsFilters={this.props.tagsFilters}
											/>,
											{
												title: Lang.format('gifts.MoreFilters'),
												fullScreen: true,
												isNoMarginFromTop: true,
												isNoPaddingFromTop: true,
											}
										)
									}>
									<FormattedMessage id='general.More' />
									{this.checkIfAnyMoreFiltersAreActivated() && <Icon name='check' color='orange' />}
								</Menu.Item>
							</Menu>
						</Sticky>
					</div>
				</div>
				<div className='categories-div'>
					<SearchedCategoriesComponent
						filterdGifts={this.props[FilterGiftsProps.filterdGifts]}
						shouldLazyLoad={this.props.shouldLazyLoad ? this.props.shouldLazyLoad : false}
					/>
				</div>
				{this.props[FilterGiftsProps.filterdGifts].length > 0 && (
					<Segment className='pagination-segment' placeholder nopadding='1'>
						<Pagination
							className='inner-pagination'
							activePage={this.props[FilterGiftsProps.filters].pageFilter}
							firstItem={null}
							lastItem={null}
							secondary
							siblingRange={1}
							boundaryRange={0}
							ellipsisItem={null}
							totalPages={this.calculateNumOfPages()}
							onPageChange={this.handleChangePage}
							nextItem={{
								'aria-label': 'Next item',
								content: <Image src='/static/icons/arrow-left.svg' />,
							}}
							prevItem={{
								'aria-label': 'Previous item',
								content: <Image src='/static/icons/arrow-right.svg' />,
							}}
						/>
					</Segment>
				)}
			</div>
		);
	}

	private checkIfAnyMoreFiltersAreActivated = () => {
		return (
			this.props[FilterGiftsProps.filters].areaFilter.toString() !== '0' ||
			this.props[FilterGiftsProps.filters].tagsFilter.toString() !== '0' ||
			this.props[FilterGiftsProps.filters].kosherFilter.toString() !== GiftsKosherFilter.all.toString() ||
			this.props[FilterGiftsProps.filters].priceSort.toString() !== CategoriesSort.noSort.toString()
		);
	};

	// adds a page filter to the query
	private handleChangePage = (_e: any, data: any) => {
		const queryValue: number = data.activePage;
		this.uiStore.blockUiSite();
		addQueryParam(this.props.router, FilterQueryOptions.pageFilter, queryValue, false, mobileFilterScrollOption);
	};

	private calculateNumOfPages = () => {
		const flatAmountOfPages =
			this.searchStore.getAmountOfAllResults / this.configurationStore.configuration.numOfBenefitsInGifts;
		const roundedAmountOfPages = _.round(flatAmountOfPages);
		if (roundedAmountOfPages === flatAmountOfPages) {
			return flatAmountOfPages;
		}
		return _.round(flatAmountOfPages + 0.5);
	};
}

export default withRouter(MobileMainGiftsContainer);
