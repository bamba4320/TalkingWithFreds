import {CONFIGURATION_STORE, CURRENT_USER_STORE, UI_STORE} from 'BL/stores';
import ConfigurationStore from 'BL/stores/Configuration.store';
import CurrentUserStore from 'BL/stores/CurrentUser.store';
import UiStore from 'BL/stores/Ui.store';
import {LayoutPageOptions} from 'common/generalconsts/pageOptions.enums';
import {inject, observer} from 'mobx-react';
import Link from 'next/link';
import * as React from 'react';
import HowToUseContainer from 'UI/containers/HowToUse/HowToUse.container';

export interface ITwoProps {
	[UI_STORE]?: UiStore;
	[CURRENT_USER_STORE]?: CurrentUserStore;
	[CONFIGURATION_STORE]?: ConfigurationStore;
}

export interface ITwoState {
	gal: number;
}

@inject(UI_STORE, CURRENT_USER_STORE, CONFIGURATION_STORE)
@observer
export default class Two extends React.Component<ITwoProps, ITwoState> {
	public static getInitialProps(props) {
		return {
			[LayoutPageOptions.withoutFooter]: true,
		};
	}

	private uiStore: UiStore;
	private configurationStore: ConfigurationStore;

	constructor(props: ITwoProps) {
		super(props);
		this.state = {
			gal: 345345342,
		};

		this.uiStore = this.props[UI_STORE] as UiStore;
		this.configurationStore = this.props[CONFIGURATION_STORE] as ConfigurationStore;
	}

	public render() {
		return (
			<div>
				this is page two
				<div />
				<Link href='/tests/one'>
					<a> click here in order to go to one</a>
				</Link>
				<Link href='/tests/gal'>
					<a> gal page</a>
				</Link>
				<div>the config are::{JSON.stringify(this.configurationStore.configuration)}</div>
				{/* <div>mobxStores:{mobxStores}</div> */}
				<img src='/static/aaaa.png' alt='my image' />
				<HowToUseContainer />
			</div>
		);
	}
}
