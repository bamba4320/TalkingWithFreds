import React from 'react';
import {Image, Dropdown} from 'semantic-ui-react';
import './ChatTopBar.component.scss';
import rootStores from '../../../../BL/stores';
import {CONVERSATION_STORE} from '../../../../BL/stores/storesKeys';

interface IProps {
	convName?: string;
	isGroup: boolean;
	groupMembers?: string[];
	chatImage?: string;
}
interface IState {}

const conversationStore = rootStores[CONVERSATION_STORE];

export default class ChatTopBarComponent extends React.Component<IProps, IState> {
	public render() {
		return (
			<div className='top-bar-wrapper'>
				<div className='username-and-profile'>
					<Image
						avatar
						src={this.props.chatImage || require('../../../../static/images/blank_user_profile_image.jfif')}
					/>
					<div className='conv-name-wrapper'>{this.props.convName}</div>
				</div>
				<Dropdown className='dropdown-wrapper' item icon='ellipsis horizontal' direction='left'>
					{this.showDropDownItems()}
				</Dropdown>
			</div>
		);
	}

	private showDropDownItems() {
		if (this.props.isGroup) {
			return (
				<Dropdown.Menu>
					<Dropdown.Item text='Edit group name' />
					<Dropdown.Item text='Change group picture' />
					<Dropdown.Item
						className='delete-item'
						text='Delete Group'
						onClick={() => conversationStore.deleteConversationForUser()}
					/>
				</Dropdown.Menu>
			);
		} else {
			return (
				<Dropdown.Menu>
					<Dropdown.Item
						className='delete-item'
						text='Delete Chat'
						onClick={() => conversationStore.deleteConversationForUser()}
					/>
				</Dropdown.Menu>
			);
		}
	}
}
