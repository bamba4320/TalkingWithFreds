import {AUTH_STORE, CURRENT_USER_STORE, FAVORITES_STORE, MENU_STORE, MODAL_STORE} from 'BL/stores';
import AuthStore from 'BL/stores/Auth.store';
import CurrentUserStore from 'BL/stores/CurrentUser.store';
import FavoritesStore from 'BL/stores/Favorites.store';
import MenuStore from 'BL/stores/Menu.store';
import ModalStore from 'BL/stores/Modal.store';
import {routesPaths} from 'common/routes/routesPaths.consts';
import Lang from 'Infrastructure/Language/Language';
import {inject, observer} from 'mobx-react';
import Link from 'next/link';
import Router from 'next/router';
import {Component} from 'react';
import {Button, Icon, Label, Segment, Sidebar} from 'semantic-ui-react';
import MainLoginComponent from 'UI/components/Login/MainLogin.component';
import NavbarMenuContainer from '../Navbar/NavbarMenu.container';

interface IProps {
	[MODAL_STORE]?: ModalStore;
	[MENU_STORE]?: MenuStore;
	[AUTH_STORE]?: AuthStore;
	[CURRENT_USER_STORE]?: CurrentUserStore;
	[FAVORITES_STORE]?: FavoritesStore;
	mobileDetect: MobileDetect;
}
interface IState {}

@inject(MENU_STORE, MODAL_STORE, AUTH_STORE, CURRENT_USER_STORE, FAVORITES_STORE)
@observer
export default class SidebarContainer extends Component<IProps, IState> {
	public menuStore: MenuStore;
	public modalStore: ModalStore;
	public authStore: AuthStore;
	public currentUserStore: CurrentUserStore;
	public favStore: FavoritesStore;
	constructor(props: Readonly<IProps>) {
		super(props);
		this.menuStore = this.props[MENU_STORE] as MenuStore;
		this.modalStore = this.props[MODAL_STORE] as ModalStore;
		this.authStore = this.props[AUTH_STORE] as AuthStore;
		this.currentUserStore = this.props[CURRENT_USER_STORE] as CurrentUserStore;
		this.favStore = this.props[FAVORITES_STORE] as FavoritesStore;
		this.state = {};
	}

	public render() {
		return (
			<Sidebar.Pushable as={Segment} className='sidebar-pushable'>
				<Sidebar
					as={Segment}
					animation='overlay'
					direction='right'
					onHide={this.handleHideSidebar}
					visible={this.menuStore.isSidebarOpen}
					width230px='1'
					overflow='1'
					className='sidebar'>
					<div className='sticky-div'>
						<Segment placeholder nopadding='1'>
							<Segment placeholder sidebaricons='1' displayblock='1' className='top-icons-bar'>
								<Icon name='x' size='big' primaryicon='1' cursorpointer='1' onClick={this.handleHideSidebar} />
								<div className='favorites-icon-div'>
									{!this.favStore.isEmpty && (
										<Label floating circular color='orange' className='favorites-link-label'>
											{this.favStore.FavoritesAmount}
										</Label>
									)}
									<Link href={routesPaths.favorites.root}>
										<a>
											<Icon
												className='favorites-icon'
												name='heart outline'
												size='big'
												primaryicon='1'
												cursorpointer='1'
												marginright0p6rem='1'
												onClick={this.handleHideSidebar}
											/>
										</a>
									</Link>
								</div>
							</Segment>

							<NavbarMenuContainer mobileDetect={this.props.mobileDetect} />
							{this.currentUserStore.isNotLoggedIn && (
								<Button
									onClick={() => {
										this.openMainLogin();
										this.handleHideSidebar();
									}}
									navbarmargin='1'
									fluid
									circular
									mainloginbutton='1'
									primarybutton='1'>
									{Lang.format('login.LoginOrRegister')}
								</Button>
							)}
							{/* ! part2
							{this.currentUserStore.isNotLoggedIn && (
								<Button navbarmargin='1' fluid circular mainloginbutton='1' opositebutton='1'>
									{Lang.format('navbar.BusinessEntrance')}
								</Button>
							)}
							{this.currentUserStore.isNotLoggedIn && (
								<Button navbarmargin='1' fluid circular mainloginbutton='1' opositebutton='1'>
									{Lang.format('navbar.SuppliersEntrance')}
								</Button>
							)} */}
							{!this.currentUserStore.isNotLoggedIn && (
								<Button
									onClick={() => {
										this.authStore.logOut();
										Router.push(routesPaths.root);
										this.handleHideSidebar();
									}}
									navbarmargin='1'
									fluid
									circular
									mainloginbutton='1'
									primarybutton='1'>
									{Lang.format('profile.LogOut')}
								</Button>
							)}
						</Segment>
					</div>
				</Sidebar>
				<Sidebar.Pusher className='sidebar-pusher'>{this.props.children}</Sidebar.Pusher>
			</Sidebar.Pushable>
		);
	}

	private handleHideSidebar = () => {
		this.menuStore.setSidebar(false);
	};

	private openMainLogin = () => {
		this.modalStore.openModal(
			<MainLoginComponent openModal={this.modalStore.openModal} closeModal={this.modalStore.closeModal} />,
			{
				closeFromOutsideModal: true,
				fullScreen: true,
				title: 'login.LoginOrRegister',
				isNoMarginFromTop: true,
			}
		);
	};
}
