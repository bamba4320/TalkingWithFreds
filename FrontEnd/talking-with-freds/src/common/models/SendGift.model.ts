import {observable} from 'mobx';

export default class SendGiftModel {
	@observable
	public fromMemberName?: string = '';

	@observable
	public toMemberMobilePhone?: string;

	@observable
	public toMemberEmail?: string;

	@observable
	public toMemberName?: string = '';

	@observable
	public blessing?: string;

	@observable
	public categoryNumber: number = 0;

	@observable
	public variantBarCode: string = '';

	@observable
	public sumToLoad?: number;

	@observable
	public media?: string;

	@observable
	public sendDate: string = '';

	@observable
	public sendTime: string = '';

	@observable
	public sendTimeValue: number = 0;

	@observable
	public isShare: boolean = false;

	// for validation
	@observable
	public isEmail: boolean = true;

	@observable
	public isPhone: boolean = false;

	@observable
	public isToMySelf: boolean = false;

	@observable
	public isOpen: boolean = false;

	@observable
	public isImmediateSend: boolean = true;

	// start of payment
	@observable
	public cardNumber: string = '';

	@observable
	public idNumber: string = '';

	@observable
	public validityMonth: string = '';

	@observable
	public validityMonthValue?: number;

	@observable
	public validityYear: string = '';

	@observable
	public validityYearValue?: number;

	@observable
	public cvv?: number;

	@observable
	public email?: string;
}
