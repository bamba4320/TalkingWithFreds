import {CURRENT_USER_STORE, MESSAGES_STORE} from 'BL/stores';
import CurrentUserStore from 'BL/stores/CurrentUser.store';
import MessagesStore from 'BL/stores/Messages.store';
import {NewsletterMessages} from 'common/generalconsts/messages.consts';
import {inject, observer} from 'mobx-react';
import React, {Component} from 'react';
import NewsletterComponent from 'UI/components/Newsletter.component';

interface IProps {
	[MESSAGES_STORE]?: MessagesStore;
	[CURRENT_USER_STORE]?: CurrentUserStore;
	mobileDetect: MobileDetect;
}

interface IState {}

@inject(MESSAGES_STORE, CURRENT_USER_STORE)
@observer
export default class NewsletterContainer extends Component<IProps, IState> {
	private messagesStore: MessagesStore;
	private currentUserStore: CurrentUserStore;

	constructor(props: IProps) {
		super(props);
		this.state = {};
		this.messagesStore = this.props[MESSAGES_STORE] as MessagesStore;
		this.currentUserStore = this.props[CURRENT_USER_STORE] as CurrentUserStore;
	}

	public render() {
		const newsletterMessages: NewsletterMessages = this.messagesStore.webSiteMessages.newsletter;
		return (
			<div className='newsletter-container'>
				<NewsletterComponent
					mobileDetect={this.props.mobileDetect}
					onSubmitRequest={this.onFormSubmitRequest}
					newsletterMessages={newsletterMessages}
				/>
			</div>
		);
	}

	private onFormSubmitRequest = async (values: {email: string}) => {
		// if user logged in, do not send email address. everything nececcery is in token.
		return await this.currentUserStore.handleNewsletter(this.currentUserStore.isNotLoggedIn ? values.email : '');
	};
}
