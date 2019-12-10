import {CURRENT_USER_STORE, FAVORITES_STORE, MENU_STORE, MODAL_STORE} from 'BL/stores';
import CurrentUserStore from 'BL/stores/CurrentUser.store';
import FavoritesStore from 'BL/stores/Favorites.store';
import MenuStore from 'BL/stores/Menu.store';
import ModalStore from 'BL/stores/Modal.store';
import {routesPaths} from 'common/routes/routesPaths.consts';
import {inject, observer} from 'mobx-react';
import Link from 'next/link';
import React, {Component, createRef, RefObject} from 'react';
import {Grid, Icon, Image, Label, Segment, Sticky} from 'semantic-ui-react';
import FavoritesPopupComponent from 'UI/components/Favorites/favoritesPopup.component';
import MainLoginContainer from '../LogIn/MainLogin.container';
import LoggedInProfileDropdownContainer from './LoggedInProfileDropdown.container';
import NavbarMenuContainer from './NavbarMenu.container';
import SearchContainer from './Search.container';

interface IProps {
	[MODAL_STORE]?: ModalStore;
	[MENU_STORE]?: MenuStore;
	[CURRENT_USER_STORE]?: CurrentUserStore;
	[FAVORITES_STORE]?: FavoritesStore;
	mobileDetect: MobileDetect;
	isSticky: boolean;
}

interface IState {}

@inject(MENU_STORE, MODAL_STORE, CURRENT_USER_STORE, FAVORITES_STORE)
@observer
export default class DesktopMainNavbarContainer extends Component<IProps, IState> {
	public menuStore: MenuStore;
	public modalStore: ModalStore;
	public currentUserStore: CurrentUserStore;
	public favStore: FavoritesStore;
	public contextRef = createRef();
	constructor(props: Readonly<IProps>) {
		super(props);
		this.menuStore = this.props[MENU_STORE] as MenuStore;
		this.modalStore = this.props[MODAL_STORE] as ModalStore;
		this.currentUserStore = this.props[CURRENT_USER_STORE] as CurrentUserStore;
		this.favStore = this.props[FAVORITES_STORE] as FavoritesStore;
		this.state = {};
	}

	public render() {
		return (
			<div ref={this.contextRef as RefObject<HTMLDivElement>} className='main-desktop-navbar-container'>
				<Grid zeromargin='1' height5rem='1' onMouseEnter={this.closeMenuDropdown} onMouseLeave={this.closeMenuDropdown}>
					<Grid.Row>
						<Grid.Column width='8' navbarfirstrow='1'>
							<FavoritesPopupComponent
								trigger={
									<div className='favorites-link-div'>
										{!this.favStore.isEmpty && (
											<Label floating circular color='orange' className='favorites-link-label'>
												{this.favStore.FavoritesAmount}
											</Label>
										)}
										<Link href={routesPaths.favorites.root}>
											<a>
												<Icon className='favorites-link-icon' size='large' name='heart' primaryicon='1' />
											</a>
										</Link>
									</div>
								}
							/>
							{/* ! part2
							<Header navbarlink='1'>{Lang.format('navbar.BusinessEntrance')}</Header>
							<Header navbarlink='1'>{Lang.format('navbar.SuppliersEntrance')}</Header> */}
							<div className='divider' />
							{!this.currentUserStore.isNotLoggedIn ? (
								<LoggedInProfileDropdownContainer memberName={this.currentUserStore.getCurrentUserFullNameOrDefault} />
							) : (
								<MainLoginContainer />
							)}
						</Grid.Column>
					</Grid.Row>
				</Grid>
				<Sticky active={!this.props.isSticky} context={this.contextRef}>
					<Segment inverted zeromargin='1' desktopmenu='1' className='desktop-sticky-main-navbar'>
						<Link href={routesPaths.root}>
							<a>
								<Segment
									inverted
									placeholder
									navbarmainiconpadding='1'
									fitcontentwidth='1'
									onMouseEnter={this.closeMenuDropdown}>
									<Image navbarlogo='1' src={'/static/images/Logo_white.png'} />
								</Segment>
							</a>
						</Link>
						<div className='navbar-menu'>
							<NavbarMenuContainer
								mobileDetect={this.props.mobileDetect}
								isSticky={this.props.isSticky}
								closeMenuDropdown={this.closeMenuDropdown}
							/>
						</div>
						<SearchContainer />
					</Segment>
				</Sticky>
				{/* The menu dropdown */}
				{this.menuStore.isMenuDropdownOpen && this.menuStore.dropdownContent}
			</div>
		);
	}

	private closeMenuDropdown = () => {
		this.menuStore.closeMenuDropdown();
	};

	// private openBusinessLogin = () => {
	// 	this.modalStore.openModal(
	// 		<MainLoginComponent openModal={this.modalStore.openModal} closeModal={this.modalStore.popModal} />,
	// 		{
	// 			closeFromOutsideModal: true,
	// 			fullScreen: true,
	// 			title: 'login.LoginOrRegister',
	// 		}
	// 	);
	// };

	// private openSuppliersLogin = () => {
	// 	this.modalStore.openModal(
	// 		<MainLoginComponent openModal={this.modalStore.openModal} closeModal={this.modalStore.popModal} />,
	// 		{
	// 			closeFromOutsideModal: true,
	// 			fullScreen: true,
	// 			title: 'login.LoginOrRegister',
	// 		}
	// 	);
	// };
}
