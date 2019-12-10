import {PremiumTypes, UserTypes} from 'common/generalconsts/userTypes.enum';
import UserDTO from '../DTOs/User.dto';
import UserModel from '../User.model';

export default class GetUseTypeByPremiumType {
	public static DtoToModel(userDTO: UserDTO): UserModel {
		const newUser: UserModel = new UserModel();
		newUser.identityNumber = userDTO.identityNumber;
		newUser.userName = userDTO.userName;
		newUser.email = userDTO.email;
		newUser.token = userDTO.token;
		newUser.id = userDTO.id;
		if (userDTO.memberName) {
			newUser.memberName = userDTO.memberName;
		}
		newUser.accsessID = userDTO.accsessID;
		newUser.password = userDTO.password;
		newUser.apartmentNumber = userDTO.apartmentNumber;
		newUser.streetNumber = userDTO.streetNumber;
		newUser.streetName = userDTO.streetName;
		newUser.city = userDTO.city;
		newUser.birthDate = userDTO.birthDate;
		newUser.phoneNumber = userDTO.phoneNumber;
		newUser.workingPlace = userDTO.workingPlace;
		newUser.childrenNumber = userDTO.childrenNumber;
		newUser.friendMail = userDTO.friendMail;
		newUser.pinCode = userDTO.pinCode;
		newUser.shouldUpdateorRegister = userDTO.shouldUpdateorRegister;
		newUser.hasPinCode = userDTO.hasPinCode;
		newUser.dealsAndUpdates = userDTO.allowSmsAndMail;
		newUser.userType = GetUseTypeByPremiumType.getUserTypeByPremiumType(userDTO.PremiumType);
		newUser.isUpdatePasswordRequired = userDTO.isUpdatePasswordRequired;
		return newUser;
	}

	private static getUserTypeByPremiumType(premiumType: PremiumTypes) {
		switch (premiumType) {
			case PremiumTypes.B2B:
				return UserTypes.B2B;
			case PremiumTypes.B2C:
				return UserTypes.B2C;
		}
	}
}
