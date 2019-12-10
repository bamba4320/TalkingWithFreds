import {PremiumTypes} from 'common/generalconsts/userTypes.enum';

export default class UserDTO {
	public id!: string;
	public userName!: string;
	public accsessID!: string;
	public token!: string;
	public email!: string;
	public password!: string;
	public validatePassword!: string;
	public identityNumber!: string;
	public apartmentNumber!: string;
	public streetNumber!: string;
	public streetName!: string;
	public city!: string;
	public birthDate!: string;
	public phoneNumber!: string;
	public workingPlace!: string;
	public childrenNumber!: string;
	public friendMail!: string;
	public pinCode!: string;
	public hasPinCode!: boolean;
	public shouldUpdateorRegister!: number;
	public allowSmsAndMail!: boolean;
	public memberName!: string;
	public PremiumType!: PremiumTypes;
	public isUpdatePasswordRequired!: boolean;
}
