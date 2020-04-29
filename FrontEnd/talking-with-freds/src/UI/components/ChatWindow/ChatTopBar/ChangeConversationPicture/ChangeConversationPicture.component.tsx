import React from 'react';
import ProfileImageSelectionDisplayContainer from '../../../../containers/ProfileImagesSelectionDisplay/ProfileImagesSelectionDisplay.container';
import {Button} from 'semantic-ui-react';
import rootStores from '../../../../../BL/stores';
import {CONVERSATION_STORE, UI_STORE, IMAGES_STORE, MODAL_STORE} from '../../../../../BL/stores/storesKeys';
import {isNullOrUndefined} from 'util';
import ImageModel from '../../../../../common/models/Image.model';
import AlertUtils from '../../../../../Infrastructure/Utils/AlertUtils/AlertUtils';

interface IProps {}
interface IState {
	selectedPictureNumber: number;
}

const conversationStore = rootStores[CONVERSATION_STORE];
const imagesStore = rootStores[IMAGES_STORE];
const uiStore = rootStores[UI_STORE];
const modalStore = rootStores[MODAL_STORE];

export default class ChangeConversationPicture extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			selectedPictureNumber: 0,
		};
	}

	public render() {
		return (
			<div>
				<ProfileImageSelectionDisplayContainer
					isUser={false}
					onSelect={(imageNumber: number) => {
						this.setState({selectedPictureNumber: imageNumber});
					}}
				/>
				<Button inverted color='purple' content='Done' onClick={this.onSubmit} />
			</div>
		);
	}

	private onSubmit = () => {
		uiStore.blockUiSite();
		uiStore.showBlockUiLoadingPopUp();
		const image: ImageModel = imagesStore.findImage(this.state.selectedPictureNumber);
		if (!isNullOrUndefined(image)) {
			conversationStore
				.changeConversationImage(image!)!
				.then(() => {
					uiStore.unblockUiSite();
					uiStore.closeBlockUiLoadingPopUp();
					AlertUtils.showGeneralSuccessPopUp('Group Picture Has been successfully changed').then(() => {
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
	};
}
