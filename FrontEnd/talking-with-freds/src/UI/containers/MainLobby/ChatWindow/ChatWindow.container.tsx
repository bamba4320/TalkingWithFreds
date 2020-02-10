import React from 'react';
import './ChatWindow.container.scss';
import MessagesStore from '../../../../BL/stores/MessagesStore.store';

interface IProps {
	messagesStore:MessagesStore;
}
interface IState {}

export default class ChatWindowContainer extends React.Component<IProps, IState> {
	public render() {
		return <div className='chat-window-super-wrapper'></div>;
	}
}
