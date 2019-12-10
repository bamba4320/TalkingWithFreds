import {CONFIGURATION_STORE, HOMEPAGE_STORE, MODAL_STORE} from 'BL/stores';
import ConfigurationStore from 'BL/stores/Configuration.store';
import HomePageStore from 'BL/stores/Homepage.store';
import ModalStore from 'BL/stores/Modal.store';
import {HomePageMessages} from 'common/generalconsts/messages.consts';
import MessageDTO from 'common/models/DTOs/Message.dto';
import {routesPaths} from 'common/routes/routesPaths.consts';
import NextjsProcessUtils from 'common/utils/processUtils/NextjsProcessUtils';
import {inject, observer} from 'mobx-react';
import Link from 'next/link';
import React from 'react';
import {InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import {Container, Embed, Grid, GridColumn, Header, Image} from 'semantic-ui-react';
import ForgotPasswordContainer from 'UI/containers/ForgotPassword/ForgotPassword.container';
import PartEightBannerContainer from '../../containers/HomePage/PartEightBanner.container';
import CustomCategoriesComponent from '../custom/CustomCategories/CustomCategories.component';
import EditorMessageComponent from '../custom/customEditorMessage/customEditorMessage.component';
import CustomLazyLoad from '../custom/customLazyLoad/CustomLazyLoad.component';
import CustomSlidercomponent from '../custom/CustomSliderAndTags/CustomSlider.component';
import CustomTagscomponent from '../custom/CustomSliderAndTags/CustomTags.component';
import CustomTitleComponent from '../custom/customTitle/CustomTitle.component';
import CustomResponsiveWrapper from '../CustomResponsiveWrapper';
import InfiniteLinearSlideShowComponent from './LogoSlideShow/InfiniteLinearSlideShow.component';

interface IHomePageProps {
	homepageMessages: HomePageMessages;
	mobileDetect: MobileDetect;
	openForgotPassword: boolean;
	shouldLazyLoad: boolean;
	[HOMEPAGE_STORE]?: HomePageStore;
	intl: InjectedIntl;
	[CONFIGURATION_STORE]?: ConfigurationStore;
	[MODAL_STORE]?: ModalStore;
}
interface IHomePageState {
	activeCategory: number;
	mobilePopupVideoVisibility: boolean;
}

@inject(HOMEPAGE_STORE, CONFIGURATION_STORE, MODAL_STORE)
@observer
class HomePageComponent extends React.Component<IHomePageProps, IHomePageState> {
	private homePageStore: HomePageStore;
	private configurationStore: ConfigurationStore;
	private modalStore: ModalStore;
	constructor(props: Readonly<IHomePageProps>) {
		super(props);
		this.state = {
			activeCategory: 0,
			mobilePopupVideoVisibility: true,
		};
		this.homePageStore = this.props[HOMEPAGE_STORE] as HomePageStore;
		this.configurationStore = this.props[CONFIGURATION_STORE] as ConfigurationStore;
		this.modalStore = this.props[MODAL_STORE] as ModalStore;
	}

	public checkUndefined(message: MessageDTO): string {
		if (message && message.messageText) {
			return message.messageText;
		}
		return '';
	}

	public componentDidMount() {
		this.openForgotPassword();
	}

	public render() {
		const messages = this.props.homepageMessages;
		const topTag = this.homePageStore.getTags;
		const intl = this.props.intl as InjectedIntl;
		return (
			<>
				<CustomResponsiveWrapper
					mobileDetect={this.props.mobileDetect}
					desktopComponent={
						<div className='home-wrapper'>
							{/* part 1 */}
							<CustomTitleComponent
								subheadermt={this.checkUndefined(messages.part1_title) === '' ? '12rem' : ''}
								content={this.checkUndefined(messages.part1_title)}
								fixedheight
								addDiv
								margin='0 0 16rem 0'
								fontszsubheader='1.95rem'>
								{this.checkUndefined(messages.part1_text)}
							</CustomTitleComponent>
							<div>
								<Grid className='grid__centered' columns={3}>
									<Grid.Column className='vertically__centered side_title_image'>
										<Link href={routesPaths.employeesGifts}>
											<a style={{cursor: 'pointer'}}>
												{
													<Image
														src={
															this.checkUndefined(messages.part1_internal1_pic) === ''
																? '/static/placeholders/image-placeholder.png'
																: messages.part1_internal1_pic.messageText
														}
														size='small'
														centered
														roundimage='1'
														className='subhead__title__img'
														alt={intl.formatMessage({id: 'HomePage.part1.alt1'})}
													/>
												}
												<Header>{this.checkUndefined(messages.part1_internal1_text)}</Header>
											</a>
										</Link>
									</Grid.Column>
									<Grid.Column className='vertically__centered'>
										<Link href={routesPaths.gifts.root}>
											<a style={{cursor: 'pointer'}}>
												{
													<Image
														src={
															this.checkUndefined(messages.part1_internal2_pic) === ''
																? '/static/placeholders/image-placeholder.png'
																: messages.part1_internal2_pic.messageText
														}
														size='medium'
														centered
														roundimage='1'
														className='subhead__title__img'
														alt={intl.formatMessage({id: 'HomePage.part1.alt2'})}
													/>
												}
												<Header>{this.checkUndefined(messages.part1_internal2_text)}</Header>{' '}
											</a>
										</Link>
									</Grid.Column>
									<Grid.Column className='vertically__centered side_title_image'>
										<Link href={routesPaths.giftImplementaion}>
											<a style={{cursor: 'pointer'}}>
												{
													<Image
														src={
															this.checkUndefined(messages.part1_internal3_pic) === ''
																? '/static/placeholders/image-placeholder.png'
																: messages.part1_internal3_pic.messageText
														}
														size='small'
														centered
														roundimage='1'
														className='subhead__title__img'
														alt={intl.formatMessage({id: 'HomePage.part1.alt3'})}
													/>
												}
												<Header>{this.checkUndefined(messages.part1_internal3_text)}</Header>{' '}
											</a>
										</Link>
									</Grid.Column>
								</Grid>
							</div>
							{/* part 2 */}
							<Grid homepagetopslider='1'>
								<GridColumn>
									<CustomSlidercomponent
										imagesPath={this.configurationStore.configuration.imagesPath}
										mobileDetect={this.props.mobileDetect}
										slidersArray={this.homePageStore.getSlidersTop}
										isInsidePagination
										isPagination
										isAutoPlay
										enableMouseSwipe
										autoPlaySpeed={7000}
										carouselId='part2'
									/>
								</GridColumn>
							</Grid>
							{/* part 3 */}
							<InfiniteLinearSlideShowComponent
								src={
									this.checkUndefined(messages.part3_pic) === ''
										? 'static/placeholders/image-placeholder.png'
										: this.checkUndefined(messages.part3_pic)
								}
								alt={intl.formatMessage({id: 'HomePage.part3.alt'})}
							/>
							{/* part 4 */}
							<CustomTitleComponent
								content={topTag ? topTag.tagName : ''}
								notMain
								margin='0 0 16rem 0'
								fontszsubheader='1.95rem'>
								{intl.formatMessage({id: 'HomePage.popularTags'})}
							</CustomTitleComponent>
							<Image size='medium' src='/static/images/cat.png' className='cat-img' />
							<CustomTagscomponent
								imagesPath={this.configurationStore.configuration.imagesPath}
								mobileDetect={this.props.mobileDetect}
								tags={this.homePageStore.getTags}
								intl={this.props.intl}
							/>
							{/* part 5 */}
							<CustomTitleComponent
								content={intl.formatMessage({id: 'HomePage.howDowsItWorks'})}
								notMain
								margin='0 0 34rem 0'
								custombg='#62c6bf'
							/>
							<CustomLazyLoad shouldLazyLoad={this.props.shouldLazyLoad}>
								<Embed
									customsize='1'
									id={this.getVideoId(this.checkUndefined(messages.part4_video))}
									active
									autoplay={false}
									source='youtube'
									iframe={{
										allowFullScreen: true,
									}}
								/>
							</CustomLazyLoad>

							{/* part 6 */}
							<div className='categories-div'>
								<CustomTitleComponent
									content={intl.formatMessage({id: 'HomePage.categories'})}
									notMain
									margin='0 0 34rem 0'
									custombg='#62c6bf'>
									<Image centered size='small' src={'/static/images/Logo_white.png'} />
								</CustomTitleComponent>
								<CustomCategoriesComponent categories={this.homePageStore.getCategories} />
							</div>
							<Grid>
								<GridColumn>
									<CustomSlidercomponent
										imagesPath={this.configurationStore.configuration.imagesPath}
										mobileDetect={this.props.mobileDetect}
										slidersArray={this.homePageStore.getSlidersBottom}
										isInsidePagination
										isPagination
										isAutoPlay
										enableMouseSwipe
										autoPlaySpeed={7000}
										carouselId='part6'
									/>
								</GridColumn>
							</Grid>
							{/* part 8 */}
							<PartEightBannerContainer
								isHtml
								upText={this.checkUndefined(messages.part5_internal2_text)}
								upImage={
									this.checkUndefined(messages.part5_internal1_banner) === ''
										? 'static/placeholders/image-placeholder.png'
										: messages.part5_internal1_banner.messageText
								}
								downText={this.checkUndefined(messages.part5_internal1_text)}
								downImage={
									this.checkUndefined(messages.part5_internal2_banner) === ''
										? 'static/placeholders/image-placeholder.png'
										: messages.part5_internal2_banner.messageText
								}
								mobileDetect={this.props.mobileDetect}
								upAlt={intl.formatMessage({id: 'HomePage.part8.altUp'})}
								downAlt={intl.formatMessage({id: 'HomePage.part8.altDown'})}
							/>
							{/* part 9 */}
							<Link href={routesPaths.gifts.root}>
								<a>
									<EditorMessageComponent extraClassName='part9_part6banner' message={messages.part6_banner} />
								</a>
							</Link>
						</div>
					}
					mobileComponent={
						<div className='home-wrapper'>
							{/* part 1 */}
							<Container fluid textAlign='center' homeheader='1'>
								<Header as='h1' style={{color: '#fff'}}>
									{this.checkUndefined(messages.part1_title)}
									<Header.Subheader whitesubheader='1' style={{margin: 'auto 4rem'}}>
										{this.checkUndefined(messages.part1_text)}
									</Header.Subheader>
								</Header>
							</Container>
							<Grid style={{width: '90%', margin: '2rem auto'}} className='main-buttons'>
								<Grid.Row>
									<Link href={routesPaths.gifts.root}>
										<a>
											<div className='text-wrapper'>
												<Image
													src={this.checkUndefined(messages.part1_m_internal2_pic)}
													alt={intl.formatMessage({id: 'HomePage.part1.alt2'})}
												/>
												<div className='text-buttons'> {this.checkUndefined(messages.part1_internal2_text)}</div>
											</div>
										</a>
									</Link>
								</Grid.Row>
								<Grid.Row>
									<Link href={routesPaths.employeesGifts}>
										<a>
											<div className='text-wrapper'>
												<Image
													src={this.checkUndefined(messages.part1_m_internal1_pic)}
													alt={intl.formatMessage({id: 'HomePage.part1.alt1'})}
												/>
												<div className='text-buttons'>{this.checkUndefined(messages.part1_internal1_text)}</div>
											</div>
										</a>
									</Link>
								</Grid.Row>
								<Grid.Row>
									<Link href={routesPaths.giftImplementaion}>
										<a>
											<div className='text-wrapper'>
												<Image
													src={this.checkUndefined(messages.part1_m_internal3_pic)}
													alt={intl.formatMessage({id: 'HomePage.part1.alt3'})}
												/>
												<div className='text-buttons'> {this.checkUndefined(messages.part1_internal3_text)}</div>
											</div>
										</a>
									</Link>
								</Grid.Row>
							</Grid>
							{/* part 2 */}
							<div className='top-slider-mobile'>
								<CustomSlidercomponent
									imagesPath={this.configurationStore.configuration.imagesPath}
									mobileDetect={this.props.mobileDetect}
									slidersArray={this.homePageStore.getSlidersTop}
									isInsidePagination
									isPagination
									isAutoPlay
									enableMouseSwipe
									autoPlaySpeed={7000}
									carouselId='part2'
								/>
							</div>
							{/*<EditorMessageComponent extraClassName='part2_banner-desktop' message={messages.part2_banner} />*/}
							{/* part 3 */}
							<InfiniteLinearSlideShowComponent
								isMobile
								src={
									this.checkUndefined(messages.part3_m_pic) === ''
										? 'static/placeholders/image-placeholder.png'
										: this.checkUndefined(messages.part3_m_pic)
								}
								alt={intl.formatMessage({id: 'HomePage.part3.alt'})}
							/>
							{/* part 4 */}
							<CustomTitleComponent
								content={topTag ? topTag.tagName : intl.formatMessage({id: 'HomePage.popularTags'})}
								fontszheader='4.5rem'
								margin='0 0 3rem 0 !important'
							/>
							<Image src='/static/images/cat.png' className='cat-img' />
							<CustomTagscomponent
								imagesPath={this.configurationStore.configuration.imagesPath}
								mobileDetect={this.props.mobileDetect}
								tags={this.homePageStore.getTags}
								intl={this.props.intl}
							/>
							{/* part 5 */}
							<CustomTitleComponent
								fontszheader='4rem'
								content={intl.formatMessage({id: 'HomePage.howDowsItWorks'})}
								margin='0 0 3rem 0 !important'
							/>
							<CustomLazyLoad shouldLazyLoad={this.props.shouldLazyLoad}>
								<Embed
									customsizemobile='1'
									id={this.getVideoId(this.checkUndefined(messages.part4_video))}
									active
									autoplay={false}
									source='youtube'
									iframe={{
										allowFullScreen: true,
									}}
								/>
							</CustomLazyLoad>
							{/* part 6 */}
							<div className='categories-div'>
								<CustomTitleComponent
									content={intl.formatMessage({id: 'HomePage.categories'})}
									fontszheader='4rem'
									margin='0 0 4rem 0 !important'
									custombg='#62c6bf'>
									<Image centered size='small' src={'/static/images/Logo_white.png'} />
								</CustomTitleComponent>
								<CustomCategoriesComponent categories={this.homePageStore.getCategories} />
							</div>
							<div className='sliders-div'>
								<CustomSlidercomponent
									imagesPath={this.configurationStore.configuration.imagesPath}
									mobileDetect={this.props.mobileDetect}
									slidersArray={this.homePageStore.getSlidersBottom}
									isInsidePagination
									isPagination
									isAutoPlay
									enableMouseSwipe
									autoPlaySpeed={7000}
									carouselId='part6'
								/>
							</div>
							{/* part 8 */}
							<PartEightBannerContainer
								isHtml
								upText={this.checkUndefined(messages.part5_internal2_text)}
								upImage={
									this.checkUndefined(messages.part5_m_internal1_banner) === ''
										? 'static/placeholders/image-placeholder.png'
										: messages.part5_m_internal1_banner.messageText
								}
								downText={this.checkUndefined(messages.part5_internal1_text)}
								downImage={
									this.checkUndefined(messages.part5_m_internal2_banner) === ''
										? 'static/placeholders/image-placeholder.png'
										: messages.part5_m_internal2_banner.messageText
								}
								mobileDetect={this.props.mobileDetect}
								upAlt={intl.formatMessage({id: 'HomePage.part8.altUp'})}
								downAlt={intl.formatMessage({id: 'HomePage.part8.altDown'})}
							/>
						</div>
					}
				/>
			</>
		);
	}

	private openForgotPassword() {
		if (this.props.openForgotPassword && !NextjsProcessUtils.isServer()) {
			this.modalStore.openModal(<ForgotPasswordContainer loginEmailVal={''} />, {
				title: 'forgotPassword.DidYouForgotPassword',
				fullScreen: true,
				closeFromOutsideModal: true,
			});
		}
	}

	private getVideoId(url: string) {
		const splitUrl = url.split('/');
		return splitUrl[splitUrl.length - 1];
	}
}

export default withIntl(HomePageComponent);
