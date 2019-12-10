import {MENU_STORE, MODAL_STORE, SEARCH_STORE, UI_STORE} from 'BL/stores';
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
	MobileModalfilterOptions,
} from 'common/generalconsts/giftFilters.enums';
import OptionsDTO from 'common/models/DTOs/Options.dto';
import GiftsFilterModel from 'common/models/GiftsFilter.model';
import {deleteQueryAndIdParam, setQueryParams} from 'common/routes/historyUtils';
import {inject, observer} from 'mobx-react';
import {SingletonRouter, withRouter} from 'next/router';
import {Component} from 'react';
import MobileCategoryFiltersComponent from 'UI/components/GiftsCategories/MobileCategoryFilter.component';
import MobileMoreFiltersComponent from 'UI/components/GiftsCategories/MobileMoreFilters.component';
import MobilePriceFiltersComponent from 'UI/components/GiftsCategories/MobilePriceFilters.component';
import MobileShowResultsComponent from 'UI/components/GiftsCategories/MobileShowResults.component';

interface IProps {
	[FilterGiftsProps.filters]: GiftsFilterModel;
	filterModalType: MobileModalfilterOptions;
	router: SingletonRouter;
	[MODAL_STORE]?: ModalStore;
	[UI_STORE]?: UiStore;
	[MENU_STORE]?: MenuStore;
	[SEARCH_STORE]?: SearchStore;
	areaFilters: OptionsDTO[];
	tagsFilters: OptionsDTO[];
}

interface IState {
	[FilterQueryOptions.priceFilter]: string;
	[FilterQueryOptions.areaFilter]: string;
	[FilterQueryOptions.kosherFilter]: string;
	[FilterQueryOptions.priceSort]: string;
	[FilterQueryOptions.tagFilter]: string;
	[FilterQueryOptions.categoryFilter]: string;
}

@inject(MODAL_STORE, UI_STORE, MENU_STORE, SEARCH_STORE)
@observer
class MobileFiltersContainer extends Component<IProps, IState> {
	public modalStore: ModalStore;
	public uiStore: UiStore;
	public menuStore: MenuStore;
	public searchStore: SearchStore;
	constructor(props: Readonly<IProps>) {
		super(props);
		this.uiStore = this.props[UI_STORE] as UiStore;
		this.modalStore = this.props[MODAL_STORE] as ModalStore;
		this.menuStore = this.props[MENU_STORE] as MenuStore;
		this.searchStore = this.props[SEARCH_STORE] as SearchStore;
		this.state = {
			[FilterQueryOptions.priceFilter]: this.props[FilterGiftsProps.filters].priceFilter.toString(),
			[FilterQueryOptions.areaFilter]: this.props[FilterGiftsProps.filters].areaFilter.toString(),
			[FilterQueryOptions.kosherFilter]: this.props[FilterGiftsProps.filters].kosherFilter.toString(),
			[FilterQueryOptions.priceSort]: this.props[FilterGiftsProps.filters].priceSort.toString(),
			[FilterQueryOptions.tagFilter]: this.props[FilterGiftsProps.filters].tagsFilter.toString(),
			[FilterQueryOptions.categoryFilter]: this.props[FilterGiftsProps.filters].categoryIdFilter.toString(),
		};
	}

	public render() {
		return (
			<div className='mobile-main-filters-div-container'>
				{this.modalToOpen()}
				<MobileShowResultsComponent
					handleFilterSearch={this.handleFilterSearch}
					handleCleanQuery={this.handleCleanQuery}
				/>
			</div>
		);
	}

	private modalToOpen = () => {
		switch (this.props.filterModalType) {
			case MobileModalfilterOptions.priceModal:
				return (
					<MobilePriceFiltersComponent
						handlePriceChange={this.handlePriceFilterChange}
						isActive={this.isPriceFilterActive}
					/>
				);
			case MobileModalfilterOptions.categoriesModal:
				const categories = [...this.menuStore.menuCategories];
				// puts the last item as the first
				categories.unshift(categories.pop()!);
				return (
					<MobileCategoryFiltersComponent
						handleCategoryChange={this.handleCategoryFilterChange}
						isActive={this.isCategoryFilterActive}
						categories={categories}
					/>
				);
			case MobileModalfilterOptions.moreModal:
				return (
					// Might change this => put all the methods in the component
					<MobileMoreFiltersComponent
						areaFilters={this.props.areaFilters}
						tagsFilters={this.props.tagsFilters}
						handleAreaChange={this.handleAreaFilterChange}
						handleKosherChange={this.handleKosherFilterChange}
						handlePriceSortChange={this.handlePriceSortChange}
						isAreaActive={this.isAreaFilterActive}
						isKosherActive={this.isKosherFilterActive}
						removeAreaFilter={this.removeAreaFilter}
						removeKosherFilter={this.removeKosherFilter}
						removePriceSort={this.removePriceSort}
						isPriceSortActive={this.isPriceSortActive}
						handleTagsFilterChange={this.handleTagsFilterChange}
						isTagFilterActive={this.isTagFilterActive}
						removeTagsFilter={this.removeTagsFilter}
					/>
				);
		}
	};

	// deletes the query and the id
	private handleCleanQuery = () => {
		this.uiStore.blockUiSite();
		deleteQueryAndIdParam(this.props.router);
		this.modalStore.closeModal();
	};

