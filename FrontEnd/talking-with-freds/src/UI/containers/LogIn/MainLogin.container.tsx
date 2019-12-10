import {MODAL_STORE} from 'BL/stores';
import ModalStore from 'BL/stores/Modal.store';
import {IconType} from 'common/generalconsts/custom.enums';
import Lang from 'Infrastructure/Language/Language';
import {inject, observer} from 'mobx-react';
import React, {Component} from 'react';
import {Button} from 'semantic-ui-react';
import MainLoginComponent from 'UI/components/Login/MainLogin.component';
interface IProps {
	[MODAL_STORE]?: ModalStore;
}
interface IState {
	modal: any;
	modalHeaderText: string;
	mobileExitModalIcon: any;
}

@inject(MODAL_STORE)
@observer
export default class MainLoginContainer extends Component<IProps, IState> {
	private modalStore: ModalStore;
	constructor(props: Readonly<IProps>) {
		super(props);
		this.state = {
			mobileExitModalIcon: IconType.exit,
			modal: undefined,
			modalHeaderText: Lang.format('login.Login'),
		};
		this.modalStore = this.props[MODAL_STORE] as ModalStore;
	}

	public render() {
		return (
			<Button
				size='small'
				loginorregisterbutton='1'
				color='teal'
				circular
				onClick={() => {
					this.modalStore.openModal(
						<MainLoginComponent openModal={this.modalStore.openModal} closeModal={this.modalStore.closeModal} />,
						{
							title: 'login.LoginOrRegister',
							fullScreen: true,
							closeFromOutsideModal: true,
						}
					);
				}}>
				{Lang.format('login.LoginOrRegister')}
			</Button>
		);
	}
}
