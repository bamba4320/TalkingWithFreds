import {MESSAGES_STORE} from 'BL/stores';
import MessagesStore from 'BL/stores/Messages.store';
import {inject, observer} from 'mobx-react';
import * as React from 'react';

export interface ISeoContainerProps {
	[MESSAGES_STORE]?: MessagesStore;
}

export interface ISeoContainerState {}

@inject(MESSAGES_STORE)
@observer
export default class SeoContainer extends React.Component<ISeoContainerProps, ISeoContainerState> {
	private messagesStore: MessagesStore;

	constructor(props: ISeoContainerProps) {
		super(props);
		this.messagesStore = this.props[MESSAGES_STORE] as MessagesStore;
	}

	public render() {
		return (
			<div>
				<div>This is message from Editor:</div>
				<div>
					{this.messagesStore.webSiteMessages &&
						this.messagesStore.webSiteMessages.footer &&
						this.messagesStore.webSiteMessages.footer.category1 &&
						this.messagesStore.webSiteMessages.footer.category1.messageText}
				</div>
			</div>
		);
	}
}
