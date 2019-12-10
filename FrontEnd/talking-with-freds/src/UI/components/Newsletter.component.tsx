import {CURRENT_USER_STORE, UI_STORE} from 'BL/stores';
import CurrentUserStore from 'BL/stores/CurrentUser.store';
import AlertUtils from 'common/errorHandling/AlertUtils';
import {ApiError} from 'common/errorHandling/ErrorTypes/declaredTypes';
import {NewsletterMessages} from 'common/generalconsts/messages.consts';
import ValidationSchemas from 'common/utils/validations/validationSchemas';
import Lang from 'Infrastructure/Language/Language';
import {inject, observer} from 'mobx-react';
import React from 'react';
import {InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import {Button, Divider, Form, Grid, Header, Loader, Segment} from 'semantic-ui-react';
import CustomCheckboxComponent from './custom/customCheckbox/CustomCheckbox.component';
import EditorMessageComponent from './custom/customEditorMessage/customEditorMessage.component';
import CustomFormInputComponent from './custom/customFormInputs/CustomFormInput.component';
import CustomResponsiveWrapper from './CustomResponsiveWrapper';
import FormWrapper from './FormWrapper';
import './Newsletter.scss';
import UiStore from 'BL/stores/Ui.store';

interface IProps {
	onSubmitRequest?: any;
	newsletterMessages?: NewsletterMessages;
	mobileDetect: MobileDetect;
	intl: InjectedIntl;
	[CURRENT_USER_STORE]?: CurrentUserStore;
	[UI_STORE]?: UiStore;
}
interface IState {
	loading: boolean;
	conditions: boolean;
}

@inject(CURRENT_USER_STORE, UI_STORE)
@observer
class NewsletterComponent extends React.Component<IProps, IState> {
	private currentUserStore: CurrentUserStore;
	private uiStore: UiStore;
	constructor(props: Readonly<IProps>) {
		super(props);
		this.currentUserStore = this.props[CURRENT_USER_STORE] as CurrentUserStore;
		this.uiStore = this.props[UI_STORE] as UiStore;
		this.state = {
			loading: false,
			conditions: false,
		};
	}

	public render() {
		return (
			<CustomResponsiveWrapper
				mobileDetect={this.props.mobileDetect}
				desktopComponent={this.renderNewsletterComponent(true)}
				mobileComponent={this.renderNewsletterComponent(false)}
			/>
		);
	}

	private renderNewsletterComponent(isDesktop: boolean) {
		return isDesktop ? (
			<Grid zeromargin='1' width100vw='1' newsletterdesktop='1'>
				<Grid.Column computer={1} />
				{/* newsletter form */}
				<Grid.Column computer={13} paddingright2rem='1'>
					<FormWrapper
						onSubmit={this.onSubmit}
						validationSchema={ValidationSchemas.newsLetterSchema(!this.currentUserStore.isNotLoggedIn)}
						initialValues={{
							email: this.currentUserStore.isNotLoggedIn ? '' : '',
							conditions: false,
						}}>
						{/* newsletter form */}
						{this.newsletterForm}
					</FormWrapper>
				</Grid.Column>
				<Grid.Column computer={2} />
			</Grid>
		) : (
			<>
				<Divider topmargindivider='1' />
				<Grid zeromargin='1' newslettermobile='1'>
					{/* newsletter text */}
					<Grid.Column mobile={16}>
						<Header as={'h2'} primaryheader='1' nomargin='1' textcentered='1'>
							{Lang.format('newsletter.Register')}
						</Header>
						<FormWrapper
							onSubmit={this.onSubmit}
							validationSchema={ValidationSchemas.newsLetterSchema(!this.currentUserStore.isNotLoggedIn)}
							initialValues={{
								email: this.currentUserStore.isNotLoggedIn ? '' : '',
								conditions: false,
							}}>
							{/* newsletter form */}
							{this.newsletterForm}
						</FormWrapper>
					</Grid.Column>
				</Grid>
			</>
		);
	}

	private onSubmit = (values: {email: any}) => {
		this.setState({loading: true});
		this.props
			.onSubmitRequest(values)
			.catch((err: ApiError) => {
				AlertUtils.checkApiErrorAndShowPopUp(err);
			})
			.finally(() => this.setState({loading: false}));
	};

	private newsletterForm = (props: {
		values: any;
		touched: any;
		errors: any;
		handleSubmit: any;
		handleChange: any;
		handleBlur: any;
	}) => {
		const {handleSubmit} = props;
		const guest = this.props.newsletterMessages ? this.props.newsletterMessages.guest : undefined;
		return (
			<CustomResponsiveWrapper
				mobileDetect={this.props.mobileDetect}
				desktopComponent={
					<Grid style={{display: 'flex'}}>
						<Grid.Column computer={7}>
							<Segment
								placeholder
								nopadding='1'
								nomargin='1'
								transparent='1'
								noborder='1'
								paddingright1rem='1'
								noboxshadow='1'>
								<Header as={'h2'} whiteheader='1' lineheight62px='1' nomargin='1'>
									{Lang.format('newsletter.Register')}
								</Header>
								{(!this.currentUserStore.isNotLoggedIn && this.currentUserStore.getAllowDealsAndUpdates) ||
								(this.currentUserStore.isNotLoggedIn && this.currentUserStore.getUserNotLoggedInAllowSmsAndUpdates) ? (
									<CustomCheckboxComponent
										value={true}
										label={guest && guest.messageText ? guest.messageText : ''}
										htmlOnClick={() => {}}
									/>
								) : (
									<CustomCheckboxComponent
										validation
										errorColor='black'
										htmlOnClick={() => {
											props.values.conditions = !this.state.conditions;
											this.setState({conditions: props.values.conditions});
										}}
										name='conditions'
										onChange={(_e: any, {checked}: any) => {
											props.values.conditions = checked;
											this.setState({conditions: props.values.conditions});
										}}
										onBlur={props.handleBlur}
										error={''}
										value={!this.uiStore.getIsRouteChanged && this.state.conditions}
										label={guest && guest.messageText ? guest.messageText : ''}
										isNewsletter={true}
										onClick={() => {
											this.onFocus(props.values, props.errors);
										}}
									/>
								)}
							</Segment>
						</Grid.Column>
						<Grid.Column computer={2} />
						<Grid.Column computer={6}>
							<div style={{height: '35px'}} />
							<Form onSubmit={handleSubmit}>{this.renderNewsletter(props)}</Form>
						</Grid.Column>
					</Grid>
				}
				mobileComponent={<Form onSubmit={handleSubmit}>{this.renderNewsletter(props)}</Form>}
			/>
		);
	};

	private renderNewsletter(props: {
		values: any;
		touched: any;
		errors: any;
		handleSubmit: any;
		handleChange: any;
		handleBlur: any;
	}) {
		const guest = this.props.newsletterMessages ? this.props.newsletterMessages.guest : undefined;

		// if user is not logged in => show input field.
		if (
			!this.currentUserStore.getAllowDealsAndUpdates &&
			this.currentUserStore.isNotLoggedIn &&
			!this.currentUserStore.getUserNotLoggedInAllowSmsAndUpdates
		) {
			return (
				<CustomResponsiveWrapper
					mobileDetect={this.props.mobileDetect}
					desktopComponent={
						<div>
							<CustomFormInputComponent
								name='email'
								onChange={props.handleChange}
								onBlur={props.handleBlur}
								value={!this.uiStore.getIsRouteChanged ? props.values.email : ''}
								errorColor='black'
								placeholder={Lang.format('general.Email')}
								error={
									!this.uiStore.getIsRouteChanged && props.errors.email && props.touched.email && props.errors.email
								}
								newsletterinputdesktop={true}
								type='email'
								onFocus={() => {
									this.onFocus(props.values, props.errors);
								}}
							/>
							{this.renderRegisterButton(true, props.handleSubmit, props)}
						</div>
					}
					mobileComponent={
						<div>
							<CustomCheckboxComponent
								validation
								htmlOnClick={() => {
									props.values.conditions = !this.state.conditions;
									this.setState({conditions: props.values.conditions});
								}}
								name='conditions'
								onChange={(_e: any, {checked}: any) => {
									props.values.conditions = checked;
									this.setState({conditions: props.values.conditions});
								}}
								onBlur={props.handleBlur}
								error={
									!this.uiStore.getIsRouteChanged &&
									props.errors.conditions &&
									props.touched.conditions &&
									props.errors.conditions
								}
								value={!this.uiStore.getIsRouteChanged && this.state.conditions}
								label={guest && guest.messageText ? guest.messageText : ''}
								onClick={() => {
									this.onFocus(props.values, props.errors);
								}}
							/>
							<CustomFormInputComponent
								name='email'
								onChange={props.handleChange}
								onBlur={props.handleBlur}
								value={!this.uiStore.getIsRouteChanged ? props.values.email : ''}
								placeholder={Lang.format('general.Email')}
								error={
									!this.uiStore.getIsRouteChanged && props.errors.email && props.touched.email && props.errors.email
								}
								newsletterinputmobile={true}
								type='email'
								isNoPadding
								onFocus={() => {
									this.onFocus(props.values, props.errors);
								}}
							/>
							{this.renderRegisterButton(false, props.handleSubmit, props)}
						</div>
					}
				/>
			);
		} else {
			// if user didn't register to newsletter => show button to register.
			if (!this.currentUserStore.isNotLoggedIn && !this.currentUserStore.getAllowDealsAndUpdates) {
				return (
					<CustomResponsiveWrapper
						mobileDetect={this.props.mobileDetect}
						desktopComponent={
							<div>
								<div className='register-user-mail-disabled'>
									{this.currentUserStore.currentUser ? this.currentUserStore.currentUser.email : ''}
								</div>
								{this.renderRegisterButton(true, props.handleSubmit, props)}
							</div>
						}
						mobileComponent={
							<div>
								<CustomCheckboxComponent
									validation
									htmlOnClick={() => {
										props.values.conditions = !this.state.conditions;
										this.setState({conditions: props.values.conditions});
									}}
									name='conditions'
									onChange={(_e: any, {checked}: any) => {
										props.values.conditions = checked;
										this.setState({conditions: props.values.conditions});
									}}
									onBlur={props.handleBlur}
									error={
										!this.uiStore.getIsRouteChanged &&
										props.errors.conditions &&
										props.touched.conditions &&
										props.errors.conditions
									}
									value={!this.uiStore.getIsRouteChanged && this.state.conditions}
									label={guest && guest.messageText ? guest.messageText : ''}
									onClick={() => {
										this.onFocus(props.values, props.errors);
									}}
								/>
								<div className='register-user-mail-disabled'>
									{this.currentUserStore.currentUser ? this.currentUserStore.currentUser.email : ''}
								</div>
								{this.renderRegisterButton(false, props.handleSubmit, props)}
							</div>
						}
					/>
				);
			} else {
				{
					// if user registered to newsletter successfully => show message.
					if (
						this.currentUserStore.getAllowDealsAndUpdates ||
						this.currentUserStore.getUserNotLoggedInAllowSmsAndUpdates
					) {
						return (
							<CustomResponsiveWrapper
								mobileDetect={this.props.mobileDetect}
								desktopComponent={
									<EditorMessageComponent
										message={this.props.newsletterMessages ? this.props.newsletterMessages.approved : null}
										extraClassName='line-height-20px'
									/>
								}
								mobileComponent={
									<>
										<CustomCheckboxComponent
											value={true}
											label={guest && guest.messageText ? guest.messageText : ''}
											htmlOnClick={() => {}}
										/>
										<div style={{height: '15px'}} />
										<EditorMessageComponent
											message={this.props.newsletterMessages ? this.props.newsletterMessages.approved : null}
											extraClassName='line-height-20px'
										/>
									</>
								}
							/>
						);
					}
				}
			}
		}
	}

	private renderRegisterButton(isDesktop: boolean, handleSubmit: any, props: any) {
		if (isDesktop) {
			return (
				<div>
					{!this.uiStore.getIsRouteChanged && props.errors.conditions && props.touched.conditions && (
						<div className='condition-error-div'>{props.errors.conditions}</div>
					)}
					<Button
						circular
						fluid
						disabled={this.state.loading}
						type='button'
						onClick={(_e) => {
							handleSubmit(_e);
							this.onFocus(props.values, props.errors);
						}}
						newsletterdesktopbtn='1'>
						{Lang.format('newsletter.RegisterButton')}
						{this.state.loading && (
							<Loader
								active
								style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}
							/>
						)}
					</Button>
				</div>
			);
		} else {
			return (
				<Button
					circular
					fluid
					disabled={this.state.loading}
					type='button'
					onClick={(_e) => {
						handleSubmit(_e);
						this.onFocus(props.values, props.errors);
					}}
					newslettermobilebtn='1'>
					{Lang.format('newsletter.RegisterButton')}
				</Button>
			);
		}
	}

	private onFocus = (values: any, errors: any) => {
		if (this.uiStore.getIsRouteChanged) {
			this.uiStore.setIsRouteChanged(false);
			values.email = '';
			values.conditions = '';
			errors.conditions = '';
			errors.email = '';
		}
	};
}

export default withIntl(NewsletterComponent);
