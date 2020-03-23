import React from 'react';
import rootStores from '../../../BL/stores';
import {AUTH_STORE} from '../../../BL/stores/storesKeys';
import RegistrationFormComponent from '../../components/Register/RegistrationForm.component';
import './Register.container.scss';

interface IProps {}
interface IState {}
const authStore = rootStores[AUTH_STORE];

export default class RegisterContainer extends React.Component<IProps, IState> {
	public render() {
		return (
			<div className='page-background'>
				<div className='register-container-wrapper'>
					<div>
						<RegistrationFormComponent onSubmit={this.onSubmit} />
					</div>
				</div>
			</div>
		);
	}

	private onSubmit = (email: string, password: string) => {
		authStore.authenticateLogin(email, password);
	};
}
