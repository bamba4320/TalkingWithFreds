import React from 'react';
import rootStores from '../../../../BL/stores';
import {MESSAGES_STORE, CONVERSATION_STORE, CURRENT_USER_STORE} from '../../../../BL/stores/storesKeys';
import ChatTopBarComponent from '../../../components/ChatWindow/ChatTopBar/ChatTopBar.component';
import './ChatWindow.container.scss';
import ChatInputFieldComponent from '../../../components/ChatWindow/ChatInputField/ChatInputField.component';
import ChatContentComponent from '../../../components/ChatWindow/ChatContent/ChatContent.component';
import MessageModel from '../../../../common/models/Message.model';
import {isNullOrUndefined} from 'util';
import {observer} from 'mobx-react';

interface IProps {}
interface IState {}
// eslint-disable-next-line
const messagesStore = rootStores[MESSAGES_STORE];
const conversationStore = rootStores[CONVERSATION_STORE];
const currentUserStore = rootStores[CURRENT_USER_STORE];

@observer
export default class ChatWindowContainer extends React.Component<IProps, IState> {
	private scrolled: boolean = false;

	public componentDidMount() {
		setInterval(() => this.updateScroll(document.getElementById('chat-window-super-wrapper')), 200);
	}

	public render() {
		return (
			<div className='chat-window-super-wrapper' id='chat-window-super-wrapper'>
				{this.showChat()}
			</div>
		);
	}

	private showChat() {
		if (!isNullOrUndefined(conversationStore.getCurrentSelectedConversation)) {
			return (
				<div>
					<ChatTopBarComponent
						chatImage={conversationStore.getCurrentSelectedConversation.profileImg}
						convName={conversationStore.getCurrentSelectedConversation.convName}
						isGroup={conversationStore.getCurrentSelectedConversation.isGroup}
					/>
					<ChatContentComponent />
					<ChatInputFieldComponent onSendMessage={this.onSendMessage} />
				</div>
			);
		}
		return <div></div>;
	}

	private onSendMessage = (message: string) => {
		if (!isNullOrUndefined(message) && message !== '') {
			const newMessage = new MessageModel();
			newMessage.messageContent = message;
			newMessage.convId = conversationStore.getCurrentSelectedConversation!.convId;
			newMessage.messageSendingTime = new Date();
			newMessage.senderId = currentUserStore.getCurrentUserId;
			messagesStore.addNewMessage(newMessage);
		}
	};

	private updateScroll(windowDiv: HTMLElement | null) {
		if (!isNullOrUndefined(windowDiv)) {
			windowDiv.scrollTop = windowDiv.scrollHeight;
		}
	}
}
