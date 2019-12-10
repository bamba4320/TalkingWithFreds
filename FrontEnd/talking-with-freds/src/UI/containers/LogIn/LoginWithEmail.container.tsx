import {AUTH_STORE, MODAL_STORE, PURCHASE_STORE} from 'BL/stores';
import AuthStore from 'BL/stores/Auth.store';
import ModalStore from 'BL/stores/Modal.store';
import PurchaseStore from 'BL/stores/Purchase.store';
import {PageToRender} from 'common/generalconsts/purchase.enums';
import {inject, observer} from 'mobx-react';
import * as React from 'react';
import {Grid} from 'semantic-ui-react';
import LoginWithEmailComponent from 'UI/components/Login/LoginWithEmail.component';

export interface IProps {
	[AUTH_STORE]?: AuthStore;
	[MODAL_STORE]?: ModalStore;
	[PURCHASE_STORE]?: PurchaseStore;
	fromPurchase?: boolean;
}

export interface IState {}

@inject(AUTH_STORE, MODAL_STORE, PURCHASE_STORE)
@observer
export default class LoginWithEmailContainer extends React.Component<IProps, IState> {
	private authStore: AuthStore;
	private modalStore: ModalStore;
	private purchaseStore: PurchaseStore;
	constructor(props: IProps) {
		super(props);
		this.state = {};
		this.authStore = this.props[AUTH_STORE] as AuthStore;
		this.modalStore = this.props[MODAL_STORE] as ModalStore;
		this.purchaseStore = this.props[PURCHASE_STORE] as PurchaseStore;
	}

	public render() {
		return (
			<Grid>
				<Grid.Column computer={16} only='computer'>
					{this.renderComponent(false)}
				</Grid.Column>
				<Grid.Column mobile={16} tablet={16} only='mobile tablet'>
					{this.renderComponent(true)}
				</Grid.Column>
			</Grid>
		);
	}

	private onFormSubmitRequest = (values: {email: string; password: string}) => {
		return this.authStore.handleLogin(values.email, values.password).then((user) => {
			if (this.props.fromPurchase) {
				this.purchaseStore.setPageToRender(PageToRender.payment);
			}
			return user;
		});
	};

	private renderComponent(isMobile: boolean) {
		return (
			<LoginWithEmailComponent
				onSubmitRequest={this.onFormSubmitRequest}
				isMobile={isMobile}
				onForgotPasswordClick={(fpComponent: any) => {
					this.modalStore.openModal(fpComponent, {
						title: 'forgotPassword.DidYouForgotPassword',
						fullScreen: true,
						closeFromOutsideModal: true,
					});
					return false;
				}}
				openModal={this.modalStore.openModal}
				closeModal={this.modalStore.closeModal}
			/>
		);
	}
}
