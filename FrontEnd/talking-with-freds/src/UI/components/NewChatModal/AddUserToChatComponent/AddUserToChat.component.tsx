import React from 'react';
import UserModel from '../../../../common/models/User.model';
import './AddUserToChat.component.scss';
import rootStores from '../../../../BL/stores';
import {CONVERSATION_STORE, MODAL_STORE, UI_STORE} from '../../../../BL/stores/storesKeys';
import {isNullOrUndefined} from 'util';
import {Image} from 'semantic-ui-react';
import {imagePreURL} from '../../../../common/generalConsts';
import AlertUtils from '../../../../Infrastructure/Utils/AlertUtils/AlertUtils';
import Swal from 'sweetalert2';

interface IProps {
	user: UserModel;
}
interface IState {}

const conversationStore = rootStores[CONVERSATION_STORE];
const modalStore = rootStores[MODAL_STORE];
const uiStore = rootStores[UI_STORE];

export default class AddUserToChatComponent extends React.Component<IProps, IState> {
	public render() {
		return (
			<div className='add-user-wrapper' onClick={this.handleClick}>
				<div>
					<Image
						avatar
						src={this.setUserProfilePicture() || require('../../../../static/images/blank_user_profile_image.jfif')}
					/>
				</div>
				<div className='username'>{this.props.user.username}</div>
			</div>
		);
	}

	private handleClick = () => {
		if (!isNullOrUndefined(this.props.user) && !isNullOrUndefined(this.props.user.id) && this.props.user.id !== '') {
			AlertUtils.showConfirmationPopup(
				`Are you sure you wand to start a private chat with ${this.props.user.username}?`
			).then((result) => {
				if (result.dismiss === Swal.DismissReason.cancel) {
				} else {
					uiStore.blockUiSite();
					uiStore.showBlockUiLoadingPopUp();
					if (
						!isNullOrUndefined(this.props.user) &&
						!isNullOrUndefined(this.props.user.id) &&
						this.props.user.id !== ''
					) {
						conversationStore
							.CreateNewConversation(this.props.user.id)
							.then(() => {
								uiStore.unblockUiSite();
								uiStore.closeBlockUiLoadingPopUp();
								AlertUtils.showGeneralSuccessPopUp('The chat has been added successfully!').then(() => {
									modalStore.closeModal();
								});
							})
							.catch((err) => {
								console.error(err.message);
								uiStore.unblockUiSite();
								uiStore.closeBlockUiLoadingPopUp();
								AlertUtils.showGeneralErrorPopUp('Sorry, We troubled adding the conversation :(').then(() => {
									modalStore.closeModal();
								});
							});
					}
				}
			});
		}
	};

	// if the user has profile picture return it, else return null
	private setUserProfilePicture() {
		if (!isNullOrUndefined(this.props.user.profileImage)) {
			return imagePreURL + this.props.user.profileImage;
		} else {
			return null;
		}
	}
}
