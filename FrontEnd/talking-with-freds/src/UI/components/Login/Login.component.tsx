import React from 'react';
import CustomResponsiveWrapper from '../CustomResponsiveWrapper';

interface IProps {
	mobileDetect: MobileDetect;
}

interface IState {}

export default class LoginComponent extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
	}

	public render() {
		return (
			<CustomResponsiveWrapper
				mobileDetect={this.props.mobileDetect}
				desktopComponent={this.renderDesktop()}
				mobileComponent={this.renderMobile()}
			/>
		);
	}

	private renderDesktop() {
		return <div />;
	}

	private renderMobile() {
		return <div />;
	}
}
