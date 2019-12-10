import AlertUtils from 'common/errorHandling/AlertUtils';
import {ErrorValidate} from 'common/errorHandling/ErrorTypes/ErrorValidate';
import {PrivateOrBusiness, SignOptions} from 'common/generalconsts/login.enums';
import GiftsConverter from 'common/models/converters/Gifts.convertor';
import UserConverter from 'common/models/converters/User.converter';
import SendGiftDTO from 'common/models/DTOs/SendGift.dto';
import UserDTO from 'common/models/DTOs/User.dto';
import SendGiftModel from 'common/models/SendGift.model';
import UserModel from 'common/models/User.model';
import UsersFetcher from 'Infrastructure/fetchers/Users.fetcher';
import Lang from 'Infrastructure/Language/Language';
import {action} from 'mobx';
import CurrentUserStore from './CurrentUser.store';
import MessagesStore from './Messages.store';

export default class AuthStore {
	private currentUserStore: CurrentUserStore;
	private messageStore: MessagesStore;

	constructor(currentUserStore: CurrentUserStore, messageStore: MessagesStore) {
		this.currentUserStore = currentUserStore;
		this.messageStore = messageStore;
	}

	@action
	public async handleVerifyUser(token: string) {
		let userDTO: UserDTO | null = null;
		try {
			userDTO = await UsersFetcher.verifyUser(token);
		} catch (err) {
			throw new ErrorValidate(err);
		}
		try {
			if (userDTO) {
				const userModel: UserModel = UserConverter.DtoToModel(userDTO);
				await this.currentUserStore.userAuthenticated(userModel);
				return userModel;
			}
		} catch (err) {
			throw err;
		}
	}

	@action
	public async handleVerifyPurchase(token: string) {
		let userDTO: UserDTO | null = null;
		try {
			userDTO = await UsersFetcher.verifyUser(token);
		} catch (err) {
			throw new ErrorValidate(err);
		}
		try {
			if (userDTO) {
				const userModel: UserModel = await UserConverter.DtoToModel(userDTO);
				await this.currentUserStore.userAuthenticated(userModel);
				const verificationData: SendGiftDTO = await UsersFetcher.getTempMemberOrder();
				return verificationData;
			}
		} catch (err) {
			throw err;
		}
	}

	/**
	 * We check userModel.isUpdatePasswordRequired only here because it's only can happen in regular login
	 * @param email
	 * @param password
	 */
	@action
	public async handleLogin(email: string, password: string) {
		try {
			const userDTO: UserDTO = await UsersFetcher.authenticate(
				email,
				password,
				SignOptions.Authenticate,
				PrivateOrBusiness.businessTobusiness_consumer
			);
			if (userDTO) {
				const userModel: UserModel = UserConverter.DtoToModel(userDTO);
				if (!userModel.isUpdatePasswordRequired) {
					await this.currentUserStore.userAuthenticated(userModel);
					return userModel;
				} else {
					await AlertUtils.showGeneralErrorPopUp(
						this.messageStore.webSiteMessages.auth.updatePassword &&
							this.messageStore.webSiteMessages.auth.updatePassword.messageText
							? this.messageStore.webSiteMessages.auth.updatePassword.messageText
							: Lang.format('login.UpdateReqiure')
					);
				}
			} else {
				throw new Error('Could not get userDTO');
			}
		} catch (err) {
			throw err;
		}
	}

	@action
	public async handleLoginFB(userID: string, accessToken: string) {
		try {
			const userDTO: UserDTO = await UsersFetcher.authenticateFB(userID, accessToken);
			if (userDTO) {
				const userModel: UserModel = UserConverter.DtoToModel(userDTO);
				await this.currentUserStore.userAuthenticated(userModel);
				return userModel;
			} else {
				throw new Error('Could not get userDTO');
			}
		} catch (err) {
			throw err;
		}
	}

	@action
	public async handleLoginGoogle(userID: string, accessToken: string) {
		try {
			const userDTO: UserDTO = await UsersFetcher.authenticateGoogle(userID, accessToken);
			if (userDTO) {
				const userModel: UserModel = UserConverter.DtoToModel(userDTO);
				await this.currentUserStore.userAuthenticated(userModel);
				return userModel;
			} else {
				throw new Error('Could not get userDTO');
			}
		} catch (err) {
			throw err;
		}
	}

	@action
	public async handleRegister(
		email: string,
		password: string,
		validatePassword: string,
		deals: boolean,
		giftModel: SendGiftModel,
		fromPurchase?: boolean
	) {
		try {
			const userDTO: UserDTO = await UsersFetcher.authenticate(
				email,
				password,
				SignOptions.Join,
				PrivateOrBusiness.businessTobusiness_consumer,
				validatePassword,
				deals,
				fromPurchase
			);
			const userModel: UserModel = UserConverter.DtoToModel(userDTO);
			if (fromPurchase) {
				try {
					const sendGiftDto: SendGiftDTO = GiftsConverter.sendGiftModelToDto(giftModel);
					await UsersFetcher.createTempMemberOrder(sendGiftDto, parseInt(userModel.id, 10));
				} catch (err) {
					throw err;
				}
			}
			return userModel;
		} catch (err) {
			throw err;
		}
	}

	@action
	public async handleRecoverPassword(email: string) {
		try {
			const isSuccess: boolean = await UsersFetcher.forgotPassword(email);
			// TODO: check what is returned from the endpoint => if data object, then change this.
			return isSuccess;
		} catch (err) {
			throw err;
		}
	}

	@action
	public async handleResetPassowrd(newPassword: string, tokenCode: string, memberId: string) {
		try {
			const userDTO: UserDTO = await UsersFetcher.resetPassword(newPassword, tokenCode, memberId);
			const userModel: UserModel = UserConverter.DtoToModel(userDTO);
			await this.currentUserStore.userAuthenticated(userModel);
			return userModel;
		} catch (err) {
			throw err;
		}
	}

	@action
	public async handleUpdatePassword(currentPassword: string, newPassword: string, token?: string) {
		try {
			const userDTO: UserDTO = await UsersFetcher.updatePassword(currentPassword, newPassword, token);
			const userModel: UserModel = UserConverter.DtoToModel(userDTO);
			await this.currentUserStore.userAuthenticated(userModel);
			return userModel;
		} catch (err) {
			throw err;
		}
	}

	@action
	public logOut() {
		this.currentUserStore.deleteCurrentUser();
	}

	@action
	public async handleRecoverCode(emailOrPhone: string) {
		try {
			const isSuccess: boolean = await UsersFetcher.recoverCode(emailOrPhone);
			return isSuccess;
		} catch (err) {
			throw err;
		}
	}

	@action
	public async validateForgotPasswordUrl(token: any, memberId: any) {
		return await UsersFetcher.validateToken(token, memberId);
	}
}
