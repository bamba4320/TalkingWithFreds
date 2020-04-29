import React from 'react';
import {isNullOrUndefined} from 'util';
import rootStores from '../../../BL/stores';
import {CURRENT_USER_STORE, CONVERSATION_STORE, MODAL_STORE, UI_STORE} from '../../../BL/stores/storesKeys';
import AddUserToGroupComponent from './AddUserToGroup/AddUserToGroup.component';
import UserModel from '../../../common/models/User.model';
import {Button, Form} from 'semantic-ui-react';
import './newGroup.component.scss';
import AlertUtils from '../../../Infrastructure/Utils/AlertUtils/AlertUtils';
import Swal from 'sweetalert2';
import ProfileImageSelectionDisplayContainer from '../../containers/ProfileImagesSelectionDisplay/ProfileImagesSelectionDisplay.container';

interface IProps {}
interface IState {
	loading: boolean;
	filter: string;
	selectedUsers: string[];
	groupName: string;
	selectedImageNumber: number;
}

const currentUserStore = rootStores[CURRENT_USER_STORE];
const conversationStore = rootStores[CONVERSATION_STORE];
const modalStore = rootStores[MODAL_STORE];
const uiStore = rootStores[UI_STORE];

export default class NewGroupComponent extends React.Component<IProps, IState> {
	private users: any[];

	constructor(props: IProps) {
		super(props);
		this.users = [];
		this.state = {loading: true, filter: '', selectedUsers: [], groupName: '', selectedImageNumber: 0};
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
					<div className='user-selection-wrapper'>{this.renderUsers()}</div>
					<Form.Input
						placeholder='Group Name'
						type='text'
						onChange={(e) => {
							this.setState({groupName: e.target.value});
						}}
					/>
					<ProfileImageSelectionDisplayContainer
						isUser={false}
						onSelect={(selectedNumber: number) => {
							console.log(selectedNumber);
							this.setState({selectedImageNumber: selectedNumber});
						}}
					/>
					<Button inverted color='purple' content='Done' disabled={this.isValidToSubmit()} onClick={this.onDoneClick} />
				</Form>
			</div>
		);
	}

	// filter users in display
	private onSearch = (e: any) => {
		this.setState({filter: e.target.value.toLowerCase()});
	};

	// no click - select or unselect user
	private onUserClick = (userId: string) => {
		const tempSelected = this.state.selectedUsers;
		// if the user has not been selected, select him
		if (!this.isUserSelected(userId)) {
			tempSelected.push(userId);
		} else {
			// if the user has been selected, unselect him
			const deleteIndex = tempSelected.findIndex((deleteUser) => {
				return deleteUser === userId;
			});
			if (deleteIndex !== -1) {
				tempSelected.splice(deleteIndex, 1);
			} else {
				throw new Error('User Not Found In Selected');
			}
		}
		this.setState({selectedUsers: tempSelected});
	};

	private isUserSelected = (userId: string) => {
		const found = this.state.selectedUsers.findIndex((testUser) => {
			return testUser == userId;
		});
		return found !== -1;
	};

	private isValidToSubmit = (): boolean | undefined => {
		return !(
			this.state.selectedUsers.length >= 2 &&
			this.state.groupName !== '' &&
			!isNullOrUndefined(this.state.groupName)
		);
	};

	private onDoneClick = () => {
		AlertUtils.showConfirmationPopup('Are you sure you want to create that group?').then((result) => {
			if (result.dismiss === Swal.DismissReason.cancel) {
			} else {
				uiStore.blockUiSite();
				uiStore.showBlockUiLoadingPopUp();
				conversationStore
					.CreateNewGroupConversation(this.state.selectedUsers, this.state.groupName, this.state.selectedImageNumber)
					.then(() => {
						uiStore.unblockUiSite();
						uiStore.closeBlockUiLoadingPopUp();
						AlertUtils.showGeneralSuccessPopUp('Group created successfully!').then(() => {
							modalStore.closeModal();
						});
					})
					.catch((err) => {
						uiStore.unblockUiSite();
						uiStore.closeBlockUiLoadingPopUp();
						AlertUtils.showGeneralErrorPopUp(err.message).then(() => {
							modalStore.closeModal();
						});
					});
			}
		});
	};

	private renderUsers() {
		let key = 0;
		const usersToShow = this.users.map((user: any) => {
			if (!isNullOrUndefined(user)) {
				if (this.state.filter !== '') {
					if (user.username.toLowerCase().includes(this.state.filter)) {
						return (
							<AddUserToGroupComponent
								user={user}
								key={key++}
								onSelect={this.onUserClick}
								isSelected={this.isUserSelected(user.id)}
							/>
						);
					}
				} else {
					return (
						<AddUserToGroupComponent
							user={user}
							key={key++}
							onSelect={this.onUserClick}
							isSelected={this.isUserSelected(user.id)}
						/>
					);
				}
			}
		});
		let found = false;
		usersToShow.forEach((user) => {
			found = !isNullOrUndefined(user) || found;
		});
		if (!found) {
			// if no users found or fitting filter
			return <div className='not-found-message'>No users found</div>;
		} else {
			return usersToShow;
		}
	}
}
