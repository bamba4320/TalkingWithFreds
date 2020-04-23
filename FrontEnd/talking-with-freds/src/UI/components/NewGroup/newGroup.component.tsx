import React from 'react';
import {isNullOrUndefined} from 'util';
import rootStores from '../../../BL/stores';
import {CURRENT_USER_STORE} from '../../../BL/stores/storesKeys';
import AddUserToGroupComponent from './AddUserToGroup/AddUserToGroup.component';
import UserModel from '../../../common/models/User.model';
import {Button, Form} from 'semantic-ui-react';
import './newGroup.component.scss';

interface IProps {}
interface IState {
	loading: boolean;
	filter: string;
	selectedUsers: UserModel[];
}

const currentUserStore = rootStores[CURRENT_USER_STORE];

export default class NewGroupComponent extends React.Component<IProps, IState> {
	private users: any[];

	constructor(props: IProps) {
		super(props);
		this.users = [];
		this.state = {loading: true, filter: '', selectedUsers: []};
	}

	public async componentDidMount() {
		this.users = await currentUserStore.getAllOtherUsers();
		this.setState({loading: false});
	}

	public render() {
		let key = 0;
		return (
			<div className='new-group-wrapper'>
				<Form>
					<Form.Input type='text' placeholder='Search...' onChange={(e) => this.onSearch(e)} />
					<div className='user-selection-wrapper'>
						{this.users.map((user: any) => {
							if (!isNullOrUndefined(user)) {
								if (this.state.filter !== '') {
									if (user.username.toLowerCase().includes(this.state.filter)) {
										return (
											<AddUserToGroupComponent
												user={user}
												key={key++}
												onSelect={this.onUserClick}
												isSelected={this.isUserSelected(user)}
											/>
										);
									}
								} else {
									return (
										<AddUserToGroupComponent
											user={user}
											key={key++}
											onSelect={this.onUserClick}
											isSelected={this.isUserSelected(user)}
										/>
									);
								}
							}
						})}
					</div>
					<Form.Input placeholder='Group Name' type='text' />
					<Form.Input type='file' accept='.jpg,.jpeg,.png,.jfif' />
					<Button inverted color='purple' content='Done' />
				</Form>
			</div>
		);
	}

	private onSearch = (e: any) => {
		this.setState({filter: e.target.value.toLowerCase()});
	};

	private onUserClick = (user: UserModel) => {
		console.log(this.state.selectedUsers);
		const tempSelected = this.state.selectedUsers;
		if (!this.isUserSelected(user)) {
			console.log('pused');
			tempSelected.push(user);
		} else {
			const deleteIndex = tempSelected.findIndex((deleteUser) => {
				return deleteUser.id == user.id;
			});
			if (deleteIndex !== -1) {
				tempSelected.splice(deleteIndex, 1);
				console.log('removed', deleteIndex, tempSelected);
			} else {
				throw new Error('User Not Found In Selected');
			}
		}
		this.setState({selectedUsers: tempSelected});
		console.log(this.state.selectedUsers);
	};

	private isUserSelected = (user: UserModel) => {
		const found = this.state.selectedUsers.findIndex((testUser) => {
			return testUser.id == user.id;
		});
		return found !== -1;
	};
}
