import {MENU_STORE} from 'BL/stores';
import MenuStore from 'BL/stores/Menu.store';
import MobileDetectUtils from 'common/utils/processUtils/MobileDetectUtils';
import MobileDetect from 'mobile-detect';
import {inject, observer} from 'mobx-react';
import React, {Component} from 'react';
import CustomResponsiveWrapper from 'UI/components/CustomResponsiveWrapper';
import DesktopMainNavbarContainer from './DesktopMainNavbar.container';
import MobileMainNavbarContainer from './MobileMainNavbar.container';
interface IProps {
	mobileDetect: MobileDetect;
	isSticky: boolean;
	[MENU_STORE]?: MenuStore;
}
interface IState {
	isIphone: boolean;
}

@inject(MENU_STORE)
@observer
export default class MainNavbarContainer extends Component<IProps, IState> {
	public menuStore: MenuStore;
	constructor(props: Readonly<IProps>) {
		super(props);
		this.menuStore = this.props[MENU_STORE] as MenuStore;
		this.state = {
			isIphone: false,
		};
	}

	public componentDidMount() {
		this.setState({isIphone: MobileDetectUtils.detectMobileDevice(this.props.mobileDetect, 'iPhone')});
	}
	public render() {
		return (
			<CustomResponsiveWrapper
				mobileDetect={this.props.mobileDetect}
				desktopComponent={
					<DesktopMainNavbarContainer isSticky={this.props.isSticky} mobileDetect={this.props.mobileDetect} />
				}
				mobileComponent={<MobileMainNavbarContainer isIphone={this.state.isIphone} />}
			/>
		);
	}
}
