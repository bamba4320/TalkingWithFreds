import React from 'react';
import {Image} from 'semantic-ui-react';

interface ICustomCircleBackgroundImageComponentProps {
	src: any;
	isBenefitPage?: boolean;
}
interface ICustomCircleBackgroundImageComponentState {}

export default class CustomCircleBackgroundImageComponent extends React.Component<
	ICustomCircleBackgroundImageComponentProps,
	ICustomCircleBackgroundImageComponentState
> {
	constructor(props: ICustomCircleBackgroundImageComponentProps) {
		super(props);
	}

	public render() {
		return (
			<div className='round-background-img-top-div'>
				<div className={`${this.props.isBenefitPage ? 'height-100' : 'height-0'}`} />
				<Image src={this.props.src} className='background-round-image' />;
			</div>
		);
	}
}
