import React from 'react';
import rootStores from '../../../../BL/stores';
import {MESSAGES_STORE} from '../../../../BL/stores/storesKeys';
import ChatTopBarComponent from '../../../components/ChatWindow/ChatTopBar/ChatTopBar.component';
import './ChatWindow.container.scss';
import ChatInputFieldComponent from '../../../components/ChatWindow/ChatInputField/ChatInputField.component';
import ChatContentComponent from '../../../components/ChatWindow/ChatContent/ChatContent.component';

interface IProps {}
interface IState {}
// eslint-disable-next-line
const messagesStore = rootStores[MESSAGES_STORE];
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
		alert(message);
	}
}
