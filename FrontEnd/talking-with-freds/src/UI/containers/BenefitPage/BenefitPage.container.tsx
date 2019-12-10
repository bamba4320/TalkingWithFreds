import {BENEFIT_STORE, CONFIGURATION_STORE, MODAL_STORE, PURCHASE_STORE} from 'BL/stores';
import BenefitStore from 'BL/stores/Benefit.store';
import ConfigurationStore from 'BL/stores/Configuration.store';
import ModalStore from 'BL/stores/Modal.store';
import PurchaseStore from 'BL/stores/Purchase.store';
import {GiftsKosherFilter} from 'common/generalconsts/giftFilters.enums';
import {VariantDTO} from 'common/models/DTOs/Variant.dto';
import {routesPaths} from 'common/routes/routesPaths.consts';
import Lang from 'Infrastructure/Language/Language';
import {inject, observer} from 'mobx-react';
import * as React from 'react';
import {InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import {Button, Container, Grid, GridRow, Header, Icon, Image, Loader, Sticky} from 'semantic-ui-react';
import BrandsAndStoresComponent from 'UI/components/BrandsAndStores/BrandsAndStores.component';
import HtmlMessageComponent from 'UI/components/custom/customHtmlMessage/customHtmlMessage.component';
import CustomIdLinkComponent from 'UI/components/custom/customLink/CustomIdLink.component';
import CustomPageBackgrondAndTitleComponent from 'UI/components/custom/customPageBackgroundAndTitle/customPageBackgroundAndTitle.component';
import CustomRangePrice from 'UI/components/custom/CustomRangePrice/CustomRangePrice.custom';
import CustomResponsiveWrapper from 'UI/components/CustomResponsiveWrapper';
import FavoriteFlagComponent from 'UI/components/Favorites/favoriteFlag.component';
import MustKnowAndCardActions from 'UI/components/MustKnow&CardActions/MustKnowAndCardActions';
import ShareFlag from 'UI/components/Share/ShareFlag.component';
import VariantBenefitPageComponent from 'UI/components/VariantBenefitPage/VariantBenefitPage.component';
import MainBranchesModalContentContainer from '../Branches/MainBranchesModalContent.container';
import BenefitPrintComponent from './BenefitPrint.component';

export interface IBenefitPageProps {
	[MODAL_STORE]?: ModalStore;
	[BENEFIT_STORE]?: BenefitStore;
	[PURCHASE_STORE]?: PurchaseStore;
	[CONFIGURATION_STORE]?: ConfigurationStore;
	intl?: InjectedIntl;
	shouldLazyLoad?: boolean;
	mobileDetect: MobileDetect;
	benefitPageId: number;
}

export interface IBenefitPageState {
	isSticky: boolean;
	isLoadinBranches: boolean;
}
@inject(MODAL_STORE, BENEFIT_STORE, PURCHASE_STORE, CONFIGURATION_STORE)
@observer
class BenefitPageContainer extends React.Component<IBenefitPageProps, IBenefitPageState> {
	private modalStore: ModalStore;
	private benefitStore: BenefitStore;
	private purchaseStore: PurchaseStore;
	private configurationStore: ConfigurationStore;
	private intl: InjectedIntl;
	private contextRef = React.createRef();

	constructor(props: IBenefitPageProps) {
		super(props);
		this.modalStore = this.props[MODAL_STORE] as ModalStore;
		this.benefitStore = this.props[BENEFIT_STORE] as BenefitStore;
		this.purchaseStore = this.props[PURCHASE_STORE] as PurchaseStore;
		this.configurationStore = this.props[CONFIGURATION_STORE] as ConfigurationStore;
		this.intl = this.props.intl as InjectedIntl;
		this.state = {
			isSticky: false,
			isLoadinBranches: true,
		};
	}

	public async componentDidMount() {
		this.benefitStore.initBranchesFilters();
		await this.benefitStore.fetchBenefitPageBranches(this.props.benefitPageId);
		this.setState({isLoadinBranches: false});
	}

	public async componentWillReceiveProps(props: IBenefitPageProps) {
		this.benefitStore.initBranchesFilters();
		if (props.benefitPageId !== this.props.benefitPageId) {
			this.setState({isLoadinBranches: true});
			await this.benefitStore.fetchBenefitPageBranches(props.benefitPageId);
			this.setState({isLoadinBranches: false});
		}
	}

	public render() {
		return (
			<CustomResponsiveWrapper
				mobileDetect={this.props.mobileDetect}
				mobileComponent={this.renderMobile()}
				desktopComponent={this.renderDesktop()}
			/>
		);
	}

	private renderBackgroundAntTitle() {
		return (
			<CustomPageBackgrondAndTitleComponent
				backgroundSrc={
					this.benefitStore.getBenefitPage.image && this.benefitStore.getBenefitPage.image.file
						? `${this.configurationStore.configuration.imagesPath}${this.benefitStore.getBenefitPage.image.file}`
						: '/static/placeholders/image-placeholder.png'
				}
				pageHeader={this.benefitStore.getBenefitPage.categoryName}
				breadcrumbsArray={this.breadCrumbs()}
				isBenefitPage={true}
			/>
		);
	}

	private printComponent() {
		const benefitPage = this.benefitStore.getBenefitPage;

		this.modalStore.openModal(
			<>
				<div className='print-modal'>
					<div>
						<BenefitPrintComponent
							benefitPageName={benefitPage.categoryName}
							benefitPageDescription={benefitPage.shortMarketingDescription}
							benefitImage={this.benefitStore.getBenefitPage.image.file}
							imagePath={this.configurationStore.configuration.imagesPath}
							category={benefitPage}
							benefitBrandsAndStores={benefitPage.businessesInfo}
							intl={this.props.intl}
						/>
					</div>
				</div>
			</>,
			{
				noTitle: true,
				fullScreen: true,
				closeFromOutsideModal: true,
				fitContent: true,
			}
		);
	}

	private renderDesktop = () => {
		return (
			<Grid padded className='benefit-page'>
				<Grid.Row className='display-block' paddingtop0='1'>
					{this.renderBackgroundAntTitle()}
					<Grid.Row>
						<Grid>
							<Grid.Column width={1} />
							<Grid.Column width={15}>
								<Container fluid className='share-and-love-div'>
									<ShareFlag mobileDetect={this.props.mobileDetect} />
									<FavoriteFlagComponent categoryId={this.benefitStore.getBenefitPage.categoryId} />
								</Container>
							</Grid.Column>
						</Grid>
					</Grid.Row>
					<Grid.Row>
						<Grid>
							<Grid.Column width={1} />
							<Grid.Column width={15}>
								<Container fluid variantcontainer='1'>
									{this.renderVariantBenefitPage()}
								</Container>
							</Grid.Column>
						</Grid>
					</Grid.Row>
					<Grid.Row>{this.renderNavbar()}</Grid.Row>
					<Grid.Row>
						<Grid>
							<Grid.Column width={1} />
							<Grid.Column width={15}>
								<Container
									fluid
									moreabout='1'
									className={this.benefitStore.getBenefitPage.variants.length === 0 ? 'no-variants' : ''}>
									<Header as='h2' inlineheader='1'>
										{Lang.format('benefitPage.moreAboutTitle')}
									</Header>
									<HtmlMessageComponent
										extraClassname='more-about-text'
										htmlMessage={this.benefitStore.getBenefitPage.categoryDescription}
									/>
								</Container>
							</Grid.Column>
						</Grid>
					</Grid.Row>
				</Grid.Row>
				<MustKnowAndCardActions
					mobileDetect={this.props.mobileDetect}
					category={this.benefitStore.getBenefitPage}
					isHiddenCardActions={this.benefitStore.getIsBenefitPageHidden}
				/>
				<Grid.Row margintop100='1'>
					<Grid.Column width={1} zeropadding='1' />
					<Grid.Column floated='left' widescreen={10} computer={8} zeropadding='1'>
						<Header as='h2' displaytable='1' lineheight0='1' borderbottom='1' h1font='1'>
							{Lang.format('benefitPage.storeTile')}
						</Header>
					</Grid.Column>
					<Grid.Column floated='right' widescreen={4} computer={6} zeropadding='1' textAlign='left'>
						<div onClick={this.onClickPrint} className='print-div'>
							<Icon className='print-icon' name='print' size='large' />
							<p className='link-text print-text'>{Lang.format('benefitPage.printTxt')}</p>
						</div>
						<div
							className='print-div'
							onClick={() => this.onDesktopStoreClick(this.benefitStore.getBenefitPage.categoryId)}>
							<p className='link-text marginright'>{Lang.format('benefitPage.showBranches')}</p>
							<Icon className='angle-left-icon' name='angle left' size='large' />
						</div>
					</Grid.Column>
					<Grid.Column width={1} zeropadding='1' />
				</Grid.Row>
				{this.state.isLoadinBranches ? (
					<>
						<Loader active inline='centered' />
						<div style={{height: '100px'}} />
					</>
				) : (
					this.renderBrandsAndStores()
				)}
			</Grid>
		);
	};

	private renderMobile = () => {
		return (
			<Grid padded className='benefit-page'>
				<GridRow className='mobile-header'>
					<Header as='h1' nomargin='1' primaryheader='1' textcentered='1'>
						{this.benefitStore.getBenefitPage.categoryName}
					</Header>
				</GridRow>
				<Grid.Row>
					<Container variantmobile='1' fluid>
						<Image
							src={
								this.benefitStore.getBenefitPage.image && this.benefitStore.getBenefitPage.image.file
									? `${this.configurationStore.configuration.imagesPath}${this.benefitStore.getBenefitPage.image.file}`
									: '/static/placeholders/image-placeholder.png'
							}
							className='benefit-mobile-image'
						/>
						<div className='relative-div'>
							<div className='absolute-div'>
								<ShareFlag mobileDetect={this.props.mobileDetect} />
								<FavoriteFlagComponent categoryId={this.benefitStore.getBenefitPage.categoryId} />
							</div>
							{this.renderVariantBenefitPage()}
						</div>
					</Container>
				</Grid.Row>
				<Grid.Row>
					<Grid padded style={{width: '100%'}}>
						<Grid.Column zeropadding='1' width={1} />
						<Grid.Column zeropadding='1' width={15}>
							<Container novariants={this.benefitStore.getBenefitPage.variants.length === 0 ? '1' : null} fluid>
								<Header as='h3' inlineheader='1'>
									{Lang.format('benefitPage.moreAboutTitle')}
								</Header>
								<HtmlMessageComponent
									extraClassname='more-about-text'
									htmlMessage={this.benefitStore.getBenefitPage.categoryDescription}
								/>
							</Container>
						</Grid.Column>
					</Grid>
				</Grid.Row>
				<MustKnowAndCardActions
					mobileDetect={this.props.mobileDetect}
					category={this.benefitStore.getBenefitPage}
					isHiddenCardActions={this.benefitStore.getIsBenefitPageHidden}
				/>
				<Grid.Row className='store-header-grid'>
					<Grid padded style={{width: '100%'}}>
						<Grid.Column zeropadding='1' width={1} />
						<Grid.Column zeropadding='1' width={15}>
							<Container fluid>
								<Header as='h2' lineheight0='1' borderbottom='1'>
									{Lang.format('benefitPage.storeTile')}
								</Header>
								<div
									onClick={() => this.onMobileStoreClick(this.benefitStore.getBenefitPage.categoryId)}
									className='print-div'>
									<p className='link-text'>{Lang.format('benefitPage.nearStores')}</p>
									<Icon className='angle-left-icon' name='angle left' size='large' />
								</div>
							</Container>
						</Grid.Column>
					</Grid>
				</Grid.Row>
				{this.state.isLoadinBranches ? (
					<>
						<Loader active inline='centered' />
						<div style={{height: '75px'}} />
					</>
				) : (
					this.renderBrandsAndStores()
				)}
			</Grid>
		);
	};

	private renderNavbar = () => {
		return (
			<div ref={this.contextRef as React.RefObject<HTMLDivElement>}>
				<Sticky
					context={this.contextRef}
					onStick={() => {
						this.setState({isSticky: true});
					}}
					onUnstick={() => {
						this.setState({isSticky: false});
					}}>
					<Grid className={this.state.isSticky ? 'sticky-navbar' : 'unvisible-navbar'}>
						<Grid.Column width={1} />
						<Grid.Column width={9} className='header-column'>
							<Header as='h2' primaryheader='1'>
								{this.benefitStore.getBenefitPage.categoryName}
							</Header>
						</Grid.Column>
						{this.benefitStore.getIsBenefitPageHidden ||
						this.benefitStore.getIsBenefitPageInformative ||
						this.benefitStore.getBenefitPage.variants.length === 0 ? (
							<Grid.Column width={5} />
						) : (
							<Grid.Column width={5} textAlign='left' className='price-column'>
								<CustomRangePrice
									minPrice={this.benefitStore.getBenefitPage.minPrice}
									maxPrice={this.benefitStore.getBenefitPage.maxPrice}
								/>
								{this.benefitStore.getBenefitPage.variants.length > 1 ? (
									<Button
										circular
										primary
										onClick={() => {
											window.location.hash = '#main-header';
										}}>
										{Lang.format('benefitPage.displayGifts')}
									</Button>
								) : (
									<CustomIdLinkComponent
										pathname={routesPaths.purchase.root}
										id={this.benefitStore.getBenefitPage.categoryId}>
										<Button
											circular
											primary
											onClick={() => this.onClickVariant(this.benefitStore.getBenefitPage.variants[0])}>
											{Lang.format('variant.btntxt')}
										</Button>
									</CustomIdLinkComponent>
								)}
							</Grid.Column>
						)}
						<Grid.Column width={1} />
					</Grid>
				</Sticky>
			</div>
		);
	};

	private onClickPrint = () => {
		this.printComponent();
	};

	private renderVariantBenefitPage() {
		return (
			<>
				{this.benefitStore.getBenefitPage.variants.map((variant, index) => {
					return (
						<VariantBenefitPageComponent
							isInformation={this.benefitStore.getIsBenefitPageInformative || this.benefitStore.getIsBenefitPageHidden}
							key={`VariantBenefitPage${index}`}
							isFirst={index === 0}
							mobileDetect={this.props.mobileDetect}
							title={variant.name}
							isEmpty={variant.isEmpty}
							description={variant.description}
							price={variant.price}
							variant={variant}
							categoryNumber={this.benefitStore.getBenefitPage.categoryId}
							onClick={() => this.onClickVariant(variant)}
						/>
					);
				})}
			</>
		);
	}

	private async onClickVariant(variant: VariantDTO) {
		this.purchaseStore.handleVariant(this.benefitStore.getBenefitPage, variant);
	}

	private onDesktopStoreClick = (categoryId: number, businessId?: number) => {
		this.modalStore.openModal(
			<MainBranchesModalContentContainer
				isMobile={false}
				categoryId={categoryId}
				category={this.benefitStore.getBenefitPage}
				businessId={businessId}
				mobileDetect={this.props.mobileDetect}
				brandsAndStores={this.benefitStore.getBenefitPage.businessesInfo}
			/>,
			{
				title: this.intl.formatMessage({id: 'branches.Branches'}),
				fullScreen: true,
				rightHeader: true,
				widerModal: true,
				isNoMarginFromTop: true,
				onCloseAction: () => this.benefitStore.setIsFirstTimeInBranchesModal(true),
			}
		);
	};

	private onMobileStoreClick = (categoryId: number, businessId?: number) => {
		navigator.geolocation.getCurrentPosition(
			(position: Position) => {
				this.modalStore.openModal(
					<MainBranchesModalContentContainer
						isMobile
						categoryId={categoryId}
						category={this.benefitStore.getBenefitPage}
						businessId={businessId}
						userPosition={position}
						mobileDetect={this.props.mobileDetect}
						brandsAndStores={this.benefitStore.getBenefitPage.businessesInfo}
					/>,
					{
						title: this.intl.formatMessage({id: 'branches.Branches'}),
						fullScreen: true,
						isNoMarginFromTop: true,
						onCloseAction: () => this.benefitStore.setIsFirstTimeInBranchesModal(true),
					}
				);
			},
			() => {
				this.modalStore.openModal(
					<MainBranchesModalContentContainer
						isMobile
						categoryId={categoryId}
						category={this.benefitStore.getBenefitPage}
						businessId={businessId}
						mobileDetect={this.props.mobileDetect}
						brandsAndStores={this.benefitStore.getBenefitPage.businessesInfo}
					/>,
					{
						title: this.intl.formatMessage({id: 'branches.Branches'}),
						fullScreen: true,
						isNoMarginFromTop: true,
						onCloseAction: () => this.benefitStore.setIsFirstTimeInBranchesModal(true),
					}
				);
			}
		);
	};

	private renderBrandsAndStores() {
		return (
			<Grid.Row>
				<BrandsAndStoresComponent
					mobileDetect={this.props.mobileDetect}
					brandsAndStores={this.benefitStore.getBenefitPage.businessesInfo}
					onDesktopStoreClick={(businessId: number) =>
						this.onDesktopStoreClick(this.benefitStore.getBenefitPage.categoryId, businessId)
					}
					onMobileStoreClick={(businessId: number) =>
						this.onMobileStoreClick(this.benefitStore.getBenefitPage.categoryId, businessId)
					}
					shouldLazyLoad={this.props.shouldLazyLoad ? this.props.shouldLazyLoad : false}
				/>
			</Grid.Row>
		);
	}

	private breadCrumbs() {
		if (this.benefitStore.getBenefitPage.breadcrumbs && this.benefitStore.getBenefitPage.breadcrumbs.length > 1) {
			return this.benefitStore.getBenefitPage.breadcrumbs.map((breadCrumbObj) => {
				return {
					name: breadCrumbObj.name,
					link: `/gifts/${breadCrumbObj.id}`,
				};
			});
		} else {
			return [
				{
					name: this.intl.formatMessage({id: 'benefitPage.defaultMessageText'}),
					link: '',
				},
			];
		}
	}
}

export default withIntl(BenefitPageContainer);
