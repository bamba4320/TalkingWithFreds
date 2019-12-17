import {isNullOrUndefined} from 'util';
import AuthStore from './Auth.store';
import CurrentUserStore from './CurrentUser.store';
import MessagesStore from './Messages.store';
import ModalStore from './Modal.store';
import UiStore from './Ui.store';

export const CONFIGURATION_STORE = 'configurationStore';
export const MESSAGES_STORE = 'messagesStore';
export const UI_STORE = 'uiStore';
export const CURRENT_USER_STORE = 'currentUserStore';
export const AUTH_STORE = 'authStore';
export const MODAL_STORE = 'modalStore';

let stores: any;

/**
 * initialize mobx Stores
 * There is nice explanation on [https://www.themikelewis.com/post/nextjs-with-mobx]
 * @param isServer boolean - wether or not the current process is serverSide
 * @param initialData initial data of mobxStore - Use it when you have to
 */
export function initializeStores(isServer: boolean, initialData?: any) {
	// Always make a new store if server, otherwise state is shared between requests
	if (isServer || isNullOrUndefined(stores)) {
		/**  Messages Store */
		const messagesStore = new MessagesStore();

		/** Ui Store */
		// No need to initial data for UiStore - this store is only matter to the client ;)
		const uiStore = new UiStore();

		const modalStore = new ModalStore();

		/** CurrentUser & Auth Stores */
		// Get initial data for currentUser - if we will get the currentUser from server-side, we can do it here
		// const currentUserStoreInitialData: CurrentUserStore = initialData ? initialData[CURRENT_USER_STORE] : null;
		// const currentUserStore: CurrentUserStore = new CurrentUserStore(
		// 	currentUserStoreInitialData
		// );
		// ! just for testing
		const currentUserStore = new CurrentUserStore();

		/** Other stores */
		// injecting also the modal store into the auth store
		const authStore = new AuthStore();

		stores = {
			[MESSAGES_STORE]: messagesStore,
			[UI_STORE]: uiStore,
			[CURRENT_USER_STORE]: currentUserStore,
			[AUTH_STORE]: authStore,
			[MODAL_STORE]: modalStore,
		};
	}

	return stores;
}
