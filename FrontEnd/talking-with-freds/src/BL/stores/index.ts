import {isNullOrUndefined} from 'util';
import AuthStore from './Auth.store';
import BenefitStore from './Benefit.store';
import ConfigurationStore from './Configuration.store';
import ContactUsStore from './ContactUs.store';
import CurrentUserStore from './CurrentUser.store';
import FavoritesStore from './Favorites.store';
import ForWorkersStore from './ForWorkers.store';
import HomePageStore from './Homepage.store';
import MenuStore from './Menu.store';
import MessagesStore from './Messages.store';
import ModalStore from './Modal.store';
import MyGiftsStore from './MyGifts.store';
import PurchaseStore from './Purchase.store';
import SearchStore from './Search.store';
import UiStore from './Ui.store';

export const CONFIGURATION_STORE = 'configurationStore';
export const MESSAGES_STORE = 'messagesStore';
export const UI_STORE = 'uiStore';
export const CURRENT_USER_STORE = 'currentUserStore';
export const AUTH_STORE = 'authStore';
export const CONTACT_STORE = 'contactStore';
export const MODAL_STORE = 'modalStore';
export const SEARCH_STORE = 'searchStore';
export const MENU_STORE = 'menuStore';
export const FAVORITES_STORE = 'favoritesStore';
export const HOMEPAGE_STORE = 'homePageStore';
export const FORWORKERS_STORE = 'forWorkersStore';
export const PURCHASE_STORE = 'purchaseStore';
export const MYGIFTS_STORE = 'myGiftsStore';
export const BENEFIT_STORE = 'benefitStore';

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
		/** Configuration & Messages Store */
		// Initial data for configurationStore - the configuration is loaded in server-side, therefore, we have to init the values for client-side
		const configurationStoreInitialData: ConfigurationStore = initialData ? initialData[CONFIGURATION_STORE] : null;
		const configurationStore = new ConfigurationStore(configurationStoreInitialData);
		const messagesStoreInitialData: MessagesStore = initialData ? initialData[MESSAGES_STORE] : null;
		const messagesStore = new MessagesStore(configurationStore, messagesStoreInitialData);
		// init menu store
		const menuStore = new MenuStore(configurationStore);

		/**
		 * MyGiftsStore & favoriteStore
		 */
		const favInitData: FavoritesStore = initialData ? initialData[FAVORITES_STORE] : null;
		const favoritesStore = new FavoritesStore(favInitData);
		const myGiftsInitData: MyGiftsStore = initialData ? initialData[MYGIFTS_STORE] : null;
		const myGiftsStore = new MyGiftsStore(myGiftsInitData);

		/** Ui Store */
		// No need to initial data for UiStore - this store is only matter to the client ;)
		const uiStore = new UiStore();

		const modalStore = new ModalStore();

		/** CurrentUser & Auth Stores */
		// Get initial data for currentUser - if we will get the currentUser from server-side, we can do it here
		const currentUserStoreInitialData: CurrentUserStore = initialData ? initialData[CURRENT_USER_STORE] : null;
		const currentUserStore: CurrentUserStore = new CurrentUserStore(
			myGiftsStore,
			favoritesStore,
			currentUserStoreInitialData
		);

		/** Other stores */
		const contactStoreInitialData: ContactUsStore = initialData ? initialData[CONTACT_STORE] : null;
		const contactStore = new ContactUsStore(contactStoreInitialData);
		const searchInitData: SearchStore = initialData ? initialData[SEARCH_STORE] : null;
		const searchStore = new SearchStore(configurationStore, searchInitData);
		const homepageData: HomePageStore = initialData ? initialData[HOMEPAGE_STORE] : null;
		const homepageStore = new HomePageStore(menuStore, homepageData);
		const forWorkerData: ForWorkersStore = initialData ? initialData[FORWORKERS_STORE] : null;
		const forWorkersStore = new ForWorkersStore(menuStore, forWorkerData);
		const purchaseStoreInitData: PurchaseStore = initialData ? initialData[PURCHASE_STORE] : null;
		const purchaseStore = new PurchaseStore(purchaseStoreInitData);

		const benefitInitData: BenefitStore = initialData ? initialData[BENEFIT_STORE] : null;
		const benefitStore = new BenefitStore(benefitInitData);

		// injecting also the modal store into the auth store
		const authStore = new AuthStore(currentUserStore, messagesStore);

		stores = {
			[CONFIGURATION_STORE]: configurationStore,
			[MESSAGES_STORE]: messagesStore,
			[UI_STORE]: uiStore,
			[CURRENT_USER_STORE]: currentUserStore,
			[AUTH_STORE]: authStore,
			[CONTACT_STORE]: contactStore,
			[SEARCH_STORE]: searchStore,
			[MODAL_STORE]: modalStore,
			[MENU_STORE]: menuStore,
			[FAVORITES_STORE]: favoritesStore,
			[HOMEPAGE_STORE]: homepageStore,
			[FORWORKERS_STORE]: forWorkersStore,
			[PURCHASE_STORE]: purchaseStore,
			[MYGIFTS_STORE]: myGiftsStore,
			[BENEFIT_STORE]: benefitStore,
		};
	}

	return stores;
}
