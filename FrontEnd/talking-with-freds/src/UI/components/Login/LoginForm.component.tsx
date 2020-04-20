import React from 'react';
import {Form, Button} from 'semantic-ui-react';
import './LoginFormComponent.scss';

interface IProps {
	onSubmit: any;
	onRegisterClick: any;
}
interface IState {}

export default class LoginFormComponent extends React.Component<IProps, IState> {
	private email: string;
	private password: string;
	constructor(props: IProps) {
		super(props);
		this.email = '';
		this.password = '';
	}

	public render() {
		return (
			<div className='login-form-wrapper'>
				<Form className='login-form'>
					<div className='form-field-wrapper'>
						<Form.Input
							className='login-input'
							type='text'
							id='email-input'
							placeholder='Email'
							onChange={(e) => (this.email = e.target.value)}
						/>
					</div>
					<div className='form-field-wrapper'>
						<Form.Input
							className='login-input'
							type='password'
							id='password-input'
							placeholder='Password'
							onChange={(e) => (this.password = e.target.value)}
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
							type='button'
							circular
							inverted
							color='green'
							className='submit-or-registr-btn'
							onClick={this.handleSubmit}>
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
				</Form>
			</div>
		);
	}

	private handleSubmit = () => {
		this.props.onSubmit(this.email, this.password);
	};

	private onRegisterClick = () => {
		this.props.onRegisterClick();
	};
}
