import AlertUtils from 'common/errorHandling/AlertUtils';
import {ApiError} from 'common/errorHandling/ErrorTypes/declaredTypes';
import UserModel from 'common/models/User.model';
import ValidationSchemas from 'common/utils/validations/validationSchemas';
import Lang from 'Infrastructure/Language/Language';
import React, {Component} from 'react';
import {InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import {Button, Container, Form, Segment} from 'semantic-ui-react';
import ForgotPasswordContainer from 'UI/containers/ForgotPassword/ForgotPassword.container';
import UpdatePasswordContainer from 'UI/containers/UpdatePassword/UpdatePassword.container';
import CustomFormInputComponent from '../custom/customFormInputs/CustomFormInput.component';
import FormInputPasswordComponent from '../custom/FormInputPassword/FormInputPassword.component';
import FormWrapper from '../FormWrapper';
interface IProps {
	onSubmitRequest?: any;
	isMobile?: boolean;
	openModal?: any;
	closeModal?: any;
	onForgotPasswordClick: any;
	intl: InjectedIntl;
}

interface IState {
	loading: boolean;
	password: string;
}

class LoginWithEmailComponent extends Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			loading: false,
			password: '',
		};
	}
	public render() {
		return (
			<FormWrapper
				onSubmit={this.onSubmit}
				validationSchema={ValidationSchemas.loginSchema}
				initialValues={{email: '', password: this.state.password}}>
				{this.logInForm}
			</FormWrapper>
		);
	}

	private onSubmit = (values: {email: string; password: string | undefined}) => {
		this.setState({loading: true});
		this.props
			.onSubmitRequest(values)
			.then((userModel: UserModel) => {
				if (userModel && !userModel.isUpdatePasswordRequired) {
					this.setState({loading: false});
					this.props.closeModal();
					AlertUtils.showGeneralSuccessPopUp(this.props.intl.formatMessage({id: 'LoginWIthEmail.SuccessMessage'}));
				} else {
					this.props.closeModal();
					this.setState({loading: false});
					this.props.openModal(<UpdatePasswordContainer token={userModel.token} closeModal={this.props.closeModal} />, {
						title: 'general.ChangePassword',
					});
				}
			})
			.catch((err: ApiError) => {
				AlertUtils.checkApiErrorAndShowPopUp(err);
				this.setState({loading: false});
			});
		return false;
	};

	private logInForm = (props: {
		values: any;
		touched: any;
		errors: any;
		handleSubmit: any;
		handleChange: any;
		handleBlur: any;
	}) => {
		const {values, touched, errors, handleSubmit, handleChange, handleBlur} = props;
		return (
			<Form
				loading={this.state.loading}
				onSubmit={handleSubmit}
				desktopmodalform={!this.props.isMobile ? '1' : null}
				mobilemodalform={this.props.isMobile ? '1' : null}>
				<CustomFormInputComponent
					name='email'
					value={values.email}
					placeholder={Lang.format('general.EmailAddress')}
					onChange={handleChange}
					onBlur={handleBlur}
					error={errors.email && touched.email && errors.email}
					type='email'
				/>
				<FormInputPasswordComponent
					name='password'
					error={errors.password && touched.password && errors.password}
					placeholder={Lang.format('general.Password')}
					value={this.state.password}
					onChange={(e: any) => {
						handleChange(e);
						this.setState({password: e.target && e.target.value ? e.target.value.trim() : ''});
					}}
					onBlur={handleBlur}
				/>
				<Segment placeholder maxwidth100percent='1' nopadding='1'>
					<Button primary circular fluid type='submit'>
						{Lang.format('login.Login')}
					</Button>
					<Container textAlign='center'>
						<Button
							type='button'
							content={Lang.format('forgotPassword.ForgotPassowrd')}
							linkbutton='1'
							whitebackground='1'
							onClick={() => {
								this.props.onForgotPasswordClick(<ForgotPasswordContainer loginEmailVal={values.email} />);
								return false;
							}}
						/>
					</Container>
				</Segment>
			</Form>
		);
	};
}
export default withIntl(LoginWithEmailComponent);
