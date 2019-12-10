import {MESSAGES_STORE} from 'BL/stores';
import MessagesStore from 'BL/stores/Messages.store';
import {AboutMessages, ContextsNames} from 'common/generalconsts/messages.consts';
import MessageDTO from 'common/models/DTOs/Message.dto';
import {inject} from 'mobx-react';
import React from 'react';
import {FormattedMessage, InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import {Container, Grid, GridColumn, Header, Image} from 'semantic-ui-react';
import AboutClientComponent from 'UI/components/AboutClientComponent/AboutClient.component';
import CustomPageBackgrondAndTitleComponent from 'UI/components/custom/customPageBackgroundAndTitle/customPageBackgroundAndTitle.component';
import CustomResponsiveWrapper from 'UI/components/CustomResponsiveWrapper';
import PartEightBannerContainer from '../HomePage/PartEightBanner.container';

interface IAboutContainerProps {
	mobileDetect: MobileDetect;
	intl: InjectedIntl;
	[MESSAGES_STORE]: MessagesStore;
}
interface IAboutContainerState {}

@inject(MESSAGES_STORE)
class AboutContainer extends React.Component<IAboutContainerProps, IAboutContainerState> {
	private messagesStore: MessagesStore;
	constructor(props: IAboutContainerProps) {
		super(props);
		this.messagesStore = props[MESSAGES_STORE] as MessagesStore;
	}

	public checkUndefined(message: MessageDTO): string {
		if (message && message.messageText) {
			return message.messageText;
		}
		return '';
	}

	public render() {
		const intl = this.props.intl as InjectedIntl;
		const aboutMessages = this.messagesStore.webSiteMessages[ContextsNames.ABOUT] as AboutMessages;
		return (
			<div className='about-page-total-wrapper'>
				<CustomResponsiveWrapper
					mobileDetect={this.props.mobileDetect}
					desktopComponent={
						<div className='about-main-container'>
							<CustomPageBackgrondAndTitleComponent
								pageHeader={intl.formatMessage({id: 'About.story'})}
								breadcrumbsArray={[
									{
										name: intl.formatMessage({id: 'general.About'}),
										link: '',
									},
								]}
								backgroundSrc='/static/images/aboutPic600.jpg'
							/>
							<Grid>
								<GridColumn width={1} />
								<GridColumn width={15}>
									<Container text className='story-content-container'>
										{this.checkUndefined(aboutMessages.part1_text)}
									</Container>
								</GridColumn>
							</Grid>
							<Image
								className='detail-image'
								src={
									this.checkUndefined(aboutMessages.part1_pic) === ''
										? '/static/placeholders/image-placeholder.png'
										: aboutMessages.part1_pic.messageText
								}
								alt={intl.formatMessage({id: 'About.part4.alt'})}
							/>

							<AboutClientComponent
								clientStory={this.checkUndefined(aboutMessages.part2_text)}
								clientImg={
									this.checkUndefined(aboutMessages.part2_pic) === ''
										? '/static/placeholders/image-placeholder.png'
										: aboutMessages.part2_pic.messageText
								}
							/>
							<PartEightBannerContainer
								isHtml
								upText={this.checkUndefined(aboutMessages.part3_internal2_text)}
								upImage={
									this.checkUndefined(aboutMessages.part3_internal1_banner) === ''
										? '/static/placeholders/image-placeholder.png'
										: aboutMessages.part3_internal1_banner.messageText
								}
								downText={this.checkUndefined(aboutMessages.part3_internal1_text)}
								downImage={
									this.checkUndefined(aboutMessages.part3_internal2_banner) === ''
										? '/static/placeholders/image-placeholder.png'
										: aboutMessages.part3_internal2_banner.messageText
								}
								mobileDetect={this.props.mobileDetect}
							/>
						</div>
					}
					mobileComponent={
						<div className='mobile-about-main-div'>
							<Image className='mobile-background-image' src='/static/images/about-static.jpg' />
							<Container fluid className='main-mobile-container'>
								<Header as='h2' className='about-mobile-header'>
									<FormattedMessage id='About.story' />
								</Header>
								<div className='mobile-story-text'>{this.checkUndefined(aboutMessages.part1_text)}</div>
								<div className='mobile-part4-image-wrapper'>
									<Image
										className='mobile-part4-image'
										src={
											this.checkUndefined(aboutMessages.part1_m_pic) === ''
												? '/static/placeholders/image-placeholder.png'
												: aboutMessages.part1_m_pic.messageText
										}
										alt={intl.formatMessage({id: 'About.part4.alt'})}
									/>
								</div>
								<div className='mobile-clients-wrapper'>
									<Header as='h2' className='about-mobile-header'>
										<FormattedMessage id='About.clients' />
									</Header>
									<div className='mobile-client-text'>{this.checkUndefined(aboutMessages.part2_text)}</div>
									<Image
										className='mobile-client-part3-image'
										src={
											this.checkUndefined(aboutMessages.part2_pic_mobile) === ''
												? '/static/placeholders/image-placeholder.png'
												: aboutMessages.part2_pic_mobile.messageText
										}
									/>
								</div>
							</Container>
							<PartEightBannerContainer
								isHtml
								upText={this.checkUndefined(aboutMessages.part3_internal2_text)}
								upImage={
									this.checkUndefined(aboutMessages.part5_m_internal1_banner) === ''
										? '/static/placeholders/image-placeholder.png'
										: aboutMessages.part5_m_internal1_banner.messageText
								}
								downText={this.checkUndefined(aboutMessages.part3_internal1_text)}
								downImage={
									this.checkUndefined(aboutMessages.part5_m_internal2_banner) === ''
										? '/static/placeholders/image-placeholder.png'
										: aboutMessages.part5_m_internal2_banner.messageText
								}
								mobileDetect={this.props.mobileDetect}
							/>
						</div>
					}
				/>
			</div>
		);
	}
}

export default withIntl(AboutContainer);
