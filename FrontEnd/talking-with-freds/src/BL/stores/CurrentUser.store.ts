import UserFetcher from '../../Infrastructure/fetchers/User.fetcher';
import {observable, computed, action} from 'mobx';
import UserModel from '../../common/models/User.model';
import ConversationStore from './Conversation.store';
import TalkingWithFredsLocalStorage from '../../Infrastructure/Utils/LocalStorage/TalkingWithFredsLocalStorage';
import UserDTO from '../../common/dto/user.dto';
import UserConverter from '../../common/convertors/User.converter';

export default class CurrentUserStore {
	@observable private currentUser: UserModel | null;

	private conversationStore: ConversationStore;

	constructor(convStore: ConversationStore) {
		this.currentUser = null;
		this.conversationStore = convStore;
	}

	@computed
	public get isUserLoggedIn() {
		return this.currentUser !== null;
	}

	@action
	public async initUserFromAPI() {
		try {
			const tokenFromLocalStorage = await TalkingWithFredsLocalStorage.getTokenFromLocalStorage();
			if (tokenFromLocalStorage !== null) {
				const response = await UserFetcher.getUserFromAPI();
				const userResponse: UserDTO = response;
				const user: UserModel = UserConverter.convertToModel(userResponse);
				this.initUser(user);
				return user;
			}
		} catch (err) {
			console.error(err);
		}
	}

	@action
	public initUser(user: UserModel) {
		this.currentUser = user;
		this.conversationStore.initUserConversations();
	}

	@action
	public logout() {
		this.currentUser = null;
		TalkingWithFredsLocalStorage.clearAll();
		this.conversationStore.cleanConversations();
	}
}
