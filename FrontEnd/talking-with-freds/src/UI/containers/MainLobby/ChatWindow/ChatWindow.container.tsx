import React from 'react';
import rootStores from '../../../../BL/stores';
import {MESSAGES_STORE, CONVERSATION_STORE, CURRENT_USER_STORE} from '../../../../BL/stores/storesKeys';
import ChatTopBarComponent from '../../../components/ChatWindow/ChatTopBar/ChatTopBar.component';
import './ChatWindow.container.scss';
import ChatInputFieldComponent from '../../../components/ChatWindow/ChatInputField/ChatInputField.component';
import ChatContentComponent from '../../../components/ChatWindow/ChatContent/ChatContent.component';
import MessageModel from '../../../../common/models/MessageModel.model';

interface IProps {}
interface IState {}
// eslint-disable-next-line
const messagesStore = rootStores[MESSAGES_STORE];
const conversationStore = rootStores[CONVERSATION_STORE];
const currentUserStore = rootStores[CURRENT_USER_STORE];
export default class ChatWindowContainer extends React.Component<IProps, IState> {
	public render() {
		return (
			<div className='chat-window-super-wrapper'>
				<ChatTopBarComponent chatImage={require('../../../../static/images/appaProfilePicture.jpg')} convName='' isGroup={false} />
				<ChatContentComponent />
				<ChatInputFieldComponent onSendMessage={this.onSendMessage}/>
			</div>
		);
	}

	private onSendMessage=(message:string)=>{
		const newMessage = new MessageModel();
		newMessage.messageContent = message;
		newMessage.convId = currentUserStore.getCurrentUserId;
	}
}
