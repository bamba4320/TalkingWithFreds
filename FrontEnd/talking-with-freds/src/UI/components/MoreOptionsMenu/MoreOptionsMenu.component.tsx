import React from 'react';
import './MoreOptionsMenu.component.scss';
import {Dropdown, Button} from 'semantic-ui-react';
import rootStores from '../../../BL/stores';
import {CURRENT_USER_STORE} from '../../../BL/stores/storesKeys';

const currentUserStore = rootStores[CURRENT_USER_STORE];

export default class MoreOptionsMenuComponent extends React.Component {
	public render() {
		return (
			<Dropdown className='dropdown-wrapper' item icon='ellipsis vertical' direction='left'>
				<Dropdown.Menu>
					<Dropdown.Item text='New Chat' />
					<Dropdown.Item text='New Group' />
					<Dropdown.Item text='Profile'  />
					<Dropdown.Item className='signout-item' text='Sign out' onClick={() => currentUserStore.logout()} />
				</Dropdown.Menu>
			</Dropdown>
		);
	}
}
