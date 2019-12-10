import {CURRENT_USER_STORE, FAVORITES_STORE, MENU_STORE, MESSAGES_STORE, UI_STORE} from 'BL/stores';
import CurrentUserStore from 'BL/stores/CurrentUser.store';
import FavoritesStore from 'BL/stores/Favorites.store';
import MenuStore from 'BL/stores/Menu.store';
import MessagesStore from 'BL/stores/Messages.store';
import UiStore from 'BL/stores/Ui.store';
import {LayoutPageOptions, NewsletterPageOptions} from 'common/generalconsts/pageOptions.enums';
import Logger from 'common/utils/logger/logger';
import {inject, observer} from 'mobx-react';
import React from 'react';
import BlockUi from 'react-block-ui';
import Footer from 'UI/containers/App/Footer';
import MainModalContainer from 'UI/containers/App/MainModal.container';
import SidebarContainer from 'UI/containers/App/Sidebar.container';
import MainNavbarContainer from 'UI/containers/Navbar/MainNavbar.container';

export interface ILayoutProps {
	pageProps: any;
	[UI_STORE]?: UiStore;
	[CURRENT_USER_STORE]?: CurrentUserStore;
	[MESSAGES_STORE]?: MessagesStore;
	[MENU_STORE]?: MenuStore;
	[FAVORITES_STORE]?: FavoritesStore;
	mobileDetect: MobileDetect;
}

export interface ILayoutState {}

@inject(UI_STORE, CURRENT_USER_STORE, MESSAGES_STORE, MENU_STORE, FAVORITES_STORE)
@observer
class Layout extends React.Component<ILayoutProps, ILayoutState> {
	private uiStore: UiStore;
	private currentUserStore: CurrentUserStore;
	private messagesStore: MessagesStore;
	private menuStore: MenuStore;
	private favStore: FavoritesStore;

	constructor(props: ILayoutProps) {
		super(props);

		this.uiStore = this.props[UI_STORE] as UiStore;
		this.currentUserStore = this.props[CURRENT_USER_STORE] as CurrentUserStore;
		this.messagesStore = this.props[MESSAGES_STORE] as MessagesStore;
		this.menuStore = this.props[MENU_STORE] as MenuStore;
		this.favStore = this.props[FAVORITES_STORE] as FavoritesStore;
	}

	public async componentDidMount() {
		try {
			this.messagesStore.loadMessagesFromConfiguration(false);
			await this.menuStore.fetchCategoriesHeader();
			if (this.favStore.isEmpty && this.currentUserStore.isNotLoggedIn) {
				this.favStore.initFavoritesForUser(false);
			}
		} catch (err) {
			Logger.error('Error occurd when loading website', err);
		}
	}

	public render() {
		const shouldBlockUiSite = this.uiStore.shouldBlockUiSite;
		return (
			<BlockUi blocking={shouldBlockUiSite} keepInView>
				<MainModalContainer mobileDetect={this.props.mobileDetect} />
				{/*This side bar wraps all the page content so when opened, it will have the height of the screen */}
				<SidebarContainer mobileDetect={this.props.mobileDetect}>
					{!this.props.pageProps[LayoutPageOptions.withoutHeader] ? (
						<MainNavbarContainer
							isSticky={!this.props.pageProps[LayoutPageOptions.withSticky]}
							mobileDetect={this.props.mobileDetect}
						/>
					) : null}
					{this.props.children}
					{!this.props.pageProps[LayoutPageOptions.withoutFooter] ? (
						<Footer
							mobileDetect={this.props.mobileDetect}
							withoutNewsletter={!this.props.pageProps[NewsletterPageOptions.withoutBusiness] ? true : false}
						/>
					) : null}
				</SidebarContainer>
			</BlockUi>
		);
	}
}

// export default withRouter(Layout);
export default Layout;
