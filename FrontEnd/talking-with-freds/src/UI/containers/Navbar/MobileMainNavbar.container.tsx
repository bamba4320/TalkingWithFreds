import {CURRENT_USER_STORE, MENU_STORE, MODAL_STORE} from 'BL/stores';
import CurrentUserStore from 'BL/stores/CurrentUser.store';
import MenuStore from 'BL/stores/Menu.store';
import ModalStore from 'BL/stores/Modal.store';
import {routesPaths} from 'common/routes/routesPaths.consts';
import {inject, observer} from 'mobx-react';
import Link from 'next/link';
import React, {Component} from 'react';
import {InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import {Icon, Image, Segment} from 'semantic-ui-react';
import MobileMainMenuContainer from './MobileMainMenu.container';
import SearchContainer from './Search.container';
interface IProps {
	[MODAL_STORE]?: ModalStore;
	[MENU_STORE]?: MenuStore;
	[CURRENT_USER_STORE]?: CurrentUserStore;
	intl?: InjectedIntl;
	isIphone: boolean; // for some reason only NOT on iPhone, the first div in the container (in this case the filler) is cut, so we need to give it more height in css
}
interface IState {}

@inject(MENU_STORE, MODAL_STORE, CURRENT_USER_STORE)
@observer
class MobileMainNavbarContainer extends Component<IProps, IState> {
	public menuStore: MenuStore;
	public modalStore: ModalStore;
	public currentUserStore: CurrentUserStore;
	public intl: InjectedIntl;
	constructor(props: Readonly<IProps>) {
		super(props);
		this.menuStore = this.props[MENU_STORE] as MenuStore;
		this.modalStore = this.props[MODAL_STORE] as ModalStore;
		this.currentUserStore = this.props[CURRENT_USER_STORE] as CurrentUserStore;
		this.intl = this.props.intl as InjectedIntl;
		this.state = {};
	}

	public render() {
		return (
			<div className='mobile-main-navbar-container'>
				<div
					className={`mobile-sticky-navbar-filler ${
						this.currentUserStore.isNotLoggedIn
							? !this.props.isIphone
								? 'not-iphoe-sticky-navbar-filler-not-logged-in'
								: 'iphone-sticky-navbar-filler-not-logged-in'
							: !this.props.isIphone
							? 'not-iphoe-sticky-navbar-filler-logged-in'
							: 'iphone-sticky-navbar-filler-logged-in'
					}`}
				/>
				<div className={`mobile-sticky-navbar-container`}>
					<Segment mobilenavbarcontainer='1' zeromargin='1' inverted placeholder>
						<Icon name='bars' fontsize1p4rem='1' cursorpointer='1' autosize='1' onClick={this.handleShowSidebar} />
						<Link href={routesPaths.root}>
							<div>
								<a>
									<Image navbarlogo='1' src='/static/images/Logo_white.png' />
								</a>
							</div>
						</Link>
						<Icon
							name={'search'}
							fontsize1p4rem='1'
							cursorpointer='1'
							autosize='1'
							onClick={this.handleOnSearchClick}
						/>
					</Segment>
					{!this.currentUserStore.isNotLoggedIn && (
						<Segment zeromargin='1' nopaddingonsides='1' inverted>
							<MobileMainMenuContainer />
						</Segment>
					)}
				</div>
			</div>
		);
	}

	private handleShowSidebar = () => {
		this.menuStore.setSidebar(true);
	};

	private handleOnSearchClick = () => {
		this.modalStore.openModal(<SearchContainer isMobile />, {
			title: this.intl.formatMessage({id: 'gifts.FreeSearch'}),
			isNoMarginFromTop: true,
		});
	};
}

export default withIntl(MobileMainNavbarContainer);
