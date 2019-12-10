import AlertUtils from 'common/errorHandling/AlertUtils';
import {ApiError} from 'common/errorHandling/ErrorTypes/declaredTypes';
import {ErrorValidate} from 'common/errorHandling/ErrorTypes/ErrorValidate';
import {routesPaths} from 'common/routes/routesPaths.consts';
import Router from 'next/router';
import React from 'react';
import {InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';

interface Props {
	onVerifying: any;
	showLoadingPopUp: any;
	closeLoadingPoUp: any;
	openRegisterModal?: any;
	update?: boolean;
	intl: InjectedIntl;
}

interface IState {
	loading: boolean;
}

class VerifyUserComponent extends React.Component<Props, IState> {
	constructor(props: Readonly<Props>) {
		super(props);
		this.state = {
			loading: true,
		};
	}

	public componentDidMount() {
		this.props.showLoadingPopUp();

		this.props
			.onVerifying()
			.then((verificationData: any) => {
				if (verificationData) {
					this.props.closeLoadingPoUp();
					AlertUtils.showGeneralSuccessPopUp(
						this.props.intl.formatMessage({id: 'varifyUser.verifySuccess'}),
						false,
						() => {
							if (this.props.update) {
								Router.push(routesPaths.profile.root); // moving to profile page.
							} else {
								Router.push(routesPaths.root); // moving to home page.
							}
						}
					);
				}
				this.setState({loading: false});
			})
			.catch((err: ApiError | ErrorValidate) => {
				this.props.closeLoadingPoUp();
				if (err instanceof ErrorValidate) {
					AlertUtils.checkApiErrorAndShowPopUp(
						err,
						this.props.intl.formatMessage({id: 'varifyUser.verifyError'}),
						false,
						() => {
							Router.push(routesPaths.root); // moving to home page.
							this.props.openRegisterModal(); // opening register modal.
							AlertUtils.showInformationalPopUp(
								this.props.intl.formatMessage({id: 'varifyUser.signupRequeired'}),
								false
							);
						}
					);
				} else {
					AlertUtils.checkApiErrorAndShowPopUp(err, undefined, undefined, () => {
						Router.push(routesPaths.root); // moving to home page.
					});
				}
			});
	}

	public render() {
		return <></>;
	}
}
export default withIntl(VerifyUserComponent);
