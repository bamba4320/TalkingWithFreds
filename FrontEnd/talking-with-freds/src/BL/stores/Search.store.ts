import {
	CategoriesSort,
	FilterGiftsProps,
	FilterQueryOptions,
	GiftsKosherFilter,
	GiftsPriceFilter,
} from 'common/generalconsts/giftFilters.enums';
import GiftsConverter from 'common/models/converters/Gifts.convertor';
import GiftsFilterDTO from 'common/models/DTOs/GiftsFilter.dto';
import OptionsDTO from 'common/models/DTOs/Options.dto';
import SearchedCategoriesDTO from 'common/models/DTOs/SearchedCategories.dto';
import SearchResultDTO from 'common/models/DTOs/SearchResult.dto';
import GiftsFilterModel from 'common/models/GiftsFilter.model';
import SearchedCategoriesModel from 'common/models/SearchedCategories.model';
import AddressesFetcher from 'Infrastructure/fetchers/Addresses.fetcher';
import CategoriesFetcher from 'Infrastructure/fetchers/Categories.fetcher';
import TagsFetcher from 'Infrastructure/fetchers/Tags.fetcher';
import Lang from 'Infrastructure/Language/Language';
import {sortBy} from 'lodash';
import {action, computed, IObservableArray, observable} from 'mobx';
import {isNullOrUndefined} from 'util';
import ConfigurationStore from './Configuration.store';

export default class SearchStore {
	@observable
	private searchText: string = '';

	@observable
	private areaFilterArray: IObservableArray<OptionsDTO> = observable([]);

	@observable
	private tagsFilterArray: IObservableArray<OptionsDTO> = observable([]);

	@observable
	private amountOfAllResults: number = 0;

	private oldResults: {
		searchedCategories: SearchedCategoriesModel[];
		categoryName: string;
		filterModel: any;
	} = {
		searchedCategories: [],
		categoryName: '',
		filterModel: {},
	};

	private configurationStore: ConfigurationStore;

	constructor(configurationStore: ConfigurationStore, searchInitData?: SearchStore) {
		this.configurationStore = configurationStore;
		if (searchInitData) {
			this.amountOfAllResults = searchInitData.amountOfAllResults;
			this.oldResults = searchInitData.oldResults;
			this.areaFilterArray = searchInitData.areaFilterArray;
			this.tagsFilterArray = searchInitData.tagsFilterArray;
		}
	}

	@computed
	public get getSearchText() {
		return this.searchText;
	}

	@computed
	public get getAreaFilterArray() {
		return this.areaFilterArray;
	}

	@computed
	public get getTagsFilterArray() {
		return this.tagsFilterArray;
	}

	@computed
	public get getAmountOfAllResults() {
		return this.amountOfAllResults;
	}

	@action
	public setSearchText = (text: string) => {
		this.searchText = text;
	};

	@action
	public async fetchAreaFilterArray() {
		try {
			if (this.areaFilterArray.length === 0) {
				this.areaFilterArray = await AddressesFetcher.getAreaFilters();
			}
			return this.areaFilterArray;
		} catch (e) {
			return observable([]);
		}
	}

	@action
	public async fetchTagsFilterArray() {
		try {
			if (this.tagsFilterArray.length === 0) {
				const tags: OptionsDTO[] = await TagsFetcher.getTagsFilters();
				this.tagsFilterArray.replace(tags);
			}
			return this.tagsFilterArray;
		} catch (e) {
			return observable([]);
		}
	}

	@action
	public async getSearchedCategoriesByFilter(queryParams: any) {
		const priceFilterValue: GiftsPriceFilter = queryParams[FilterQueryOptions.priceFilter];
		const areaFilterValue: string = queryParams[FilterQueryOptions.areaFilter];
		const kosherFilterValue: GiftsKosherFilter = queryParams[FilterQueryOptions.kosherFilter];
		const priceSort: CategoriesSort = queryParams[FilterQueryOptions.priceSort];
		const tagFilterValue: string = queryParams[FilterQueryOptions.tagFilter];
		const pageFilter: number = queryParams[FilterQueryOptions.pageFilter];
		const categoryFilter: string = queryParams.id;
		const filterModel: GiftsFilterModel = new GiftsFilterModel(
			priceFilterValue,
			areaFilterValue,
			kosherFilterValue,
			categoryFilter,
			priceSort,
			tagFilterValue,
			pageFilter
		);
		const filtersDto: GiftsFilterDTO = GiftsConverter.giftsFilterModelToDto(
			filterModel,
			this.configurationStore.configuration.numOfBenefitsInGifts
		);
		try {
			let retObj = {
				[FilterGiftsProps.filters]: filterModel,
				[FilterGiftsProps.filterdGifts]: this.oldResults.searchedCategories,
				[FilterGiftsProps.categoryName]: this.oldResults.categoryName,
			};
			if (JSON.stringify(this.oldResults.filterModel) !== JSON.stringify(filterModel)) {
				const responseData = await CategoriesFetcher.getSearchedCategoriesByFilter(filtersDto);

				const searchResponse = responseData.filterDataDTOs;

				const searchedCategories: SearchedCategoriesModel[] = [];

				if (!isNullOrUndefined(searchResponse) && searchResponse.length > 0) {
					this.amountOfAllResults = searchResponse[0].categoriesCount && searchResponse[0].categoriesCount;
					searchResponse.forEach((dto: SearchedCategoriesDTO) => {
						searchedCategories.push(GiftsConverter.searchedCategoriesDtoToModel(dto));
					});
				}

				retObj = {
					[FilterGiftsProps.filters]: filterModel,
					[FilterGiftsProps.filterdGifts]: searchedCategories,
					[FilterGiftsProps.categoryName]: responseData.metaDataDescription,
				};
				this.oldResults = {searchedCategories, categoryName: responseData.metaDataDescription, filterModel};
			}

			return retObj;
		} catch (e) {
			return {
				[FilterGiftsProps.filters]: filterModel,
				[FilterGiftsProps.filterdGifts]: [],
			};
		}
	}

	@action
	public async getSearchResults() {
		try {
			const encodedSearchText = encodeURIComponent(this.searchText);
			const searchResultsArray: SearchResultDTO[] = await CategoriesFetcher.getAutoCompleteResults(encodedSearchText);
			if (searchResultsArray.length > 0) {
				searchResultsArray[0].firstHeader = `${Lang.format('searchFirstHeader.part1')} "${
					this.searchText
				}" ${Lang.format('searchFirstHeader.part2')}:`;
			}
			return sortBy(searchResultsArray, (searchResultDto) => searchResultDto.sortOrder);
		} catch (e) {
			return [];
		}
	}
}
