import {AUTH_STORE, MODAL_STORE, UI_STORE} from 'BL/stores';
import AuthStore from 'BL/stores/Auth.store';
import ModalStore from 'BL/stores/Modal.store';
import UiStore from 'BL/stores/Ui.store';
import {getQueryParam} from 'common/routes/historyUtils';
import {inject, observer} from 'mobx-react';
import {SingletonRouter, withRouter} from 'next/router';
import * as React from 'react';
import VerifyUserComponent from 'UI/components/Verify/VerifyUser.component';
import RegisterContainer from '../Register/Register.container';

export interface IProps {
	[AUTH_STORE]?: AuthStore;
	[UI_STORE]?: UiStore;
	[MODAL_STORE]?: ModalStore;
	router: SingletonRouter;
	update?: boolean;
}

export interface IState {}

@inject(AUTH_STORE, UI_STORE, MODAL_STORE)
@observer
class VerifyUserContainer extends React.Component<IProps, IState> {
	private authStore: AuthStore;
	private uiStore: UiStore;
	private modalStore: ModalStore;
	constructor(props: IProps) {
		super(props);
		this.state = {};
		this.authStore = this.props[AUTH_STORE] as AuthStore;
		this.uiStore = this.props[UI_STORE] as UiStore;
		this.modalStore = this.props[MODAL_STORE] as ModalStore;
	}

	public render() {
		return (
			<VerifyUserComponent
				onVerifying={this.onUserVerifying}
				showLoadingPopUp={this.uiStore.showBlockUiLoadingPopUp}
				closeLoadingPoUp={this.uiStore.closeBlockUiLoadingPopUp}
				openRegisterModal={() => {
					this.modalStore.openModal(<RegisterContainer />, {title: 'register.RegisterWithEmail'});
				}}
				update={this.props.update}
			/>
		);
	}

	private onUserVerifying = () => {
		return this.authStore.handleVerifyUser(getQueryParam(this.props.router, 'tokenCode') as string);
	};
}
export default withRouter(VerifyUserContainer);
