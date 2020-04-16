import React from 'react';
import {Input} from 'semantic-ui-react';
import './ChatInputField.component.scss';
import LanguageDetector from '../../../../Infrastructure/Utils/LanguageDetector/languageDetector';

interface IProps {
	onSendMessage: any;
}
interface IState {
	inputValue: string;
	isRtl: boolean;
}

export default class ChatInputFieldComponent extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			inputValue: '',
			isRtl: false,
		};
	}

	public render() {
		return (
			<div className='chat-input-wrapper'>
				<Input
					type='text'
					className={`${this.state.isRtl ? 'rtl-input' : ' ltr-input'}`}
					placeholder='Type a message...'
					onKeyDown={this.handleKeyDown}
					value={this.state.inputValue}
					onChange={this.handleOnChange}
				/>
			</div>
		);
	}

	private handleKeyDown = (e: any) => {
		if (e.key === 'Enter') {
			this.props.onSendMessage(e.target.value);
			e.target.value = '';
			this.setState({inputValue: '', isRtl: false});
		}
	};

	private handleOnChange = (e: any) => {
		let isrtl = this.state.isRtl;
		// check if first letter
		if (e.target.value.length === 1) {
			// if yes, check if rtl or ltr
			isrtl = LanguageDetector.isRTL(e.target.value);
		} else {
			if (e.target.value.length === 0 || e.target.value === '') {
				isrtl = false;
			}
		}

		this.setState({
			inputValue: e.target.value,
			isRtl: isrtl,
		});
	};
}
