import ValidationSchemas from 'common/utils/validations/validationSchemas';
import Lang from 'Infrastructure/Language/Language';
import React from 'react';
import {Button, Container, Form, Header} from 'semantic-ui-react';
import FormInputPasswordComponent from '../custom/FormInputPassword/FormInputPassword.component';
import FormWrapper from '../FormWrapper';

interface Props {
	onSubmitRequest: any;
}

interface IState {}

export default class ResetPasswordComponent extends React.Component<Props, IState> {
	constructor(props: Readonly<Props>) {
		super(props);
		this.state = {};
	}

	public render() {
		return (
			<FormWrapper
				onSubmit={this.props.onSubmitRequest}
				validationSchema={ValidationSchemas.validatePasswordSchema}
				initialValues={{password: '', validatePassword: ''}}>
				{this.resetPasswordForm}
			</FormWrapper>
		);
	}

	private resetPasswordForm = (props: {
		values: any;
		touched: any;
		errors: any;
		handleSubmit: any;
		handleChange: any;
		handleBlur: any;
	}) => {
		const {values, touched, errors, handleSubmit, handleChange, handleBlur} = props;
		return (
			<Form onSubmit={handleSubmit} className='reset-password-main-form'>
				<Container textAlign='center'>
					<Header primaryheader='1' size='huge'>
						{Lang.format('updatePassword.UpdatePassword')}
						<Header.Subheader primaryheader='1' size='tiny'>
							{Lang.format('updatePassword.WriteNewPassword')}
						</Header.Subheader>
					</Header>
				</Container>
				<Container text className='passwords-container'>
					<FormInputPasswordComponent
						name='password'
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.password}
						placeholder={Lang.format('updatePassword.NewPassword')}
						error={errors.password && touched.password && errors.password}
					/>
					<FormInputPasswordComponent
						name='validatePassword'
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.validatePassword}
						placeholder={Lang.format('updatePassword.ValidateNewPassword')}
						error={errors.validatePassword && touched.validatePassword && errors.validatePassword}
					/>
				</Container>
				<Button primary circular type='submit' fluid resetpasswordbutton='1'>
					{Lang.format('general.ChangePassword')}
				</Button>
			</Form>
		);
	};
}
