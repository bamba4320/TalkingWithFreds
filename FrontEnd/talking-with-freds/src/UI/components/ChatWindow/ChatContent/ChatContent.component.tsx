import React from 'react';
import './ChatContent.component.scss';
import {observer} from 'mobx-react';
import rootStores from '../../../../BL/stores';
import {MESSAGES_STORE, CURRENT_USER_STORE} from '../../../../BL/stores/storesKeys';
import MessageModel from '../../../../common/models/Message.model';
import ChatMessageComponent from './ChatMessage/ChatMessage.component';
import {isNullOrUndefined} from 'util';

interface IProps {}
interface IState {}

const messagesStore = rootStores[MESSAGES_STORE];
const currentUserStore = rootStores[CURRENT_USER_STORE];

@observer
export default class ChatContentComponent extends React.Component<IProps, IState> {
	public render() {
		let key = 0;
		setTimeout(() => {
			this.updateScroll(document.getElementById('chat-window-super-wrapper'));
		}, 10);
		return (
			<div className='chat-content-wrapper'>
				<div className='chat-messages-wrapper'>
					{messagesStore.getCurrentConvMessages.map((message: MessageModel) => {
						return (
							<ChatMessageComponent
								messageContent={message.messageContent}
								isUserSent={currentUserStore.getCurrentUserId === message.senderId}
								messageTime={this.getTime(message.messageSendingTime)}
								key={key++}
							/>
						);
					})}
				</div>
			</div>
		);
	}

	private updateScroll(windowDiv: HTMLElement | null) {
		if (!isNullOrUndefined(windowDiv)) {
			windowDiv.scrollTop = windowDiv.scrollHeight;
		}
	}

	private getTime(dateTime: Date | string | undefined) {
		console.log(dateTime);
		if (!isNullOrUndefined(dateTime)) {
			let dateTimeTemp: string = dateTime.toString();
			dateTimeTemp = dateTimeTemp.split('T')[1];
			dateTimeTemp = dateTimeTemp.slice(0, 5);
			return dateTimeTemp;
		}
		return '';
	}
}
