import NofhonitCookies from 'Infrastructure/storage/NofhonitCookies';
import React, {Component} from 'react';
import CustomResponsiveWrapper from 'UI/components/CustomResponsiveWrapper';
import DesktopPurchaseContainer from './DesktopPurchase.container';
import MobilePurchaseContainer from './MobilePurchase.container';

interface IProps {
	mobileDetect: MobileDetect;
}
interface IState {}
export default class MainPurchaseContainer extends Component<IProps, IState> {
	constructor(props: Readonly<IProps>) {
		super(props);
		this.state = {};
	}
	public componentDidMount() {
		NofhonitCookies.clearPurchase();
	}

	public render() {
		return (
			<CustomResponsiveWrapper
				mobileDetect={this.props.mobileDetect}
				desktopComponent={<DesktopPurchaseContainer mobileDetect={this.props.mobileDetect} />}
				mobileComponent={<MobilePurchaseContainer mobileDetect={this.props.mobileDetect} />}
			/>
		);
	}
}
