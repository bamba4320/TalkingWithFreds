import {CURRENT_USER_STORE, MESSAGES_STORE, UI_STORE} from 'BL/stores';
import CurrentUserStore from 'BL/stores/CurrentUser.store';
import MessagesStore from 'BL/stores/Messages.store';
import UiStore from 'BL/stores/Ui.store';
import {inject, observer} from 'mobx-react';
import React from 'react';
import BlockUi from 'react-block-ui';
import MainModalContainer from 'UI/containers/App/MainModal.container';

export interface ILayoutProps {
	pageProps: any;
	[UI_STORE]?: UiStore;
	[CURRENT_USER_STORE]?: CurrentUserStore;
	[MESSAGES_STORE]?: MessagesStore;
	mobileDetect: MobileDetect;
}

export interface ILayoutState {}

@inject(UI_STORE, CURRENT_USER_STORE, MESSAGES_STORE)
@observer
class Layout extends React.Component<ILayoutProps, ILayoutState> {
	private uiStore: UiStore;
	private currentUserStore: CurrentUserStore;
	private messagesStore: MessagesStore;

	constructor(props: ILayoutProps) {
		super(props);

		this.uiStore = this.props[UI_STORE] as UiStore;
		this.currentUserStore = this.props[CURRENT_USER_STORE] as CurrentUserStore;
		this.messagesStore = this.props[MESSAGES_STORE] as MessagesStore;
	}

	public async componentDidMount() {}

	public render() {
		const shouldBlockUiSite = this.uiStore.shouldBlockUiSite;
		return (
			<BlockUi blocking={shouldBlockUiSite} keepInView>
				<MainModalContainer mobileDetect={this.props.mobileDetect} />
				{/*This side bar wraps all the page content so when opened, it will have the height of the screen */}
			</BlockUi>
		);
	}
}

// export default withRouter(Layout);
export default Layout;
