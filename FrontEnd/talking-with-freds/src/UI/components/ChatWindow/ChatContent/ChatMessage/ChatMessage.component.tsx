import React from 'react';
import './ChatMessage.component.scss';
import LanguageDetector from '../../../../../Infrastructure/Utils/LanguageDetector/languageDetector';
import {isNullOrUndefined} from 'util';
import rootStores from '../../../../../BL/stores';
import {CONVERSATION_STORE} from '../../../../../BL/stores/storesKeys';

interface IProps {
	messageContent?: string;
	messageTime?: string;
	messageDate?: string;
	username?: string;
	isUserSent: boolean;
}

interface IState {}

const conversationStore = rootStores[CONVERSATION_STORE];

export default class ChatMessageComponent extends React.Component<IProps, IState> {
	public render() {
		return (
			<div className='message-line'>
				<div className={`chat-message ${this.props.isUserSent ? 'user-message' : 'other-message'} `}>
					<div className='message-time'>{this.props.messageDate}</div>
					<div className='message-time'>
					{this.props.messageTime}
						<div className='username'>{this.showUsername()}</div>
					</div>
					<div className={`message-wrapper  ${this.setLangDirection() ? 'rtl-message' : 'ltr-message'}`}>
						{this.props.messageContent}
					</div>
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

	private showUsername() {
		// if not in group, don't show username
		if (
			!isNullOrUndefined(conversationStore.getCurrentSelectedConversation) &&
			conversationStore.getCurrentSelectedConversation.isGroup
		) {
			// if the current user send, dont show username
			if (!this.props.isUserSent) {
				return this.props.username;
			} else {
				return '';
			}
		} else {
			return '';
		}
	}
}
