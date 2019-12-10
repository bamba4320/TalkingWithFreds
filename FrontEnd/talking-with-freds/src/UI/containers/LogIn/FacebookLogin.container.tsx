import {AUTH_STORE, MODAL_STORE, PURCHASE_STORE, UI_STORE} from 'BL/stores';
import AuthStore from 'BL/stores/Auth.store';
import ModalStore from 'BL/stores/Modal.store';
import PurchaseStore from 'BL/stores/Purchase.store';
import UiStore from 'BL/stores/Ui.store';
import {PageToRender} from 'common/generalconsts/purchase.enums';
import {inject, observer} from 'mobx-react';
import * as React from 'react';
import FacebookLoginComponent from 'UI/components/Login/FacebookLogin.component';

export interface IProps {
	[AUTH_STORE]?: AuthStore;
	[MODAL_STORE]?: ModalStore;
	[UI_STORE]?: UiStore;
	[PURCHASE_STORE]?: PurchaseStore;
	fromPurchase?: boolean;
}

export interface IState {}

@inject(AUTH_STORE, MODAL_STORE, UI_STORE, PURCHASE_STORE)
@observer
export default class FacebookLoginContainer extends React.Component<IProps, IState> {
	private authStore: AuthStore;
	private modalStore: ModalStore;
	private uiStore: UiStore;
	private purchaseStore: PurchaseStore;
	constructor(props: IProps) {
		super(props);
		this.state = {};
		this.authStore = this.props[AUTH_STORE] as AuthStore;
		this.modalStore = this.props[MODAL_STORE] as ModalStore;
		this.uiStore = this.props[UI_STORE] as UiStore;
		this.purchaseStore = this.props[PURCHASE_STORE] as PurchaseStore;
	}

	public render() {
		return (
			<FacebookLoginComponent
				onFBSubmitRequest={this.onFacebookSubmitRequest}
				closeModal={this.modalStore.closeModal}
				openModal={this.modalStore.openModal}
				showLoadingPopup={this.uiStore.showBlockUiLoadingPopUp}
				closeLoadingPopup={this.uiStore.closeBlockUiLoadingPopUp}
			/>
		);
	}

	private onFacebookSubmitRequest = async (userID: string, accessToken: string) => {
		return this.authStore.handleLoginFB(userID, accessToken).then((user) => {
			if (this.props.fromPurchase) {
				this.purchaseStore.setPageToRender(PageToRender.payment);
			}
			return user;
		});
	};
}
