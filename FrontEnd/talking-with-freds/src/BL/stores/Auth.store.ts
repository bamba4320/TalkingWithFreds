import {action} from 'mobx';
import LoginFetcher from '../../Infrastructure/fetchers/Login.fetcher';
import TalkingWithFredsLocalStorage from '../../Infrastructure/Utils/LocalStorage/TalkingWithFredsLocalStorage';
import CurrentUserStore from './CurrentUser.store';

export default class AuthStore {
	private currentUserStore: CurrentUserStore;
	constructor(currentUserStore: CurrentUserStore) {
		this.currentUserStore = currentUserStore;
	}

	/**
	 * handle user login to the system.
	 */
	@action
	public async authenticateLogin(email: string, password: string) {
		try {
			// Get user token from API
			const res = (await LoginFetcher.authenticateLogin(email, password)).user;
			if (res.token !== null) {
				// verify user login and init user from API
				TalkingWithFredsLocalStorage.setTokenToLocalStorage(res.token).then(() => {
					this.currentUserStore.initUser(res);
				});
			}
		} catch (err) {
			console.error(err.message);
		}
	}
}
