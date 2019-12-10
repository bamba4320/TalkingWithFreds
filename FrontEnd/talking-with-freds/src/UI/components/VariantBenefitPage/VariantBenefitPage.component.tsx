import {VariantDTO} from 'common/models/DTOs/Variant.dto';
import {routesPaths} from 'common/routes/routesPaths.consts';
import Lang from 'Infrastructure/Language/Language';
import * as React from 'react';
import {Button, Card, Grid, Header} from 'semantic-ui-react';
import HtmlMessageComponent from '../custom/customHtmlMessage/customHtmlMessage.component';
import CustomIdLinkComponent from '../custom/customLink/CustomIdLink.component';
import CustomVariantPrice from '../custom/CustomVariantPrice/CustomVariantPrice';
import CustomResponsiveWrapper from '../CustomResponsiveWrapper';

export interface IVariantBenefitPageProps {
	mobileDetect: MobileDetect;
	title: string;
	description: string;
	price?: number;
	isEmpty: boolean;
	onClick: any;
	categoryNumber: number;
	isFirst: boolean;
	isInformation: boolean;
	variant: VariantDTO;
}

export interface IVariantBenefitPageState {}

export default class VariantBenefitPageComponent extends React.Component<
	IVariantBenefitPageProps,
	IVariantBenefitPageState
> {
	constructor(props: IVariantBenefitPageProps) {
		super(props);

		this.state = {};
	}
	public render() {
		return (
			<Grid className='variant-benefit-page' zeromargin='1'>
				<Grid.Column className='variant-col'>
					<CustomResponsiveWrapper
						mobileDetect={this.props.mobileDetect}
						mobileComponent={this.renderMobile()}
						desktopComponent={this.renderDesktop()}
					/>
				</Grid.Column>
			</Grid>
		);
	}

	public renderDesktop() {
		return (
			<Card className='variant'>
				<Card.Content variantheader='1' className='variant-title'>
					<Header as='h2' inlineheader='1' cardheader='1'>
						{this.props.title}
					</Header>
				</Card.Content>
				<Card.Content variantheader='1' variantbootom='1' className='main-benefit-variant-content'>
					<Card.Description variantdesc='1'>
						<HtmlMessageComponent htmlMessage={this.props.description} />
					</Card.Description>
					<div className='price-btn-div'>
						{this.props.price && !this.props.isInformation && <CustomVariantPrice variant={this.props.variant} />}
						{this.props.isInformation ? (
							<></>
						) : (
							// <Button
							// 	onClick={async () => {
							// 		await Router.push(routesPaths.employeesGifts);
							// 		this.scrollToContactForm(false);
							// 	}}
							// 	primary
							// 	circular
							// 	noletterspacing='1'
							// 	variantbtn='1'>
							// 	{Lang.format('contact.ToContact')}
							// </Button>
							!this.props.isEmpty && (
								<CustomIdLinkComponent pathname={routesPaths.purchase.root} id={this.props.categoryNumber}>
									<Button onClick={this.props.onClick} primary circular variantbtn='1'>
										{Lang.format('variant.btntxt')}
									</Button>
								</CustomIdLinkComponent>
							)
						)}
					</div>
				</Card.Content>
			</Card>
		);
	}

	public renderMobile() {
		return (
			<Card variant='1' className='variant-mobile'>
				<Card.Content variantheader='1' className={this.props.isFirst ? 'first-header' : ''}>
					<Header as='h2' inlineheader='1' cardheader='1'>
						{this.props.title}
					</Header>
				</Card.Content>
				<Card.Content variantheader='1' variantbootom='1' variantdiv='1'>
					<Card.Description variantdesc='1'>
						<HtmlMessageComponent htmlMessage={this.props.description} />
					</Card.Description>
					<div className='price-btn-div'>
						{this.props.price && !this.props.isInformation && <CustomVariantPrice variant={this.props.variant} />}
						{this.props.isInformation ? (
							<></>
						) : (
							!this.props.isEmpty && (
								<CustomIdLinkComponent pathname={routesPaths.purchase.root} id={this.props.categoryNumber}>
									<Button onClick={this.props.onClick} primary circular variantbtn='1'>
										{Lang.format('variant.btntxt')}
									</Button>
								</CustomIdLinkComponent>
							)
						)}
					</div>
				</Card.Content>
			</Card>
		);
	}

	public scrollToContactForm = (mobile: boolean) => {
		let y = (window as any).contactFormOffsetTop.current.offsetTop;
		mobile ? (y += 620) : (y += 400);
		scrollTo(0, 0);
		scrollTo(0, y);
	};
}
