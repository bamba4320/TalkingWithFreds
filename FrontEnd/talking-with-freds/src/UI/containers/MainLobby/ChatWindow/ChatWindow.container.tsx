import React from 'react';
import './ChatWindow.container.scss';
import MessagesStore from '../../../../BL/stores/MessagesStore.store';
import ChatTopBarComponent from '../../../components/ChatWindow/ChatTopBar/ChatTopBar.component';

interface IProps {
	messagesStore: MessagesStore;
}
interface IState {}

export default class ChatWindowContainer extends React.Component<IProps, IState> {
	private messageStore: MessagesStore;

	constructor(props: IProps) {
		super(props);
		this.messageStore = this.props.messagesStore;
	}

	public render() {
		return (
			<div className='chat-window-super-wrapper'>
				<ChatTopBarComponent chatImage='../../../../static/images/appaProfilePicture.jpg' convName='' isGroup={false} />
			</div>
		);
	}
}
