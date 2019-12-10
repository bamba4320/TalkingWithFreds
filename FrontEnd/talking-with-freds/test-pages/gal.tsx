import {UI_STORE} from 'BL/stores';
import UiStore from 'BL/stores/Ui.store';
import {ApplicationPageOptions} from 'common/generalconsts/pageOptions.enums';
import {inject, observer} from 'mobx-react';
import {AppComponentContext} from 'next/app';
import * as React from 'react';
import {Button} from 'semantic-ui-react';
import CustomResponsiveWrapper from 'UI/components/CustomResponsiveWrapper';

export interface IGalProps {
	[UI_STORE]: UiStore;
	mobileDetect: MobileDetect;
}

export interface IGalState {}

@inject(UI_STORE)
@observer
class Gal extends React.Component<IGalProps, IGalState> {
	public static getInitialProps = (ctx: AppComponentContext) => {
		// This is how you get the mobileDetect from ctx
		const mobileDetect = (ctx as any)[ApplicationPageOptions.mobileDetect];
		return {
			gal: 2,
			mobileDetect,
		};
	};
	private uiStore: UiStore;

	constructor(props: IGalProps) {
		super(props);

		this.state = {};
		this.uiStore = this.props[UI_STORE] as UiStore;
	}

	public startLoading = () => {
		this.uiStore.blockUiSite();
	};

	public render() {
		return (
			<>
				<CustomResponsiveWrapper
					// You can use mobileDetect option
					mobileDetect={this.props.mobileDetect}
					mobileComponent={<div>mobile</div>}
					desktopComponent={'desktop'}
				/>
				<Button onClick={this.startLoading}>click here to start loading</Button>
			</>
		);
	}
}

export default Gal;
