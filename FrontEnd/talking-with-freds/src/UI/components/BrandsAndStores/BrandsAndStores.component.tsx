import BusinessDTO from 'common/models/DTOs/Businesses.dto';
import {BusinessesInfoDTO} from 'common/models/DTOs/BusinessesInfo.dto';
import Lang from 'Infrastructure/Language/Language';
import * as React from 'react';
import {Card, Container, Grid, Header} from 'semantic-ui-react';
import CustomLazyLoad from '../custom/customLazyLoad/CustomLazyLoad.component';
import CustomResponsiveWrapper from '../CustomResponsiveWrapper';

export interface IBrandsAndStoresProps {
	mobileDetect?: MobileDetect;
	brandsAndStores: BusinessesInfoDTO[];
	onDesktopStoreClick?: any;
	onMobileStoreClick?: any;
	isPrint?: boolean;
	shouldLazyLoad?: boolean;
}
export interface IStores {}
export interface IBrandsAndStoresState {}

export default class BrandsAndStoresComponent extends React.Component<IBrandsAndStoresProps, IBrandsAndStoresState> {
	constructor(props: IBrandsAndStoresProps) {
		super(props);
		this.state = {};
	}

	public render() {
		return (
			<>
				{this.props.brandsAndStores &&
					this.props.brandsAndStores.map((brandsAndStore, index) => {
						return (
							<Grid key={`grid_${index}`} className='brands-and-store' padded>
								<Grid.Row>
									<Grid padded style={{width: '100%'}}>
										<Grid.Column width={1} zeropadding='1' />
										<Grid.Column width={15} zeropadding='1'>
											<Container fluid>
												<Header as='h2' inlineheader='1'>
													{brandsAndStore.aliasName}
													{brandsAndStore.aliasDescription && (
														<Header.Subheader blackheader='1'>{brandsAndStore.aliasDescription}</Header.Subheader>
													)}
												</Header>
											</Container>
										</Grid.Column>
									</Grid>
								</Grid.Row>
								<Grid.Row>
									<Grid className='brands-grid'>
										{brandsAndStore.businesses.map((bus, indx) => {
											return this.props.isPrint ? (
												<div className='print-div'>{this.renderCardDesktop(bus)}</div>
											) : (
												<Grid.Column mobile={8} tablet={5} computer={4} largeScreen={4} widescreen={3} key={indx}>
													{this.props.mobileDetect ? (
														<CustomResponsiveWrapper
															mobileDetect={this.props.mobileDetect}
															mobileComponent={this.renderCardMobile(bus)}
															desktopComponent={this.renderCardDesktop(bus)}
														/>
													) : (
														this.renderCardDesktop(bus)
													)}
												</Grid.Column>
											);
										})}
									</Grid>
								</Grid.Row>
							</Grid>
						);
					})}
			</>
		);
	}

	public renderCardDesktop(bus: BusinessDTO) {
		return (
			<Card
				brandsandstorecard='1'
				onClick={() => (this.props.onDesktopStoreClick ? this.props.onDesktopStoreClick(bus.businessId) : {})}
				className='brands-and-store-card'>
				<CustomLazyLoad
					shouldLazyLoad={this.props.shouldLazyLoad ? this.props.shouldLazyLoad : false}
					customOffset={1000}>
					<img
						className={this.props.isPrint ? 'print-img' : 'card-img'}
						src={bus.logoUrl ? bus.logoUrl : '/static/placeholders/image-placeholder.png'}
					/>
				</CustomLazyLoad>
				<Card.Content brandsandstorecontent='1' className={this.props.isPrint ? 'print-header-div' : ''}>
					<Card.Header
						brandsandstoreheader='1'
						className={this.props.isPrint ? 'print-header' : ''}
						printstores={this.props.isPrint ? '1' : null}>
						{bus.storeName}
					</Card.Header>
					{!this.props.isPrint &&
						(bus.branchesCount > 1 ? (
							<Card.Description brandsandstoredesc='1'>
								{bus.branchesCount} {Lang.format('brandsAndStores.stores')}{' '}
							</Card.Description>
						) : (
							<Card.Description brandsandstoredesc='1'>{bus.cityName}</Card.Description>
						))}
				</Card.Content>
			</Card>
		);
	}

	public renderCardMobile(bus: BusinessDTO) {
		return (
			<Card
				className='brands-and-store-card'
				brandsandstorecard='1'
				onClick={() => this.props.onMobileStoreClick(bus.businessId)}>
				<CustomLazyLoad shouldLazyLoad={this.props.shouldLazyLoad ? this.props.shouldLazyLoad : false}>
					<img className='card-img' src={bus.logoUrl ? bus.logoUrl : '/static/placeholders/image-placeholder.png'} />
				</CustomLazyLoad>
				<Card.Content brandsandstorecontent='1'>
					<Card.Header brandsandstoreheader='1'>{bus.storeName}</Card.Header>
					{/* <Card.Description brandsandstoredesc='1'>
						{bus.branchesCount} {Lang.format('brandsAndStores.stores')}{' '}
					</Card.Description> */}
				</Card.Content>
			</Card>
		);
	}
}
