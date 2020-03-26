import React from 'react';
import rootStores from '../../../BL/stores';
import {AUTH_STORE} from '../../../BL/stores/storesKeys';
import LoginFormComponent from '../../components/Login/LoginForm.component';
import './Login.container.scss';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface IProps extends RouteComponentProps {

}
interface IState {}
const authStore = rootStores[AUTH_STORE];
class LoginContainer extends React.Component<IProps, IState>{
	public render() {
		return (
			<div className='page-background'>
				<div className='login-container-wrapper'>
					<div>
						<LoginFormComponent onSubmit={this.onSubmit} onRegisterClick={this.onRegisterClick} />
					</div>
				</div>
			</div>
		);
	}

	private onSubmit = (email: string, password: string) => {
		authStore.authenticateLogin(email, password);
	};

	private onRegisterClick = () =>{
		this.props.history.replace('/Register');
	}
}
export default withRouter(LoginContainer);