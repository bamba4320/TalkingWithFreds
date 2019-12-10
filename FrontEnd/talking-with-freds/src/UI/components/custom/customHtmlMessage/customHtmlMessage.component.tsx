import * as React from 'react';

interface IState {}

interface IProps {
	htmlMessage?: string | null;
	extraClassname?: string | null;
}

export default class HtmlMessageComponent extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
	}

	public render() {
		return (
			<div
				className={`html-message ${this.props.extraClassname ? this.props.extraClassname : ''}`}
				dangerouslySetInnerHTML={{
					__html: this.formattedMessageText(),
				}}
			/>
		);
	}

	private formattedMessageText = () => {
		return this.props.htmlMessage ? this.props.htmlMessage : '';
	};
}
