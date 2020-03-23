import React from 'react';
import rootStores from '../../../BL/stores';
import {AUTH_STORE} from '../../../BL/stores/storesKeys';
import LoginFormComponent from '../../components/Login/LoginForm.component';
import './Login.container.scss';

interface IProps {}
interface IState {}
const authStore = rootStores[AUTH_STORE];
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
		authStore.authenticateLogin(email, password);
	};
}
