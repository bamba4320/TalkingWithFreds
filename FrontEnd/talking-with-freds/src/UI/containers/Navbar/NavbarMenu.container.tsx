import {MENU_STORE, MODAL_STORE} from 'BL/stores';
import MenuStore from 'BL/stores/Menu.store';
import ModalStore from 'BL/stores/Modal.store';
import {isCurrentUrl} from 'common/routes/historyUtils';
import {routesPaths} from 'common/routes/routesPaths.consts';
import Lang from 'Infrastructure/Language/Language';
import {inject, observer} from 'mobx-react';
import Link from 'next/link';
import {SingletonRouter, withRouter} from 'next/router';
import React, {Component} from 'react';
import {InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import {Menu, Popup} from 'semantic-ui-react';
import CustomResponsiveWrapper from 'UI/components/CustomResponsiveWrapper';
import RecoverDigitalCodeContainer from '../RecoverDigitalCode/RecoverDigitalCode.container';
import CategoryDropdownContainer from './CategoryDropdown.container';

interface IProps {
	[MENU_STORE]?: MenuStore;
	[MODAL_STORE]?: ModalStore;
	router: SingletonRouter;
	mobileDetect: MobileDetect;
	intl: InjectedIntl;
	isSticky: boolean;
	closeMenuDropdown: any;
}

interface IState {
	isOnHover: string;
	activeIndex: number;
	isclicked: boolean;
}

@inject(MENU_STORE, MODAL_STORE)
@observer
class NavbarMenuContainer extends Component<IProps, IState> {
	public menuStore: MenuStore;
	public modalStore: ModalStore;
	constructor(props: Readonly<IProps>) {
		super(props);
		this.menuStore = this.props[MENU_STORE] as MenuStore;
		this.modalStore = this.props[MODAL_STORE] as ModalStore;
		this.state = {
			isOnHover: '',
			activeIndex: -1,
			isclicked: false,
		};
	}

	public render() {
		return (
			<CustomResponsiveWrapper
				mobileDetect={this.props.mobileDetect}
				mobileComponent={this.renderMobileMenu()}
				desktopComponent={this.renderDesktopMenu()}
			/>
		);
	}

	private handleCloseSideBar = () => {
		this.menuStore.setSidebar(false);
	};

	private renderMobileMenu() {
		const intl = this.props.intl as InjectedIntl;
		return (
			<Menu borderless secondary vertical className='mobile-sidebar-menu'>
				<Link href={routesPaths.gifts.root}>
					<a>
						<Menu.Item
							as={'div'}
							className='mobile-sidebar-menu-item'
							transition='1' // less
							mobilesidebaritem='1' // less
							name={intl.formatMessage({id: 'mobileNavbar.ForPeople'})}
							active={isCurrentUrl(this.props.router, routesPaths.gifts.root)}
							onClick={this.handleCloseSideBar}
						/>
					</a>
				</Link>
				<Link href={routesPaths.employeesGifts}>
					<a>
						<Menu.Item
							as={'div'}
							className='mobile-sidebar-menu-item'
							transition='1' // less
							mobilesidebaritem='1' // less
							name={intl.formatMessage({id: 'mobileNavbar.ForWorkers'})}
							active={isCurrentUrl(this.props.router, routesPaths.employeesGifts)}
							onClick={this.handleCloseSideBar}
						/>
					</a>
				</Link>
				<Link href={routesPaths.giftImplementaion}>
					<a>
						<Menu.Item
							as={'div'}
							className='mobile-sidebar-menu-item'
							transition='1' // less
							mobilesidebaritem='1' // less
							name={intl.formatMessage({id: 'mobileNavbar.Implement'})}
							active={isCurrentUrl(this.props.router, routesPaths.giftImplementaion)}
							onClick={this.handleCloseSideBar}
						/>
					</a>
				</Link>

				<Link href={routesPaths.solutions}>
					<a>
						<Menu.Item
							as={'div'}
							className='mobile-sidebar-menu-item'
							transition='1' // less
							mobilesidebaritem='1' // less
							name={intl.formatMessage({id: 'general.Solutions'})}
							active={isCurrentUrl(this.props.router, routesPaths.solutions)}
							onClick={this.handleCloseSideBar}
						/>
					</a>
				</Link>
				<Link href={routesPaths.about}>
					<a>
						<Menu.Item
							as={'div'}
							className='mobile-sidebar-menu-item'
							transition='1' // less
							mobilesidebaritem='1' // less
							name={intl.formatMessage({id: 'general.About'})}
							active={isCurrentUrl(this.props.router, routesPaths.about)}
							onClick={this.handleCloseSideBar}
						/>
					</a>
				</Link>
				<Link href={routesPaths.faq}>
					<a>
						<Menu.Item
							as={'div'}
							className='mobile-sidebar-menu-item'
							transition='1' // less
							mobilesidebaritem='1' // less
							name={intl.formatMessage({id: 'mobileNavbar.Help.commonQuestions'})}
							active={isCurrentUrl(this.props.router, routesPaths.faq)}
							onClick={this.handleCloseSideBar}
						/>
					</a>
				</Link>
				<Link href={routesPaths.contactUs.root}>
					<a>
						<Menu.Item
							as={'div'}
							className='mobile-sidebar-menu-item'
							transition='1' // less
							mobilesidebaritem='1' // less
							name={intl.formatMessage({id: 'mobileNavbar.Help.contactUs'})}
							active={isCurrentUrl(this.props.router, routesPaths.contactUs.root)}
							onClick={this.handleCloseSideBar}
						/>
					</a>
				</Link>
			</Menu>
		);
	}

	private renderDesktopMenu() {
		const head1 = Lang.format('navbar.GiftsForFriendsAndFamily');
		const head2 = Lang.format('navbar.RecievedGift');
		const head3 = Lang.format('navbar.GiftsForWorkersAndClients');
		const head4 = Lang.format('navbar.SolutionsForSuppliers');
		const head5 = Lang.format('navbar.About');
		const head6 = Lang.format('navbar.Help');
		return (
			<Menu
				borderless
				inverted
				pointing
				secondary
				navbarmenu='1' // less
				alignitemscenter='1'>
				<Link href={routesPaths.gifts.root}>
					<a>
						<Menu.Item
							as={'div'}
							navbaritem='1' // less
							transition='1' // less
							alignself='1' // less
							name={head1}
							active={this.isItemActive(head1, routesPaths.gifts.root)}
							hoveredmenuitem={this.state.isOnHover === head1 ? '1' : null}
							onClick={() => {
								this.props.closeMenuDropdown();
							}}
							onMouseEnter={() => {
								this.setState({isOnHover: head1});
								this.menuStore.openMenuDropdown(
									<CategoryDropdownContainer
										isSticky={this.props.isSticky}
										setItemOn={() => {
											this.setState({isOnHover: head1});
										}}
										setItemOff={() => {
											this.setState({isOnHover: ''});
										}}
										isDesktop={true}
									/>
								);
							}}
							onMouseLeave={() => {
								this.setState({isOnHover: ''});
							}}
						/>
					</a>
				</Link>
				{/* modal here implement gift */}
				{!this.state.isclicked && (
					<Popup
						hoverable
						position='bottom center'
						onMouseEnter={() => {
							this.setState({isOnHover: head2});
						}}
						onMouseLeave={() => {
							this.setState({isOnHover: ''});
						}}
						trigger={
							<div>
								<Menu.Item
									as={'div'}
									navbaritem='1' // less
									transition='1' // less
									alignself='1' // less
									name={head2}
									active={this.isItemActive(head2, routesPaths.giftImplementaion)}
									hoveredmenuitem={this.state.isOnHover === head2 ? '1' : null}
									onMouseEnter={() => {
										this.setState({isOnHover: head2});
										this.props.closeMenuDropdown();
									}}
									onMouseLeave={() => {
										this.setState({isOnHover: ''});
									}}
								/>
							</div>
						}>
						<Popup.Content onClick={this.handlePopupContentClick}>
							<Menu vertical navbarpopup='1'>
								<Menu.Item href={routesPaths.giftImplementaion}>{Lang.format('navbar.ImplementGift')}</Menu.Item>
								<Menu.Item
									onClick={() => {
										this.modalStore.openModal(<RecoverDigitalCodeContainer />, {
											title: 'digitalCodeRecovery.Title',
											fullScreen: true,
											closeFromOutsideModal: true,
											isRecoverPassword: true,
										});
									}}>
									{Lang.format('navbar.CodeRecovery')}
								</Menu.Item>
							</Menu>
						</Popup.Content>
					</Popup>
				)}
				<Link href={routesPaths.employeesGifts}>
					<a>
						<Menu.Item
							as={'div'}
							navbaritem='1' // less
							transition='1' // less
							alignself='1' // less
							name={head3}
							active={this.isItemActive(head3, routesPaths.employeesGifts)}
							hoveredmenuitem={this.state.isOnHover === head3 ? '1' : null}
							onMouseEnter={() => {
								this.setState({isOnHover: head3});
								this.menuStore.closeMenuDropdown();
							}}
							onMouseLeave={() => {
								this.setState({isOnHover: ''});
							}}
						/>
					</a>
				</Link>
				<Link href={routesPaths.solutions}>
					<a>
						<Menu.Item
							as={'div'}
							navbaritem='1' // less
							transition='1' // less
							alignself='1' // less
							name={head4}
							active={this.isItemActive(head4, routesPaths.solutions)}
							hoveredmenuitem={this.state.isOnHover === head4 ? '1' : null}
							onMouseEnter={() => {
								this.setState({isOnHover: head4});
								this.menuStore.closeMenuDropdown();
							}}
							onMouseLeave={() => {
								this.setState({isOnHover: ''});
							}}
						/>
					</a>
				</Link>
				<Link href={routesPaths.about}>
					<a>
						<Menu.Item
							as={'div'}
							navbaritem='1' // less
							transition='1' // less
							alignself='1' // less
							name={head5}
							active={this.isItemActive(head5, routesPaths.about)}
							hoveredmenuitem={this.state.isOnHover === head5 ? '1' : null}
							onMouseEnter={() => {
								this.setState({isOnHover: head5});
							}}
							onMouseLeave={() => {
								this.setState({isOnHover: ''});
							}}
						/>
					</a>
				</Link>
				{!this.state.isclicked && (
					<Popup
						hoverable
						position='bottom center'
						onMouseEnter={() => {
							this.setState({isOnHover: head6});
						}}
						onMouseLeave={() => {
							this.setState({isOnHover: ''});
						}}
						trigger={
							// no link here!
							<Menu.Item
								as={'div'}
								navbaritem='1' // less
								transition='1' // less
								marginright='1' // less
								alignself='1' // less
								name={head6}
								// no need for checking if it is in a page, because it doesnt lead to a page when clicking
								active={this.state.isOnHover === head6}
								hoveredmenuitem={this.state.isOnHover === head6 ? '1' : null}
								onMouseEnter={() => {
									this.setState({isOnHover: head6});
								}}
								onMouseLeave={() => {
									this.setState({isOnHover: ''});
								}}
							/>
						}>
						<Popup.Content onClick={this.handlePopupContentClick}>
							<Menu vertical navbarpopup='1'>
								<Link href={routesPaths.faq}>
									<Menu.Item href={routesPaths.faq}>{Lang.format('footer.CommonQuestions')}</Menu.Item>
								</Link>
								<Link href={routesPaths.contactUs.root}>
									<Menu.Item bordertop='1' href={routesPaths.contactUs.root}>
										{Lang.format('navbar.ContactUs')}
									</Menu.Item>
								</Link>
							</Menu>
						</Popup.Content>
					</Popup>
				)}
			</Menu>
		);
	}

	private isItemActive(itemName: string, route: string) {
		return this.state.isOnHover === itemName || isCurrentUrl(this.props.router, route);
	}

	private handlePopupContentClick = () => {
		this.setState({isclicked: true, isOnHover: ''}, () => {
			this.setState({isclicked: false});
		});
	};
}
export default withIntl(withRouter(NavbarMenuContainer));
