import AuthStore from './Auth.store';
import CurrentUserStore from './CurrentUserStore.store';
import ModalStore from './Modal.store';
import {AUTH_STORE, CURRENT_USER_STORE, MODAL_STORE, UI_STORE, MESSAGES_STORE, CONVERSATION_STORE} from './storesKeys';
import UiStore from './ui.store';
import MessagesStore from './MessagesStore.store';
import ConversationStore from './Conversation.store';

/**
 * Initiate all stores
 */
const uiStore = new UiStore();
const conversationStore = new ConversationStore();
const currentUserStore = new CurrentUserStore(conversationStore);
const authStore = new AuthStore(currentUserStore);
const modalStore = new ModalStore();
const messagesStore = new MessagesStore();
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
};

export default rootStores;
