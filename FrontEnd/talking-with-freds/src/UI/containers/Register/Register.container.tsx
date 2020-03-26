import React from 'react';
import rootStores from '../../../BL/stores';
import {AUTH_STORE, REGISTER_STORE} from '../../../BL/stores/storesKeys';
import RegistrationFormComponent from '../../components/Register/RegistrationForm.component';
import './Register.container.scss';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {Button, Icon} from 'semantic-ui-react';

interface IProps extends RouteComponentProps {}
interface IState {}

const authStore = rootStores[AUTH_STORE];
const registerStore = rootStores[REGISTER_STORE];

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

	private onSubmit = (email: string, username:string, password: string) => {
		registerStore.addNewUser(email,username,password).then(()=>{
			this.props.history.replace('/Login');
		});
	};

	private onBackClick = () => {
		this.props.history.replace('/Login');
	};
}
export default withRouter(RegisterContainer);
