import AlertUtils from 'common/errorHandling/AlertUtils';
import {ApiError} from 'common/errorHandling/ErrorTypes/declaredTypes';
import {routesPaths} from 'common/routes/routesPaths.consts';
import ValidationSchemas from 'common/utils/validations/validationSchemas';
import Lang from 'Infrastructure/Language/Language';
import Link from 'next/link';
import React from 'react';
import {FormattedMessage, InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import {Button, Form, Header, Segment} from 'semantic-ui-react';
import CustomFormInputComponent from '../custom/customFormInputs/CustomFormInput.component';
import FormWrapper from '../FormWrapper';

interface Props {
	onSubmitRequest: any;
	isMobile: boolean;
	closeModal: any;
	openUi: any;
	closeUi: any;
	intl: InjectedIntl;
}

interface IState {
	loading: boolean;
}

class RecoverDigitalCodeComponent extends React.Component<Props, IState> {
	constructor(props: Readonly<Props>) {
		super(props);
		this.state = {
			loading: false,
		};
	}

	public render() {
		return (
			<div className='recover-code-div'>
				<Segment placeholder paddingbottom45='1' marginauto='1' paddingtop7={this.props.isMobile ? '1' : null}>
					<Header as='h2' className='center aligned'>
						<Header.Subheader size='small' primaryheader='1' className='center aligned'>
							{this.props.intl.formatMessage({id: 'recover.des1'})}
						</Header.Subheader>
						<Header.Subheader size='small' primaryheader='1' className='center aligned'>
							{`${this.props.intl.formatMessage({id: 'recover.des2'})}  
							${this.props.intl.formatMessage({id: 'recover.des3'})}`}
						</Header.Subheader>
					</Header>
				</Segment>
				<FormWrapper
					onSubmit={this.onSubmit}
					validationSchema={ValidationSchemas.recoverCodeValidationSchema}
					initialValues={{emailOrPhone: ''}}>
					{this.RecoverDigitalCodeForm}
				</FormWrapper>
				<div className='recover-cant-recover-div'>
					<FormattedMessage id='recover.cantRecover' />
					<Segment maxwidth100percent='1' nopadding='1' placeholder>
						<Link href={routesPaths.contactUs.root}>
							<a>
								<Button
									noletterspacing='1'
									opositebutton='1'
									circular
									fluid
									type='button'
									largerwidth='1'
									onClick={() => {
										this.props.closeModal(true);
									}}>
									{Lang.format('recover.contactus')}
								</Button>
							</a>
						</Link>
					</Segment>
				</div>
			</div>
		);
	}

	private onSubmit = (values: {emailOrPhone: any}) => {
		const intl = this.props.intl as InjectedIntl;
		this.setState({loading: true});
		this.props.openUi();
		this.props
			.onSubmitRequest(values)
			.then((isSuccess: boolean) => {
				this.props.closeUi();
				if (isSuccess) {
					AlertUtils.showGeneralSuccessPopUp(intl.formatMessage({id: 'recoverCode.success'}));
					this.props.closeModal();
				} else {
					AlertUtils.showGeneralErrorPopUp(intl.formatMessage({id: 'recoverCode.error'}));
				}
				this.setState({loading: false});
			})
			.catch((err: ApiError) => {
				AlertUtils.checkApiErrorAndShowPopUp(err);
				this.props.closeUi();
				this.setState({loading: false});
			});
	};

	private RecoverDigitalCodeForm = (props: {
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
				className='code-recover-form'
				onSubmit={handleSubmit}
				loading={this.state.loading}
				desktopmodalform={!this.props.isMobile ? '1' : null}
				mobilemodalform={this.props.isMobile ? '1' : null}>
				<CustomFormInputComponent
					name='emailOrPhone'
					onChange={handleChange}
					onBlur={handleBlur}
					value={values.emailOrPhone}
					placeholder={Lang.format('digitalCodeRecovery.emailOrPhone')}
					error={errors.emailOrPhone && touched.emailOrPhone && errors.emailOrPhone}
				/>
				<Segment placeholder nopadding='1' nomargin='1'>
					<Button primary circular fluid noletterspacing='1' type='submit' largerwidth='1'>
						{Lang.format('digitalCodeRecovery.SendToRecoverCode')}
					</Button>
				</Segment>
			</Form>
		);
	};
}
export default withIntl(RecoverDigitalCodeComponent);
