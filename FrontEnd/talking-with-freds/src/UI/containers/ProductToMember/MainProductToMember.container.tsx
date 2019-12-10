import {BENEFIT_STORE, CONFIGURATION_STORE, MODAL_STORE, PURCHASE_STORE, UI_STORE} from 'BL/stores';
import BenefitStore from 'BL/stores/Benefit.store';
import ConfigurationStore from 'BL/stores/Configuration.store';
import ModalStore from 'BL/stores/Modal.store';
import PurchaseStore from 'BL/stores/Purchase.store';
import UiStore from 'BL/stores/Ui.store';
import AlertUtils from 'common/errorHandling/AlertUtils';
import {VariantTypes} from 'common/generalconsts/benefitType.enums';
import {eStatusOfUse} from 'common/generalconsts/purchase.enums';
import {inject, observer} from 'mobx-react';
import moment from 'moment';
import React, {Component} from 'react';
import Barcode from 'react-barcode'; // https://www.npmjs.com/package/react-barcode
import {FormattedMessage, InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import {Header, Icon, Image, Segment} from 'semantic-ui-react';
import BrandsAndStoresComponent from 'UI/components/BrandsAndStores/BrandsAndStores.component';
import CustomResponsiveWrapper from 'UI/components/CustomResponsiveWrapper';
import MustKnowAndCardActions from 'UI/components/MustKnow&CardActions/MustKnowAndCardActions';
import MainProductToMemberComponent from 'UI/components/ProductToMember/MainProductToMember.component';
import BenefitPrintComponent from '../BenefitPage/BenefitPrint.component';
import MainBranchesModalContentContainer from '../Branches/MainBranchesModalContent.container';

interface IProps {
	mobileDetect: MobileDetect;
	[PURCHASE_STORE]?: PurchaseStore;
	[MODAL_STORE]?: ModalStore;
	[UI_STORE]?: UiStore;
	[CONFIGURATION_STORE]?: ConfigurationStore;
	[BENEFIT_STORE]?: BenefitStore;
	intl?: InjectedIntl;
	orderGuid: string;
	withAnimation: boolean;
}
interface IState {
	showAnimation: boolean;
}

@inject(PURCHASE_STORE, MODAL_STORE, UI_STORE, CONFIGURATION_STORE, BENEFIT_STORE)
@observer
class MainProductToMemberContainer extends Component<IProps, IState> {
	private purchaseStore: PurchaseStore;
	private modalStore: ModalStore;
	private uiStore: UiStore;
	private configurationStore: ConfigurationStore;
	private benefitStore: BenefitStore;
	private intl: InjectedIntl;
	constructor(props: Readonly<IProps>) {
		super(props);
		this.purchaseStore = this.props[PURCHASE_STORE] as PurchaseStore;
		this.modalStore = this.props[MODAL_STORE] as ModalStore;
		this.uiStore = this.props[UI_STORE] as UiStore;
		this.configurationStore = this.props[CONFIGURATION_STORE] as ConfigurationStore;
		this.benefitStore = this.props[BENEFIT_STORE] as BenefitStore;
		this.intl = this.props.intl as InjectedIntl;
		this.state = {
			showAnimation: this.props.withAnimation,
		};
	}

	public async componentDidMount() {
		if (!this.state.showAnimation) {
			this.uiStore.blockUiSite();
		}
		if (this.props.orderGuid !== this.purchaseStore.getProductToMember.orderGuid) {
			await this.purchaseStore.fetchProductToMember(this.props.orderGuid);
		}
		this.setState({showAnimation: false});
		this.uiStore.unblockUiSite();
	}

	public render() {
		return (
			<CustomResponsiveWrapper
				mobileDetect={this.props.mobileDetect}
				desktopComponent={this.productToMember(false)}
				mobileComponent={this.productToMember(true)}
			/>
		);
	}

	private productToMember = (isMobile: boolean) => {
		return (
			<div>
				{this.state.showAnimation && this.animationComponent()}
				<MainProductToMemberComponent
					productToMember={this.purchaseStore.getProductToMember}
					variant={this.getVariant()}
					isMobile={isMobile}
					categoryImagePath={this.configurationStore.configuration.imagesPath}
					onVerifonCodeClick={this.onVerifonCodeClick}
					onMobileCodeClick={this.onMobileCodeClick}
					onPrintClick={this.onPrintClick}
				/>
				{this.mustToKnowSection()}
				{this.purchaseStore.getProductToMember.businessInfo &&
					this.purchaseStore.getProductToMember.businessInfo.length > 0 &&
					(isMobile ? this.mobileBranchesHeader() : this.desktopBranchesHeader())}
				<BrandsAndStoresComponent
					mobileDetect={this.props.mobileDetect}
					brandsAndStores={this.purchaseStore.getProductToMember.businessInfo}
					onDesktopStoreClick={(businessId: number) =>
						this.onDesktopStoreClick(this.purchaseStore.getProductToMember.category.categoryId, businessId)
					}
					onMobileStoreClick={(businessId: number) =>
						this.onMobileStoreClick(this.purchaseStore.getProductToMember.category.categoryId, businessId)
					}
				/>
			</div>
		);
	};

	private animationComponent = () => {
		return (
			<>
				<Segment placeholder darkbackgroundforscreen='1' />
				<Image src='/static/gifs/Nof1.gif' producttomemberanimation='1' />
			</>
		);
	};

	private desktopBranchesHeader = () => {
		return (
			<Segment placeholder businessesheader='1' rowflexsegment='1' maxwidth100percent='1'>
				<Header size='huge' primaryborderbottom='1'>
					{this.intl.formatMessage({id: 'benefitPage.storeTile'})}
				</Header>
				<Segment
					placeholder
					rowflexsegment='1'
					onClick={() => this.onDesktopStoreClick(this.purchaseStore.getProductToMember.category.categoryId)}>
					<Header nomargin='1'>
						<Header.Subheader primarylink='1' cardsubtext='1'>
							{this.intl.formatMessage({id: 'benefitPage.nearStores'})}
						</Header.Subheader>
					</Header>
					<Icon name='angle left' size='large' primaryicon='1' />
				</Segment>
			</Segment>
		);
	};

	private mobileBranchesHeader = () => {
		return (
			<Segment placeholder businessesheader='1'>
				<Header size='large' primaryborderbottom='1' marginbottom60px='1' fitcontent='1'>
					{this.intl.formatMessage({id: 'benefitPage.storeTile'})}
				</Header>
				<Segment
					placeholder
					rowflexsegment='1'
					fitcontentwidth='1'
					onClick={() => this.onMobileStoreClick(this.purchaseStore.getProductToMember.category.categoryId)}>
					<Header nomargin='1'>
						<Header.Subheader primarylink='1' cardsubtext='1'>
							{this.intl.formatMessage({id: 'benefitPage.nearStores'})}
						</Header.Subheader>
					</Header>
					<Icon name='angle left' size='large' primaryicon='1' />
				</Segment>
			</Segment>
		);
	};

	private mustToKnowSection = () => {
		return (
			<MustKnowAndCardActions
				mobileDetect={this.props.mobileDetect}
				category={this.purchaseStore.getProductToMember.category}
			/>
		);
	};

	private onDesktopStoreClick = (categoryId: number, businessId?: number) => {
		this.modalStore.openModal(
			<MainBranchesModalContentContainer
				isMobile={false}
				categoryId={categoryId}
				category={this.purchaseStore.getProductToMember.category}
				businessId={businessId}
				noPrint
				mobileDetect={this.props.mobileDetect}
				brandsAndStores={this.purchaseStore.getProductToMember.businessInfo}
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
						category={this.purchaseStore.getProductToMember.category}
						businessId={businessId}
						userPosition={position}
						mobileDetect={this.props.mobileDetect}
						brandsAndStores={this.purchaseStore.getProductToMember.businessInfo}
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
						category={this.purchaseStore.getProductToMember.category}
						businessId={businessId}
						mobileDetect={this.props.mobileDetect}
						brandsAndStores={this.purchaseStore.getProductToMember.businessInfo}
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

	private getVariant = () => {
		if (
			this.purchaseStore.getProductToMember &&
			this.purchaseStore.getProductToMember.category &&
			this.purchaseStore.getProductToMember.category.variants &&
			this.purchaseStore.getProductToMember.category.variants.length > 0 &&
			this.purchaseStore.getProductToMember.category.variants[0]
		) {
			return this.purchaseStore.getProductToMember.category.variants[0];
		}
	};

	private onVerifonCodeClick = async () => {
		try {
			this.uiStore.blockUiSite();
			const verifoneCode = await this.purchaseStore.getVerifonCode(this.props.orderGuid);
			this.uiStore.unblockUiSite();
			return verifoneCode;
		} catch (e) {
			AlertUtils.checkApiErrorAndShowPopUp(e);
		}
	};

	private onMobileCodeClick = (modalContent: any) => {
		this.modalStore.openModal(modalContent, {
			title: this.intl.formatMessage({id: 'ProductToMember.implementationCode'}),
			fullScreen: true,
		});
	};

	private onPrintClick = () => {
		const variant = this.getVariant();
		this.modalStore.openModal(
			<>
				<div className='print-modal'>
					<div>
						<BenefitPrintComponent
							benefitPageName={this.purchaseStore.getProductToMember.category.categoryName}
							benefitPageDescription={this.purchaseStore.getProductToMember.category.shortMarketingDescription}
							benefitPrice={
								this.purchaseStore.getProductToMember.eStatusOfUse !== eStatusOfUse.used &&
								this.purchaseStore.getProductToMember.eStatusOfUse !== eStatusOfUse.expired &&
								variant &&
								(variant.benefitTypeId === VariantTypes.GiftCardVerifone ||
									variant.benefitTypeId === VariantTypes.RestaurantMoneyBL) &&
								this.purchaseStore.getProductToMember.sumToLoad
							}
							code={
								this.purchaseStore.getProductToMember.eStatusOfUse === eStatusOfUse.expired ||
								this.purchaseStore.getProductToMember.eStatusOfUse === eStatusOfUse.used ? (
									<></>
								) : (
									<>
										{variant && variant.benefitTypeId !== VariantTypes.GiftCardVerifone ? (
											<div style={{textAlign: 'center'}}>
												<Barcode
													value={this.purchaseStore.getProductToMember.code}
													displayValue={false}
													background='transparent'
													textAlign='center'
													width={1.8}
													marginRight={-10}
												/>
												<Header as='h2' codeheader='1'>
													{this.purchaseStore.getProductToMember.code}
												</Header>
											</div>
										) : (
											<Header>
												<Header.Subheader width150='1' margintop15px='1'>
													{this.intl.formatMessage({id: 'Print.attention'})}
												</Header.Subheader>
											</Header>
										)}
										<Header nomargin='1'>
											<Header.Subheader width150='1'>
												<FormattedMessage
													id='Print.expired'
													values={{date: moment(variant ? variant.expireDate : '', 'YYYY-MM-DD').format('DD/MM/YYYY')}}
												/>
											</Header.Subheader>
										</Header>
									</>
								)
							}
							benefitImage={
								this.purchaseStore.getProductToMember &&
								this.purchaseStore.getProductToMember.category.images &&
								this.purchaseStore.getProductToMember.category.images[0] &&
								this.purchaseStore.getProductToMember.category.images[0].file
							}
							imagePath={this.configurationStore.configuration.imagesPath}
							category={this.purchaseStore.getProductToMember.category}
							benefitBrandsAndStores={this.purchaseStore.getProductToMember.businessInfo}
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
	};
}

export default withIntl(MainProductToMemberContainer);
