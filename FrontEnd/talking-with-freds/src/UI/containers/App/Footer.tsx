import {CURRENT_USER_STORE, MESSAGES_STORE, MODAL_STORE} from 'BL/stores';
import CurrentUserStore from 'BL/stores/CurrentUser.store';
import MessagesStore from 'BL/stores/Messages.store';
import ModalStore from 'BL/stores/Modal.store';
import {routesPaths} from 'common/routes/routesPaths.consts';
import Lang from 'Infrastructure/Language/Language';
import {inject} from 'mobx-react';
import Link from 'next/link';
import * as React from 'react';
import {InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import {Accordion, Button, Container, Divider, Grid, Header, Icon, Image, List} from 'semantic-ui-react';
import EditorMessageComponent from 'UI/components/custom/customEditorMessage/customEditorMessage.component';
import CustomListItemComponent from 'UI/components/custom/customListItem/CustomListItem.component';
import LoginOrCancelComponent from 'UI/components/Login/LoginOrCancel.component';
import RecoverDigitalCodeContainer from '../RecoverDigitalCode/RecoverDigitalCode.container';
import NewsletterContainer from './Newsletter.container';
import Router from 'next/router';

export interface IAppRoutingProps {
	[MESSAGES_STORE]?: MessagesStore;
	[CURRENT_USER_STORE]?: CurrentUserStore;
	[MODAL_STORE]?: ModalStore;
	withoutNewsletter?: boolean;
	mobileDetect: MobileDetect;
	intl: InjectedIntl;
}

export interface IAppRoutingState {
	activeIndex: number;
}
@inject(MODAL_STORE, CURRENT_USER_STORE, MESSAGES_STORE)
class Footer extends React.Component<IAppRoutingProps, IAppRoutingState> {
	private modalStore: ModalStore;
	private currentUserStore: CurrentUserStore;
	private messagesStore: MessagesStore;
	constructor(props: IAppRoutingProps) {
		super(props);
		this.state = {
			activeIndex: -1,
		};
		this.modalStore = this.props[MODAL_STORE] as ModalStore;
		this.currentUserStore = this.props[CURRENT_USER_STORE] as CurrentUserStore;
		this.messagesStore = this.props[MESSAGES_STORE] as MessagesStore;
	}
	public render() {
		const intl = this.props.intl as InjectedIntl;
		return (
			<Grid padded>
				<Grid.Row zeropadding='1'>
					{this.props.withoutNewsletter && <NewsletterContainer mobileDetect={this.props.mobileDetect} />}
				</Grid.Row>
				<Grid.Row notopbottompadding='1'>
					<Grid.Column footerbackground='1' only='computer' computer={16}>
						<Grid padded>
							<Grid.Column width={1} />
							<Grid.Column width={14}>
								<Grid.Row>
									<Grid padded columns={6}>
										<Grid.Column>
											<Link href='/'>
												<a>
													<Image footerlogo='1' size='tiny' src={'/static/images/Logo_white.png'} />
												</a>
											</Link>
											<Button
												size='small'
												circular
												facebookbutton='1'
												icon='facebook f'
												href='https://www.facebook.com/nofshonitgroup/'
												target='_blank'
											/>
											<List>
												<CustomListItemComponent
													to={routesPaths.gifts.root}
													content={Lang.format('footer.GitsToFamilyAndFriends')}
												/>
												<CustomListItemComponent
													to={routesPaths.employeesGifts}
													content={Lang.format('footer.GitsToempoleesAndCustomers')}
												/>
												<CustomListItemComponent
													to={routesPaths.giftImplementaion}
													content={Lang.format('footer.ImplementGift')}
												/>
												<CustomListItemComponent
													to={routesPaths.solutions}
													content={Lang.format('footer.SolutionsToSuppliers')}
												/>
											</List>
										</Grid.Column>
										<Grid.Column>
											<List>
												<Header textfontheader='1' footerheader='1' whiteheader='1' as='h5'>
													{Lang.format('footer.GiftsKinds')}
												</Header>
												<EditorMessageComponent
													message={this.messagesStore.webSiteMessages.footer.category1}
													extraClassName='white-text'
												/>
												<EditorMessageComponent
													message={this.messagesStore.webSiteMessages.footer.category2}
													extraClassName='white-text'
												/>
												<EditorMessageComponent
													message={this.messagesStore.webSiteMessages.footer.category3}
													extraClassName='white-text'
												/>
												<EditorMessageComponent
													message={this.messagesStore.webSiteMessages.footer.category4}
													extraClassName='white-text'
												/>
												<EditorMessageComponent
													message={this.messagesStore.webSiteMessages.footer.category5}
													extraClassName='white-text'
												/>
											</List>
										</Grid.Column>
										<Grid.Column>
											<List>
												<Header textfontheader='1' footerheader='1' whiteheader='1' as='h5'>
													{Lang.format('footer.Actions')}
												</Header>
												<CustomListItemComponent
													to={this.currentUserStore.isNotLoggedIn ? undefined : routesPaths.myGifts}
													onClick={this.onClickMyGifts}
													content={Lang.format('footer.MyGifts')}
												/>
												<CustomListItemComponent
													to='https://www.dts.co.il/cardbalance'
													content={Lang.format('footer.CheckBalance')}
													newTab
												/>
												<CustomListItemComponent
													to='http://www.dts.co.il/NofshintUpgrade'
													content={Lang.format('footer.ExtensionValidity')}
													newTab
												/>
												<CustomListItemComponent
													to='http://www.dts.co.il/NofshintUpgrade'
													content={Lang.format('footer.ProductUpdate')}
													newTab
												/>
												<CustomListItemComponent
													to='https://www.dts.co.il/cardbalance'
													content={Lang.format('footer.LoadCard')}
													newTab
												/>
												<CustomListItemComponent
													onClick={() => {
														this.modalStore.openModal(<RecoverDigitalCodeContainer />, {
															title: 'digitalCodeRecovery.Title',
															fullScreen: true,
															closeFromOutsideModal: true,
															isRecoverPassword: true,
														});
													}}
													content={Lang.format('navbar.CodeRecovery')}
												/>
											</List>
										</Grid.Column>
										<Grid.Column>
											<List>
												<Header textfontheader='1' footerheader='1' whiteheader='1' as='h5'>
													{Lang.format('footer.Help')}
												</Header>
												<CustomListItemComponent to={routesPaths.faq} content={Lang.format('footer.CommonQuestions')} />
												<CustomListItemComponent
													to={routesPaths.contactUs.root}
													content={Lang.format('footer.ContactUs')}
												/>
											</List>
										</Grid.Column>
										<Grid.Column>
											<List>
												<Header textfontheader='1' footerheader='1' whiteheader='1' as='h5'>
													{Lang.format('footer.About')}
												</Header>
												<CustomListItemComponent to={routesPaths.about} content={Lang.format('footer.OurStory')} />
												{/* <CustomListItemComponent to={routesPaths.temp.ourBlog} content={Lang.format('footer.OurBlog')} /> */}
											</List>
										</Grid.Column>
										<Grid.Column>
											<List>
												<Header textfontheader='1' footerheader='1' whiteheader='1' as='h5'>
													{Lang.format('footer.GeneralTerms')}
												</Header>
												<CustomListItemComponent
													to={routesPaths.regulations}
													content={Lang.format('footer.SiteRegulation')}
													newTab
												/>
												<CustomListItemComponent
													to='http://dts.co.il/HtmlView/26092019-4'
													content={Lang.format('footer.GiftCardRegulation')}
													newTab
												/>
												<CustomListItemComponent
													to='http://dts.co.il/HtmlView/26092019-3'
													content={Lang.format('footer.Policy')}
													newTab
												/>
												<CustomListItemComponent
													to='http://dts.co.il/HtmlView/26092019-1'
													content={Lang.format('footer.EthicsCode')}
													newTab
												/>
											</List>
										</Grid.Column>
									</Grid>
								</Grid.Row>
								<Grid.Row>
									<EditorMessageComponent
										message={this.messagesStore.webSiteMessages.footer.PCIMessage}
										extraClassName='white-text pci-messages'
									/>
								</Grid.Row>
							</Grid.Column>

							<Grid.Column width={1} />
						</Grid>
					</Grid.Column>
					<Grid.Column footermobilebackground='1' only='mobile tablet' mobile={16} tablet={16}>
						<Grid padded>
							<Grid.Row>
								<Grid padded>
									<Grid.Row zeropadding='1'>
										<Link href='/'>
											<Image size='tiny' src={'/static/images/Logo_white.png'} mobilefooterlogo='1' />
										</Link>
									</Grid.Row>
									<Grid.Row zeropadding='1'>
										<Button
											size='tiny'
											circular
											facebookbutton='1'
											icon='facebook f'
											href='https://www.facebook.com/nofshonitgroup/'
											target='_blank'
										/>
									</Grid.Row>
								</Grid>
							</Grid.Row>
							<Grid.Row>
								<Container margin07='1' width100='1'>
									<List margin0='1'>
										<CustomListItemComponent
											to={routesPaths.gifts.root}
											content={Lang.format('footer.GitsToFamilyAndFriends')}
										/>
										<Divider smallerdivider='1' />
										<CustomListItemComponent
											to={routesPaths.employeesGifts}
											content={Lang.format('footer.GitsToempoleesAndCustomers')}
										/>
										<Divider smallerdivider='1' />
										<CustomListItemComponent
											to={routesPaths.giftImplementaion}
											content={Lang.format('footer.ImplementGift')}
										/>
										<Divider smallerdivider='1' />
										<CustomListItemComponent
											to={routesPaths.solutions}
											content={Lang.format('footer.SolutionsToSuppliers')}
										/>
										<Divider smallerdivider='1' />
										<CustomListItemComponent to={routesPaths.about} content={Lang.format('footer.About')} />
									</List>
									<Divider smallerdivider='1' />
									<Accordion>
										<Accordion.Title
											footeraccordiontitle='1'
											active={this.state.activeIndex === 0}
											index={0}
											onClick={this.handleClick}>
											<Icon lefticon='1' name='dropdown' />
											{Lang.format('footer.GiftsKinds')}
										</Accordion.Title>
										<Accordion.Content active={this.state.activeIndex === 0}>
											<Divider smallerdivider='1' nomargin={this.state.activeIndex === 0 ? '1' : null} />
											<List>
												<EditorMessageComponent
													message={this.messagesStore.webSiteMessages.footer.category1}
													extraClassName='white-text'
												/>
												<EditorMessageComponent
													message={this.messagesStore.webSiteMessages.footer.category2}
													extraClassName='white-text'
												/>
												<EditorMessageComponent
													message={this.messagesStore.webSiteMessages.footer.category3}
													extraClassName='white-text'
												/>
												<EditorMessageComponent
													message={this.messagesStore.webSiteMessages.footer.category4}
													extraClassName='white-text'
												/>
												<EditorMessageComponent
													message={this.messagesStore.webSiteMessages.footer.category5}
													extraClassName='white-text'
												/>
											</List>
										</Accordion.Content>
										<Divider smallerdivider='1' />
										<Accordion.Title
											footeraccordiontitle='1'
											active={this.state.activeIndex === 1}
											index={1}
											onClick={this.handleClick}>
											<Icon lefticon='1' name='dropdown' />
											{Lang.format('footer.Actions')}
										</Accordion.Title>
										<Accordion.Content active={this.state.activeIndex === 1}>
											<Divider smallerdivider='1' nomargin={this.state.activeIndex === 1 ? '1' : null} />
											<List>
												<CustomListItemComponent
													to={this.currentUserStore.isNotLoggedIn ? undefined : routesPaths.myGifts}
													onClick={this.onClickMyGifts}
													content={Lang.format('footer.MyGifts')}
												/>
												<CustomListItemComponent
													to='https://www.dts.co.il/cardbalance'
													content={Lang.format('footer.CheckBalance')}
													newTab
												/>
												<CustomListItemComponent
													to='http://www.dts.co.il/NofshintUpgrade'
													content={Lang.format('footer.ExtensionValidity')}
													newTab
												/>
												<CustomListItemComponent
													to='http://www.dts.co.il/NofshintUpgrade'
													content={Lang.format('footer.ProductUpdate')}
													newTab
												/>
												<CustomListItemComponent
													to='https://www.dts.co.il/cardbalance'
													content={Lang.format('footer.LoadCard')}
													newTab
												/>
												<CustomListItemComponent
													onClick={() => {
														this.modalStore.openModal(<RecoverDigitalCodeContainer />, {
															title: 'digitalCodeRecovery.Title',
															fullScreen: true,
															closeFromOutsideModal: true,
														});
													}}
													content={Lang.format('navbar.CodeRecovery')}
												/>
											</List>
										</Accordion.Content>
										<Divider smallerdivider='1' />
										<Accordion.Title
											footeraccordiontitle='1'
											active={this.state.activeIndex === 2}
											index={2}
											onClick={this.handleClick}>
											<Icon lefticon='1' name='dropdown' />
											{Lang.format('footer.Help')}
										</Accordion.Title>
										<Accordion.Content active={this.state.activeIndex === 2}>
											<Divider smallerdivider='1' nomargin={this.state.activeIndex === 2 ? '1' : null} />
											<List>
												<CustomListItemComponent to={routesPaths.faq} content={Lang.format('footer.CommonQuestions')} />
												<CustomListItemComponent
													to={routesPaths.contactUs.root}
													content={Lang.format('footer.ContactUs')}
												/>
											</List>
										</Accordion.Content>
										{/* <Accordion.Title
											footeraccordiontitle='1'
											active={this.state.activeIndex === 3}
											index={3}
											onClick={this.handleClick}>
											<Icon lefticon='1' name='dropdown' />
											{Lang.format('footer.About')}
										</Accordion.Title>
										<Accordion.Content active={this.state.activeIndex === 3}>
											<Divider smallerdivider='1' />
											<List>
												<CustomListItemComponent to='/' content={Lang.format('footer.OurStory')} />
												<CustomListItemComponent to='/' content={Lang.format('footer.OurBlog')} />
											</List>
										</Accordion.Content> */}
										<Divider smallerdivider='1' />
										<Accordion.Title
											footeraccordiontitle='1'
											active={this.state.activeIndex === 3}
											index={3}
											onClick={this.handleClick}>
											<Icon lefticon='1' name='dropdown' />
											{Lang.format('footer.GeneralTerms')}
										</Accordion.Title>
										<Accordion.Content active={this.state.activeIndex === 3}>
											<Divider smallerdivider='1' nomargin={this.state.activeIndex === 3 ? '1' : null} />
											<List>
												<CustomListItemComponent
													to={routesPaths.regulations}
													content={Lang.format('footer.SiteRegulation')}
													newTab
												/>
												<CustomListItemComponent
													to='http://dts.co.il/HtmlView/26092019-4'
													content={Lang.format('footer.GiftCardRegulation')}
													newTab
												/>
												<CustomListItemComponent
													to='http://dts.co.il/HtmlView/26092019-3'
													content={Lang.format('footer.Policy')}
													newTab
												/>
												<CustomListItemComponent
													to='http://dts.co.il/HtmlView/26092019-1'
													content={Lang.format('footer.EthicsCode')}
													newTab
												/>
											</List>
										</Accordion.Content>
										<Divider smallerdivider='1' />
										<EditorMessageComponent
											message={this.messagesStore.webSiteMessages.footer.PCIMessage}
											extraClassName='white-text'
										/>
									</Accordion>
								</Container>
							</Grid.Row>
						</Grid>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
	private handleClick = (_e?: any, titleProps?: any) => {
		const {index} = titleProps;
		const {activeIndex} = this.state;
		const newIndex = activeIndex === index ? -1 : index;

		this.setState({activeIndex: newIndex});
	};
	private onClickMyGifts = async () => {
		const intl = this.props.intl as InjectedIntl;
		if (this.currentUserStore.isNotLoggedIn) {
			this.modalStore.openModal(<LoginOrCancelComponent intl={intl} />, {
				title: intl.formatMessage({id: 'myGifts.popupTitle'}),
				fullScreen: true,
				closeFromOutsideModal: true,
			});
		} else {
			await Router.push(routesPaths.myGifts);
			window.scrollTo(0, 0);
		}
	};
}
export default withIntl(Footer);
