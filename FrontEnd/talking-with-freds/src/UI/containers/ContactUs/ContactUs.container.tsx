import {CONTACT_STORE, CURRENT_USER_STORE, MESSAGES_STORE} from 'BL/stores';
import ContactUsStore from 'BL/stores/ContactUs.store';
import CurrentUserStore from 'BL/stores/CurrentUser.store';
import MessagesStore from 'BL/stores/Messages.store';
import AlertUtils from 'common/errorHandling/AlertUtils';
import {LinkType} from 'common/generalconsts/custom.enums';
import ContactUsDTO from 'common/models/DTOs/ContactUs.dto';
import {routesPaths} from 'common/routes/routesPaths.consts';
import ValidationSchemas from 'common/utils/validations/validationSchemas';
import Lang from 'Infrastructure/Language/Language';
import _ from 'lodash';
import {inject, observer} from 'mobx-react';
import Link from 'next/link';
import React from 'react';
import {FormattedMessage} from 'react-intl';
import {Breadcrumb, Card, Container, Divider, Grid, Header} from 'semantic-ui-react';
import ContactUsFormComponent from 'UI/components/ContactUsForm.component';
import CustomTitleComponent from 'UI/components/custom/customTitle/CustomTitle.component';
import CustomLinkComponent from '../../components/custom/customLink/CustomLink.component';
import FormWrapper from '../../components/FormWrapper';

interface Props {
	[CONTACT_STORE]?: ContactUsStore;
	[MESSAGES_STORE]?: MessagesStore;
	[CURRENT_USER_STORE]?: CurrentUserStore;
}

interface IState {
	loading: boolean;
	intrest: string;
}

const maxLength = {
	help: 600,
	phone: 10,
};

@inject(CONTACT_STORE, MESSAGES_STORE, CURRENT_USER_STORE)
@observer
export default class ContactUsContainer extends React.Component<Props, IState> {
	private contactStore: ContactUsStore;
	private messagesStore: MessagesStore;
	private currentUserStore: CurrentUserStore;
	constructor(props: Readonly<Props>) {
		super(props);
		this.state = {
			intrest: '',
			loading: false,
		};
		this.contactStore = this.props[CONTACT_STORE] as ContactUsStore;
		this.messagesStore = this.props[MESSAGES_STORE] as MessagesStore;
		this.currentUserStore = this.props[CURRENT_USER_STORE] as CurrentUserStore;
	}

	public render() {
		return (
			<>
				<Grid padded>
					<Grid.Column style={{margin: 'auto'}} computer={16} only='computer'>
						{this.renderDesktop()}
					</Grid.Column>
					<Grid.Column tablet={16} mobile={16} only='mobile tablet'>
						{this.renderMobile()}
					</Grid.Column>
				</Grid>
			</>
		);
	}

	private onIterestSelected = (selected: any, _name: any, value: any, values: any) => {
		values.interest = _.get(selected, 'target.innerText', '');
		values.interestID = value;
	};

	private onChangeSelectMobile = (value: number, values: any) => {
		values.interest = this.contactStore.contactUsOptions.filter((option) => option.value === value)[0].text;
		values.interestID = value;
	};

	private onSubmitClick = async (values: any) => {
		try {
			this.setState({loading: true});
			const responseData = await this.contactStore.handleContact(values, 'CRM');

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
				onChangeSelectMobile={this.onChangeSelectMobile}
				contactUsOptions={this.contactStore.contactUsOptions}
				maxLen={maxLength}
				isContactUsForm={true}
			/>
		);
	};

