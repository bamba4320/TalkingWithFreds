import {AUTH_STORE, MESSAGES_STORE, MODAL_STORE, PURCHASE_STORE, UI_STORE} from 'BL/stores';
import AuthStore from 'BL/stores/Auth.store';
import MessagesStore from 'BL/stores/Messages.store';
import ModalStore from 'BL/stores/Modal.store';
import PurchaseStore from 'BL/stores/Purchase.store';
import UiStore from 'BL/stores/Ui.store';
import AlertUtils from 'common/errorHandling/AlertUtils';
import Logger from 'common/utils/logger/logger';
import {inject, observer} from 'mobx-react';
import * as React from 'react';
import {Grid} from 'semantic-ui-react';
import RegisterComponent from '../../components/Register/Register.component';

export interface IProps {
	[AUTH_STORE]?: AuthStore;
	[MODAL_STORE]?: ModalStore;
	[MESSAGES_STORE]?: MessagesStore;
	[UI_STORE]?: UiStore;
	[PURCHASE_STORE]?: PurchaseStore;
	fromPurchase?: boolean;
}

export interface IState {}

@inject(AUTH_STORE, MODAL_STORE, MESSAGES_STORE, UI_STORE, PURCHASE_STORE)
@observer
export default class RegisterContainer extends React.Component<IProps, IState> {
	private authStore: AuthStore;
	private modalStore: ModalStore;
	private messagesStore: MessagesStore;
	private uiStore: UiStore;
	private purchaseStore: PurchaseStore;
	constructor(props: IProps) {
		super(props);
		this.state = {};
		this.authStore = this.props[AUTH_STORE] as AuthStore;
		this.modalStore = this.props[MODAL_STORE] as ModalStore;
		this.messagesStore = this.props[MESSAGES_STORE] as MessagesStore;
		this.uiStore = this.props[UI_STORE] as UiStore;
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

	private renderComponent = (isMobile: boolean) => {
		let authMessages;

		if (this.messagesStore.webSiteMessages.auth) {
			authMessages = this.messagesStore.webSiteMessages.auth;
		}
		return (
			<RegisterComponent
				isMobile={isMobile}
				onSubmitRequest={this.onFormSubmitRequest}
				closeModal={this.modalStore.closeModal}
				authMessages={authMessages}
				showLoadingPopUp={() => {
					this.uiStore.showBlockUiLoadingPopUp();
				}}
				closeLoadingPopUp={() => {
					this.uiStore.closeBlockUiLoadingPopUp();
				}}
			/>
		);
	};

	private onFormSubmitRequest = async (values: {
		email: string;
		password: string;
		validatePassword: string;
		deals: boolean;
	}) => {
		try {
			const result = await this.authStore.handleRegister(
				values.email,
				values.password,
				values.validatePassword,
				values.deals,
				this.purchaseStore.getSendGiftModel,
				this.props.fromPurchase
			);
			return result;
		} catch (err) {
			Logger.error('error occurd in registration', err);
			AlertUtils.checkApiErrorAndShowPopUp(err);
		}
	};
}
