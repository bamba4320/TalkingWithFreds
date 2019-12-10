import {CONTACT_STORE, CURRENT_USER_STORE, MESSAGES_STORE} from 'BL/stores';
import ContactUsStore from 'BL/stores/ContactUs.store';
import CurrentUserStore from 'BL/stores/CurrentUser.store';
import MessagesStore from 'BL/stores/Messages.store';
import AlertUtils from 'common/errorHandling/AlertUtils';
import {ContextsNames, SolutionsMessages} from 'common/generalconsts/messages.consts';
import ContactUsDTO from 'common/models/DTOs/ContactUs.dto';
import MessageDTO from 'common/models/DTOs/Message.dto';
import OptionsDTO from 'common/models/DTOs/Options.dto';
import ValidationSchemas from 'common/utils/validations/validationSchemas';
import Lang from 'Infrastructure/Language/Language';
import _ from 'lodash';
import {inject} from 'mobx-react';
import React from 'react';
import {FormattedMessage, InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import {Card, Container, Divider, Grid, Header, Image} from 'semantic-ui-react';
import ContactUsFormComponent from 'UI/components/ContactUsForm.component';
import EditorMessageComponent from 'UI/components/custom/customEditorMessage/customEditorMessage.component';
import CustomPageBackgrondAndTitleComponent from 'UI/components/custom/customPageBackgroundAndTitle/customPageBackgroundAndTitle.component';
import CustomResponsiveWrapper from 'UI/components/CustomResponsiveWrapper';
import FormWrapper from 'UI/components/FormWrapper';

interface ISolutionsContainerProps {
	mobileDetect: MobileDetect;
	intl: InjectedIntl;
	[MESSAGES_STORE]?: MessagesStore;
	[CONTACT_STORE]?: ContactUsStore;
	[CURRENT_USER_STORE]?: CurrentUserStore;
}
interface ISolutionsContainerState {
	loading: boolean;
}

@inject(MESSAGES_STORE, CONTACT_STORE, CURRENT_USER_STORE)
class SolutionsContainer extends React.Component<ISolutionsContainerProps, ISolutionsContainerState> {
	private messagesStore: MessagesStore;
	private contactStore: ContactUsStore;
	private currentUserStore: CurrentUserStore;
	private formOptions: OptionsDTO[];
	private intl: InjectedIntl;
	constructor(props: ISolutionsContainerProps) {
		super(props);
		this.messagesStore = props[MESSAGES_STORE] as MessagesStore;
		this.contactStore = props[CONTACT_STORE] as ContactUsStore;
		this.currentUserStore = props[CURRENT_USER_STORE] as CurrentUserStore;
		this.intl = this.props.intl as InjectedIntl;
		this.state = {loading: false};
		this.formOptions = [new OptionsDTO(0, this.intl.formatMessage({id: 'ContactUs.intrestedToJoinAsASupplier'}))];
	}

	public componentDidMount() {
		this.contactStore.init();
	}
	public checkUndefined(message: MessageDTO): string {
		if (message && message.messageText) {
			return message.messageText;
		}
		return '';
	}

	public render() {
		const solutionsMessages = this.messagesStore.webSiteMessages[ContextsNames.SOLUTIONS] as SolutionsMessages;
		return (
			<div className='solution-total-wrapper'>
				<CustomResponsiveWrapper
					mobileDetect={this.props.mobileDetect}
					desktopComponent={
						<div className='solutions-main-div'>
							<CustomPageBackgrondAndTitleComponent
								pageHeader={this.intl.formatMessage({id: 'general.Solutions'})}
								breadcrumbsArray={[
									{
										name: this.intl.formatMessage({id: 'general.Solutions'}),
										link: '',
									},
								]}
								backgroundSrc='/static/images/sapakim.jpg'
							/>
							<Grid>
								<Grid.Column width={1} />
								<Grid.Column width={15}>
									<EditorMessageComponent extraClassName='solutions-part2-text' message={solutionsMessages.Suppliers} />
								</Grid.Column>
							</Grid>
							<div className='contact-us-div'>
								<Grid>
									<Grid.Column width={1} />
									<Grid.Column computer={6} largeScreen={6} widescreen={5}>
										<Card fluid marginbottom8='1' className='contactus-card'>
											<Card.Content>
												<Header as='h2' cardheader='true'>
													{Lang.format('contact.SendUsMessage')}
												</Header>
											</Card.Content>
											<Card.Content>{this.renderForm()}</Card.Content>
										</Card>
									</Grid.Column>
									<Grid.Column computer={9} largeScreen={9} widescreen={10} />
								</Grid>
							</div>
						</div>
					}
					mobileComponent={
						<div className='mobile-solutions-main-div'>
							<Image className='mobile-background-image' src='/static/images/sapakim.jpg' />
							<Container fluid className='main-mobile-container'>
								<Header as='h2' className='mobile-solutions-header'>
									<FormattedMessage id='general.Solutions' />
								</Header>
								<Divider className='mobile-header-divider' headerdivider='1' />
								<EditorMessageComponent extraClassName='mobile-part2-text' message={solutionsMessages.Suppliers} />
								<Divider className='contactus-divider' />
								<div className='mobile-part3-contactus-wrapper'>
									<Header as='h2' cardheader='true' className='mobile-contactus-header'>
										<FormattedMessage id='solutions.mobile.contactUs' />
									</Header>
									{this.renderForm()}
								</div>
							</Container>
							{/* <PartEightBannerContainer/> */}
						</div>
					}
				/>
			</div>
		);
	}
	private onIterestSelected = (selected: any, _name: any, value: any, values: any) => {
		values.interest = _.get(selected, 'target.innerText', '');
		values.interestID = value;
	};

	private onChangeSelectMobile = (value: number, values: any) => {
		values.interest = this.formOptions.filter((option) => option.value === value)[0].text;
		values.interestID = value;
	};

	private onSubmitClick = async (values: any) => {
		try {
			this.setState({loading: true});
			const responseData = await this.contactStore.handleContact(values, 'Suppliers');

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

	private renderForm = () => {
		const contactDto = new ContactUsDTO();
		const currentUser = this.currentUserStore.currentProfile();
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

	private contactUsForm = (props: {
		values: any;
		touched: any;
		errors: any;
		handleSubmit: any;
		handleChange: any;
		handleBlur: any;
	}) => {
		return (
			<ContactUsFormComponent
				formProps={props}
				loading={this.state.loading}
				onIterestSelected={this.onIterestSelected}
				contactUsOptions={this.formOptions}
				onChangeSelectMobile={this.onChangeSelectMobile}
				maxLen={{help: 600, phone: 10}}
				isContactUsForm={true}
			/>
		);
	};
}

export default withIntl(SolutionsContainer);
