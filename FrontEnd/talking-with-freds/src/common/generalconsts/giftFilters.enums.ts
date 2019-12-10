import Lang from 'Infrastructure/Language/Language';

export enum FilterGiftsProps {
	filterdGifts = 'filterdGifts',
	filters = 'filters',
	categoryName = 'categoryName',
}

export enum FilterQueryOptions {
	priceFilter = 'priceFilter',
	areaFilter = 'areaFilter',
	kosherFilter = 'kosherFilter',
	tagFilter = 'tagFilter',
	priceSort = 'priceSort',
	pageFilter = 'pageFilter',
	categoryFilter = 'categoryFilter',
}

export enum GiftsPriceFilter {
	allPrices = '1',
	upTo100 = '2',
	from100To200 = '3',
	from200To300 = '4',
	from300To400 = '5',
	from400To500 = '6',
	from500AnUp = '7',
}

export const PricesTextsArray = [
	`${Lang.format('giftFiltersEnums.PriceArray.upTo')} ₪100`,
	'100 - ₪200',
	'200 - ₪300',
	'300 - ₪400',
	'400 - ₪500',
	`₪500 ${Lang.format('giftFiltersEnums.PriceArray.andUp')}`,
];

export const PriceSortArray = [
	Lang.format('giftFiltersEnums.PriceSortArray.lowToHigh'),
	Lang.format('giftFiltersEnums.PriceSortArray.highToLow'),
];

export const PricesFilterArray = [
	{minPrice: undefined, maxPrice: undefined},
	{minPrice: 0, maxPrice: 100},
	{minPrice: 100, maxPrice: 200},
	{minPrice: 200, maxPrice: 300},
	{minPrice: 300, maxPrice: 400},
	{minPrice: 400, maxPrice: 500},
	{minPrice: 500, maxPrice: -1},
];

export enum GiftsKosherFilter {
	all = '3',
	kosher = '1',
	lmehadrin = '2',
}

export enum CategoriesSort {
	noSort = 0,
	LowToHigh = 1,
	HighToLow = 2,
}

export enum MobileModalfilterOptions {
	priceModal = 0,
	categoriesModal = 1,
	moreModal = 2,
	kosherModal = 3,
	areaModal = 4,
}

export const KosherTexts = {
	[GiftsKosherFilter.kosher.toString()]: Lang.format('giftFiltersEnums.KosherArrayKosher'),
	[GiftsKosherFilter.lmehadrin.toString()]: Lang.format('giftFiltersEnums.KosherArrayToMehadrin'),
	[GiftsKosherFilter.all.toString()]: Lang.format('giftFiltersEnums.KosherArrayAll'),
};

export const desktopFilterScrollOption = {top: 530, left: 0};

export const mobileFilterScrollOption = {top: 0, left: 0};
