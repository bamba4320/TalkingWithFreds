import React from 'react';
import './ChatMessage.component.scss';
import {threadId} from 'worker_threads';
import LanguageDetector from '../../../../../Infrastructure/Utils/LanguageDetector/languageDetector';
import {isNullOrUndefined} from 'util';

interface IProps {
	messageContent?: string;
	isUserSent: boolean;
}

interface IState {}

export default class ChatMessageComponent extends React.Component<IProps, IState> {
	public render() {
		return (
			<div className='message-line'>
				<div
					className={`chat-message ${this.props.isUserSent ? 'user-message' : 'other-message'} ${
						this.setLangDirection() ? 'rtl-message' : 'ltr-message'
					} `}>
					{this.props.messageContent}
				</div>
			</div>
		);
	}

	private setLangDirection() {
		if (!isNullOrUndefined(this.props.messageContent)) {
			// console.log(this.props.messageContent);
			// const nonSpecialCharIndex = LanguageDetector.findFirstNonSpecialChar(this.props.messageContent);
			// console.log(nonSpecialCharIndex);
			// if (nonSpecialCharIndex !== -1) {
				// console.log(LanguageDetector.isRTL(this.props.messageContent[nonSpecialCharIndex]));
				return LanguageDetector.isRTL(this.props.messageContent[0]);
			// } else {
			// 	console.log('false');
			// 	return false;
			// }
		} else {
			console.log('false');
			return false;
		}
	}
}
