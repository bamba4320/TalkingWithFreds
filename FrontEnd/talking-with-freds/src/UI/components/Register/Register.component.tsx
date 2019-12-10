import AlertUtils from 'common/errorHandling/AlertUtils';
import {ApiError} from 'common/errorHandling/ErrorTypes/declaredTypes';
import {LinkType} from 'common/generalconsts/custom.enums';
import UserModel from 'common/models/User.model';
import {routesPaths} from 'common/routes/routesPaths.consts';
import ValidationSchemas from 'common/utils/validations/validationSchemas';
import Lang from 'Infrastructure/Language/Language';
import Router from 'next/router';
import React from 'react';
import {Button, Form, Header, Segment} from 'semantic-ui-react';
import CustomCheckboxComponent from '../custom/customCheckbox/CustomCheckbox.component';
import CustomFormInputComponent from '../custom/customFormInputs/CustomFormInput.component';
import CustomLinkComponent from '../custom/customLink/CustomLink.component';
import FormInputPasswordComponent from '../custom/FormInputPassword/FormInputPassword.component';
import FormWrapper from '../FormWrapper';

interface Props {
	onSubmitRequest: any;
	closeModal?: any;
	authMessages?: any;
	showLoadingPopUp?: any;
	closeLoadingPopUp?: any;
	isMobile: boolean;
}

interface IState {
	loading: boolean;
	deals: boolean;
	password: string;
	validatePassword: string;
}

export default class RegisterComponent extends React.Component<Props, IState> {
	constructor(props: Readonly<Props>) {
		super(props);
		this.state = {
			loading: false,
			deals: false,
			password: '',
			validatePassword: '',
		};
	}

	public render() {
		return (
			<FormWrapper
				onSubmit={this.onSubmit}
				validationSchema={ValidationSchemas.registerSchema}
				initialValues={{
					email: '',
					password: this.state.password,
					validatePassword: this.state.validatePassword,
					deals: false,
				}}>
				{this.RegisterForm}
			</FormWrapper>
		);
	}

	private onSubmit = (values: {email: string; password: string; validatePassword: string; deals: boolean}) => {
		this.setState({loading: true});
		this.props.showLoadingPopUp();
		this.props
			.onSubmitRequest(values)
			.then((userData: UserModel) => {
				if (userData) {
					// TODO: check that the message text is the correct one.
					this.props.closeLoadingPopUp();
					AlertUtils.showGeneralSuccessPopUp(this.props.authMessages.registerVerification.messageText, false, () => {
						// move to home page.
						Router.push(routesPaths.root);
					});
					this.props.closeModal();
				}
				this.setState({loading: false});
			})
			.catch((err: ApiError) => {
				this.props.closeLoadingPopUp();
				AlertUtils.checkApiErrorAndShowPopUp(err);
				this.setState({loading: false});
			});
	};

	private RegisterForm = (props: {
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
				onSubmit={handleSubmit}
				loading={this.state.loading}
				desktopmodalform={!this.props.isMobile ? '1' : null}
				mobilemodalform={this.props.isMobile ? '1' : null}>
				<CustomFormInputComponent
					name='email'
					onChange={handleChange}
					value={values.email}
					placeholder={Lang.format('general.Email')}
					onBlur={handleBlur}
					error={errors.email && touched.email && errors.email}
					minheight65
					type='email'
				/>
				<FormInputPasswordComponent
					name='password'
					onChange={(e: Event) => {
						handleChange(e);
						this.setState({password: e.target ? e.target.value.trim() : ''});
					}}
					value={this.state.password}
					placeholder={Lang.format('general.Password')}
					onBlur={handleBlur}
					error={errors.password && touched.password && errors.password}
				/>
				<FormInputPasswordComponent
					name='validatePassword'
					onChange={(e: Event) => {
						handleChange(e);
						this.setState({validatePassword: e.target ? e.target.value.trim() : ''});
					}}
					onBlur={handleBlur}
					value={this.state.validatePassword}
					placeholder={Lang.format('general.ValidatePassword')}
					error={errors.validatePassword && touched.validatePassword && errors.validatePassword}
				/>
				<Form.Field>
					<CustomCheckboxComponent
						name='deals'
						value={values.deals}
						onChange={(_e: any, {checked}: any) => {
							values.deals = checked;
							this.setState({deals: values.deals});
						}}
						onBlur={handleBlur}
						label={Lang.format('profile.RegisterForUpdtaes')}
					/>
				</Form.Field>
				<Segment placeholder paddingtop20only='1' maxwidth100percent='1'>
					<Button primary circular fluid type='submit' largerwidth='1'>
						{Lang.format('register.RegisterToNofshonit')}
					</Button>
				</Segment>
				<Header as='h2' textAlign='center'>
					<Header.Subheader primaryheader='1'>{Lang.format('register.OnCreateAccount')}</Header.Subheader>
					<Header.Subheader primaryheader='1'>
						<Header primaryheaderandlink='1'>
							<CustomLinkComponent
								linkType={LinkType.primary}
								to={routesPaths.regulations}
								value={Lang.format('register.Limits')}
								openNewTab
							/>
							<Header.Subheader primaryheader='1' subheader-mr4='1'>
								{`${Lang.format('register.Ours')} `}
							</Header.Subheader>
						</Header>
					</Header.Subheader>
				</Header>
			</Form>
		);
	};
}
