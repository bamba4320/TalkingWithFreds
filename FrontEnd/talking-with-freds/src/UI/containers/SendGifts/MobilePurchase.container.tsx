import {CONFIGURATION_STORE, CURRENT_USER_STORE, PURCHASE_STORE} from 'BL/stores';
import ConfigurationStore from 'BL/stores/Configuration.store';
import CurrentUserStore from 'BL/stores/CurrentUser.store';
import PurchaseStore from 'BL/stores/Purchase.store';
import {PageToRender} from 'common/generalconsts/purchase.enums';
import {routesPaths} from 'common/routes/routesPaths.consts';
import {inject, observer} from 'mobx-react';
import Router from 'next/router';
import {Component} from 'react';
import {FormattedMessage, InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import {Button, Card, Divider, Header, Image, Segment} from 'semantic-ui-react';
import HtmlMessageComponent from 'UI/components/custom/customHtmlMessage/customHtmlMessage.component';
import CustomTagscomponent from 'UI/components/custom/CustomSliderAndTags/CustomTags.component';
import CustomTitleComponent from 'UI/components/custom/customTitle/CustomTitle.component';
import CustomVariantPrice from 'UI/components/custom/CustomVariantPrice/CustomVariantPrice';
import SubmitCardComponent from 'UI/components/SendGifts/SubmitCard.component';
import ShareFlag from 'UI/components/Share/ShareFlag.component';
import BackButtoncomponent from '../../components/custom/CustomBackButton/BackButton.component';
import MainSendGiftsFormContainer from './MainSendGiftsForm.container';
import PaymentFormContainer from './PaymentForm.container';

interface IProps {
	mobileDetect: MobileDetect;
	intl: InjectedIntl;
	[PURCHASE_STORE]?: PurchaseStore;
	[CURRENT_USER_STORE]?: CurrentUserStore;
	[CONFIGURATION_STORE]?: ConfigurationStore;
}
interface IState {}
@inject(PURCHASE_STORE, CURRENT_USER_STORE, CONFIGURATION_STORE)
@observer
class MobilePurchaseContainer extends Component<IProps, IState> {
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
		return (
			<div className='mobile-send-gifts-container'>
				{this.purchaseStore.getPageToRender === PageToRender.sendGift && (
					<div>
						<Image
							className='card-image'
							wrapped
							src={
								this.purchaseStore.getCategory.image && this.purchaseStore.getCategory.image.file
									? this.configurationStore.configuration.imagesPath + this.purchaseStore.getCategory.image.file
									: '/static/placeholders/image-placeholder.png'
							}
						/>
						<Card className='card-wrapper'>
							<BackButtoncomponent
								onClick={() => {
									Router.push(
										{pathname: routesPaths.giftPage.root, query: {id: this.purchaseStore.getCategory.categoryId}},
										`${routesPaths.giftPage.root}/${this.purchaseStore.getCategory.categoryId}`
									);
								}}
							/>
							<Header size='large' className='card-header'>
								{this.purchaseStore.getVariant.name}
								<Header.Subheader blackheader='1'>
									<HtmlMessageComponent htmlMessage={this.purchaseStore.getVariant.description} />
								</Header.Subheader>
							</Header>
							<Header as='h3' className='price-header' primaryheader='1'>
								<CustomVariantPrice
									pageToRender={this.purchaseStore.getPageToRender}
									variant={this.purchaseStore.getVariant}
									sumToLoad={this.purchaseStore.getSendGiftModel.sumToLoad}
								/>
							</Header>
							<Card.Content className='card-content '>
								<MainSendGiftsFormContainer isMobile mobileDetect={this.props.mobileDetect} />
							</Card.Content>
						</Card>
					</div>
				)}
				{this.purchaseStore.getPageToRender === PageToRender.payment && (
					<div className='mobile-payment-div'>
						<div className='back-and-payment-card'>
							<BackButtoncomponent
								onClick={() => {
									this.purchaseStore.setPageToRender(PageToRender.sendGift);
								}}
							/>
							<div className='payment-card'>
								<Header as='h3' className='card-header'>
									{this.purchaseStore.getVariant.name}
									<Header.Subheader className='card-sub-header'>
										<HtmlMessageComponent htmlMessage={this.purchaseStore.getVariant.description} />
									</Header.Subheader>
								</Header>
								<Header as='h3' className='price-header' primaryheader='1'>
									<CustomVariantPrice
										pageToRender={this.purchaseStore.getPageToRender}
										variant={this.purchaseStore.getVariant}
										sumToLoad={this.purchaseStore.getSendGiftModel.sumToLoad}
									/>
								</Header>
							</div>
						</div>
						<PaymentFormContainer />
					</div>
				)}
				{this.purchaseStore.getPageToRender === PageToRender.submit && (
					<>
						<div className='submit-div'>
							<Image src='/static/images/approved.svg' centered />
							<Header className='submit-header'>
								{this.purchaseStore.getSendGiftModel.isToMySelf ? (
									<FormattedMessage id='sendGifts.MySelfSubmitHeader' />
								) : (
									<FormattedMessage
										id='sendGifts.SubmitHeader'
										values={{name: this.purchaseStore.getSendGiftModel.toMemberName}}
									/>
								)}
							</Header>
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
							<Divider fullwidthdivider='1' />
							<div className='conclusion-div'>
								<FormattedMessage id='submit.Conclusion' />
							</div>
							<div className='submit-card'>
								<Header as='h3' className='card-header'>
									{this.purchaseStore.getVariant.name}
									<Header.Subheader className='card-sub-header'>
										<HtmlMessageComponent htmlMessage={this.purchaseStore.getVariant.description} />
									</Header.Subheader>
								</Header>
								<Header as='h3' className='price-header' primaryheader='1'>
									<CustomVariantPrice
										pageToRender={this.purchaseStore.getPageToRender}
										variant={this.purchaseStore.getVariant}
										sumToLoad={this.purchaseStore.getSendGiftModel.sumToLoad}
									/>
								</Header>
							</div>
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
							<Segment placeholder className='sumbit-continue'>
								<Button
									circular
									className='sumbit-continue-btn'
									onClick={() => {
										Router.push(routesPaths.gifts.root);
									}}>
									<FormattedMessage id='submit.Continue' />
								</Button>
							</Segment>
						</div>
						<div className='top-tag'>
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
						</div>
					</>
				)}
			</div>
		);
	}
}
export default withIntl(MobilePurchaseContainer);
