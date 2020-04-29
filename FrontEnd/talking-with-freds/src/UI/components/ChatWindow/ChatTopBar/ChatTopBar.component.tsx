import React from 'react';
import {Image, Dropdown} from 'semantic-ui-react';
import './ChatTopBar.component.scss';
import rootStores from '../../../../BL/stores';
import {CONVERSATION_STORE, MODAL_STORE} from '../../../../BL/stores/storesKeys';
import ChangeConversationNameComponent from './ChangeName/ChangeConversationName.component';
import ChangeConversationPicture from './ChangeConversationPicture/ChangeConversationPicture.component';

interface IProps {
	convName?: string;
	isGroup: boolean;
	groupMembers?: string[];
	chatImage?: string;
}
interface IState {}

const conversationStore = rootStores[CONVERSATION_STORE];
const modalStore = rootStores[MODAL_STORE];

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
					<Dropdown.Item text='Edit group name' onClick={this.onChangeNameClick} />
					<Dropdown.Item text='Change group picture' onClick={this.onChangeImageClick} />
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

	private onChangeNameClick = () => {
		modalStore.openModal(
			<ChangeConversationNameComponent onSubmit={this.onChangeNameSubmit} groupName={this.props.convName} />,
			{
				title: 'Change Conversation Name',
				closeFromOutsideModal: true,
			}
		);
	};

	private onChangeNameSubmit = (newName: string) => {
		conversationStore.changeGroupName(newName);
		modalStore.closeModal();
	};

	private onChangeImageClick = () => {
		modalStore.openModal(<ChangeConversationPicture />, {
			title: 'Change Conversation Image',
			closeFromOutsideModal: true,
		});
	};
}
