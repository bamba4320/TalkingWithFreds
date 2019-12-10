import {MESSAGES_STORE} from 'BL/stores';
import MessagesStore from 'BL/stores/Messages.store';
import * as React from 'react';
import PartEightBannerComponent from 'UI/components/HomePage/PartEightBanner.component';

export interface IPartEightBannerProps {
	[MESSAGES_STORE]?: MessagesStore;
	mobileDetect: MobileDetect;
	upText: any;
	upImage: string | undefined;
	downText: any;
	downImage: string | undefined;
	isHtml: boolean;
	withOutbtns?: boolean;
	upButtonText?: string;
	downButtonText?: string;
	implementGift?: boolean;
	downAlt?: string;
	upAlt?: string;
}

export default class PartEightBannerContainer extends React.Component<IPartEightBannerProps, any> {
	constructor(props: IPartEightBannerProps) {
		super(props);
	}

	public render() {
		return (
			<PartEightBannerComponent
				mobileDetect={this.props.mobileDetect}
				implementGift={this.props.implementGift}
				upText={this.props.upText}
				upImage={this.props.upImage}
				downText={this.props.downText}
				downImage={this.props.downImage}
				withOutbtns={this.props.withOutbtns}
				upButtonText={this.props.upButtonText}
				downButtonText={this.props.downButtonText}
				downAlt={this.props.downAlt}
				upAlt={this.props.upAlt}
				isHtml={this.props.isHtml}
			/>
		);
	}
}
