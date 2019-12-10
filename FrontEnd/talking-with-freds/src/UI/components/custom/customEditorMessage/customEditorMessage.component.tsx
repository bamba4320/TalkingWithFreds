import MessageDTO from 'common/models/DTOs/Message.dto';
import * as React from 'react';

interface IState {}

interface IProps {
	message?: MessageDTO | null;
	extraClassName?: string;
}

export default class EditorMessageComponent extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
	}

	public render() {
		return (
			<div
				id={this.messageKeyOrDefault()}
				className={`editor-message${this.props.extraClassName ? ' ' + this.props.extraClassName : ''}`}
				dangerouslySetInnerHTML={{
					__html: this.formattedMessageText(),
				}}
			/>
		);
	}

	private formattedMessageText = () => {
		return this.props.message && this.props.message.messageText ? this.props.message.messageText : '';
	};

	private messageKeyOrDefault = () => {
		const messageKey = this.props.message && this.props.message.messageKey ? this.props.message.messageKey : '000';
		const messageName = this.props.message && this.props.message.messageName ? this.props.message.messageName : 'name';
		return `${messageKey}-${messageName}`;
	};
}
