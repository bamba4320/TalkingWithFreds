import AlertUtils from 'common/errorHandling/AlertUtils';
import {ApiError} from 'common/errorHandling/ErrorTypes/declaredTypes';
import UserModel from 'common/models/User.model';
import EnvConfig from 'Infrastructure/config/env.config';
import Lang from 'Infrastructure/Language/Language';
import React, {Component} from 'react';
import GoogleLogin from 'react-google-login';
import {Icon} from 'semantic-ui-react';
import RegisterContainer from 'UI/containers/Register/Register.container';
import UpdatePasswordContainer from 'UI/containers/UpdatePassword/UpdatePassword.container';
import {InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';

interface IProps {
	onGLSubmitRequest?: any;
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
}

class GoogleLoginComponent extends Component<IProps, IState> {
	constructor(props: Readonly<IProps>) {
		super(props);
		this.state = {
			accessToken: undefined,
			loading: false,
			userId: undefined,
		};
	}

	public componentDidMount() {
		// remove all default styles of google button from the DOM.
		const googleBtnCollection = document.getElementsByClassName('ui google plus circular fluid button');
		for (let i = 0; i < googleBtnCollection.length; i++) {
			googleBtnCollection[i].removeAttribute('style');
			googleBtnCollection[i].addEventListener(
				'click',
				() => {
					googleBtnCollection[i].removeAttribute('style');
				},
				false
			);
		}
	}

	public render() {
		let glContent;

		glContent = (
			/* This is the google button */
			<GoogleLogin
				clientId={EnvConfig.getGoogleClientID()!}
				onSuccess={this.responseGoogleSuccess}
				onFailure={this.responseGoogleFailed}
				onRequest={this.onRequestGoogleResponse}
				cookiePolicy={'single_host_origin'}
				className='ui google plus circular fluid button'>
				<Icon name='google' />
				{this.props.intl.formatMessage({id: 'login.Google'})}
			</GoogleLogin>
		);

		return <>{glContent}</>;
	}

	private moveToRegisterModal = () => {
		// open register modal.
		this.props.openModal(<RegisterContainer />, {title: 'register.RegisterWithEmail'});
	};

	private responseGoogleFailed = () => {
		this.props.closeLoadingPopup();
	};

	private onRequestGoogleResponse = () => {
		this.props.showLoadingPopup(this.props.intl.formatMessage({id: 'googleLogin.login'}));
	};

	private responseGoogleSuccess = (response: any) => {
		if (response) {
			this.setState({
				accessToken: response.accessToken,
				userId: response.googleId,
			});

			this.props
				.onGLSubmitRequest(this.state.userId, this.state.accessToken)
				.then((userModel: UserModel) => {
					if (userModel && !userModel.isUpdatePasswordRequired) {
						AlertUtils.showGeneralSuccessPopUp(this.props.intl.formatMessage({id: 'googleLogin.success'}));
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
			// response returned undefined => move to register modal..
			this.moveToRegisterModal();
		}
	};
}
export default withIntl(GoogleLoginComponent);
