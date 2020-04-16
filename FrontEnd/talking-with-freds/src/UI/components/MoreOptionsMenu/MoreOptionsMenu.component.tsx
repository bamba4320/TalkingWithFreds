import React from 'react';
import './MoreOptionsMenu.component.scss';
import {Dropdown, Button} from 'semantic-ui-react';
import rootStores from '../../../BL/stores';
import {CURRENT_USER_STORE, MODAL_STORE} from '../../../BL/stores/storesKeys';
import NewChatComponent from '../NewChatModal/NewChatWindow.component';
import UpdateProfileFormComponent from '../UserProfile/UpdateProfile/updateProfileForm.component';

const currentUserStore = rootStores[CURRENT_USER_STORE];
const modalStore = rootStores[MODAL_STORE];

export default class MoreOptionsMenuComponent extends React.Component {
	public render() {
		return (
			<Dropdown className='dropdown-wrapper' item icon='ellipsis vertical' direction='left'>
				<Dropdown.Menu>
					<Dropdown.Item text='New Chat' onClick={this.onNewChatClick} />
					<Dropdown.Item text='New Group' />
					<Dropdown.Item text='Profile' onClick={this.onProfileClick} />
					<Dropdown.Item className='signout-item' text='Sign out' onClick={() => currentUserStore.logout()} />
				</Dropdown.Menu>
			</Dropdown>
		);
	}

	private onNewChatClick = () => {
		modalStore.openModal(<NewChatComponent />, {title: 'Start New Chat', closeFromOutsideModal: true});
	};

	private onProfileClick = () => {
		modalStore.openModal(
			<UpdateProfileFormComponent
				onSubmit={this.onProfileUpdateSubmit}
				onChangePassword={this.onChangePasswordClick}
			/>,
			{title: 'Profile', closeFromOutsideModal: true}
		);
	};

	private onProfileUpdateSubmit = (username: string) => {};

	private onChangePasswordClick = () => {
		modalStore.openModal(<NewChatComponent />, {title: 'Start New Chat', closeFromOutsideModal: true});
	};
}
