import {CURRENT_USER_STORE, initializeStores, MODAL_STORE, UI_STORE} from 'BL/stores';
import CurrentUserStore from 'BL/stores/CurrentUser.store';
import ModalStore, {MODAL_HASHTAG} from 'BL/stores/Modal.store';
import UiStore from 'BL/stores/Ui.store';
import {ApplicationPageOptions, LayoutPageOptions} from 'common/generalconsts/pageOptions.enums';
import {Width} from 'common/generalconsts/width.const';
import MobileDetectUtils from 'common/utils/processUtils/MobileDetectUtils';
import NextjsProcessUtils from 'common/utils/processUtils/NextjsProcessUtils';
import UserAgentDetecor from 'common/utils/processUtils/UserAgentDetecor';
import MobileDetect from 'mobile-detect';
import {Provider} from 'mobx-react';
import App, {Container, DefaultAppIProps, NextAppContext} from 'next/app';
import Router from 'next/router';
import Layout from 'NextJsComponents/Layout/Layout';
import React from 'react';
import 'react-block-ui/style.css';
import 'semantic-ui-less/semantic.less';
import 'UI/index.scss';

class TalkingWithFredsApp extends App {
	public static async getInitialProps(appContext: NextAppContext) {
		// In case of error, we don't need to do all the initialize of the App (including MobX)
		if (NextjsProcessUtils.isErrorPage(appContext)) {
			return {
				pageProps: {
					[LayoutPageOptions.hasError]: true,
				},
			};
		}

		// get if server and mobile detect
		const isServer = NextjsProcessUtils.isServer();
		const userAgentDetector: UserAgentDetecor | undefined = UserAgentDetecor.createUserAgent(appContext);
		const mobileDetect: MobileDetect | undefined = MobileDetectUtils.getMobileDetect(userAgentDetector!);

		/** MobX */

		// Get or Create the store with `undefined` as initialState
		// This allows you to set a custom default initialState
		const mobxStores = initializeStores(isServer);

		// Only in server side we load the configuration
		const currentUserStore = mobxStores[CURRENT_USER_STORE] as CurrentUserStore;

		if (isServer) {
			// try {
			// 	// Load messages, current User and Favorites
			// 	await currentUserStore.initCurrentUserFromApi(appContext.ctx);
			// } catch (err) {
			// 	console.log('error in init CurrentUser & Messages', err);
			// }
		}

		/** Inject infos to application context (can be used in `getInitialProps` in pages) */

		// Provide the store to `getInitialProps` of pages
		(appContext.ctx as any)[ApplicationPageOptions.mobxStores] = mobxStores;

		// Provide `mobileDetect` to `getInitialProps` of pages
		(appContext.ctx as any)[ApplicationPageOptions.mobileDetect] = mobileDetect;

		// Provide `userAgentDetector` to `getInitialProps` of pages
		(appContext.ctx as any)[ApplicationPageOptions.userAgentDetector] = userAgentDetector;

		/** AppProps */
		const appProps: DefaultAppIProps = await App.getInitialProps(appContext);

		// Get the `locale` and `messages` from the request object on the server.
		// In the browser, use the same values that the server serialized.
		const {req} = appContext.ctx;
		const initialNow = Date.now();

		// props only for `_app`
		return {
			...appProps,
			initialMobxState: mobxStores,
			initialMobileDetect: mobileDetect,
			initialNow,
		};
	}

	private mobxStores: any;

	constructor(props: any) {
		super(props);
		const isServer = NextjsProcessUtils.isServer();
		this.mobxStores = isServer ? props.initialMobxState : initializeStores(isServer, props.initialMobxState);
	}

	public componentDidMount() {
		this.preventScrollingInRouteChange();
		this.setLoadingInRouteChange();
		this.closeModalInRouteChange();
		this.setNewsLetterRouteChange();
	}

	public render() {
		const {Component, pageProps} = this.props;
		const initialMobileDetect: MobileDetect = (this.props as any).initialMobileDetect;

		// In case of error, we only send back the Container And the Component
		if (pageProps[LayoutPageOptions.hasError]) {
			return (
				<Container>
					<Component {...pageProps} />
				</Container>
			);
		}

		return (
			<Container>
				<Provider {...this.mobxStores}>
					<Layout pageProps={pageProps} mobileDetect={initialMobileDetect}>
						<Component {...pageProps} />
					</Layout>
				</Provider>
			</Container>
		);
	}

	/**
	 * this function was made to prevent a common issue of next js
	 * which is, that when you go back or forth a page in the browser
	 * history, then the first thing that's happening is that the browser
	 * scrolls to the place you have been in the previous/next page and only
	 * after that, switches the page. this was found in
	 * https://github.com/zeit/next.js/issues/3303#issuecomment-536166016
	 */
	private preventScrollingInRouteChange = () => {
		window.history.scrollRestoration = 'auto';
		const cachedScrollPositions: number[][] = [];
		let shouldScrollRestore: {x: number; y: number} | null;

		Router.events.on('routeChangeStart', () => {
			cachedScrollPositions.push([window.scrollX, window.scrollY]);
		});

		Router.events.on('routeChangeComplete', () => {
			if (shouldScrollRestore) {
				const {x, y} = shouldScrollRestore;
				window.scrollTo(x, y);
				shouldScrollRestore = null;
			}
			window.history.scrollRestoration = 'auto';
		});

		Router.beforePopState(() => {
			if (cachedScrollPositions.length > 0) {
				const [x, y]: any = cachedScrollPositions.pop();
				shouldScrollRestore = {x, y};
			}
			window.history.scrollRestoration = 'manual';
			return true;
		});
	};
	/**
	 * add Block-UI to website when routeChangeStart and UnBlock-UI when routeChangeComplete
	 */
	private setLoadingInRouteChange = () => {
		const uiStore: UiStore = this.mobxStores[UI_STORE] as UiStore;

		Router.events.on('routeChangeStart', () => {
			uiStore.blockUiSite();
		});

		Router.events.on('routeChangeComplete', () => {
			uiStore.unblockUiSite();
		});
	};
	/**
	 * close modal in back event or open modal on next event
	 */
	private closeModalInRouteChange = () => {
		const modalStore: ModalStore = this.mobxStores[MODAL_STORE] as ModalStore;
		const ismobile: boolean = window.innerWidth <= Width.mobile;
		window.onpopstate = (_e: PopStateEvent) => {
			if (modalStore.modalIsOpen) {
				modalStore.closeModal(true, true);
			} else if (window.location.href.includes(MODAL_HASHTAG) && ismobile) {
				modalStore.pushHistory();
			}
		};
	};
	/**
	 * sets the store state to true so the newsletter will reset
	 */
	private setNewsLetterRouteChange = () => {
		const uiStore: UiStore = this.mobxStores[UI_STORE] as UiStore;
		Router.events.on('routeChangeStart', () => {
			uiStore.setIsRouteChanged(true);
		});
	};
}

export default TalkingWithFredsApp;
