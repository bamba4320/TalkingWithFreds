import {CategoriesSort} from 'common/generalconsts/giftFilters.enums';

export default class SelectOptionModel {
	public text: string;

	public value: CategoriesSort;

	constructor(text: string, value: CategoriesSort) {
		this.text = text;
		this.value = value;
	}
}
