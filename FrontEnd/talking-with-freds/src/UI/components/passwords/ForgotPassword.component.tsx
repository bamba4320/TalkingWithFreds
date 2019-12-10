import AlertUtils from 'common/errorHandling/AlertUtils';
import {ApiError} from 'common/errorHandling/ErrorTypes/declaredTypes';
import ValidationSchemas from 'common/utils/validations/validationSchemas';
import Lang from 'Infrastructure/Language/Language';
import React from 'react';
import {Button, Form, Header, Segment} from 'semantic-ui-react';
import CustomFormInputComponent from '../custom/customFormInputs/CustomFormInput.component';
import FormWrapper from '../FormWrapper';
import {InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';

interface Props {
	onSubmitRequest: any;
	isMobile: boolean;
	loginEmailVal: string;
	intl: InjectedIntl;
}

interface IState {
	loading: boolean;
}

class ForgotPasswordComponent extends React.Component<Props, IState> {
	constructor(props: Readonly<Props>) {
		super(props);
		this.state = {
			loading: false,
		};
	}

	public render() {
		return (
			<FormWrapper
				onSubmit={this.onSubmit}
				validationSchema={ValidationSchemas.emailValidationSchema}
				initialValues={{email: this.props.loginEmailVal}}>
				{this.forgotPasswordForm}
			</FormWrapper>
		);
	}

	private onSubmit = (values: {email: any}) => {
		this.setState({loading: true});
		this.props
			.onSubmitRequest(values)
			.then((isSuccess: boolean) => {
				if (isSuccess) {
					AlertUtils.showGeneralSuccessPopUp(this.props.intl.formatMessage({id: 'forgotPassword.linkSentSuccess'}));
				}
				this.setState({loading: false});
			})
			.catch((err: ApiError) => {
				AlertUtils.checkApiErrorAndShowPopUp(err);
				this.setState({loading: false});
			});
	};

	private forgotPasswordForm = (props: {
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
				<Segment placeholder padded='very' forgotpasswordsubheadline='1' maxwidth100percent='1'>
					<Header as='h2' textAlign='center'>
						<Header.Subheader size='small' primaryheader='1' forgotpasswordsize='1'>
							{Lang.format('forgotPassword.SendPasswordToReplice')}
						</Header.Subheader>
					</Header>
				</Segment>
				<CustomFormInputComponent
					name='email'
					onChange={handleChange}
					onBlur={handleBlur}
					value={values.email}
					placeholder={Lang.format('general.Email')}
					error={errors.email && touched.email && errors.email}
					type='email'
				/>
				<Segment placeholder paddingtop7='1' maxwidth100percent='1'>
					<Button primary circular fluid type='submit' largerwidth='1' noletterspacing='1'>
						{Lang.format('forgotPassword.SendToChangePassword')}
					</Button>
				</Segment>
			</Form>
		);
	};
}
export default withIntl(ForgotPasswordComponent);
