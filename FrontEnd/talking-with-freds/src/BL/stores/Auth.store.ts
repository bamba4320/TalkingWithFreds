import CurrentUserStore from './CurrentUserStore.store';
import UserFetcher from '../../Infrastructure/fetchers/User.fetcher';
import {action} from 'mobx';
import TalkingWithFredsLocalStorage from '../../Infrastructure/Utils/LocalStorage/TalkingWithFredsLocalStorage';

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
			const res = await UserFetcher.authenticateLogin(email, password);
			if (res.token !== null) {
				// verify user login and init user from API
				TalkingWithFredsLocalStorage.setTokenToLocalStorage(res.token).then(() => {
					this.currentUserStore.initUserFromAPI();
				});
			}
		} catch (err) {
			console.error(err.message);
		}
	}
}
