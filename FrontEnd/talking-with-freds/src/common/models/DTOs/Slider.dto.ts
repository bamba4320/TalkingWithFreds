import {observable} from 'mobx';

export default class SliderDTO {
	@observable
	public imageUrlBig?: string;

	@observable
	public imageUrlSmall?: string;

	@observable
	public sortOrder?: number;

	@observable
	public link?: string;

	@observable
	public alt?: string;
}
