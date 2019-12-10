import {
	CategoriesSort,
	GiftsKosherFilter,
	GiftsPriceFilter,
	PricesFilterArray,
} from 'common/generalconsts/giftFilters.enums';

export default class GiftsFilterModel {
	public priceFilter: GiftsPriceFilter = GiftsPriceFilter.allPrices;

	public minPrice?: number;

	public maxPrice?: number;

	public areaFilter: string = '0';

	public kosherFilter: GiftsKosherFilter[] = [GiftsKosherFilter.all];

	public categoryIdFilter: string = '0';

	public priceSort: CategoriesSort = CategoriesSort.noSort;

	public tagsFilter: string = '0';

	public pageFilter: number = 1;

	constructor(
		priceFilter?: GiftsPriceFilter,
		areaFilter?: string,
		kosherFilter?: GiftsKosherFilter,
		categoryIdFilter?: string,
		priceSort?: CategoriesSort,
		tagsFilter?: string,
		pageFilter?: number
	) {
		this.priceFilter = priceFilter && parseInt(priceFilter, 10) > 0 ? priceFilter : GiftsPriceFilter.allPrices;
		this.minPrice = PricesFilterArray[parseInt(this.priceFilter, 10) - 1].minPrice;
		this.maxPrice = PricesFilterArray[parseInt(this.priceFilter, 10) - 1].maxPrice;
		this.areaFilter = areaFilter ? areaFilter : '0';
		this.kosherFilter = kosherFilter ? (kosherFilter.split(',') as GiftsKosherFilter[]) : [GiftsKosherFilter.all];
		this.categoryIdFilter = categoryIdFilter && categoryIdFilter !== '0' ? categoryIdFilter : '0';
		this.priceSort = priceSort ? priceSort : CategoriesSort.noSort;
		this.tagsFilter = tagsFilter ? tagsFilter : '0';
		this.pageFilter = pageFilter ? pageFilter : 1;
	}
}
