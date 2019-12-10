export default class GiftsFilterDTO {
	public priceMin?: number;

	public priceMax?: number;

	public priceSort!: number;

	public regions?: number[];

	public kosherTypes?: number[];

	public pageNumber!: number;

	public amountPerPage!: number;

	public categoryTagIDs?: number[];

	public categoryFirstFatherID?: number;
}
