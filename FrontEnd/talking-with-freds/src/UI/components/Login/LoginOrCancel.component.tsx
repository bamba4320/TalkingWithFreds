import {MODAL_STORE} from 'BL/stores';
import ModalStore from 'BL/stores/Modal.store';
import {inject} from 'mobx-react';
import React, {Component} from 'react';
import {InjectedIntl, FormattedMessage} from 'react-intl';
import {Button, Header, Segment} from 'semantic-ui-react';
import MainLoginComponent from './MainLogin.component';
interface IProps {
	[MODAL_STORE]?: ModalStore;
	fromPurchase?: boolean;
	intl: InjectedIntl;
}

interface IState {}

@inject(MODAL_STORE)
export default class LoginOrCancelComponent extends Component<IProps, IState> {
	private modalStore: ModalStore;
	constructor(props: IProps) {
		super(props);
		this.state = {};
		this.modalStore = this.props[MODAL_STORE] as ModalStore;
	}

	public render() {
		const intl = this.props.intl as InjectedIntl;
		return (
			<div className='login-or-cancel-div'>
				<Header as='h2' nomargin='1'>
					<Header.Subheader blackheader='1'>{intl.formatMessage({id: 'myGifts.popupText'})}</Header.Subheader>
				</Header>
				<Segment placeholder>
					<Segment.Inline className='inline-segment'>
						<Button
							className='login-or-cancel-btn'
							circular
							primary
							onClick={() => {
								this.modalStore.openModal(
									<MainLoginComponent
										fromPurchase={this.props.fromPurchase}
										openModal={this.modalStore.openModal}
										closeModal={this.modalStore.closeModal}
									/>,
									{
										title: 'login.LoginOrRegister',
										fullScreen: true,
										closeFromOutsideModal: true,
									}
								);
							}}>
							<FormattedMessage id='LoginOrCancel.Login' />
						</Button>
						<Button className='login-or-cancel-btn' circular primary onClick={() => this.modalStore.closeModal()}>
							<FormattedMessage id='LoginOrCancel.Cancel' />
						</Button>
					</Segment.Inline>
				</Segment>
			</div>
		);
	}
}
