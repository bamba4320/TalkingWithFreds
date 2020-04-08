import React from 'react';
import rootStores from '../../../BL/stores';
import {CURRENT_USER_STORE} from '../../../BL/stores/storesKeys';
import {isNullOrUndefined} from 'util';

interface IProps {}
interface IState {
	loading: boolean;
}

const currentUserStore = rootStores[CURRENT_USER_STORE];

export default class NewChatComponent extends React.Component<IProps, IState> {
	private users: any[];

	constructor(props: IProps) {
		super(props);
		this.users = [];
		this.state = {loading: true};
	}

	public async componentDidMount() {
		this.users = await currentUserStore.getAllOtherUsers();
		this.setState({loading: false});
	}

	public render() {
		return (
			<div>
				<input type='text' placeholder='Search...' />
				{this.users.map((user: any) => {
					console.log(user);
					return (
						<div>
							<div>{user.profileImage}</div>
							<div>{user.username}</div>
						</div>
					);
				})}
			</div>
		);
	}
}
