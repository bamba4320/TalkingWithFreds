import React from 'react';
import rootStores from '../../../BL/stores';
import {CURRENT_USER_STORE} from '../../../BL/stores/storesKeys';
import {isNullOrUndefined} from 'util';
import AddUserToChatComponent from './AddUserToChatComponent/AddUserToChat.component';

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
			<div>
				<input type='text' placeholder='Search...' onChange={(e) => this.onSearch(e)} />
				{this.users.map((user: any) => {
					if (!isNullOrUndefined(user)) {
						if (this.state.filter !== '') {
							if (user.username.toLowerCase().includes(this.state.filter)) {
								return <AddUserToChatComponent user={user} key={key++} />;
							}
						} else {
							return <AddUserToChatComponent user={user} key={key++} />;
						}
					}
				})}
			</div>
		);
	}

	private onSearch = (e: any) => {
		this.setState({filter: e.target.value.toLowerCase()});
	};
}
