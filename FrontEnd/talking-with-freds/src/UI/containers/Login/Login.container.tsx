import React from 'react';
import AuthStore from '../../../BL/stores/Auth.store';
import './Login.container.scss';
import LoginFormComponent from '../../components/Login/LoginForm.component';

interface IProps {
	authStore: AuthStore;
}
interface IState {}

export default class LoginContainer extends React.Component<IProps, IState> {
	public render() {
		return (
			<div className='page-background'>
			<div className='login-container-wrapper'>
				<div>
					<LoginFormComponent onSubmit={this.onSubmit} />
				</div>
			</div>
			</div>
		);
	}

	private onSubmit = (email: string, password: string) => {
		this.props.authStore.authenticateLogin(email, password);
	};
}
