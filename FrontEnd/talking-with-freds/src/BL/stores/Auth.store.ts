import {action} from 'mobx';
import LoginFetcher from '../../Infrastructure/fetchers/Login.fetcher';
import TalkingWithFredsLocalStorage from '../../Infrastructure/Utils/LocalStorage/TalkingWithFredsLocalStorage';
import CurrentUserStore from './CurrentUser.store';
import UserConverter from '../../common/convertors/User.converter';

export default class AuthStore {
	private currentUserStore: CurrentUserStore;
	constructor(currentUserStore: CurrentUserStore) {
		this.currentUserStore = currentUserStore;
	}

	/**
	 * handle user login to the system.
	 */
	@action
	public async authenticateLogin(email: string, password: string, onSuccess: any) {
		try {
			// Get user token from API
			const res = (await LoginFetcher.authenticateLogin(email, password)).user;
			if (res.token !== null) {
				// verify user login and init user from API
				TalkingWithFredsLocalStorage.setTokenToLocalStorage(res.token).then(() => {
					onSuccess().then(() => {
						this.currentUserStore.initUser(UserConverter.convertToModel(res));
					});
				});
			} else {
				throw new Error('Authentication Failed. Incorrent email or password. Please try again....');
			}
		} catch (err) {
			console.error(err.message);
			throw new Error('Authentication Failed. Incorrent email or password. Please try again....');
		}
	}

	public async sendRecoverPassword(email: string) {
		try {
			const res = await LoginFetcher.recoverPassword(email);
			if (res) {
				return res;
			}else{
				throw new Error('Faild to find exsisting user register with this email. Please verify your email address.');
			}
		} catch (err) {
			console.error(err.message);
			throw new Error('Faild to find exsisting user register with this email. Please verify your email address.');
		}
	}
}
