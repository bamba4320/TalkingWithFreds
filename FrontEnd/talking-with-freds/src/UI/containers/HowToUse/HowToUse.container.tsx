import {CURRENT_USER_STORE, MESSAGES_STORE, UI_STORE} from 'BL/stores';
import CurrentUserStore from 'BL/stores/CurrentUser.store';
import MessagesStore from 'BL/stores/Messages.store';
import UiStore from 'BL/stores/Ui.store';
import EnvConfig from 'Infrastructure/config/env.config';
import {inject, observer} from 'mobx-react';
import * as React from 'react';
import {Button} from 'semantic-ui-react';

export interface IHowToUseProps {
	[UI_STORE]?: UiStore;
	[CURRENT_USER_STORE]?: CurrentUserStore;
	[MESSAGES_STORE]?: MessagesStore;
}

export interface IHowToUseState {
	checkConfig: string;
}

@inject(UI_STORE, CURRENT_USER_STORE, MESSAGES_STORE)
@observer
export default class HowToUseContainer extends React.Component<IHowToUseProps, IHowToUseState> {
	private uiStore: UiStore;
	private currentUserStore: CurrentUserStore;
	private messagesStore: MessagesStore;

	constructor(props: IHowToUseProps) {
		super(props);

		this.state = {
			checkConfig: EnvConfig.getAppEnv() || 'nosuchgthin',
		};
		this.uiStore = this.props[UI_STORE] as UiStore;
		this.currentUserStore = this.props[CURRENT_USER_STORE] as CurrentUserStore;
		this.messagesStore = this.props[MESSAGES_STORE] as MessagesStore;
	}

	public render() {
		<div>current user name:{this.currentUserStore.getCurrentUserFullNameOrDefault}</div>;

		return (
			<div>
				<div>footer.footer1:{this.messagesStore.webSiteMessages.footer.footer1}</div>
				<div>state: {this.state.checkConfig}</div>
				<Button
					onClick={() => {
						const checkConfig = EnvConfig.getApiUrlFromClient();
						this.setState({checkConfig});
					}}>
					click1
				</Button>
				<Button
					onClick={() => {
						const checkConfig = EnvConfig.getNodeEnv();
						this.setState({checkConfig});
					}}>
					click2
				</Button>
			</div>
		);
	}
}
