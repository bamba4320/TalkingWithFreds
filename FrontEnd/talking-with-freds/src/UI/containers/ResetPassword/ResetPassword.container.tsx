import {AUTH_STORE} from 'BL/stores';
import AuthStore from 'BL/stores/Auth.store';
import AlertUtils from 'common/errorHandling/AlertUtils';
import UserModel from 'common/models/User.model';
import {getQueryParam} from 'common/routes/historyUtils';
import {routesPaths} from 'common/routes/routesPaths.consts';
import {inject, observer} from 'mobx-react';
import Router, {SingletonRouter, withRouter} from 'next/router';
import * as React from 'react';
import {InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import {Container, Image} from 'semantic-ui-react';
import ResetPasswordComponent from 'UI/components/passwords/ResetPassword.component';

export interface IProps {
	[AUTH_STORE]?: AuthStore;
	router: SingletonRouter;
	intl: InjectedIntl;
}

export interface IState {}

@inject(AUTH_STORE)
@observer
class ResetPasswordContainer extends React.Component<IProps, IState> {
	private authStore: AuthStore;
	constructor(props: IProps) {
		super(props);
		this.state = {};
		this.authStore = this.props[AUTH_STORE] as AuthStore;
	}

	public async componentDidMount() {
		const tokenCode = getQueryParam(Router, 'tokenCode');
		const memberId = getQueryParam(Router, 'memberId');
		try {
			await this.authStore.validateForgotPasswordUrl(tokenCode, memberId);
		} catch (err) {
			AlertUtils.checkApiErrorAndShowPopUp(err, '', true, this.redirateOnErr);
		}
	}

	public render() {
		return (
			<Container className='reset-password-container'>
				<Container className='logo'>
					<Image src='/static/images/main.png' />
				</Container>
				<Container className='update-password-component'>
					<ResetPasswordComponent onSubmitRequest={this.onFormSubmitRequest} />
				</Container>
			</Container>
		);
	}

	private onFormSubmitRequest = async (values: {password: string}) => {
		try {
			const tokenCode = getQueryParam(this.props.router, 'tokenCode') as string;
			const memberId = getQueryParam(this.props.router, 'memberId') as string;
			const userModel: UserModel = await this.authStore.handleResetPassowrd(values.password, tokenCode, memberId);
			if (userModel) {
				await AlertUtils.showGeneralSuccessPopUp(
					this.props.intl.formatMessage({id: 'AlertUtils.PasswordUpdateSuccessMessage'})
				);
				this.props.router.replace(routesPaths.root);
			}
		} catch (err) {
			await AlertUtils.checkApiErrorAndShowPopUp(err);
		}
	};

	private redirateOnErr() {
		Router.push(`${routesPaths.root}?invalidRecoverUrl=1`);
	}
}
export default withRouter(withIntl(ResetPasswordContainer));
