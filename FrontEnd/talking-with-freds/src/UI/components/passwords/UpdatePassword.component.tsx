import ValidationSchemas from 'common/utils/validations/validationSchemas';
import Lang from 'Infrastructure/Language/Language';
import React from 'react';
import {Button, Container, Form, Segment} from 'semantic-ui-react';
import FormInputPasswordComponent from '../custom/FormInputPassword/FormInputPassword.component';
import FormWrapper from '../FormWrapper';

interface Props {
	onSubmitRequest: any;
	duplicateErrorMessage: string;
}

interface IState {
	password: string;
	validatePassword: string;
}

export default class UpdatePasswordComponent extends React.Component<Props, IState> {
	constructor(props: Props) {
		super(props);
		this.state = {
			password: '',
			validatePassword: '',
		};
	}

	public render() {
		return (
			<FormWrapper
				onSubmit={this.props.onSubmitRequest}
				validationSchema={ValidationSchemas.changePasswordSchema(this.props.duplicateErrorMessage)}
				initialValues={{
					password: this.state.password,
					newPassword: '',
					validatePassword: this.state.validatePassword,
				}}>
				{this.updatePasswordForm}
			</FormWrapper>
		);
	}

	private updatePasswordForm = (props: {
		values: any;
		touched: any;
		errors: any;
		handleSubmit: any;
		handleChange: any;
		handleBlur: any;
	}) => {
		const {values, touched, errors, handleSubmit, handleChange, handleBlur} = props;
		return (
			<Form onSubmit={handleSubmit}>
				<Container fluid text>
					<FormInputPasswordComponent
						name='password'
						onChange={(e: Event) => {
							handleChange(e);
							this.setState({password: e.target ? e.target.value.trim() : ''});
						}}
						onBlur={handleBlur}
						value={this.state.password}
						placeholder={Lang.format('changePassword.CurrentPassword')}
						error={errors.password && touched.password && errors.password}
					/>
					<FormInputPasswordComponent
						name='newPassword'
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.newPassword}
						placeholder={Lang.format('updatePassword.NewPassword')}
						error={errors.newPassword && touched.newPassword && errors.newPassword}
					/>
					<FormInputPasswordComponent
						name='validatePassword'
						onChange={(e: Event) => {
							handleChange(e);
							this.setState({validatePassword: e.target ? e.target.value.trim() : ''});
						}}
						onBlur={handleBlur}
						value={this.state.validatePassword}
						placeholder={Lang.format('updatePassword.ValidateNewPassword')}
						error={errors.validatePassword && touched.validatePassword && errors.validatePassword}
					/>
					<Segment placeholder>
						<Button primary circular type='submit' fluid largerwidth='1'>
							{Lang.format('profile.SaveDetails')}
						</Button>
					</Segment>
				</Container>
			</Form>
		);
	};
}
