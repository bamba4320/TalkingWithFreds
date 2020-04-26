import React from 'react';
import rootStores from '../../../BL/stores';
import {CURRENT_USER_STORE} from '../../../BL/stores/storesKeys';
import {isNullOrUndefined} from 'util';
import AddUserToChatComponent from './AddUserToChatComponent/AddUserToChat.component';
import './NewChatWindow.component.scss';

interface IProps {}
interface IState {
	loading: boolean;
	filter: '';
}

const currentUserStore = rootStores[CURRENT_USER_STORE];

export default class NewChatComponent extends React.Component<IProps, IState> {
	private users: any[];

	constructor(props: IProps) {
		super(props);
		this.users = [];
		this.state = {loading: true, filter: ''};
	}

	public async componentDidMount() {
		this.users = await currentUserStore.getAllOtherUsers();
		this.setState({loading: false});
	}

	public render() {
		let key = 0;
		return (
			<div className='new-chat-wrapper'>
				<input type='text' placeholder='Search...' onChange={(e) => this.onSearch(e)} />
				{this.renderUsers()}
				
			</div>
		);
	}

	private onSearch = (e: any) => {
		this.setState({filter: e.target.value.toLowerCase()});
	};

	private renderUsers() {
		let key = 0;
		const usersToShow = this.users.map((user: any) => {
			if (!isNullOrUndefined(user)) {
				if (this.state.filter !== '') {
					if (user.username.toLowerCase().includes(this.state.filter)) {
						return <AddUserToChatComponent user={user} key={key++} />;
					}
				} else {
					return <AddUserToChatComponent user={user} key={key++} />;
				}
			}
		});

		let found = false;
		usersToShow.forEach((user) => {
			found = !isNullOrUndefined(user);
		});
		if (!found) {
			// if no users found or fitting filter
			return <div className='not-found-message'>No users found</div>;
		} else {
			return usersToShow;
		}
	}
}
