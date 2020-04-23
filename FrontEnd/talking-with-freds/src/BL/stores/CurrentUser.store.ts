import UserFetcher from '../../Infrastructure/fetchers/User.fetcher';
import {observable, computed, action, observe} from 'mobx';
import UserModel from '../../common/models/User.model';
import ConversationStore from './Conversation.store';
import TalkingWithFredsLocalStorage from '../../Infrastructure/Utils/LocalStorage/TalkingWithFredsLocalStorage';
import UserDTO from '../../common/dto/user.dto';
import UserConverter from '../../common/convertors/User.converter';
import WebSocketStore from './webSocket/webSocket.store';
import {isNullOrUndefined} from 'util';
import {events} from './webSocket/events';

export default class CurrentUserStore {
	@observable private currentUser: UserModel | null;

	private conversationStore: ConversationStore;
	private webSocketStore: WebSocketStore;

	constructor(convStore: ConversationStore, webSocketStore: WebSocketStore) {
		this.currentUser = null;
		this.conversationStore = convStore;
		this.webSocketStore = webSocketStore;
		const getUidDesposer = observe(this.webSocketStore.getSocketEventsObserver, (change) => {
			console.log(change);
			if (change.name === events.uid && !isNullOrUndefined(this.currentUser)) {
				this.webSocketStore.sendUid(this.currentUser.id!);
			}
		});
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
		if (!isNullOrUndefined(user) && !isNullOrUndefined(user.id)) {
			this.webSocketStore.sendUid(user.id);
		}
	}

	@action
	public logout() {
		this.currentUser = null;
		TalkingWithFredsLocalStorage.clearAll();
		this.conversationStore.cleanConversations();
	}

	@action
	public async getAllOtherUsers() {
		return await UserFetcher.getOtherUsers();
	}

	@computed
	get getCurrentUserId() {
		return this.currentUser?.id;
	}

	@computed
	get getCurrentUserUsername(){
		return this.currentUser?.username;
	}

	@computed
	get geCurrentUserProfilePicture(){
		return this.currentUser?.profileImage;
	}
}
