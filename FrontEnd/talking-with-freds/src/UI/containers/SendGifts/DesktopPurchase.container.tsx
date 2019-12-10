import {CONFIGURATION_STORE, CURRENT_USER_STORE, PURCHASE_STORE} from 'BL/stores';
import ConfigurationStore from 'BL/stores/Configuration.store';
import CurrentUserStore from 'BL/stores/CurrentUser.store';
import PurchaseStore from 'BL/stores/Purchase.store';
import {PageToRender} from 'common/generalconsts/purchase.enums';
import {routesPaths} from 'common/routes/routesPaths.consts';
import {inject, observer} from 'mobx-react';
import Link from 'next/link';
import Router from 'next/router';
import {Component, createRef, RefObject} from 'react';
import {FormattedMessage, InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import {Breadcrumb, Button, Divider, Grid, Header, Image, Segment, Sticky} from 'semantic-ui-react';
import HtmlMessageComponent from 'UI/components/custom/customHtmlMessage/customHtmlMessage.component';
import CustomTagscomponent from 'UI/components/custom/CustomSliderAndTags/CustomTags.component';
import CustomTitleComponent from 'UI/components/custom/customTitle/CustomTitle.component';
import CustomVariantPrice from 'UI/components/custom/CustomVariantPrice/CustomVariantPrice';
import SubmitCardComponent from 'UI/components/SendGifts/SubmitCard.component';
import ShareFlag from 'UI/components/Share/ShareFlag.component';
import BackButtoncomponent from '../../components/custom/CustomBackButton/BackButton.component';
import MainSendGiftsFormContainer from './MainSendGiftsForm.container';
import PaymentFormContainer from './PaymentForm.container';
import PreviewGiftContainer from './PreviewGift.container';

interface IProps {
	intl: InjectedIntl;
	mobileDetect: MobileDetect;
	[PURCHASE_STORE]?: PurchaseStore;
	[CURRENT_USER_STORE]?: CurrentUserStore;
	[CONFIGURATION_STORE]?: ConfigurationStore;
}
interface IState {}
@inject(PURCHASE_STORE, CURRENT_USER_STORE, CONFIGURATION_STORE)
@observer
class DesktopPurchaseContainer extends Component<IProps, IState> {
	private contextRef = createRef();
	private purchaseStore: PurchaseStore;
	private currentUseStore: CurrentUserStore;
	private configurationStore: ConfigurationStore;
	constructor(props: Readonly<IProps>) {
		super(props);
		this.state = {};
		this.purchaseStore = this.props[PURCHASE_STORE] as PurchaseStore;
		this.currentUseStore = this.props[CURRENT_USER_STORE] as CurrentUserStore;
		this.configurationStore = this.props[CONFIGURATION_STORE] as ConfigurationStore;
	}

	public render() {
		const submit: boolean = this.purchaseStore.getPageToRender === PageToRender.submit;
		return (
			<>
				<div className='main-desktop-send-gift-page' ref={this.contextRef as RefObject<HTMLDivElement>}>
					<Sticky context={this.contextRef}>
						<Segment placeholder nomargin='1' className='top-page-segment'>
							<Link href={routesPaths.root}>
								<a className='image-div'>
									<div>
										<Image navbarlogo='1' src='/static/images/nofshonitLogo.png' />
									</div>
								</a>
							</Link>
							<Breadcrumb className='breadcrumbs' size='big'>
								<Breadcrumb.Section active={this.purchaseStore.getPageToRender === PageToRender.sendGift}>
									<FormattedMessage id='sendGifts.SendGiftStep' />
								</Breadcrumb.Section>
								<Breadcrumb.Divider icon='left angle' className='active-arrow' />
								<Breadcrumb.Section active={this.purchaseStore.getPageToRender === PageToRender.payment}>
									<FormattedMessage id='sendGifts.PaymentStep' />
								</Breadcrumb.Section>
								<Breadcrumb.Divider icon='left angle' />
								<Breadcrumb.Section active={this.purchaseStore.getPageToRender === PageToRender.submit}>
									<FormattedMessage id='sendGifts.SubmitStep' />
								</Breadcrumb.Section>
							</Breadcrumb>
						</Segment>
						<Divider nomargin='1' />
					</Sticky>
					<Grid>
						<Grid.Column width={!submit ? '10' : '16'}>
							<div className={submit ? 'card-and-header submit-card-and-header' : 'card-and-header'}>
								{!submit && (
									<BackButtoncomponent
										onClick={() => {
											if (this.purchaseStore.getPageToRender === PageToRender.sendGift) {
												Router.push(
													{pathname: routesPaths.giftPage.root, query: {id: this.purchaseStore.getCategory.categoryId}},
													`${routesPaths.giftPage.root}/${this.purchaseStore.getCategory.categoryId}`
												);
											} else {
												this.purchaseStore.setPageToRender(PageToRender.sendGift);
											}
										}}
									/>
								)}
								<Header displaytable='1' sendgiftheader='1' className={submit ? 'submit-header' : ''}>
									{this.purchaseStore.getPageToRender === PageToRender.sendGift && (
										<FormattedMessage id='sendGifts.SendGift' />
									)}
									{this.purchaseStore.getPageToRender === PageToRender.payment && (
										<FormattedMessage id='sendGifts.Payment' />
									)}
									{this.purchaseStore.getPageToRender === PageToRender.submit && (
										<div>
											<Image src='/static/images/approved.svg' centered />
											{this.purchaseStore.getSendGiftModel.isToMySelf ? (
												<FormattedMessage id='sendGifts.MySelfSubmitHeader' />
											) : (
												<FormattedMessage
													id='sendGifts.SubmitHeader'
													values={{name: this.purchaseStore.getSendGiftModel.toMemberName}}
												/>
											)}
										</div>
									)}
								</Header>
								{this.purchaseStore.getPageToRender === PageToRender.submit && (
									<div className='submit-header-and-share'>
										<Header as='h2' className='submit-sub-header'>
											<Header.Subheader primaryheader='1'>
												<FormattedMessage
													id='sendGifts.SubmitSubHeader1'
													values={{number: this.purchaseStore.getPurchaseConfirmation.orderConfirmation}}
												/>
											</Header.Subheader>
											<Header.Subheader primaryheader='1'>
												<FormattedMessage id='sendGifts.SubmitSubHeader2' />
											</Header.Subheader>
										</Header>
										{this.purchaseStore.getSendGiftModel.isShare && (
											<div className='share-div'>
												<ShareFlag
													mobileDetect={this.props.mobileDetect}
													orderGuidePath={`${routesPaths.productToMember.root}/${this.purchaseStore.getPurchaseConfirmation.variants[0].transferGuid}`}
												/>
											</div>
										)}
									</div>
								)}
								<div className={submit ? 'card submit-card' : 'card'}>
									<Image
										src={
											this.purchaseStore.getCategory.image && this.purchaseStore.getCategory.image.file
												? this.configurationStore.configuration.imagesPath + this.purchaseStore.getCategory.image.file
												: '/static/placeholders/image-placeholder.png'
										}
									/>
									<div className='header-and-price'>
										<Header as='h3' className='card-header'>
											<p>{this.purchaseStore.getVariant.name}</p>
										</Header>
										<div className='des-and-price'>
											<>
												<HtmlMessageComponent
													htmlMessage={this.purchaseStore.getVariant.description}
													extraClassname='des'
												/>
												<Header as='h3' className='price-header' primaryheader='1'>
													<CustomVariantPrice
														pageToRender={this.purchaseStore.getPageToRender}
														variant={this.purchaseStore.getVariant}
														sumToLoad={this.purchaseStore.getSendGiftModel.sumToLoad}
													/>
												</Header>
											</>
										</div>
									</div>
								</div>
							</div>
							{this.purchaseStore.getPageToRender === PageToRender.sendGift && (
								<MainSendGiftsFormContainer mobileDetect={this.props.mobileDetect} />
							)}
							{this.purchaseStore.getPageToRender === PageToRender.payment && <PaymentFormContainer />}
							{submit && (
								<SubmitCardComponent
									isToMySelf={this.purchaseStore.getSendGiftModel.isToMySelf}
									to={
										this.purchaseStore.getSendGiftModel.toMemberName && !this.purchaseStore.getSendGiftModel.isToMySelf
											? this.purchaseStore.getSendGiftModel.toMemberName
											: this.currentUseStore.getCurrentUserNameForPurchase
									}
									from={this.purchaseStore.getSendGiftModel.fromMemberName}
									phone={this.purchaseStore.getSendGiftModel.toMemberMobilePhone}
									date={this.purchaseStore.getSendGiftModel.sendDate}
									email={this.purchaseStore.getSendGiftModel.toMemberEmail}
								/>
							)}
							{submit && (
								<>
									<Segment placeholder className='sumbit-continue' maxwidth100percent='1'>
										<Button
											circular
											className='sumbit-continue-btn'
											onClick={() => {
												Router.push(routesPaths.gifts.root);
											}}>
											<FormattedMessage id='submit.Continue' />
										</Button>
									</Segment>
									<CustomTitleComponent
										content={this.purchaseStore.getTags.tagName}
										notMain
										margin='0 0 3rem 0 !important'
										custombg='#62c6bf'>
										<FormattedMessage id='sendGifts.popularTagsOnNofshonit' />
									</CustomTitleComponent>
									<Image src='/static/images/bag.png' className='bag-img' />
									<CustomTagscomponent
										imagesPath={this.configurationStore.configuration.imagesPath}
										intl={this.props.intl}
										mobileDetect={this.props.mobileDetect}
										tags={this.purchaseStore.getTags}
									/>
								</>
							)}
						</Grid.Column>
						{/* {!submit && (
						<Grid.Column width='6' className='preview-column'>
							<PreviewGiftContainer ref={() => this.contextRef} />
						</Grid.Column>
					)} */}
					</Grid>
				</div>
				{!submit && <PreviewGiftContainer ref={() => this.contextRef} />}
			</>
		);
	}
}
export default withIntl(DesktopPurchaseContainer);
