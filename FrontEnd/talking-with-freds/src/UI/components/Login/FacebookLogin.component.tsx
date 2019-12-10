import AlertUtils from 'common/errorHandling/AlertUtils';
import {ApiError} from 'common/errorHandling/ErrorTypes/declaredTypes';
import UserModel from 'common/models/User.model';
import EnvConfig from 'Infrastructure/config/env.config';
import React, {Component} from 'react';
import FacebookLogin from 'react-facebook-login';
import {InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import RegisterContainer from 'UI/containers/Register/Register.container';
import UpdatePasswordContainer from 'UI/containers/UpdatePassword/UpdatePassword.container';

interface IProps {
	onFBSubmitRequest?: any;
	openModal?: any;
	closeModal?: any;
	showLoadingPopup?: any;
	closeLoadingPopup?: any;
	intl: InjectedIntl;
}
interface IState {
	accessToken?: string;
	loading?: boolean;
	userId?: string;
	userName?: string;
	userEmail?: string;
}

class FacebookLoginComponent extends Component<IProps, IState> {
	constructor(props: Readonly<IProps>) {
		super(props);
		this.state = {
			accessToken: undefined,
			loading: false,
			userEmail: undefined,
			userId: undefined,
			userName: undefined,
		};
	}

	public render() {
		let fbContent;
		fbContent = (
			/* This is the facebook button */
			<FacebookLogin
				// app id will be changed automatically using the env files.
				appId={EnvConfig.getFacebookAppID()!}
				autoLoad={false}
				fields='name,email,picture'
				onClick={this.componentClicked}
				callback={this.responseFacebook}
				onFailure={this.responseFailed}
				cssClass='ui facebook circular fluid button'
				icon='fa-facebook'
				redirectUri='/'
				isMobile={false}
				textButton={this.props.intl.formatMessage({id: 'login.Facebook'})}
			/>
		);

		return <>{fbContent}</>;
	}

	private componentClicked = () => {
		// block the ui when clicking on the button.
		this.props.showLoadingPopup(this.props.intl.formatMessage({id: 'facebookLogin.login'}));
	};

	private responseFailed = () => {
		this.props.closeLoadingPopup();
	};

	private moveToRegisterModal = () => {
		// open register modal.
		this.props.openModal(<RegisterContainer />, {title: 'register.RegisterWithEmail'});
	};

	private responseFacebook = (response: any) => {
		if (response) {
			this.setState({
				accessToken: response.accessToken,
				userEmail: response.email,
				userId: response.userID,
				userName: response.name,
			});

			this.props
				.onFBSubmitRequest(this.state.userId, this.state.accessToken)
				.then((userModel: UserModel) => {
					if (userModel && !userModel.isUpdatePasswordRequired) {
						AlertUtils.showGeneralSuccessPopUp(this.props.intl.formatMessage({id: 'facebookLogin.success'}));
						this.props.closeModal();
						this.setState({loading: false});
					} else {
						this.props.closeModal();
						this.setState({loading: false});
						this.props.openModal(
							<UpdatePasswordContainer token={userModel.token} closeModal={this.props.closeModal} />,
							{
								title: 'general.ChangePassword',
							}
						);
					}
				})
				.catch((err: ApiError) => {
					AlertUtils.checkApiErrorAndShowPopUp(err);
					this.setState({loading: false});
				});
		} else {
			// response returned undefined => move to register modal.. (TODO: check if needed to add error popup).
			this.moveToRegisterModal();
		}
	};
}
export default withIntl(FacebookLoginComponent);
