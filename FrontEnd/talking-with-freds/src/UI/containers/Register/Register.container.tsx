import React from 'react';
import rootStores from '../../../BL/stores';
import {AUTH_STORE, REGISTER_STORE, UI_STORE, IMAGES_STORE} from '../../../BL/stores/storesKeys';
import RegistrationFormComponent from '../../components/Register/RegistrationForm.component';
import './Register.container.scss';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {Button, Icon} from 'semantic-ui-react';
import AlertUtils from '../../../Infrastructure/Utils/AlertUtils/AlertUtils';
import {observer} from 'mobx-react';

interface IProps extends RouteComponentProps {}
interface IState {}

const registerStore = rootStores[REGISTER_STORE];
const uiStore = rootStores[UI_STORE];
const imagesStore = rootStores[IMAGES_STORE];

@observer
class RegisterContainer extends React.Component<IProps, IState> {
	public render() {
		return (
			<div className='page-background'>
				<div className='register-container-wrapper'>
					<div className='back-button-wrapper'>
						<Button className='back-button' inverted circular color='grey' animated onClick={() => this.onBackClick()}>
							<Button.Content visible>Back</Button.Content>
							<Button.Content hidden>
								<Icon name='long arrow alternate left' size='large' className='arrow-icon' />
							</Button.Content>
						</Button>
					</div>
					<div>
						<RegistrationFormComponent onSubmit={this.onSubmit} />
					</div>
				</div>
			</div>
		);
	}

	private onSubmit = (email: string, username: string, password: string, selectedImageNumber:number) => {
		uiStore.blockUiSite();
		uiStore.showBlockUiLoadingPopUp();
		registerStore
			.addNewUser(email, username, password, selectedImageNumber)
			.then(() => {
				uiStore.unblockUiSite();
				uiStore.closeBlockUiLoadingPopUp();
				AlertUtils.showGeneralSuccessPopUp('Registration was successfuly!').then(() => {
					this.props.history.replace('/Login');
				});
			})
			.catch((err) => {
				uiStore.unblockUiSite();
				uiStore.closeBlockUiLoadingPopUp();
				AlertUtils.showGeneralErrorPopUp(err.message, true);
			});
	};

	private onBackClick = () => {
		this.props.history.goBack();
	};
}
export default withRouter(RegisterContainer);
