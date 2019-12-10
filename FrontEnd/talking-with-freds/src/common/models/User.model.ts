import {UserTypes} from 'common/generalconsts/userTypes.enum';
import {observable} from 'mobx';

export enum UserTypeTemp {
	Guest = 'Guest',
}

export default class UserModel {
	@observable
	public userTypeTemp?: UserTypeTemp;

	@observable
	public id: string = '';

	@observable
	public memberName: string = '';

	@observable
	public userName: string = '';

	@observable
	public accsessID: string = '';

	@observable
	public token: string = '';

	@observable
	public email: string = '';

	@observable
	public password: string = '';

	@observable
	public identityNumber: string = '';

	@observable
	public apartmentNumber: string = '';

	@observable
	public streetNumber: string = '';

	@observable
	public streetName: string = '';

	@observable
	public city: string = '';

	@observable
	public birthDate: string = '';

	@observable
	public phoneNumber: string = '';

	@observable
	public workingPlace: string = '';

	@observable
	public childrenNumber: string = '';

	@observable
	public friendMail: string = '';

	@observable
	public pinCode: string = '';

	@observable
	public hasPinCode?: boolean;

	@observable
	public shouldUpdateorRegister: number = 0;

	@observable
	public dealsAndUpdates?: boolean;

	@observable
	public userType?: UserTypes;

	@observable
	public isUpdatePasswordRequired?: boolean;
}
