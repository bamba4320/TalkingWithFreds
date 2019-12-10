import {routesPaths} from 'common/routes/routesPaths.consts';
import Lang from 'Infrastructure/Language/Language';
import React from 'react';
import {Container, Grid, Image} from 'semantic-ui-react';
import HtmlMessageComponent from '../custom/customHtmlMessage/customHtmlMessage.component';
import CustomLinkComponent from '../custom/customLink/CustomLink.component';
import CustomResponsiveWrapper from '../CustomResponsiveWrapper';

interface IPartEightBannerProps {
	mobileDetect: MobileDetect;
	upText: any;
	upImage: string | undefined;
	downText: any;
	downImage: string | undefined;
	isHtml: boolean;
	upButtonText?: string;
	downButtonText?: string;
	withOutbtns?: boolean;
	implementGift?: boolean;
	downAlt?: string;
	upAlt?: string;
}
interface IPartEightBannerState {}

export default class PartEightBannerComponent extends React.Component<IPartEightBannerProps, IPartEightBannerState> {
	public render() {
		return (
			<CustomResponsiveWrapper
				mobileDetect={this.props.mobileDetect}
				desktopComponent={this.desktopComponent()}
				mobileComponent={this.mobileComponent()}
			/>
		);
	}

	private mobileComponent = () => {
		return (
			<Container fluid className='container-banner-part8'>
				<Grid className='part8-banner-grid-mobile'>
					<Grid.Row className='mobile-grid-row'>
						<Grid.Column className='mobile-grid-image-column'>
							<Image centered src={this.props.upImage} alt={this.props.upAlt} />
						</Grid.Column>
						<Grid.Column className='mobile-grid-text-column' color='pink'>
							<div className='part8-text-mobile-div'>
								{this.props.isHtml ? <HtmlMessageComponent htmlMessage={this.props.downText} /> : this.props.downText}
							</div>
							{!this.props.withOutbtns && (
								<div className='part8-btn-div'>
									<CustomLinkComponent
										to={routesPaths.employeesGifts}
										value={!this.props.downButtonText ? Lang.format('homepage.Businesses') : this.props.downButtonText}
										classNameVal='part8-banner-link pink-color'
									/>
								</div>
							)}
						</Grid.Column>
					</Grid.Row>
					<Grid.Row className='mobile-grid-row'>
						<Grid.Column className='mobile-grid-image-column'>
							<Image centered src={this.props.downImage} alt={this.props.downAlt} />
						</Grid.Column>
						<Grid.Column className='mobile-grid-text-column' color='purple'>
							<div className='part8-text-mobile-div'>
								{this.props.isHtml ? <HtmlMessageComponent htmlMessage={this.props.upText} /> : this.props.upText}
							</div>
							{!this.props.withOutbtns && (
								<div className='part8-btn-div'>
									<CustomLinkComponent
										to={routesPaths.solutions}
										value={!this.props.upButtonText ? Lang.format('homepage.Suppliers') : this.props.upButtonText}
										classNameVal='part8-banner-link primary-color'
									/>
								</div>
							)}
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Container>
		);
	};

	private desktopComponent = () => {
		return (
			<Container className='container-banner-part8' fluid>
				<Grid columns={2} className='part8-banner-grid'>
					<Grid.Row>
						<Grid.Column width={6}>
							<Image src={this.props.upImage} alt={this.props.upAlt} />
						</Grid.Column>
						<Grid.Column color='pink' width={10}>
							<div className='pink-pointing' />
							<div>
								<div className='banner-text'>
									<Container text textAlign='center'>
										{this.props.isHtml ? (
											<HtmlMessageComponent htmlMessage={this.props.downText} />
										) : (
											this.props.downText
										)}
									</Container>
								</div>
								{!this.props.withOutbtns && (
									<CustomLinkComponent
										to={routesPaths.employeesGifts}
										value={!this.props.downButtonText ? Lang.format('homepage.Businesses') : this.props.downButtonText}
										classNameVal='part8-banner-link pink-color'
									/>
								)}
							</div>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column color='purple' width={6}>
							<div className='purple-pointing' />
							<div>
								<div className='banner-text'>
									<Container text textAlign='center'>
										{this.props.isHtml ? <HtmlMessageComponent htmlMessage={this.props.upText} /> : this.props.upText}
									</Container>
								</div>
								{!this.props.withOutbtns && (
									<CustomLinkComponent
										to={routesPaths.solutions}
										value={!this.props.upButtonText ? Lang.format('homepage.Suppliers') : this.props.upButtonText}
										classNameVal='part8-banner-link primary-color '
									/>
								)}
							</div>
						</Grid.Column>
						<Grid.Column width={10}>
							<Image src={this.props.downImage} alt={this.props.downAlt} />
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Container>
		);
	};
}
