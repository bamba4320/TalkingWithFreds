import React from 'react';
import './ChatMessage.component.scss';

interface IProps {
	messageContent?: string;
	isUserSent: boolean;
}

interface IState {}

export default class ChatMessageComponent extends React.Component<IProps, IState> {
	public render() {
		return (
			<div className='chat-message-wrapper'>
				<div className={`chat-message ${this.props.isUserSent ? 'user-message' : 'other-message'} `}>
					{this.props.messageContent}
				</div>
			</div>
		);
	}
}
