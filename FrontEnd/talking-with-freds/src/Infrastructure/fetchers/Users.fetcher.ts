import {
	LoginCredentials,
	PrivateOrBusiness,
	SignOptions,
	UpdatePasswordOptions,
} from 'common/generalconsts/login.enums';
import ProfileDTO from 'common/models/DTOs/Profile.dto';
import SendGiftDTO from 'common/models/DTOs/SendGift.dto';
import UserDTO from 'common/models/DTOs/User.dto';
import {NextContext} from 'next';
import {BaseFetcher} from './base/Base.fetcher';

class UsersFetcher extends BaseFetcher {
	public async getCurrentUser(ctx: NextContext): Promise<UserDTO> {
		const headersWithToken = this.extractTokenFromNextContextAsHeaders(ctx);
		return this.get('/getCurrentUser', headersWithToken);
	}

	public async authenticate(
		identity: string,
		password: string,
		signOptions: SignOptions,
		pob: PrivateOrBusiness,
		validatePassword?: string,
		deals?: boolean,
		fromPurchase?: boolean
	) {
		const loginBody = {
			email: identity,
			password,
			PasswordConfirmation: validatePassword,
			LoginType: LoginCredentials.EmailAndPass,
			PrivateOrBusiness: pob,
			AllowSmsAndMail: deals,
		};
		if (signOptions === SignOptions.Authenticate) {
			return this.post('/authenticate', loginBody);
		} else {
			const registerBody = {
				...loginBody,
				registrationType: fromPurchase ? 2 : 1,
			};
			return this.post('/register', registerBody);
		}
	}

	public async authenticateFB(userID: string, accessToken: string) {
		const body = {
			Id: userID,
			LoginType: LoginCredentials.Facebook,
		};

		return this.post('/authenticate', body, {
			Token: accessToken,
		});
	}

	public async authenticateGoogle(userID: string, accessToken: string) {
		const body = {
			AccessID: userID,
			LoginType: LoginCredentials.Google,
		};

		return this.post('/authenticate', body, {
			Token: accessToken,
		});
	}

	public async forgotPassword(email: string) {
		const body = {email};

		return this.post('/recoverPassword', body);
	}

	public async resetPassword(newPassword: string, forgetPasswordToken?: string, memberId?: string) {
		const body = {
			neworupdate: UpdatePasswordOptions.Reset,
			newPassword,
			forgetPasswordToken,
			memberId,
		};
		return this.post('/updatePassword', body);
	}

	public async updatePassword(currentPassword: string, newPassword: string, token?: string) {
		const body = {
			neworupdate: UpdatePasswordOptions.Update,
			currentPassword,
			newPassword,
		};
		const headers = {token};
		return this.post('/updatePassword', body, headers);
	}

	public async verifyUser(token: string) {
		const body = {
			Token: token,
		};
		return this.post(`/ValidateToken`, body);
	}

	public async updateMember(profileDTO: ProfileDTO) {
		const body = profileDTO;
		return this.post('/UpdateMember', body);
	}

	public async signToNewsletter(email: string) {
		if (email !== '') {
			// if user is Not Logged In
			const body = {
				email,
				PrivateOrBusiness: 1, // should be Enum for Private Or Business
			};
			return this.post('/SubscribeToPulseem', body);
		} else {
			const body = {
				PrivateOrBusiness: 1, // should be Enum for Private Or Business
			};
			return this.post('/SubscribeToPulseem', body);
		}
	}

	public async validateToken(token: any, id: any) {
		return this.get(`/validatePasswordForRecover?tokenCode=${token}&memberId=${id}`);
	}

	public async createTempMemberOrder(values: SendGiftDTO, memberId: number) {
		const body = {
			...values,
			memberId,
		};
		return this.post('/CreateTempMemberOrder', body);
	}

	public async getTempMemberOrder() {
		return this.get(`/GetTempMemberOrder`);
	}

	public async getProductToMember(orderGuid: string) {
		return this.get(`/GetProductToMember?transferGuid=${orderGuid}`);
	}

	public async recoverCode(emailOrPhone: string) {
		return this.get(`/RecoverGift?emailOrSms=${emailOrPhone}`);
	}
}

export default new UsersFetcher(`users`);
