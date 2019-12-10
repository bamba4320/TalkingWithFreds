import _ from 'lodash';
import ProfileDTO from '../DTOs/Profile.dto';
import ProfileModel from '../Profile.model';
import UserModel from '../User.model';

export default class ProfileConverter {
	public static DtoToModel(profileDTO: ProfileDTO): ProfileModel {
		const newUser: ProfileModel = new ProfileModel();
		newUser.email = profileDTO.email;
		newUser.name = profileDTO.MemberName;
		newUser.phone = profileDTO.phoneNumber;
		newUser.birthday = profileDTO.BirthDate;
		newUser.deals = profileDTO.AllowSmsAndMail;
		return newUser;
	}
	public static ModelToDto(profileModel: ProfileModel): ProfileDTO {
		const newUser: ProfileDTO = new ProfileDTO();
		newUser.email = profileModel.email;
		newUser.MemberName = profileModel.name;
		newUser.phoneNumber = profileModel.phone;
		newUser.BirthDate = profileModel.birthday
			.split('/')
			.reverse()
			.join('-');
		newUser.AllowSmsAndMail = profileModel.deals;
		return newUser;
	}
	public static UserToModel(currentUser?: UserModel): ProfileModel {
		const newUser: ProfileModel = new ProfileModel();
		if (currentUser) {
			newUser.email = _.get(currentUser, 'email', '');
			newUser.name = currentUser.memberName ? currentUser.memberName : '';
			newUser.phone = currentUser.phoneNumber ? currentUser.phoneNumber : '';
			newUser.birthday = _.get(currentUser, 'birthDate', '')
				? _.get(currentUser, 'birthDate', '')
						.substring(0, 10)
						.split('-')
						.reverse()
						.join('/')
				: '';
			newUser.deals = _.get(currentUser, 'dealsAndUpdates', false);
		}
		return newUser;
	}
}
