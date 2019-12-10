import {observable} from 'mobx';

export default class ProfileModel {
	@observable
	public birthday = '';

	@observable
	public name = '';

	@observable
	public email = '';

	@observable
	public phone = '';

	@observable
	public deals = true;
}
