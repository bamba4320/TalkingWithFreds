import React from 'react';
import rootStores from '../../../BL/stores';
import {AUTH_STORE, UI_STORE} from '../../../BL/stores/storesKeys';
import LoginFormComponent from '../../components/Login/LoginForm.component';
import './Login.container.scss';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import AlertUtils from '../../../Infrastructure/Utils/AlertUtils/AlertUtils';

interface IProps extends RouteComponentProps {}
interface IState {}

const authStore = rootStores[AUTH_STORE];
const uiStore = rootStores[UI_STORE];
class LoginContainer extends React.Component<IProps, IState> {
	public render() {
		return (
			<div className='page-background'>
				<div className='login-container-wrapper'>
					<div>
						<LoginFormComponent
							onSubmit={this.onSubmit}
							onRegisterClick={this.onRegisterClick}
							onForgotPassword={this.onRecoverPassword}
						/>
					</div>
				</div>
			</div>
		);
	}

	private onSubmit = (email: string, password: string) => {
		uiStore.blockUiSite();
		uiStore.showBlockUiLoadingPopUp();
		authStore
			.authenticateLogin(email, password, () => {
				uiStore.closeBlockUiLoadingPopUp();
				uiStore.unblockUiSite();
				return AlertUtils.showGeneralSuccessPopUp('Login was successfuly!');
			})
			.catch((err) => {
				uiStore.closeBlockUiLoadingPopUp();
				uiStore.unblockUiSite();
				AlertUtils.showGeneralErrorPopUp(err.message, true);
			});
	};

	private onRegisterClick = () => {
		this.props.history.push('/Register');
	};

	private onRecoverPassword = () => {
		this.props.history.push('/RecoverPassword');
	};
}
export default withRouter(LoginContainer);
