import {AUTH_STORE} from 'BL/stores';
import AuthStore from 'BL/stores/Auth.store';
import {inject, observer} from 'mobx-react';
import * as React from 'react';
import {Grid} from 'semantic-ui-react';
import ForgotPasswordComponent from '../../components/passwords/ForgotPassword.component';

export interface IProps {
	[AUTH_STORE]?: AuthStore;
	loginEmailVal: string;
}

export interface IState {}

@inject(AUTH_STORE)
@observer
export default class ForgotPasswordContainer extends React.Component<IProps, IState> {
	private authStore: AuthStore;
	constructor(props: IProps) {
		super(props);
		this.state = {};
		this.authStore = this.props[AUTH_STORE] as AuthStore;
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

	private onFormSubmitRequest = (values: {email: string}) => {
		return this.authStore.handleRecoverPassword(values.email);
	};

	private renderComponent(isMobile: boolean) {
		return (
			<ForgotPasswordComponent
				onSubmitRequest={this.onFormSubmitRequest}
				isMobile={isMobile}
				loginEmailVal={this.props.loginEmailVal}
			/>
		);
	}
}
