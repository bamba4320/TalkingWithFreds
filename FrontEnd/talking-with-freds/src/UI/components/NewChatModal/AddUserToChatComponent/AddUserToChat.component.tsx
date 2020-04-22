import React from 'react';
import UserModel from '../../../../common/models/User.model';
import './AddUserToChat.component.scss';
import rootStores from '../../../../BL/stores';
import {CONVERSATION_STORE, MODAL_STORE} from '../../../../BL/stores/storesKeys';
import {isNullOrUndefined} from 'util';
import {Image} from 'semantic-ui-react';
import {imagePreURL} from '../../../../common/generalConsts';

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
				<div>
					<Image
						avatar
						src={
							imagePreURL + this.props.user.profileImage ||
							require('../../../../static/images/blank_user_profile_image.jfif')
						}
					/>
				</div>
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
