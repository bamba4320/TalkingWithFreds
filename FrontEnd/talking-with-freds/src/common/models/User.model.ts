import {observable} from 'mobx';

export default class UserModel {
	@observable
	public id?: string;
	@observable
	public username?: string;
	@observable
	public email?: string;
	@observable
	public profileImage?: string;
}
