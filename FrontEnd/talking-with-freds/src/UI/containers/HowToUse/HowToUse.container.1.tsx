import {UI_STORE} from 'BL/stores';
import UiStore from 'BL/stores/Ui.store';
import {inject, observer} from 'mobx-react';
import * as React from 'react';

export interface IHowToUseProps {
	[UI_STORE]?: UiStore;
}

export interface IHowToUseState {}

@inject(UI_STORE)
@observer
export default class HowToUse2 extends React.Component<IHowToUseProps, IHowToUseState> {
	public uiStore: UiStore;

	constructor(props: IHowToUseProps) {
		super(props);
		this.uiStore = this.props[UI_STORE] as UiStore;

		this.state = {};
	}

	public render() {
		return <div>how to use.container 1</div>;
	}
}
