import {CURRENT_USER_STORE, PURCHASE_STORE, UI_STORE} from 'BL/stores';
import CurrentUserStore from 'BL/stores/CurrentUser.store';
import PurchaseStore from 'BL/stores/Purchase.store';
import UiStore from 'BL/stores/Ui.store';
import AlertUtils from 'common/errorHandling/AlertUtils';
import ValidationSchemas from 'common/utils/validations/validationSchemas';
import {inject, observer} from 'mobx-react';
import moment from 'moment';
import {Component} from 'react';
import {InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import {Button, Divider, Form, Header} from 'semantic-ui-react';
import CustomFormInputComponent from 'UI/components/custom/customFormInputs/CustomFormInput.component';
import CustomFormSelectComponent from 'UI/components/custom/customFormInputs/CustomFormSelect.component';
import FormWrapper from 'UI/components/FormWrapper';

interface IProps {
	intl: InjectedIntl;
	[PURCHASE_STORE]?: PurchaseStore;
	[CURRENT_USER_STORE]?: CurrentUserStore;
	[UI_STORE]?: UiStore;
}
interface IState {}
@inject(PURCHASE_STORE, CURRENT_USER_STORE, UI_STORE)
@observer
class PaymentFormContainer extends Component<IProps, IState> {
	private purchaseStore: PurchaseStore;
	private currentUserStore: CurrentUserStore;
	private uiStore: UiStore;
	private intl: InjectedIntl;
	constructor(props: Readonly<IProps>) {
		super(props);
		this.purchaseStore = this.props[PURCHASE_STORE] as PurchaseStore;
		this.currentUserStore = this.props[CURRENT_USER_STORE] as CurrentUserStore;
		this.uiStore = this.props[UI_STORE] as UiStore;
		this.intl = this.props.intl as InjectedIntl;
		this.state = {};
	}

	public render() {
		return (
			<FormWrapper
				onSubmit={this.onSubmit}
				validationSchema={
					this.currentUserStore.isNotLoggedIn
						? ValidationSchemas.NotLoggedInpaymentSchema
						: ValidationSchemas.paymentSchema
				}
				initialValues={this.purchaseStore.getSendGiftModel}>
				{this.Form}
			</FormWrapper>
		);
	}
	private onSubmit = async (values: any) => {
		try {
			this.uiStore.blockUiSite();
			this.purchaseStore.setSendGiftModel(values);
			if (this.currentUserStore.currentUser) {
				await this.purchaseStore.handlePurchase(this.currentUserStore.currentUser.email);
			}
			this.uiStore.unblockUiSite();
		} catch (e) {
			this.uiStore.unblockUiSite();
			AlertUtils.checkApiErrorAndShowPopUp(e);
		}
	};

	private Form = (props: {
		values: any;
		touched: any;
		errors: any;
		handleSubmit: any;
		handleChange: any;
		handleBlur: any;
	}) => {
		const {values, touched, errors, handleSubmit, handleChange, handleBlur} = props;

		return (
			<Form onSubmit={handleSubmit} className='main-payment-form'>
				<div className='form-fields-div'>
					<Header size='large' className='subject-header'>
						{this.intl.formatMessage({id: 'payment.card'})}
					</Header>
					<CustomFormInputComponent
						name='cardNumber'
						value={values.cardNumber}
						placeholder={this.intl.formatMessage({id: 'payment.cardNumber'})}
						maxLength={16}
						onChange={handleChange}
						onBlur={handleBlur}
						error={errors.cardNumber && touched.cardNumber && errors.cardNumber}
						type='tel'
					/>
					<CustomFormInputComponent
						name='idNumber'
						value={values.idNumber}
						placeholder={this.intl.formatMessage({id: 'payment.idNumber'})}
						maxLength={9}
						onChange={handleChange}
						onBlur={handleBlur}
						error={errors.idNumber && touched.idNumber && errors.idNumber}
						type='tel'
					/>
					<Header size='large' className='subject-header'>
						{this.intl.formatMessage({id: 'payment.validity'})}
					</Header>
					<div className='flex-div'>
						<div className='inner-div'>
							<CustomFormSelectComponent
								name='validityYearValue'
								sendGiftsMobile
								value={values.validityYearValue}
								placeholder={this.intl.formatMessage({id: 'payment.year'})}
								options={this.purchaseStore.getYearOptions.slice()}
								onChange={(_e: any, {value}: {name: any; value: any}) => {
									values.validityYearValue = value;
									values.validityYear = this.purchaseStore.getYearOptions[value].text;
									if (value === 0) {
										values.validityMonthValue = moment().get('month');
										values.validityMonth = this.purchaseStore.getMonthOptions[values.validityMonthValue].text;
									}
									this.purchaseStore.setSendGiftModel(values);
								}}
								onChangeMobile={(_e: React.ChangeEvent<HTMLSelectElement>) => {
									const value: number = parseInt(_e.target.value, 10);
									values.validityYearValue = value;
									values.validityYear = this.purchaseStore.getYearOptions[value].text;
									if (value === 0) {
										values.validityMonthValue = moment().get('month');
										values.validityMonth = this.purchaseStore.getMonthOptions[values.validityMonthValue].text;
									}
									this.purchaseStore.setSendGiftModel(values);
								}}
								onBlur={handleBlur}
								error={errors.validityYearValue && touched.validityYearValue && errors.validityYearValue}
							/>
						</div>
						<div className='inner-div'>
							<CustomFormSelectComponent
								name='validityMonthValue'
								sendGiftsMobile
								value={values.validityMonthValue}
								options={this.purchaseStore.getMonthOptions.slice()}
								placeholder={this.intl.formatMessage({id: 'payment.month'})}
								onChange={(_e: any, {value}: {name: any; value: any}) => {
									values.validityMonthValue = value;
									values.validityMonth = this.purchaseStore.getMonthOptions[value].text;
								}}
								onChangeMobile={(_e: React.ChangeEvent<HTMLSelectElement>) => {
									const value: number = parseInt(_e.target.value, 10);
									values.validityMonthValue = value;
									values.validityMonth = this.purchaseStore.getMonthOptions[value].text;
								}}
								onBlur={handleBlur}
								error={errors.validityMonthValue && touched.validityMonthValue && errors.validityMonthValue}
							/>
						</div>
					</div>
					<div className='flex-div'>
						<div className='inner-div'>
							<CustomFormInputComponent
								name='cvv'
								maxLength={4}
								value={values.cvv}
								placeholder={this.intl.formatMessage({id: 'payment.cvv'})}
								onChange={handleChange}
								onBlur={handleBlur}
								error={errors.cvv && touched.cvv && errors.cvv}
								type='tel'
							/>
						</div>
					</div>
					{this.currentUserStore.isNotLoggedIn && (
						<>
							<Header size='large' className='subject-header'>
								{this.intl.formatMessage({id: 'payment.email'})}
							</Header>
							<CustomFormInputComponent
								name='email'
								value={values.email}
								placeholder={this.intl.formatMessage({id: 'payment.emailToSend'})}
								onChange={handleChange}
								onBlur={handleBlur}
								error={errors.email && touched.email && errors.email}
								type='email'
							/>
						</>
					)}
				</div>
				<Divider />
				<div className='submit-div'>
					<Button type='submit' className='submit-button' primarybutton='1' circular>
						{this.intl.formatMessage({id: 'payment.send'})}
					</Button>
				</div>
			</Form>
		);
	};
}
export default withIntl(PaymentFormContainer);
