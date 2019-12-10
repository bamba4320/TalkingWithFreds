import {MESSAGES_STORE} from 'BL/stores';
import MessagesStore from 'BL/stores/Messages.store';
import EnvConfig from 'Infrastructure/config/env.config';
import {inject, observer} from 'mobx-react';
import * as React from 'react';
import JsonPretify from './JsonPretify';

export interface IEnvFooterProps {
	pageProps: any;
	[MESSAGES_STORE]?: MessagesStore;
	initialMobileDetect: MobileDetect;
}

export interface IEnvFooterState {}

@inject(MESSAGES_STORE)
@observer
export default class EnvFooter extends React.Component<IEnvFooterProps, IEnvFooterState> {
	private messagesStore: MessagesStore;

	constructor(props: any) {
		super(props);
		this.messagesStore = this.props[MESSAGES_STORE] as MessagesStore;
	}

	public render() {
		const isProduction = EnvConfig.getNodeEnv() === 'production';
		const visibilityForEnvFooter = isProduction ? 'none' : 'block';
		return (
			<div className={'envfooter-container'} style={{display: visibilityForEnvFooter}}>
				<div className={'build-id-container'}>
					version: <b>{EnvConfig.getBuildId()}</b>
				</div>
				<div className={'nodeEnv-container'}>
					deployed as: <b>{EnvConfig.getNodeEnv()}</b>
				</div>
				<div className={'appEnv-container'}>
					env: <b>{EnvConfig.getAppEnv()}</b>
				</div>
				<div className={'apiUrl-container client'}>
					API from client is: <b>{EnvConfig.getApiUrlFromClient()}</b>
				</div>
				<div className={'apiUrl-container server'}>
					API from server is: <b>{EnvConfig.getApiUrlFromServer()}</b>
				</div>
				<JsonPretify title={'PageProps'} jsonObject={this.props.pageProps} />
				<JsonPretify title={'Messages'} jsonObject={this.messagesStore.webSiteMessages} />
				<JsonPretify title={'SSR Mobile Detect'} jsonObject={this.props.initialMobileDetect} />
			</div>
		);
	}
}
