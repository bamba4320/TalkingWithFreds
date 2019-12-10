import React from 'react';
import {Container, Grid} from 'semantic-ui-react';
import CustomCircleBackgroundImageComponent from 'UI/components/custom/customCircularBackgroundImage/customCircularBackgroundImage.component';
import CustomHeaderAndPathComponent from '../customHeaderAndPath/customHeaderAndPath.component';

interface ICustomPageBackgrondAndTitleComponentProps {
	pageHeader: string;
	breadcrumbsArray: {name: string; link: string}[];
	backgroundSrc: string;
	isBenefitPage?: boolean;
}
interface ICustomPageBackgrondAndTitleComponentState {}

class CustomPageBackgrondAndTitleComponent extends React.Component<
	ICustomPageBackgrondAndTitleComponentProps,
	ICustomPageBackgrondAndTitleComponentState
> {
	constructor(props: ICustomPageBackgrondAndTitleComponentProps) {
		super(props);
	}

	public render() {
		return (
			<Container fluid className='custom-page-background-title-wrapper'>
				<div
					className={`background-round-image-div-base-absolute ${
						this.props.isBenefitPage ? 'benefit-page-background' : ''
					}`}>
					<div className='background-round-image-div-base-relative'>
						<div className='background-round-image-div-pusher-absolute'>
							<CustomCircleBackgroundImageComponent
								src={this.props.backgroundSrc}
								isBenefitPage={this.props.isBenefitPage ? this.props.isBenefitPage : false}
							/>
						</div>
					</div>
				</div>
				<Grid>
					<Grid.Column width={1} />
					<Grid.Column width={15}>
						<div className='custom-header-wrapper'>
							<CustomHeaderAndPathComponent
								pageHeader={this.props.pageHeader}
								crumbBread={this.props.breadcrumbsArray}
								isBenefitPage={this.props.isBenefitPage ? this.props.isBenefitPage : false}
							/>
						</div>
					</Grid.Column>
				</Grid>
			</Container>
		);
	}
}
export default CustomPageBackgrondAndTitleComponent;
