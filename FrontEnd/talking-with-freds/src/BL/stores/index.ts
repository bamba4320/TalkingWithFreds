import AuthStore from './Auth.store';
import CurrentUserStore from './CurrentUser.store';
import ModalStore from './Modal.store';
import {
	AUTH_STORE,
	CURRENT_USER_STORE,
	MODAL_STORE,
	UI_STORE,
	MESSAGES_STORE,
	CONVERSATION_STORE,
	REGISTER_STORE,
	AUTO_LOGOUT_STORE,
} from './storesKeys';
import UiStore from './ui.store';
import MessagesStore from './Messages.store';
import ConversationStore from './Conversation.store';
import RegisterStore from './Register.store';
import AutoLogoutStore from './AutoLogout.store';

/**
 * Initiate all stores
 */
const uiStore = new UiStore();
const messagesStore = new MessagesStore();
const conversationStore = new ConversationStore(messagesStore);
const currentUserStore = new CurrentUserStore(conversationStore);
const authStore = new AuthStore(currentUserStore);
const modalStore = new ModalStore();
const registerStore = new RegisterStore();
const autoLogoutStore = new AutoLogoutStore(currentUserStore);
/**
 * Save the instance in global object
 */
const rootStores = {
	[UI_STORE]: uiStore,
	[CURRENT_USER_STORE]: currentUserStore,
	[AUTH_STORE]: authStore,
	[MODAL_STORE]: modalStore,
	[MESSAGES_STORE]: messagesStore,
	[CONVERSATION_STORE]: conversationStore,
	[REGISTER_STORE]: registerStore,
	[AUTO_LOGOUT_STORE]: autoLogoutStore,
};

export default rootStores;
