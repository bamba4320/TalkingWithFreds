import React from 'react';
import {Form, Button, Header} from 'semantic-ui-react';
import './RegistrationFormComponent.scss';

interface IProps {
	onSubmit: any;
}
interface IState {}

export default class RegistrationFormComponent extends React.Component<IProps, IState> {
	private email: string;
	private username:string;
	private password: string;
	private confirmPassword:string;
	constructor(props: IProps) {
		super(props);
		this.email = '';
		this.username = '';
		this.password = '';
		this.confirmPassword = '';
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
							onChange={(e) => (this.email = e.target.value)}
						/>
					</div>
					<div className='form-field-wrapper'>
						<Form.Input
							className='registration-input'
							type='text'
							id='username-input'
							placeholder='Username'
							onChange={(e) => (this.username = e.target.value)}
						/>
					</div>
					<div className='form-field-wrapper'>
						<Form.Input
							className='registration-input'
							type='password'
							id='password-input'
							placeholder='Password'
							onChange={(e) => (this.password = e.target.value)}
						/>
					</div>
					<div className='form-field-wrapper'>
						<Form.Input
							className='registration-input'
							type='password'
							id='password-input'
							placeholder='Confirm Password'
							onChange={(e) => (this.confirmPassword = e.target.value)}
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
						onClick={this.handleSubmit}>
						Sign Up
					</Button>
				</div>
			</div>
		);
	}

	private handleSubmit = () => {
		this.props.onSubmit(this.email, this.username, this.password);
	};
}
