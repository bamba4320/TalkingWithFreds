import UserDTO from '../dto/user.dto';
import UserModel from '../models/User.model';
import {imagePreURL} from '../generalConsts';
import {isNullOrUndefined} from 'util';

export default class UserConverter {
	public static convertToModel(user: UserDTO) {
		const userModel: UserModel = new UserModel();
		userModel.id = user.id;
		userModel.email = user.email;
		userModel.username = user.username;
		if (!isNullOrUndefined(user.profileImage)) {
			userModel.profileImage = imagePreURL + user.profileImage;
		}
		return userModel;
	}
}
