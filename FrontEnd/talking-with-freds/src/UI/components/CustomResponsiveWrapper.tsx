import {Width} from 'common/generalconsts/width.const';
import NextjsProcessUtils from 'common/utils/processUtils/NextjsProcessUtils';
import React from 'react';
import {Responsive} from 'semantic-ui-react';

interface IProps {
	desktopComponent: any;
	mobileComponent: any;
	mobileDetect: MobileDetect;
}

interface IState {}

const mobileResponsiveWidth = Width.mobile;
const desktopResponsiveWidth = mobileResponsiveWidth + 1;

export default class CustomResponsiveWrapper extends React.Component<IProps, IState> {
	constructor(props: any) {
		super(props);
		this.state = {};
	}

	public getWidth = () => {
		if (NextjsProcessUtils.isBrowser()) {
			return window.innerWidth;
		}

		if (this.props.mobileDetect) {
			// Check if the device is mobile
			const isMobile = this.props.mobileDetect.mobile();
			return isMobile ? mobileResponsiveWidth : desktopResponsiveWidth;
		}

		// At least it will work good on mobile
		return mobileResponsiveWidth;
	};

	public render() {
		// TODO: check why this component adds a div tag to the DOM without any styling => happens in /myGifts.
		return (
			<>
				<Responsive
					fireOnMount
					getWidth={this.getWidth}
					maxWidth={mobileResponsiveWidth}
					className='responsive-wrapper-mobile'>
					{this.props.mobileComponent}
				</Responsive>
				<Responsive
					fireOnMount
					getWidth={this.getWidth}
					minWidth={desktopResponsiveWidth}
					className='responsive-wrapper-desktop'>
					{this.props.desktopComponent}
				</Responsive>
			</>
		);
	}
}
