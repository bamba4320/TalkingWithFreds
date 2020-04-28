import './RecoverPassword.container.scss';
import React from 'react';
import {Form} from 'semantic-ui-react';
import {emailRegex} from '../../../common/generalConsts';
import rootStores from '../../../BL/stores';
import {AUTH_STORE, MODAL_STORE, UI_STORE} from '../../../BL/stores/storesKeys';
import AlertUtils from '../../../Infrastructure/Utils/AlertUtils/AlertUtils';

interface IProps {}
interface IState {
	email: string;
}

const authStore = rootStores[AUTH_STORE];
const modalStore = rootStores[MODAL_STORE];
const uiStore = rootStores[UI_STORE];

export default class RecoverPasswordContainer extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			email: '',
		};
	}

	public render() {
		return (
			<div className='recover-password-wrapper'>
				<Form>
					<Form.Field>
						<Form.Input
							className={`${!this.isValidEmail() && this.state.email.trim() !== '' ? 'error-input' : ''}`}
							type='text'
							placeholder='Email'
							onChange={(e) => {
								this.setState({email: e.target.value});
							}}
						/>
						{!this.isValidEmail() && this.state.email.trim() !== '' && (
							<div className='error-text'>Invalid email format!</div>
						)}
					</Form.Field>
					<Form.Button
						type='submit'
						inverted
						color='blue'
						content='Send'
						onClick={this.onSubmit}
						disabled={!this.isValidEmail()}
					/>
				</Form>
			</div>
		);
	}

	private isValidEmail(): boolean {
		return new RegExp(emailRegex).test(this.state.email.trim());
	}

	private onSubmit = () => {
		uiStore.blockUiSite();
		uiStore.showBlockUiLoadingPopUp();
		authStore
			.sendRecoverPassword(this.state.email)
			.then(() => {
				AlertUtils.showGeneralSuccessPopUp(
					'Temporary new password has been send to your email address. Please change it apon login.'
				).then(() => {
					uiStore.unblockUiSite();
					uiStore.closeBlockUiLoadingPopUp();
					modalStore.closeModal();
				});
			})
			.catch((err) => {
				uiStore.unblockUiSite();
				uiStore.closeBlockUiLoadingPopUp();
				AlertUtils.showGeneralErrorPopUp(err.message).then(() => {
					uiStore.unblockUiSite();
					uiStore.closeBlockUiLoadingPopUp();
					modalStore.closeModal();
				});
			});
	};
}