	// this function changes the url after selcting a filter
	private handleFilterSearch = () => {
		this.uiStore.blockUiSite();
		this.modalStore.closeModal(true);
		const queryObject = {...this.state};
		delete queryObject[FilterQueryOptions.categoryFilter];
		const queryId = parseInt(this.state[FilterQueryOptions.categoryFilter], 10)
			? this.state[FilterQueryOptions.categoryFilter]
			: undefined;
		setQueryParams(this.props.router, queryObject, queryId);
	};

	private removeAreaFilter = () => {
		this.setState({[FilterQueryOptions.areaFilter]: '0'});
	};

	private removeTagsFilter = () => {
		this.setState({[FilterQueryOptions.tagFilter]: '0'});
	};

	private removeKosherFilter = () => {
		this.setState({[FilterQueryOptions.kosherFilter]: GiftsKosherFilter.all.toString()});
	};

	private removePriceSort = () => {
		this.setState({[FilterQueryOptions.priceSort]: CategoriesSort.noSort.toString()});
	};

	private handlePriceSortChange = (categoriesSort: CategoriesSort) => {
		this.setState({[FilterQueryOptions.priceSort]: categoriesSort.toString()});
	};

	private handlePriceFilterChange = (giftsPriceFilter: GiftsPriceFilter) => {
		this.setState({[FilterQueryOptions.priceFilter]: giftsPriceFilter.toString()});
	};

	private handleAreaFilterChange = (giftsAreaFilter: number) => {
		let currentArea = this.state[FilterQueryOptions.areaFilter];
		if (currentArea === '0') {
			this.setState({[FilterQueryOptions.areaFilter]: giftsAreaFilter.toString()});
		} else {
			if (!currentArea.includes(giftsAreaFilter.toString())) {
				currentArea = currentArea + ',' + giftsAreaFilter.toString();
				this.setState({[FilterQueryOptions.areaFilter]: currentArea});
			} else {
				if (currentArea.length > 1) {
					const filteredArray = currentArea
						.split(',')
						.filter((value) => value.toString() !== giftsAreaFilter.toString());
					this.setState({[FilterQueryOptions.areaFilter]: filteredArray.join(',')});
				}
			}
		}
	};

	private handleTagsFilterChange = (giftsTagFilter: number) => {
		let currentTag = this.state[FilterQueryOptions.tagFilter];
		if (currentTag === '0') {
			this.setState({[FilterQueryOptions.tagFilter]: giftsTagFilter.toString()});
		} else {
			if (!currentTag.includes(giftsTagFilter.toString())) {
				currentTag = currentTag + ',' + giftsTagFilter.toString();
				this.setState({[FilterQueryOptions.tagFilter]: currentTag});
			} else {
				if (currentTag.length > 1) {
					const filteredArray = currentTag.split(',').filter((value) => value.toString() !== giftsTagFilter.toString());
					this.setState({[FilterQueryOptions.tagFilter]: filteredArray.join(',')});
				}
			}
		}
	};

	private handleKosherFilterChange = (giftsKosherFilter: GiftsKosherFilter) => {
		let currentKosher = this.state[FilterQueryOptions.kosherFilter];
		if (currentKosher === GiftsKosherFilter.all.toString()) {
			this.setState({[FilterQueryOptions.kosherFilter]: giftsKosherFilter.toString()});
		} else {
			if (!currentKosher.includes(giftsKosherFilter.toString())) {
				currentKosher = currentKosher + ',' + giftsKosherFilter.toString();
				this.setState({[FilterQueryOptions.kosherFilter]: currentKosher});
			} else {
				if (currentKosher.length > 1) {
					const filteredArray = currentKosher
						.split(',')
						.filter((value) => value.toString() !== giftsKosherFilter.toString());
					this.setState({[FilterQueryOptions.kosherFilter]: filteredArray.join(',')});
				}
			}
		}
	};

	// the category filter removes other filters
	private handleCategoryFilterChange = (categoryId: number) => {
		this.setState({
			[FilterQueryOptions.categoryFilter]: categoryId.toString(),
			[FilterQueryOptions.areaFilter]: '0',
			[FilterQueryOptions.tagFilter]: '0',
			[FilterQueryOptions.kosherFilter]: GiftsKosherFilter.all.toString(),
			[FilterQueryOptions.priceSort]: CategoriesSort.noSort.toString(),
			[FilterQueryOptions.priceFilter]: GiftsPriceFilter.allPrices.toString(),
		});
	};

	private isPriceFilterActive = (giftsPriceFilter: GiftsPriceFilter) => {
		return this.state[FilterQueryOptions.priceFilter].toString() === giftsPriceFilter.toString();
	};

	private isAreaFilterActive = (giftsAreaFilter: number) => {
		return this.state[FilterQueryOptions.areaFilter]
			.toString()
			.split(',')
			.includes(giftsAreaFilter.toString()); // .includes because it has several filters
	};

	private isTagFilterActive = (giftsTagFilter: number) => {
		return this.state[FilterQueryOptions.tagFilter]
			.toString()
			.split(',')
			.includes(giftsTagFilter.toString()); // .includes because it has several filters
	};

	private isKosherFilterActive = (giftsKosherFilter: GiftsKosherFilter) => {
		return this.state[FilterQueryOptions.kosherFilter].toString().includes(giftsKosherFilter.toString()); // .includes because it has several filters
	};

	private isCategoryFilterActive = (categoryId: number) => {
		return this.state[FilterQueryOptions.categoryFilter].toString() === categoryId.toString();
	};

	private isPriceSortActive = (categoriesSort: CategoriesSort) => {
		return this.state[FilterQueryOptions.priceSort].toString() === categoriesSort.toString();
	};
}

export default withRouter(MobileFiltersContainer);
