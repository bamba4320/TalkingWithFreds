import UserDTO from '../dto/user.dto';
import UserModel from '../models/User.model';
import {imagePreURL} from '../generalConsts';

export default class UserConverter {
	public static convertToModel(user: UserDTO) {
		const userModel: UserModel = new UserModel();
		userModel.id = user.id;
		userModel.email = user.email;
		userModel.username = user.username;
		userModel.profileImage = imagePreURL + user.profileImage;
		return userModel;
	}
}
