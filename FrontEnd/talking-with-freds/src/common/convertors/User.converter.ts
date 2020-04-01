import UserDTO from '../dto/user.dto';
import UserModel from '../models/User.model';

export default class UserConverter {
	public static convertToModel(user: UserDTO) {
		const userModel: UserModel = new UserModel();
		userModel.id = user.id;
		userModel.email = user.email;
		userModel.username = user.username;
		return userModel;
	}
}
