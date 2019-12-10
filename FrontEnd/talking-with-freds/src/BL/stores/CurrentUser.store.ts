import ProfileConverter from 'common/models/converters/Profile.converter';
import UserConverter from 'common/models/converters/User.converter';
import ProfileDTO from 'common/models/DTOs/Profile.dto';
import UserDTO from 'common/models/DTOs/User.dto';
import ProfileModel from 'common/models/Profile.model';
import UserModel, {UserTypeTemp} from 'common/models/User.model';
import Logger from 'common/utils/logger/logger';
import UsersFetcher from 'Infrastructure/fetchers/Users.fetcher';
import Lang from 'Infrastructure/Language/Language';
import NofhonitCookies from 'Infrastructure/storage/NofhonitCookies';
import {action, computed, observable} from 'mobx';
import {NextContext} from 'next';
import FavoritesStore from './Favorites.store';
import MyGiftsStore from './MyGifts.store';

export default class CurrentUserStore {
	@observable
	private _currentUser?: UserModel;

	private myGiftsStore: MyGiftsStore;
	private favStore: FavoritesStore;

	@observable
	private userNotLoggedInAllowSmsAndUpdates: boolean = false;

	constructor(myGiftsStore: MyGiftsStore, favStore: FavoritesStore, currentUserStoreInitialData?: CurrentUserStore) {
		if (currentUserStoreInitialData) {
			this._currentUser = currentUserStoreInitialData._currentUser;
			this.userNotLoggedInAllowSmsAndUpdates = currentUserStoreInitialData.userNotLoggedInAllowSmsAndUpdates;
		}
		this.myGiftsStore = myGiftsStore;
		this.favStore = favStore;
	}

	@action
	public async initCurrentUserFromApi(ctx: NextContext) {
		try {
			if (NofhonitCookies.getToken(ctx)) {
				// Getting the currentUser from API
				const userModel: UserModel = await UsersFetcher.getCurrentUser(ctx).then(UserConverter.DtoToModel);

				// Calling toe userAuthenticated in order to save the currentUser
				await this.userAuthenticated(userModel, ctx);

				return userModel;
			}
		} catch (err) {
			Logger.error('Could not init currentUser', err);
			this.deleteCurrentUser(ctx);
		}
	}

	@action
	public async handleUpdateMember(profileModel: ProfileModel) {
		try {
			const profileDTO: ProfileDTO = ProfileConverter.ModelToDto(profileModel);
			const data: {responseUser: UserDTO; message: string} = await UsersFetcher.updateMember(profileDTO);
			const userModel: UserModel = UserConverter.DtoToModel(data.responseUser);
			await this.userAuthenticated(userModel);
			return data.message;
		} catch (err) {
			throw err;
		}
	}

	@action
	public currentProfile(): ProfileModel | null {
		if (this.currentUser) {
			return ProfileConverter.UserToModel(this.currentUser);
		}
		return null;
	}

	/**
	 * ! This function doesn't suppoes to change. If you want to change it, talk with Gal
	 * @param userModel
	 * @param ctx
	 */
	@action
	public async userAuthenticated(userModel: UserModel, ctx?: NextContext) {
		if (userModel.token) {
			this._currentUser = userModel;
			NofhonitCookies.saveToken(userModel.token);
			try {
				await this.favStore.initFavoritesForUser(true, ctx);
			} catch (e) {
				// We do Logger.error instead of throw e because we want to let the user continue to browse in the site
				Logger.error('Got error in fetch favorites', e);
			}
		} else {
			throw new Error(`Got user from API. There is no token on the response ${JSON.stringify(userModel, null, 2)}`);
		}
	}

	@action
	public deleteCurrentUser(ctx?: NextContext) {
		(this._currentUser as any) = null;
		NofhonitCookies.clearTokens(ctx);
		this.myGiftsStore.emptyGifts();
		this.favStore.initFavoritesForUser(false);
	}

	@action
	public async handleNewsletter(email: string) {
		try {
			const data: boolean = await UsersFetcher.signToNewsletter(email);
			if (data) {
				this.setDealsAndUpdates(true);
			}
			return data;
		} catch (err) {
			throw err;
		}
	}

	@action
	public setDealsAndUpdates(value: boolean) {
		if (!this.isNotLoggedIn && this._currentUser) {
			this._currentUser.dealsAndUpdates = value;
		} else {
			this.setUserNotLoggedInAllowSmsAndUpdates(value);
		}
	}

	@action
	public setUserNotLoggedInAllowSmsAndUpdates(value: boolean) {
		this.userNotLoggedInAllowSmsAndUpdates = value;
	}

	@computed
	get currentUser() {
		return this._currentUser;
	}

	@computed
	get getCurrentUserFullNameOrDefault() {
		if (this.currentUser) {
			return this.currentUser.memberName;
		} else {
			return Lang.format('navbar.UserLoggedIn');
		}
	}

	@computed
	get getCurrentUserNameForPurchase() {
		if (this.currentUser && this.currentUser.memberName) {
			return this.currentUser.memberName;
		} else {
			return Lang.format('purchase.mySelf');
		}
	}

	@computed
	get isNotLoggedIn() {
		return !this.currentUser || this.currentUser.userTypeTemp || this.currentUser.userTypeTemp === UserTypeTemp.Guest;
	}

	@computed
	get getAllowDealsAndUpdates() {
		return this._currentUser && this._currentUser.dealsAndUpdates;
	}

	@computed
	get getUserNotLoggedInAllowSmsAndUpdates() {
		return this.userNotLoggedInAllowSmsAndUpdates;
	}
}
