import React from 'react';
import {Form, Button} from 'semantic-ui-react';
import './LoginFormComponent.scss';

interface IProps {
	onSubmit: any;
	onRegisterClick: any;
	onForgotPassword: any;
}
interface IState {
	email: string;
	password: string;
}

export default class LoginFormComponent extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			email: '',
			password: '',
		};
	}

	public render() {
		return (
			<div className='login-form-wrapper'>
				<div className='form-title'>Welcome, Please Login...</div>
				<Form className='login-form'>
					<div className='form-field-wrapper'>
						<Form.Input
							className='login-input'
							type='text'
							id='email-input'
							placeholder='Email'
							onChange={(e) => this.setState({email: e.target.value})}
						/>
					</div>
					<div className='form-field-wrapper'>
						<Form.Input
							className='login-input'
							type='password'
							id='password-input'
							placeholder='Password'
							onChange={(e) => this.setState({password: e.target.value})}
							onKeyDown={(e: any) => {
								if (e.key === 'Enter') {
									this.handleSubmit();
									return false;
								}
							}}
						/>
					</div>
					<div className='submit-btn-wrapper'>
						<Button
							type='submit'
							circular
							inverted
							color='green'
							className='submit-or-registr-btn'
							onClick={this.handleSubmit}
							disabled={!this.checkLoginValid()}>
							Login
						</Button>
						<Button
							inverted
							color='blue'
							circular
							className='submit-or-registr-btn'
							onClick={() => {
								this.onRegisterClick();
							}}>
							Sign Up
						</Button>
					</div>
					<div className='submit-btn-wrapper center-button'>
						<Button
							inverted
							color='orange'
							className='submit-or-registr-btn'
							circular
							content='Forgot Password'
							onClick={() => {
								this.props.onForgotPassword();
							}}
						/>
					</div>
				</Form>
			</div>
		);
	}

	private handleSubmit = () => {
		this.props.onSubmit(this.state.email, this.state.password);
	};

	private onRegisterClick = () => {
		this.props.onRegisterClick();
	};

	/**
	 * check if login is valid
	 */
	private checkLoginValid(): boolean {
		return this.state.email !== '' && this.state.password !== '';
	}
}
