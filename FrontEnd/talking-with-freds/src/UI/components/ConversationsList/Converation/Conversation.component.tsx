import {observer} from 'mobx-react';
import React from 'react';
import {Image} from 'semantic-ui-react';
import ConversationModel from '../../../../common/models/Conversation.model';
import './Conversation.component.scss';
import {isNullOrUndefined} from 'util';
import LanguageDetector from '../../../../Infrastructure/Utils/LanguageDetector/languageDetector';
import {timingSafeEqual} from 'crypto';
import rootStores from '../../../../BL/stores';
import {CURRENT_USER_STORE} from '../../../../BL/stores/storesKeys';

interface IProps {
	convDits: ConversationModel;
	onConvSelect: any;
	isSelected: any;
}
interface IState {}

const currentUserStore = rootStores[CURRENT_USER_STORE];

@observer
export default class ConversationComponent extends React.Component<IProps, IState> {
	public render() {
		return (
			<div
				className={`conversation-wrapper ${this.props.isSelected(this.props.convDits.convId) ? 'selected' : ''}`}
				onClick={() => this.props.onConvSelect(this.props.convDits)}>
				{/* conversation profile image */}

				<Image
					avatar
					className='conv-profile-img'
					src={this.props.convDits.profileImg || require('../../../../static/images/blank_user_profile_image.jfif')}
				/>

				{/* the conversation details */}
				<div className='conv-details-wrapper'>
					<div className='conv-name-and-last-message'>
						<div className='conv-name'>{this.props.convDits.convName}</div>
						<div
							className={`last-message ${
								this.setLangDirection(this.props.convDits.lastMessage) ? 'rtl-message' : 'ltr-message'
							}`}>
							{this.showLastMessage(this.props.convDits.lastMessage)}
						</div>
					</div>
					<div className='conv-time-seen-and-mute'>
						{this.getTime(this.props.convDits.lastMessageTime)} {this.getDate(this.props.convDits.lastMessageTime)}
					</div>
				</div>
			</div>
		);
	}

	private showLastMessage(message: string | undefined) {
		console.log(this.props.convDits.lastMessageUser, currentUserStore.getCurrentUserUsername);

		if (!isNullOrUndefined(message)) {
			let username = '';
			if (this.props.convDits.isGroup) {
				if (!isNullOrUndefined(this.props.convDits.lastMessageUser)) {
					if (this.props.convDits.lastMessageUser !== currentUserStore.getCurrentUserUsername) {
						console.log(this.props.convDits.lastMessageUser, currentUserStore.getCurrentUserUsername);
						username = this.props.convDits.lastMessageUser + ': ';
					}
				}
			}
			if (message.length > 40) {
				return username + message.slice(0, 41) + '...';
			} else {
				return username + message;
			}
		} else {
			return '';
		}
	}

	private getTime(dateTime: Date | string | undefined) {
		if (!isNullOrUndefined(dateTime)) {
			let dateTimeTemp: string = dateTime.toString();
			dateTimeTemp = dateTimeTemp.split('T')[1];
			dateTimeTemp = dateTimeTemp.slice(0, 5);
			// find timezone offset and transform it to hours
			const offset = (new Date().getTimezoneOffset() / 60) * -1;
			let hours = Number.parseInt(dateTimeTemp.slice(0, 2));
			hours = hours + offset > 23 ? 24 - (hours + offset) : hours + offset;
			const prenum = hours < 10 ? '0' : '';
			let returnedDateTime = prenum + hours.toString() + ':' + dateTimeTemp.split(':')[1];
			return returnedDateTime;
		}
		return '';
	}

	private getDate(dateTime: Date | string | undefined) {
		if (!isNullOrUndefined(dateTime)) {
			let dateTimeTemp: string = dateTime.toString();
			return dateTimeTemp.split('T')[0];
		}
	}

	private setLangDirection(message: string | undefined) {
		if (!isNullOrUndefined(message)) {
			// console.log(this.props.messageContent);
			// const nonSpecialCharIndex = LanguageDetector.findFirstNonSpecialChar(this.props.messageContent);
			// console.log(nonSpecialCharIndex);
			// if (nonSpecialCharIndex !== -1) {
			// console.log(LanguageDetector.isRTL(this.props.messageContent[nonSpecialCharIndex]));
			return LanguageDetector.isRTL(message[0]);
			// } else {
			// 	console.log('false');
			// 	return false;
			// }
		} else {
			return false;
		}
	}
}
