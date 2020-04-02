import React from 'react';
import {Input} from 'semantic-ui-react';
import './ChatInputField.component.scss';

interface IProps {
	onSendMessage: any;
}
interface IState {}

export default class ChatInputFieldComponent extends React.Component<IProps, IState> {
	public render() {
		return (
			<div className='chat-input-wrapper'>
				<Input type='text' placeholder='Type a message' onKeyDown={this.handleKeyDown} />
			</div>
		);
	}

	private handleKeyDown = (e: any) => {
		if (e.key === 'Enter') {
			this.props.onSendMessage(e.target.value);
			e.target.value = '';
		}
	};
}
