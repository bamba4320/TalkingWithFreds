import React from 'react';
import ChatWindowContainer from './ChatWindow/ChatWindow.container';
import ConversationsListContainer from './ConvesationsList/ConversationsList.container';
import './MainLobby.container.scss';

interface IProps {}
interface IState {}

export default class MainLobbyContainer extends React.Component<IProps, IState> {
	public render() {
		return (
			<div className='main-lobby-super-wrapper'>
				{/* conversation list part */}
				<div className='conversations-lobby-wrapper'>
					<ConversationsListContainer />
				</div>

				{/* chat part  */}
				<div className='chat-window-lobby-wrapper'>
					<ChatWindowContainer />
				</div>
			</div>
		);
	}
}
