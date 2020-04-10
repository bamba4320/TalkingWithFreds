import React from 'react';
import UserModel from '../../../../common/models/User.model';
import './AddUserToChat.component.scss';
import rootStores from '../../../../BL/stores';
import {CONVERSATION_STORE, MODAL_STORE} from '../../../../BL/stores/storesKeys';
import {isNullOrUndefined} from 'util';

interface IProps {
	user: UserModel;
}
interface IState {}

const conversationStore = rootStores[CONVERSATION_STORE];
const modalStore = rootStores[MODAL_STORE];

export default class AddUserToChatComponent extends React.Component<IProps, IState> {
	public render() {
		return (
			<div className='add-user-wrapper' onClick={this.handleClick}>
				<div className='profile-picture-wrapper'>{this.props.user.profileImage}</div>
				<div className='username'>{this.props.user.username}</div>
			</div>
		);
	}

	private handleClick = () => {
		console.log('clicked', this.props.user);
		if (!isNullOrUndefined(this.props.user) && !isNullOrUndefined(this.props.user.id) && this.props.user.id !== '') {
			conversationStore.CreateNewConversation(this.props.user.id);
			modalStore.closeModal();
		}
	};
}