	private contactHeaders = () => {
		return (
			<Container paddingright7p='true'>
				<Header as='h2'>
					{Lang.format('contact.DoYouHaveAQuestion')}
					<Header.Subheader flexsubheader='true' blackheader='1'>
						<div style={{marginLeft: '5px'}}>
							<FormattedMessage id='contact.FindAnswerIn' />
						</div>
						<CustomLinkComponent
							to={routesPaths.faq}
							linkType={LinkType.primary}
							value={Lang.format('contact.CommonQuestions')}
						/>
					</Header.Subheader>
				</Header>
				<Header as='h2'>
					{Lang.format('contact.Activity')}
					<Header.Subheader blackheader='1'>{Lang.format('contact.ActivityTime')}</Header.Subheader>
				</Header>
				<Header as='h2'>
					{Lang.format('contact.PrivateClientsPhone')}
					<Header.Subheader blackheader='1'>03-5234754</Header.Subheader>
				</Header>
				<Header as='h2'>
					{Lang.format('contact.BusinessClientsPhone')}
					<Header.Subheader blackheader='1'>03-3737392</Header.Subheader>
				</Header>
			</Container>
		);
	};
	private contactHeadersMobile = () => {
		return (
			<Container paddingtop40='true'>
				<Header as='h2'>
					<Header.Subheader contactmobile='true' primaryheader='1' boldheader='true'>
						{Lang.format('contact.DoYouHaveAQuestion')}
					</Header.Subheader>
					<Header.Subheader flexsubheader='true'>
						<div style={{marginLeft: '5px'}}>
							<FormattedMessage id='contact.FindAnswerIn' />
						</div>
						<CustomLinkComponent
							to={routesPaths.faq}
							linkType={LinkType.regular}
							value={Lang.format('contact.CommonQuestions')}
						/>
					</Header.Subheader>
				</Header>
				<Header as='h2'>
					<Header.Subheader contactmobile='true' primaryheader='1' boldheader='true'>
						{Lang.format('contact.Activity')}
					</Header.Subheader>
					<Header.Subheader>{Lang.format('contact.ActivityTime')}</Header.Subheader>
				</Header>
				<Header as='h2'>
					<Header.Subheader contactmobile='true' primaryheader='1' boldheader='true'>
						{Lang.format('contact.PrivateClientsPhone')}
					</Header.Subheader>
					<Header.Subheader>03-5234754</Header.Subheader>
				</Header>
				<Header as='h2'>
					<Header.Subheader contactmobile='true' primaryheader='1' boldheader='true'>
						{Lang.format('contact.BusinessClientsPhone')}
					</Header.Subheader>
					<Header.Subheader>03-3737392</Header.Subheader>
				</Header>
			</Container>
		);
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
				validationSchema={ValidationSchemas.contactUsPageSchema}
				initialValues={contactDto}>
				{this.contactUsForm}
			</FormWrapper>
		);
	};

	private renderDesktop = () => {
		return (
			<Grid>
				<Grid.Row style={{paddingTop: '0'}}>
					<CustomTitleComponent content={Lang.format('contact.Contact')}>
						<Breadcrumb>
							<Link href='/'>
								<a>
									<Breadcrumb.Section whitesection='1'>
										<FormattedMessage id='general.nofshonit' />
									</Breadcrumb.Section>
								</a>
							</Link>
							<Breadcrumb.Divider whitedivider='1' icon='left angle' />
							<Breadcrumb.Section>{Lang.format('contact.Contact')}</Breadcrumb.Section>
						</Breadcrumb>
					</CustomTitleComponent>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column computer={4} largeScreen={3} widescreen={4} />
					<Grid.Column computer={6} largeScreen={6} widescreen={5}>
						<Card fluid marginbottom8='1' style={{width: '96%'}}>
							<Card.Content>
								<Header as='h2' cardheader='true'>
									{Lang.format('contact.SendUsMessage')}
								</Header>
							</Card.Content>
							<Card.Content>{this.renderForm()}</Card.Content>
						</Card>
					</Grid.Column>
					<Grid.Column computer={5} largeScreen={5} widescreen={4}>
						{this.contactHeaders()}
					</Grid.Column>
					<Grid.Column computer={1} largeScreen={2} widescreen={3} />
				</Grid.Row>
			</Grid>
		);
	};

	private renderMobile = () => {
		return (
			<Container>
				<Header contactheader='1' size='large'>
					{Lang.format('contact.Contact')}
				</Header>
				{this.renderForm()}
				<Divider fullwidthdivider='1' />
				{this.contactHeadersMobile()}
			</Container>
		);
	};
}
