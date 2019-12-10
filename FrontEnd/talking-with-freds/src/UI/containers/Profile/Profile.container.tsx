import {AUTH_STORE, CURRENT_USER_STORE, MODAL_STORE, UI_STORE} from 'BL/stores';
import AuthStore from 'BL/stores/Auth.store';
import CurrentUserStore from 'BL/stores/CurrentUser.store';
import ModalStore from 'BL/stores/Modal.store';
import UiStore from 'BL/stores/Ui.store';
import AlertUtils from 'common/errorHandling/AlertUtils';
import {routesPaths} from 'common/routes/routesPaths.consts';
import ValidationSchemas from 'common/utils/validations/validationSchemas';
import Lang from 'Infrastructure/Language/Language';
import {inject, observer} from 'mobx-react';
import Link from 'next/link';
import Router from 'next/router';
import React from 'react';
import {FormattedMessage, InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import {Breadcrumb, Button, Card, Form, Grid, Segment} from 'semantic-ui-react';
import CustomCheckboxComponent from 'UI/components/custom/customCheckbox/CustomCheckbox.component';
import CustomFormDateComponent from 'UI/components/custom/customFormInputs/CustomFormDate.component';
import CustomFormInputComponent from 'UI/components/custom/customFormInputs/CustomFormInput.component';
import CustomTitleComponent from 'UI/components/custom/customTitle/CustomTitle.component';
import FormWrapper from 'UI/components/FormWrapper';
import UpdatePasswordContainer from '../UpdatePassword/UpdatePassword.container';

interface IProfileContainerProps {
	[MODAL_STORE]?: ModalStore;
	[CURRENT_USER_STORE]?: CurrentUserStore;
	[AUTH_STORE]?: AuthStore;
	[UI_STORE]?: UiStore;
	intl: InjectedIntl;
	mobileDetect: MobileDetect;
}

interface IProfileContainerState {
	birthDate: string;
	deals: boolean;
}

@inject(MODAL_STORE, CURRENT_USER_STORE, AUTH_STORE, UI_STORE)
@observer
class ProfileContainer extends React.Component<IProfileContainerProps, IProfileContainerState> {
	public modalStore: ModalStore;
	public currentUserStore: CurrentUserStore;
	public authStore: AuthStore;
	public uiStore: UiStore;

	constructor(props: Readonly<IProfileContainerProps>) {
		super(props);
		this.state = {
			birthDate: '',
			deals: false,
		};
		this.modalStore = this.props[MODAL_STORE] as ModalStore;
		this.currentUserStore = this.props[CURRENT_USER_STORE] as CurrentUserStore;
		this.authStore = this.props[AUTH_STORE] as AuthStore;
		this.uiStore = this.props[UI_STORE] as UiStore;
	}

	public render() {
		return (
			<Grid padded>
				<Grid.Column computer={16} only='computer'>
					{this.renderDesktop()}
				</Grid.Column>
				<Grid.Column mobile={16} tablet={16} only='mobile tablet' paddingtop3='1'>
					{this.renderMobile()}
				</Grid.Column>
			</Grid>
		);
	}

	private onSubmitClick = async (values: any) => {
		try {
			this.uiStore.blockUiSite();
			const message = await this.currentUserStore.handleUpdateMember(values);
			AlertUtils.showGeneralSuccessPopUp(message);
			this.setState({deals: this.state.deals});
		} catch (err) {
			AlertUtils.checkApiErrorAndShowPopUp(err);
		} finally {
			this.uiStore.unblockUiSite();
		}
	};

	private onBirthdayChanged = (_event: any, value: {value: any}, values: any) => {
		values.birthday = value.value;
		this.setState({birthDate: values.birthday}); // this is for rerendering so we could see the birthdate selected
		this.modalStore.closeModal();
	};
	private openUpdatePassword = () => {
		this.modalStore.openModal(<UpdatePasswordContainer closeModal={this.modalStore.closeModal} />, {
			title: 'general.ChangePassword',
		});
	};
	/**
	 * function that returns true if one of the values has changed and isnt equal the currentUser's value
	 *
	 */
	private isChanged(values: any): boolean {
		const currentProfile = this.currentUserStore.currentProfile();
		if (currentProfile) {
			const {name, email, phone, birthday, deals} = currentProfile;
			return (
				name !== values.name ||
				email !== values.email ||
				phone !== values.phone ||
				birthday !== values.birthday ||
				deals !== values.deals
			);
		}
		return false;
	}
	private profileForm = (props: {
		values: any;
		touched: any;
		errors: any;
		handleSubmit: any;
		handleChange: any;
		handleBlur: any;
	}) => {
		const {values, touched, errors, handleSubmit, handleChange, handleBlur} = props;
		return (
			<Form onSubmit={handleSubmit} className='profile-form'>
				<CustomFormInputComponent
					name='name'
					maxLength='50'
					placeholder={Lang.format('general.FullName')}
					onChange={handleChange}
					onBlur={handleBlur}
					value={values.name}
					error={errors.name && touched.name && errors.name}
				/>
				<CustomFormInputComponent
					name='email'
					value={values.email}
					onBlur={handleBlur}
					onChange={handleChange}
					placeholder={Lang.format('general.Email')}
					error={errors.email && touched.email && errors.email}
					type='email'
				/>
				<CustomFormInputComponent
					name='phone'
					maxLength='10'
					value={values.phone}
					onChange={handleChange}
					placeholder={Lang.format('general.Phone')}
					onBlur={handleBlur}
					error={errors.phone && touched.phone && errors.phone}
					type='tel'
				/>
				<CustomFormDateComponent
					placeholder={Lang.format('profile.Birthdate')}
					name='birthday'
					value={values.birthday}
					onBlur={handleBlur}
					mobileDetect={this.props.mobileDetect}
					onChange={(e: any, value: any) => {
						this.onBirthdayChanged(e, value, values);
					}}
					error={errors.birthday && touched.birthday && errors.birthday}
				/>
				<Button
					className='update-password-button'
					as={'a'}
					content={Lang.format('general.ChangePassword')}
					linkbutton='1'
					whitebackground='1'
					onClick={this.openUpdatePassword}
				/>
				<Form.Field>
					<CustomCheckboxComponent
						name='deals'
						value={values.deals}
						onChange={(_e: any, {checked}: any) => {
							values.deals = checked;
							this.setState({deals: values.deals});
						}}
						onBlur={handleBlur}
						label={Lang.format('profile.RegisterForUpdtaes')}
					/>
				</Form.Field>
				<Segment placeholder>
					{this.isChanged(values) ? (
						<Button fluid primary circular type='button' onClick={handleSubmit}>
							{Lang.format('profile.SaveDetails')}
						</Button>
					) : (
						<Button
							as={'a'}
							fluid
							opositebutton='1'
							logoutbutton='1'
							letterspacing2='1'
							circular
							onClick={() => {
								this.authStore.logOut();
								Router.push(routesPaths.root);
							}}>
							{Lang.format('profile.LogOut')}
						</Button>
					)}
				</Segment>
			</Form>
		);
	};

	private renderDesktop = () => {
		return (
			<Grid>
				<Grid.Row style={{paddingTop: '0'}}>
					<CustomTitleComponent content={Lang.format('profile.Myprofile')}>
						<Breadcrumb>
							<Link href='/'>
								<a>
									<Breadcrumb.Section whitesection='1'>
										<FormattedMessage id='general.nofshonit' />
									</Breadcrumb.Section>
								</a>
							</Link>
							<Breadcrumb.Divider whitedivider='1' icon='left angle' />
							<Breadcrumb.Section>{Lang.format('profile.Myprofile')}</Breadcrumb.Section>
						</Breadcrumb>
					</CustomTitleComponent>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column computer={4} largeScreen={4} widescreen={5} />
					<Grid.Column computer={8} largeScreen={8} widescreen={6}>
						<Card fluid centered marginbottom8='1'>
							<Card.Content padding='1'>{this.renderMobile()}</Card.Content>
						</Card>
					</Grid.Column>
					<Grid.Column computer={4} largeScreen={4} widescreen={5} lovebackground='1' />
				</Grid.Row>
			</Grid>
		);
	};

	private renderMobile = () => {
		return (
			<FormWrapper
				onSubmit={this.onSubmitClick}
				validationSchema={ValidationSchemas.profileSchema}
				initialValues={this.currentUserStore.currentProfile()}>
				{this.profileForm}
			</FormWrapper>
		);
	};
}

export default withIntl(ProfileContainer);
