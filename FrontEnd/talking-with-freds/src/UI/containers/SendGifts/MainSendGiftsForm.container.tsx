import {CURRENT_USER_STORE, MODAL_STORE, PURCHASE_STORE} from 'BL/stores';
import CurrentUserStore from 'BL/stores/CurrentUser.store';
import ModalStore from 'BL/stores/Modal.store';
import PurchaseStore from 'BL/stores/Purchase.store';
import {HowToSend, PageToRender, ToWhom, WhenToSend} from 'common/generalconsts/purchase.enums';
import GiftsConverter from 'common/models/converters/Gifts.convertor';
import SendGiftModel from 'common/models/SendGift.model';
import PurchaseUtils from 'common/utils/purchase/PurchaseUtils';
import ValidationSchemas from 'common/utils/validations/validationSchemas';
import {inject, observer} from 'mobx-react';
import moment from 'moment';
import React, {Component} from 'react';
import {FormattedMessage, InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import {Button, Divider, Form, Header, Icon, Image, Segment} from 'semantic-ui-react';
import CustomCarousel from 'UI/components/custom/customCarousel/CustomCarousel.component';
import CustomFormDateComponent from 'UI/components/custom/customFormInputs/CustomFormDate.component';
import MainLoginComponent from 'UI/components/Login/MainLogin.component';
import MediaCarouselComponent from 'UI/components/SendGifts/MediaCarousel.component';
import CustomFormInputComponent from '../../components/custom/customFormInputs/CustomFormInput.component';
import CustomFormSelectComponent from '../../components/custom/customFormInputs/CustomFormSelect.component';
import CustomTextAreaComponent from '../../components/custom/customTextArea/CustomTextArea.componenet';
import FormWrapper from '../../components/FormWrapper';
import AllMediaModalContainer from './AllMediaModal.container';
import PreviewGiftContainer from './PreviewGift.container';
interface IProps {
	onSubmitRequest?: any;
	isMobile?: boolean;
	intl: InjectedIntl;
	mobileDetect: MobileDetect;
	[PURCHASE_STORE]?: PurchaseStore;
	[MODAL_STORE]?: ModalStore;
	[CURRENT_USER_STORE]?: CurrentUserStore;
}

interface IState {
	loading: boolean;
	activeSumNumber: number;
	activeHowToSend: HowToSend[];
	forWhom: ToWhom;
	blessingTypeValue: number;
	activeElementIndex: number;
	activeTextFirstTime: boolean;
	whenToSend: WhenToSend;
	priceButtons: string[];
	isCarouselStartFromBeginning: boolean;
	render: boolean;
	touched: boolean;
	previousEmail: string;
	previousPhone: string;
}

@inject(PURCHASE_STORE, MODAL_STORE, CURRENT_USER_STORE)
@observer
class MainSendGiftsFormContainer extends Component<IProps, IState> {
	private purchaseStore: PurchaseStore;
	private modalStore: ModalStore;
	private currentUserStore: CurrentUserStore;
	private isFirstTime: boolean;
	private intl: InjectedIntl;
	private tempBlessingStringForChanging: string;
	private mediaCarouselBreakPoints = [
		{width: 1, itemsToShow: 1.5},
		{width: 340, itemsToShow: 2.2},
		{width: 430, itemsToShow: 2.4},
		{width: 470, itemsToShow: 2.7},
		{width: 520, itemsToShow: 3.4},
		{width: 580, itemsToShow: 4.4},
		{width: 670, itemsToShow: 5.4},
		{width: 900, itemsToShow: 6.4},
	];
	private blessingCarouselBreakPoints = [
		{width: 1, itemsToShow: 1.3},
		{width: 400, itemsToShow: 1.5},
		{width: 430, itemsToShow: 1.8},
		{width: 1024, itemsToShow: 1.3},
	];
	constructor(props: IProps) {
		super(props);
		this.isFirstTime = true;
		this.purchaseStore = this.props[PURCHASE_STORE] as PurchaseStore;
		this.modalStore = this.props[MODAL_STORE] as ModalStore;
		this.currentUserStore = this.props[CURRENT_USER_STORE] as CurrentUserStore;
		this.intl = this.props.intl as InjectedIntl;
		this.tempBlessingStringForChanging = '';
		this.state = {
			loading: true,
			activeSumNumber: 0,
			activeHowToSend: [HowToSend.email],
			forWhom: ToWhom.toOther,
			blessingTypeValue: 0,
			activeElementIndex: 0,
			activeTextFirstTime: true,
			whenToSend: WhenToSend.now,
			priceButtons: [],
			isCarouselStartFromBeginning: true,
			render: true,
			touched: false,
			previousEmail: '',
			previousPhone: '',
		};
	}

	public componentDidMount() {
		// date and time of the current date and time rounded upwards
		const now = moment();
		this.purchaseStore.setSendDateAndTime(now);
		this.purchaseStore.setIsOpen(PurchaseUtils.isMoneyVariant(this.purchaseStore.getVariant));
		const loadingAmount: number = PurchaseUtils.loadingAmount(this.purchaseStore.getVariant);
		if (loadingAmount > 0) {
			this.purchaseStore.setSumToLoad(loadingAmount);
		}
		const chargingRanks: string[] = this.purchaseStore.getVariant.chargingRanks
			? this.purchaseStore.getVariant.chargingRanks.split(',')
			: [];
		this.setState({loading: false, priceButtons: chargingRanks});
	}

	public render() {
		return (
			<FormWrapper
				onSubmit={() => {}}
				validationSchema={ValidationSchemas.sendGiftSchema(
					this.purchaseStore.getVariant.loadingAmountMin,
					this.purchaseStore.getVariant.loadingAmountMax
				)}
				initialValues={this.purchaseStore.getSendGiftModel}>
				{this.sendGiftForm}
			</FormWrapper>
		);
	}

	private onSubmit = (values: SendGiftModel) => {
		this.purchaseStore.setSendGiftModel(values);
		if (this.currentUserStore.isNotLoggedIn) {
			this.modalStore.openModal(
				<MainLoginComponent
					fromPurchase
					openModal={this.modalStore.openModal}
					closeModal={this.modalStore.closeModal}
				/>,
				{
					title: 'login.LoginOrRegister',
					fullScreen: true,
					closeFromOutsideModal: true,
				},
				true
			);
		} else {
			if (!this.state.activeHowToSend.includes(HowToSend.email)) {
				values.toMemberEmail = undefined;
			}
			if (!this.state.activeHowToSend.includes(HowToSend.sms)) {
				values.toMemberMobilePhone = undefined;
			}
			this.purchaseStore.setSendGiftModel(values);
			this.purchaseStore.setPageToRender(PageToRender.payment);
			GiftsConverter.sendGiftModelToDto(values);
		}
	};

	private sendGiftForm = (props: {
		values: any;
		touched: any;
		errors: any;
		handleChange: any;
		handleBlur: any;
		validateForm: (values: SendGiftModel) => void;
		setFieldTouched: (field: string, isTouched?: boolean, shouldValidate?: boolean) => void;
	}) => {
		const {values, touched, errors, handleChange, handleBlur, setFieldTouched, validateForm} = props;
		return (
			this.state.render && (
				<Form loading={this.state.loading} className='main-send-gifts-form'>
					<div className={!this.props.isMobile ? 'div-weapper-500' : ''}>
						{/* PRICE */}
						{PurchaseUtils.isMoneyVariant(this.purchaseStore.getVariant) && (
							<>
								<Header size='large'>{this.intl.formatMessage({id: 'sendGifts.Sum'})}</Header>
								{this.state.priceButtons.map((price: string, index: number) => {
									const value: number = parseInt(price, 10);
									if (PurchaseUtils.isInRange(this.purchaseStore.getVariant, value)) {
										return (
											<Button
												type='button'
												toggle
												key={index}
												className='form-button'
												opositebutton='1'
												normalfont='1'
												circular
												active={this.state.activeSumNumber === value}
												onClick={() => {
													this.setTouched();
													this.handleSumChange(value, values);
												}}>
												<FormattedMessage id='sendGifts.priceBtn' values={{price: value}} />
											</Button>
										);
									}
								})}
								<CustomFormInputComponent
									name='sumToLoad'
									id='sumToLoad'
									onClick={this.setTouched}
									value={values.sumToLoad}
									placeholder={this.intl.formatMessage({id: 'sendGifts.FreeSum'})}
									onChange={(e: any) => {
										this.handleFormFieldChange(handleChange, e, values);
										this.setState({activeSumNumber: parseInt(e.target.value, 10)});
									}}
									onBlur={handleBlur}
									error={errors.sumToLoad && touched.sumToLoad && errors.sumToLoad}
									type='tel'
								/>
							</>
						)}
						{/* HOW TO SEND */}
						<Header size='large'>{this.intl.formatMessage({id: 'sendGifts.HowToSend'})}</Header>
						<Button
							type='button'
							toggle
							className='form-button'
							opositebutton='1'
							value={values.isEmail}
							normalfont='1'
							circular
							active={this.state.activeHowToSend.includes(HowToSend.email)}
							onClick={() => {
								this.handleHowtoSendChange(HowToSend.email, values);
							}}>
							{this.intl.formatMessage({id: 'sendGifts.InEmail'})}
						</Button>
						<Button
							type='button'
							toggle
							className='form-button'
							opositebutton='1'
							value={values.isPhone}
							normalfont='1'
							circular
							active={this.state.activeHowToSend.includes(HowToSend.sms)}
							onClick={() => {
								this.handleHowtoSendChange(HowToSend.sms, values);
							}}>
							{this.intl.formatMessage({id: 'sendGifts.SMS'})}
						</Button>
						<Button
							type='button'
							toggle
							className='form-button'
							opositebutton='1'
							normalfont='1'
							circular
							active={this.state.activeHowToSend.includes(HowToSend.share)}
							onClick={() => {
								this.handleHowtoSendChange(HowToSend.share, values);
								this.setTouched();
							}}>
							{this.intl.formatMessage({id: 'sendGifts.Share'})}
						</Button>
						{/* TO WHOM */}
						<Header size='large'>{this.intl.formatMessage({id: 'sendGifts.ToWhom'})}</Header>
						<Button
							type='button'
							toggle
							className='form-button'
							opositebutton='1'
							normalfont='1'
							circular
							active={this.state.forWhom === ToWhom.toOther}
							// tslint:disable-next-line:jsx-no-lambda
							onClick={() => {
								if (this.state.forWhom !== ToWhom.toOther) {
									if (this.state.previousEmail) {
										values.toMemberEmail = this.state.previousEmail;
									} else {
										values.toMemberEmail = '';
									}
									if (this.state.previousPhone) {
										values.toMemberMobilePhone = this.state.previousPhone;
									} else {
										values.toMemberMobilePhone = '';
									}
									this.setState({forWhom: ToWhom.toOther});
									values.isToMySelf = false;
									values.blessing = this.tempBlessingStringForChanging;
									this.purchaseStore.setSendGiftModel(values);
								}
							}}>
							{this.intl.formatMessage({id: 'sendGifts.ForSomeOneElse'})}
						</Button>
						<Button
							type='button'
							toggle
							className='form-button'
							opositebutton='1'
							normalfont='1'
							circular
							active={this.state.forWhom === ToWhom.toMyself}
							// tslint:disable-next-line:jsx-no-lambda
							onClick={() => {
								this.setTouched();
								if (this.state.forWhom !== ToWhom.toMyself) {
									this.setState(
										{previousEmail: values.toMemberEmail, previousPhone: values.toMemberMobilePhone},
										() => {
											if (!this.currentUserStore.isNotLoggedIn && this.currentUserStore.currentUser) {
												this.setTouched();
												if (this.currentUserStore.currentUser.email) {
													values.toMemberEmail = this.currentUserStore.currentUser.email;
												}
												if (this.currentUserStore.currentUser.phoneNumber) {
													values.toMemberMobilePhone = this.currentUserStore.currentUser.phoneNumber;
												}
											}
											this.setState({forWhom: ToWhom.toMyself, activeElementIndex: 0});
											values.isToMySelf = true;
											this.tempBlessingStringForChanging = this.state.blessingTypeValue
												? this.purchaseStore.getBlessingsOptions(this.state.blessingTypeValue)[0].blessingText
												: '';
											values.blessing = '';
											this.purchaseStore.setSendGiftModel(values);
										}
									);
								}
							}}>
							{this.intl.formatMessage({id: 'sendGifts.ToMyself'})}
						</Button>
						{this.state.forWhom === ToWhom.toOther && (
							<CustomFormInputComponent
								onClick={this.setTouched}
								name='toMemberName'
								value={values.toMemberName}
								placeholder={this.intl.formatMessage({id: 'sendGifts.ReceiverName'})}
								onChange={(e: any) => {
									values.toMemberName = e.target.value;
									this.handleFormFieldChange(handleChange, e, values);
								}}
								onBlur={handleBlur}
								error={errors.toMemberName && touched.toMemberName && errors.toMemberName}
							/>
						)}
						{this.state.activeHowToSend.includes(HowToSend.email) && (
							<CustomFormInputComponent
								onClick={this.setTouched}
								name='toMemberEmail'
								value={values.toMemberEmail}
								placeholder={this.intl.formatMessage({id: 'sendGifts.Email'})}
								onChange={(e: any) => {
									this.handleFormFieldChange(handleChange, e, values);
								}}
								onBlur={handleBlur}
								error={
									errors.toMemberEmail &&
									touched.toMemberEmail &&
									this.state.activeHowToSend.includes(HowToSend.email) &&
									errors.toMemberEmail
								}
								type='email'
							/>
						)}
						{this.state.activeHowToSend.includes(HowToSend.sms) && (
							<CustomFormInputComponent
								onClick={this.setTouched}
								name='toMemberMobilePhone'
								value={values.toMemberMobilePhone}
								placeholder={this.intl.formatMessage({id: 'sendGifts.SMSPhoneNumber'})}
								onChange={(e: any) => {
									this.handleFormFieldChange(handleChange, e, values);
								}}
								onBlur={handleBlur}
								error={
									errors.toMemberMobilePhone &&
									touched.toMemberMobilePhone &&
									this.state.activeHowToSend.includes(HowToSend.sms) &&
									errors.toMemberMobilePhone
								}
								type='tel'
							/>
						)}
						{/* Blessing */}
						{this.state.forWhom === ToWhom.toOther && (
							<div>
								<Header size='large'>{this.intl.formatMessage({id: 'sendGifts.Blessing'})}</Header>
								<CustomFormSelectComponent
									name='option'
									options={this.purchaseStore.getBlessingOptions.slice()}
									placeholder={this.intl.formatMessage({id: 'sendGifts.ChooseOccasion'})}
									onChange={(_e: any, {value}: {value: number}) => {
										this.setState(
											{activeElementIndex: 0, blessingTypeValue: value, isCarouselStartFromBeginning: false},
											() => {
												// this is for restarting(rerender) the carousel so it would start from the first item
												this.setState({isCarouselStartFromBeginning: true});
											}
										);
										this.setTextAreaFirstTime();
									}}
									onChangeMobile={(_e: React.ChangeEvent<HTMLSelectElement>) => {
										this.setState(
											{
												activeElementIndex: 0,
												blessingTypeValue: parseInt(_e.target.value, 10),
												isCarouselStartFromBeginning: false,
											},
											() => {
												// this is for restarting(rerender) the carousel so it would start from the first item
												this.setState({isCarouselStartFromBeginning: true});
											}
										);
										this.setTextAreaFirstTime();
									}}
									onBlur={handleBlur}
								/>
							</div>
						)}
					</div>
					{this.state.isCarouselStartFromBeginning ? (
						this.state.forWhom === ToWhom.toOther && this.state.blessingTypeValue ? (
							<div className={!this.props.isMobile ? 'div-weapper-600' : ''}>
								<CustomCarousel
									carouselId='blessings'
									showArrows={!this.props.isMobile}
									isAutoPlay={false}
									itemsToShow={1.3}
									breakPoints={this.blessingCarouselBreakPoints}
									isPagination={false}
									enableMouseSwipe={false}
									onNextStart={this.setTextAreaFirstTime}
									onPrevStart={this.setTextAreaFirstTime}
									getActiveIndex={(activeIndex: number) => {
										this.setState({activeElementIndex: activeIndex});
									}}
									itemPadding={[0, 10]}>
									{this.purchaseStore
										.getBlessingsOptions(this.state.blessingTypeValue)
										.map((blessing: {blessingText: string; length: number}, index: number) => {
											if (this.state.activeElementIndex === index && this.isFirstTime) {
												values.blessing = blessing.blessingText;
												this.purchaseStore.setSendGiftModel(values);
												this.isFirstTime = false;
											}
											return (
												<CustomTextAreaComponent
													key={`${blessing.blessingText}_${index}`}
													sendGiftBlessing
													placeholder={this.intl.formatMessage({id: 'sendGifts.WriteBlessing'})}
													maxLength={200}
													name='blessing'
													value={this.state.activeElementIndex === index ? values.blessing : blessing.blessingText}
													onChange={(e: any) => {
														values.blessing = e.target.value;
														this.handleFormFieldChange(handleChange, e, values);
													}}
													onBlur={handleBlur}
													disabled={this.state.activeElementIndex !== index}
												/>
											);
										})}
								</CustomCarousel>
							</div>
						) : (
							this.state.forWhom === ToWhom.toOther && (
								<div className={!this.props.isMobile ? 'div-weapper-500' : ''}>
									<CustomTextAreaComponent
										placeholder={this.intl.formatMessage({id: 'sendGifts.WriteBlessing'})}
										maxLength={200}
										name='blessing'
										value={values.blessing}
										is100Percent
										onChange={(e: any) => {
											values.blessing = e.target.value;
											this.handleFormFieldChange(handleChange, e, values);
										}}
										onBlur={handleBlur}
									/>
								</div>
							)
						)
					) : (
						<div />
					)}
					{/* MEDIA */}
					{this.state.forWhom === ToWhom.toOther && (
						<div className={!this.props.isMobile ? 'div-weapper-800' : ''}>
							<Segment placeholder rowflexsegment='1' spacebetween='1' className='segment-padding'>
								<Header size='large' nomargin='1'>
									{this.intl.formatMessage({id: 'sendGifts.Media'})}
								</Header>
								{!this.purchaseStore.getImageUrl && (
									<Button
										type='button'
										className='form-button'
										nomargin='1'
										normalfont='1'
										linkbutton='1'
										whitebackground='1'
										onClick={() => this.openMediaModal(values)}>
										{this.intl.formatMessage({id: 'sendGifts.ToImagesGallery'})}
									</Button>
								)}
							</Segment>
						</div>
					)}
					{this.state.forWhom === ToWhom.toOther && this.purchaseStore.getImageUrl ? (
						<div className={!this.props.isMobile ? 'div-weapper-500' : 'selected-div'}>
							<Image className='selected-image' src={this.purchaseStore.getImageUrl} />
							<Button
								type='button'
								className='form-button delete-image-button'
								nomargin='1'
								normalfont='1'
								linkbutton='1'
								whitebackground='1'
								onClick={() => {
									this.deleteImage(values);
								}}>
								<Icon name='trash' paddingleft25px='1' className='opacity-icon' />
								{this.intl.formatMessage({id: 'sendGifts.Delete'})}
							</Button>
						</div>
					) : (
						this.state.forWhom === ToWhom.toOther && (
							<div className={!this.props.isMobile ? 'div-weapper-800 padding-bot-60' : 'padding-bot-60'}>
								{this.getMainImagesSlider(values)}
							</div>
						)
					)}
					{this.state.forWhom === ToWhom.toOther && (
						<div className={!this.props.isMobile ? 'div-weapper-500' : ''}>
							{/* FROM WHOM */}
							<Header size='large'>{this.intl.formatMessage({id: 'sendGifts.FromWhom'})}</Header>
							<CustomFormInputComponent
								onClick={this.setTouched}
								name='fromMemberName'
								value={values.fromMemberName}
								placeholder={this.intl.formatMessage({id: 'sendGifts.NameOfGiver'})}
								onChange={(e: any) => {
									values.fromMemberName = e.target.value;
									this.handleFormFieldChange(handleChange, e, values);
								}}
								onBlur={handleBlur}
								error={errors.fromMemberName && touched.fromMemberName && errors.fromMemberName}
							/>
							{/* WHEN TO SEND */}
							<Header size='large'>{this.intl.formatMessage({id: 'sendGifts.WhenToSend'})}</Header>
							<Button
								type='button'
								toggle
								className='form-button'
								opositebutton='1'
								normalfont='1'
								circular
								active={this.state.whenToSend === WhenToSend.now}
								onClick={() => {
									values.isImmediateSend = true;
									this.purchaseStore.setIsImmediateSend(true);
									this.setState({whenToSend: WhenToSend.now});
								}}>
								{this.intl.formatMessage({id: 'sendGifts.AfterPayment'})}
							</Button>
							<Button
								type='button'
								toggle
								className='form-button'
								opositebutton='1'
								normalfont='1'
								circular
								active={this.state.whenToSend === WhenToSend.other}
								onClick={() => {
									values.isImmediateSend = false;
									this.purchaseStore.setIsImmediateSend(false);
									this.setTouched();
									this.setState({whenToSend: WhenToSend.other});
								}}>
								{this.intl.formatMessage({id: 'sendGifts.Othertime'})}
							</Button>
							{this.state.whenToSend === WhenToSend.other && (
								<div className='flex-div'>
									<div className='inner-div other-date'>
										<CustomFormDateComponent
											mobileDetect={this.props.mobileDetect}
											isFromPurchase
											placeholder={this.intl.formatMessage({id: 'sendGifts.Date'})}
											name='sendDate'
											value={values.sendDate}
											onBlur={handleBlur}
											onChange={(e: any, value: any) => {
												this.onSendDateChanged(e, value, values);
												validateForm(values);
											}}
											error={errors.sendDate && touched.sendDate && errors.sendDate}
										/>
									</div>
									<div className='inner-div'>
										<CustomFormSelectComponent
											name='sendTimeValue'
											sendGiftsMobile
											options={this.purchaseStore.getTimeOptions.slice()}
											placeholder={this.intl.formatMessage({id: 'sendGifts.Time'})}
											onChange={(_e: any, {value}: {value: any}) => {
												values.sendTimeValue = value;
												values.sendTime = this.purchaseStore.getTimeOptions[values.sendTimeValue].text;
												this.purchaseStore.setSendGiftModel(values);
											}}
											onChangeMobile={(_e: React.ChangeEvent<HTMLSelectElement>) => {
												values.sendTimeValue = parseInt(_e.target.value, 10);
												values.sendTime = this.purchaseStore.getTimeOptions[values.sendTimeValue].text;
												this.purchaseStore.setSendGiftModel(values);
											}}
											onBlur={handleBlur}
											value={values.sendTimeValue}
										/>
									</div>
								</div>
							)}
						</div>
					)}
					<Divider />
					<div className='submit-div'>
						{!values.isToMySelf && (
							<div className='check-details-text '>{this.intl.formatMessage({id: 'sendGifts.CheckDetails'})}</div>
						)}
						<Button
							// tslint:disable-next-line:jsx-no-lambda
							onClick={() => {
								this.setState({render: false}, () => {
									const valuesKeys = Object.keys(values);
									valuesKeys.forEach((value) => {
										touched[value] = true;
									});
									validateForm(values);
									this.setState({render: true}, () => {
										const errorsKeys = Object.keys(errors);
										if (this.state.touched) {
											if (errorsKeys.length > 0) {
												setFieldTouched(errorsKeys[0], true, true);
												document.getElementsByName(errorsKeys[0]).item(0) &&
													document
														.getElementsByName(errorsKeys[0])
														.item(0)
														.focus();
											} else {
												this.onSubmit(values);
											}
										} else {
											if (errorsKeys.length > 0) {
												setFieldTouched(errorsKeys[0], true, true);
												document.getElementsByName(errorsKeys[0]).item(0) &&
													document
														.getElementsByName(errorsKeys[0])
														.item(0)
														.focus();
											}
										}
									});
								});
							}}
							type='button'
							className='submit-button'
							primarybutton='1'
							circular>
							{this.intl.formatMessage({id: 'sendGifts.ContinueToPayment'})}
						</Button>
						{this.props.isMobile && !this.purchaseStore.getSendGiftModel.isToMySelf && (
							<Button
								type='button'
								className='form-button'
								nomargin='1'
								normalfont='1'
								linkbutton='1'
								whitebackground='1'
								onClick={() => {
									this.modalStore.openModal(
										<PreviewGiftContainer isMobile={this.props.isMobile} />,
										{
											title: this.intl.formatMessage({id: 'sendGifts.Preview'}),
											isNoMarginFromTop: true,
											isNoPaddingFromTop: true,
										},
										true
									);
								}}>
								<Icon name='eye' paddingleft25px='1' className='opacity-icon' />
								{this.intl.formatMessage({id: 'sendGifts.Preview'})}
							</Button>
						)}
					</div>
				</Form>
			)
		);
	};

	private handleFormFieldChange = (handleChange: any, e: any, values: any) => {
		handleChange(e);
		this.purchaseStore.setSendGiftModel(values);
	};

	private handleSumChange = (sumToLoad: number, values: any) => {
		values.sumToLoad = sumToLoad;
		//errors.sumToLoad = false;
		this.setState({activeSumNumber: sumToLoad});
		this.purchaseStore.setSendGiftModel(values);
	};

	private handleHowtoSendChange = (option: HowToSend, values: SendGiftModel) => {
		let currState = [...this.state.activeHowToSend];
		if (this.state.activeHowToSend.includes(option)) {
			if (currState.length > 1) {
				currState = currState.filter((arrayitem) => arrayitem !== option);
			}
		} else {
			currState.push(option);
		}
		this.setState({activeHowToSend: currState});
		values.isEmail = currState.includes(HowToSend.email);
		values.isPhone = currState.includes(HowToSend.sms);
		values.isShare = currState.includes(HowToSend.share);
	};

	private setTextAreaFirstTime = () => {
		this.isFirstTime = true;
	};

	private onSendDateChanged = (_event: any, value: {value: any}, values: any) => {
		values.sendDate = value.value;
		if (moment(value.value, 'DD/MM/YYYY').isSame(moment(), 'day')) {
			values.sendTimeValue = moment().get('hour') + 1;
			values.sendTime = this.purchaseStore.getTimeOptions[values.sendTimeValue].text;
		}
		this.purchaseStore.setSendGiftModel(values);
		this.modalStore.closeModal();
	};

	private openMediaModal = (values: any) => {
		this.modalStore.openModal(
			<AllMediaModalContainer
				onImageClick={(url: string) => {
					this.onImageClick(url, values, true);
				}}
				isMobile={this.props.isMobile}
			/>,
			{
				title: this.intl.formatMessage({id: 'sendGifts.AllImages'}),
			},
			true
		);
	};

	private onImageClick = (url: string, values: any, isCloseModal?: boolean) => {
		this.purchaseStore.setImageUrl(url);
		values.media = url;
		isCloseModal && this.modalStore.closeModal();
		this.purchaseStore.setSendGiftModel(values);
	};

	private deleteImage = (values: any) => {
		this.purchaseStore.setImageUrl('');
		values.media = '';
		this.purchaseStore.setSendGiftModel(values);
	};

	private getMainImagesSlider = (values: any) => {
		const images = this.purchaseStore.getBlessingsMediaByName(
			this.state.blessingTypeValue
				? this.purchaseStore.getBlessingCategoryNameByBlessingCategoryValue(this.state.blessingTypeValue)
				: ''
		);

		return images ? (
			<MediaCarouselComponent
				fromWhere='main_page'
				onImageClick={(url: string) => this.onImageClick(url, values)}
				blessingMedia={images}
				itemsToShow={3}
				isMobile={this.props.isMobile}
				breakPoints={this.props.isMobile ? this.mediaCarouselBreakPoints : undefined}
			/>
		) : (
			<Segment placeholder>
				<Header marginauto='1' size='large' color='grey'>
					<FormattedMessage id='SendGiftForm.NoImagesOfSubject' />
				</Header>
			</Segment>
		);
	};

	private setTouched = () => {
		this.setState({touched: true});
	};
}

export default withIntl(MainSendGiftsFormContainer);
