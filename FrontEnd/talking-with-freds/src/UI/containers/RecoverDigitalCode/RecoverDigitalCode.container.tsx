import {AUTH_STORE, MODAL_STORE, UI_STORE} from 'BL/stores';
import AuthStore from 'BL/stores/Auth.store';
import ModalStore from 'BL/stores/Modal.store';
import UiStore from 'BL/stores/Ui.store';
import {inject, observer} from 'mobx-react';
import * as React from 'react';
import {Grid} from 'semantic-ui-react';
import RecoverDigitalCodeComponent from 'UI/components/RecoverDigitalCode/RecoverDigitalCode.component';

export interface IProps {
	[AUTH_STORE]?: AuthStore;
	[MODAL_STORE]?: ModalStore;
	[UI_STORE]?: UiStore;
}

export interface IState {}

@inject(AUTH_STORE, MODAL_STORE, UI_STORE)
@observer
export default class RecoverDigitalCodeContainer extends React.Component<IProps, IState> {
	private authStore: AuthStore;
	private modalStore: ModalStore;
	private uiStore: UiStore;
	constructor(props: IProps) {
		super(props);
		this.state = {};
		this.authStore = this.props[AUTH_STORE] as AuthStore;
		this.modalStore = this.props[MODAL_STORE] as ModalStore;
		this.uiStore = this.props[UI_STORE] as UiStore;
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

	private onFormSubmitRequest = (values: {emailOrPhone: string}) => {
		return this.authStore.handleRecoverCode(values.emailOrPhone);
	};

	private renderComponent(isMobile: boolean) {
		return (
			<RecoverDigitalCodeComponent
				onSubmitRequest={this.onFormSubmitRequest}
				isMobile={isMobile}
				closeModal={this.modalStore.closeModal}
				openUi={this.uiStore.blockUiSite}
				closeUi={this.uiStore.unblockUiSite}
			/>
		);
	}
}
