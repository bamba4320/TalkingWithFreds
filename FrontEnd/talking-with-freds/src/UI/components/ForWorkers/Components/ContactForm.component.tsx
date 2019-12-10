import ContactUsStore from 'BL/stores/ContactUs.store';
import CurrentUserStore from 'BL/stores/CurrentUser.store';
import MessagesStore from 'BL/stores/Messages.store';
import AlertUtils from 'common/errorHandling/AlertUtils';
import ContactUsDTO from 'common/models/DTOs/ContactUs.dto';
import OptionsDTO from 'common/models/DTOs/Options.dto';
import ValidationSchemas from 'common/utils/validations/validationSchemas';
import _ from 'lodash';
import {observer} from 'mobx-react';
import React from 'react';
import {InjectedIntl} from 'react-intl';
import {Card, Grid, Header, Image, GridColumn} from 'semantic-ui-react';
import ContactUsFormComponent from 'UI/components/ContactUsForm.component';
import FormWrapper from 'UI/components/FormWrapper';

interface IContactFormComponentProps {
	intl: InjectedIntl;
	contactStore: ContactUsStore;
	messagesStore: MessagesStore;
	currentUserStore: CurrentUserStore;
}
interface IContactFormComponentState {
	loading: boolean;
}

@observer
class ContactFormComponent extends React.Component<IContactFormComponentProps, IContactFormComponentState> {
	private contactStore: ContactUsStore;
	private messagesStore: MessagesStore;
	private formOptions: OptionsDTO[];
	ref = React.createRef() as React.RefObject<HTMLDivElement>;

	constructor(props: IContactFormComponentProps) {
		super(props);
		this.contactStore = this.props.contactStore;
		this.messagesStore = this.props.messagesStore;
		this.state = {loading: false};
		this.formOptions = [
			new OptionsDTO(0, this.props.intl.formatMessage({id: 'ContactUs.getPriceOffer'})),
			new OptionsDTO(1, this.props.intl.formatMessage({id: 'ContactUs.customerService'})),
		];
	}

	public componentDidMount() {
		(window as any).contactFormOffsetTop = this.ref;
	}

	public onIterestSelected = (selected: any, _name: any, value: any, values: any) => {
		values.interest = _.get(selected, 'target.innerText', '');
		values.interestID = value;
	};

	public onChangeSelectMobile = (value: number, values: any) => {
		values.interest = this.formOptions.filter((option) => option.value === value)[0].text;
		values.interestID = value;
	};

	public onSubmitClick = async (values: any) => {
		try {
			this.setState({loading: true});
			const responseData = await this.contactStore.handleContact(values, 'EmployeeGift');

			// here we can show a message after a user sent a request.
			let contactMsg;
			if (this.messagesStore.webSiteMessages.contact) {
				contactMsg = this.messagesStore.webSiteMessages.contact.msgSent.messageText;
			}
			if (responseData) {
				AlertUtils.showGeneralSuccessPopUp(contactMsg ? contactMsg : '');
			}
		} catch (err) {
			AlertUtils.checkApiErrorAndShowPopUp(err);
		} finally {
			this.setState({loading: false});
		}
	};

	public renderForm = () => {
		const contactDto = new ContactUsDTO();
		const currentUser = this.props.currentUserStore.currentProfile();
		if (currentUser) {
			contactDto.email = currentUser.email;
			contactDto.name = currentUser.name;
			contactDto.phone = currentUser.phone;
		}
		return (
			<FormWrapper
				onSubmit={this.onSubmitClick}
				validationSchema={ValidationSchemas.contactUsSchema}
				initialValues={contactDto}>
				{this.contactUsForm}
			</FormWrapper>
		);
	};

	public contactUsForm = (props: {
		values: any;
		touched: any;
		errors: any;
		handleSubmit: any;
		handleChange: any;
		handleBlur: any;
	}) => {
		return (
			<div className='contact-form-width'>
				<ContactUsFormComponent
					isContactUsForm={true}
					formProps={props}
					loading={this.state.loading}
					onIterestSelected={this.onIterestSelected}
					onChangeSelectMobile={this.onChangeSelectMobile}
					contactUsOptions={this.formOptions}
					maxLen={{help: 600, phone: 10}}
				/>
			</div>
		);
	};

	public render() {
		const phoneNumber = '03-5234754';
		const atPhone = this.props.intl.formatMessage({id: 'EmployeeGift.atPhone'});
		const phoneImage = '/static/images/PhoneLogo.png';
		return (
			<>
				<div ref={this.ref}>
					<div className='hide-mobile contact-us-employee'>
						<Grid style={{padding: '45px'}}>
							<Grid.Column computer={2} largeScreen={1} widescreen={2} />
							<Grid.Column computer={4} largeScreen={3} widescreen={4}>
								<div>
									{/* <div className='space-15' /> */}
									<div className='space-20' />
									<div className='header-with-underline-same-height'>
										{this.props.intl.formatMessage({id: 'EmployeeGift.talkToUs'})}
									</div>
									<div className='employee-gifts-contact-text'>
										{this.props.intl.formatMessage({id: 'EmployeeGift.contactMessage'})}
									</div>
									<Grid columns={2}>
										<Grid.Column width={4}>
											<Image src={phoneImage} />
										</Grid.Column>
										<Grid.Column>
											<div className='top-margin'>
												<Grid>
													<Grid.Row zeropadding='1'>
														<span className='phone-text'>{atPhone}</span>
													</Grid.Row>
													<Grid.Row zeropadding='1'>
														<span className='phone-number'>{phoneNumber}</span>
													</Grid.Row>
												</Grid>
											</div>
										</Grid.Column>
									</Grid>
								</div>
							</Grid.Column>
							<Grid.Column width={2} />
							<Grid.Column computer={6} largeScreen={6} widescreen={5}>
								<Card fluid marginbottom8='1'>
									<Card.Content>
										<Header as='h2' cardheader='true'>
											{this.props.intl.formatMessage({id: 'contact.SendUsMessage'})}
										</Header>
									</Card.Content>
									<Card.Content>{this.renderForm()}</Card.Content>
								</Card>
							</Grid.Column>
							<Grid.Column computer={2} largeScreen={2} widescreen={3} />
						</Grid>
					</div>
					<div className='hide-desktop'>
						<div className='contact-mobile-text'>
							<div className='space-20' />
							<div className='header-with-underline'>
								{this.props.intl.formatMessage({id: 'EmployeeGift.talkToUs'})}
							</div>
							<div className='employee-gifts-contact-text-mobile'>
								{this.props.intl.formatMessage({id: 'EmployeeGift.contactMessage'})}
							</div>
							<div className='space-10' />
							<div>
								<Image src={phoneImage} width={40} href={`tel:${phoneNumber}`} />
							</div>
							<div className='space-20' />
							<div>
								<span className='phone-text'>{atPhone}</span>
							</div>
							<div>{phoneNumber}</div>
							<div className='space-20' />
							<div>{this.props.intl.formatMessage({id: 'EmployeeGift.orSendYourDetailsAndWillGetBacktoYou'})}</div>
							<div className='space-20' />
							<div className='override-form'>{this.renderForm()}</div>
							<div className='space-20' />
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default ContactFormComponent;
