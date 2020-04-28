import React from 'react';
import {Button, Form} from 'semantic-ui-react';
import './RegistrationFormComponent.scss';
import {emailRegex} from '../../../common/generalConsts';

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
							className='registration-input'
							type='text'
							id='email-input'
							placeholder='Email'
							onChange={(e) => this.setState({email: e.target.value})}
						/>
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
							className='registration-input'
							type='password'
							id='password-input'
							placeholder='Confirm Password'
							onChange={(e) => this.setState({confirmPassword: e.target.value})}
						/>
					</div>
				</Form>
				<div className='submit-btn-wrapper'>
					<Button
						type='button'
						circular
						inverted
						color='blue'
						className='submit-or-registr-btn'
						disabled = {!this.isValidEmail()}
						onClick={this.handleSubmit}>
						Sign Up
					</Button>
				</div>
			</div>
		);
	}

	private handleSubmit = () => {
		this.props.onSubmit(this.state.email, this.state.username, this.state.password);
	};

	private isValidEmail(): boolean {
		return new RegExp(emailRegex).test(this.state.email);
	}
}
