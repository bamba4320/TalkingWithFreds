import React from 'react';
import {Button, Form} from 'semantic-ui-react';
import './RegistrationFormComponent.scss';
import {emailRegex} from '../../../common/generalConsts';
import AlertUtils from '../../../Infrastructure/Utils/AlertUtils/AlertUtils';
import Swal from 'sweetalert2';

interface IProps {
	onSubmit: any;
}
interface IState {
	email: string;
	username: string;
	password: string;
	confirmPassword: string;
}

export default class RegistrationFormComponent extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			email: '',
			username: '',
			password: '',
			confirmPassword: '',
		};
	}

	public render() {
		return (
			<div className='registration-form-wrapper'>
				<div className='form-title'>Registration</div>
				<Form className='registration-form'>
					<div className='form-field-wrapper'>
						<Form.Input
							className={`registration-input ${!this.isValidEmail() && this.state.email !== '' ? 'error-input' : ''}`}
							type='text'
							id='email-input'
							placeholder='Email'
							onChange={(e) => this.setState({email: e.target.value})}
						/>
						{!this.isValidEmail() && this.state.email.trim() !== '' && <div className='error-text'>Invalid email format!</div>}
					</div>
					<div className='form-field-wrapper'>
						<Form.Input
							className='registration-input'
							type='text'
							id='username-input'
							placeholder='Username'
							onChange={(e) => this.setState({username: e.target.value})}
						/>
					</div>
					<div className='form-field-wrapper'>
						<Form.Input
							className='registration-input'
							type='password'
							id='password-input'
							placeholder='Password'
							onChange={(e) => this.setState({password: e.target.value})}
						/>
					</div>
					<div className='form-field-wrapper'>
						<Form.Input
							className={`registration-input ${!this.isValidPasswordConfirmed() ? 'error-input' : ''}`}
							type='password'
							id='password-input'
							placeholder='Confirm Password'
							onChange={(e) => this.setState({confirmPassword: e.target.value})}
						/>
						{!this.isValidPasswordConfirmed() && <div className='error-text'>Passwords do not match!</div>}
					</div>
				</Form>
				<div className='submit-btn-wrapper'>
					<Button
						type='button'
						circular
						inverted
						color='blue'
						className='submit-or-registr-btn'
						disabled={!this.isValidToSubmit()}
						onClick={this.handleSubmit}>
						Sign Up
					</Button>
				</div>
			</div>
		);
	}

	private handleSubmit = () => {
		AlertUtils.showGeneralWarningPopup('You are about to register. Have you check all your details?').then((result) => {
			if (result.dismiss === Swal.DismissReason.cancel) {
				// if cancel - do nothing
			} else {
				// if confirmed
				this.props.onSubmit(this.state.email.trim(), this.state.username.trim(), this.state.password.trim());
			}
		});
	};

	private isValidEmail(): boolean {
		return new RegExp(emailRegex).test(this.state.email.trim());
	}

	private isValidPasswordConfirmed(): boolean {
		return this.state.password.trim() === this.state.confirmPassword.trim();
	}

	private isValidToSubmit(): boolean {
		return (
			this.isValidEmail() &&
			this.state.email.trim() !== '' &&
			this.state.username.trim() !== '' &&
			this.state.password.trim() !== '' &&
			this.state.confirmPassword.trim() !== '' &&
			this.isValidPasswordConfirmed()
		);
	}
}
