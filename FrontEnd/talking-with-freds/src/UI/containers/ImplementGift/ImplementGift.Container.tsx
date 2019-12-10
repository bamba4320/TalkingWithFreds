import {CONFIGURATION_STORE, MESSAGES_STORE, MODAL_STORE} from 'BL/stores';
import ConfigurationStore from 'BL/stores/Configuration.store';
import MessagesStore from 'BL/stores/Messages.store';
import ModalStore from 'BL/stores/Modal.store';
import {ContextsNames, ImplementGiftMessages} from 'common/generalconsts/messages.consts';
import MessageDTO from 'common/models/DTOs/Message.dto';
import {inject, observer} from 'mobx-react';
import Link from 'next/link';
import * as React from 'react';
import {InjectedIntl, FormattedMessage} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import {Breadcrumb, Container, Grid, Header, Icon, Image} from 'semantic-ui-react';
import CustomCommonQuestionsComponent from 'UI/components/custom/customCommonQuestions/CustomCommonQuestions.component';
import EditorMessageComponent from 'UI/components/custom/customEditorMessage/customEditorMessage.component';
import CustomTitleComponent from 'UI/components/custom/customTitle/CustomTitle.component';
import CustomResponsiveWrapper from 'UI/components/CustomResponsiveWrapper';
import PartEightBannerContainer from '../HomePage/PartEightBanner.container';
import SearchContainer from '../Navbar/Search.container';

export interface IProps {
	mobileDetect: MobileDetect;
	[MESSAGES_STORE]?: MessagesStore;
	[CONFIGURATION_STORE]?: ConfigurationStore;
	[MODAL_STORE]?: ModalStore;
	intl?: InjectedIntl;
}

export interface IState {}

@inject(MESSAGES_STORE, CONFIGURATION_STORE, MODAL_STORE)
@observer
class ImplementGiftContainer extends React.Component<IProps, IState> {
	private messagesStore: MessagesStore;
	private configurationStore: ConfigurationStore;
	private modalStore: ModalStore;
	constructor(props: IProps) {
		super(props);
		this.state = {};
		this.messagesStore = this.props[MESSAGES_STORE] as MessagesStore;
		this.configurationStore = this.props[CONFIGURATION_STORE] as ConfigurationStore;
		this.modalStore = this.props[MODAL_STORE] as ModalStore;
	}

	public checkUndefined(message: MessageDTO): string {
		if (message && message.messageText) {
			return message.messageText;
		}
		return '';
	}

	public downText() {
		const intl = this.props.intl as InjectedIntl;
		const messages = this.messagesStore.webSiteMessages[ContextsNames.GIFT_IMPLEMENTAION] as ImplementGiftMessages;
		return (
			<>
				<EditorMessageComponent message={messages.part3_text} />
				<div className='center-message'>
					<EditorMessageComponent message={messages.part4_text} />
				</div>
				<CustomResponsiveWrapper
					mobileDetect={this.props.mobileDetect}
					desktopComponent={<SearchContainer notAbsolut />}
					mobileComponent={
						<div
							className='mobile-search'
							onClick={() => {
								this.modalStore.openModal(<SearchContainer isMobile />, {
									title: intl.formatMessage({id: 'gifts.FreeSearch'}),
									isNoMarginFromTop: true,
								});
							}}>
							{<Icon name='search' searchicon='1' />}
							{intl.formatMessage({id: 'navbar.SearchForBrandsOrCards'})}
						</div>
					}
				/>
			</>
		);
	}
	public render() {
		const intl = this.props.intl as InjectedIntl;
		const messages = this.messagesStore.webSiteMessages[ContextsNames.GIFT_IMPLEMENTAION] as ImplementGiftMessages;
		return (
			<div className='implement-gift-div'>
				<CustomResponsiveWrapper
					mobileDetect={this.props.mobileDetect}
					mobileComponent={
						<div className='header-div'>
							<Header as='h1' className='headear' textAlign='center'>
								{intl.formatMessage({id: 'implement.title'})}
							</Header>
						</div>
					}
					desktopComponent={
						<CustomTitleComponent content={intl.formatMessage({id: 'implement.title'})}>
							<Breadcrumb>
								<Link href='/'>
									<a>
										<Breadcrumb.Section whitesection='1'>
											<FormattedMessage id='general.nofshonit' />
										</Breadcrumb.Section>
									</a>
								</Link>
								<Breadcrumb.Divider whitedivider='1' icon='left angle' />
								<Breadcrumb.Section>{intl.formatMessage({id: 'implement.title'})}</Breadcrumb.Section>
							</Breadcrumb>
						</CustomTitleComponent>
					}
				/>
				<div className='search-banner-div'>
					<CustomResponsiveWrapper
						mobileDetect={this.props.mobileDetect}
						mobileComponent={
							<PartEightBannerContainer
								mobileDetect={this.props.mobileDetect}
								implementGift
								isHtml={false}
								downAlt={intl.formatMessage({id: 'implement.alt2'})}
								upAlt={intl.formatMessage({id: 'implement.alt1'})}
								downImage={
									this.checkUndefined(messages.part2_m_image) === ''
										? '/static/placeholders/image-placeholder.png'
										: messages.part2_m_image.messageText
								}
								upImage={
									this.checkUndefined(messages.part1_m_image) === ''
										? '/static/placeholders/image-placeholder.png'
										: messages.part1_m_image.messageText
								}
								upText={this.downText()}
								downText={<EditorMessageComponent message={messages.part5_text} />}
								withOutbtns
							/>
						}
						desktopComponent={
							<Container className='container-banner-part8' fluid>
								<Grid columns={2} className='part8-banner-grid'>
									<Grid.Row className='border-radius-up'>
										<Grid.Column width={10}>
											<Image
												src={
													this.checkUndefined(messages.part1_banner) === ''
														? '/static/placeholders/image-placeholder.png'
														: messages.part1_banner.messageText
												}
												alt={intl.formatMessage({id: 'implement.alt1'})}
											/>
										</Grid.Column>
										<Grid.Column color='pink' width={6}>
											<Container text textAlign='center' className='ig-banner-text'>
												<EditorMessageComponent message={messages.part5_text} />
											</Container>
										</Grid.Column>
									</Grid.Row>
									<Grid.Row className='space-between' />
									<Grid.Row className='border-radius-down'>
										<Grid.Column color='purple' width={6}>
											<Container text textAlign='center' className='ig-banner-text'>
												{this.downText()}
											</Container>
										</Grid.Column>
										<Grid.Column width={10}>
											<Image
												src={
													this.checkUndefined(messages.part2_banner) === ''
														? '/static/placeholders/image-placeholder.png'
														: messages.part2_banner.messageText
												}
												alt={intl.formatMessage({id: 'implement.alt2'})}
											/>
										</Grid.Column>
									</Grid.Row>
								</Grid>
							</Container>
						}
					/>
				</div>
				<CustomCommonQuestionsComponent questionsSubjectKey={this.configurationStore.configuration.faqImplement} />
			</div>
		);
	}
}
export default withIntl(ImplementGiftContainer);
