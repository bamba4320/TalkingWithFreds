import {MESSAGES_STORE} from 'BL/stores';
import MessagesStore from 'BL/stores/Messages.store';
import {ContextsNames, HomePageMessages} from 'common/generalconsts/messages.consts';
import {inject, observer} from 'mobx-react';
import * as React from 'react';
import HomePageComponent from 'UI/components/HomePage/HomePage.component';

export interface IHomePageProps {
	[MESSAGES_STORE]?: MessagesStore;
	mobileDetect: MobileDetect;
	openForgotPassword: boolean;
	shouldLazyLoad: boolean;
}

@inject(MESSAGES_STORE)
@observer
export default class HomePageContainer extends React.Component<IHomePageProps, any> {
	private messagesStore: MessagesStore;

	constructor(props: IHomePageProps) {
		super(props);
		this.messagesStore = this.props[MESSAGES_STORE] as MessagesStore;
	}

	public render() {
		const homepageMessages = this.messagesStore.webSiteMessages[ContextsNames.HOME_PAGE] as HomePageMessages;
		return (
			<HomePageComponent
				mobileDetect={this.props.mobileDetect}
				homepageMessages={homepageMessages}
				shouldLazyLoad={this.props.shouldLazyLoad}
				openForgotPassword={this.props.openForgotPassword}
			/>
		);
	}
}
