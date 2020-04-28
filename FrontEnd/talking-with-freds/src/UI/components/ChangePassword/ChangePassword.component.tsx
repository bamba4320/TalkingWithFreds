import React from 'react';
import {Form, Input, Button} from 'semantic-ui-react';
import './ChangePassword.component.scss';

interface IProps {
	onSubmit: any;
}
interface IState {
	oldPassword: string;
	newPassword: string;
	confirmPassword: string;
}

export default class ChangePasswordComponent extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			oldPassword: '',
			newPassword: '',
			confirmPassword: '',
		};
	}

	public render() {
		return (
			<Form className='change-password-form'>
				<Input
					type='password'
					placeholder='Old Password'
					onChange={(e) => {
						this.setState({oldPassword: e.target.value});
					}}
				/>
				<Input
					type='password'
					placeholder='New Password'
					onChange={(e) => {
						this.setState({newPassword: e.target.value});
					}}
				/>
				<Input
					className={`${this.state.newPassword !== this.state.confirmPassword ? 'error-show' : ''}`}
					type='password'
					placeholder='Confirm new Password'
					onChange={(e) => {
						this.setState({confirmPassword: e.target.value});
					}}
					onKeyDown={this.handleOnKeyDown}
				/>
				{this.state.newPassword !== this.state.confirmPassword && (
					<div className='error-message'>Passwords do not match!</div>
				)}

				<Button
					inverted
					color='blue'
					content='Submit'
					type='button'
					onClick={() => {
						this.props.onSubmit(this.state.oldPassword.trim(), this.state.newPassword.trim());
					}}
					disabled={
						this.state.oldPassword.trim() === '' ||
						this.state.newPassword.trim() === '' ||
						this.state.confirmPassword.trim() === '' ||
						this.state.newPassword.trim() !== this.state.confirmPassword.trim()
					}
				/>
			</Form>
		);
	}

	public handleOnKeyDown = (e: any) => {
		if (
			e.key === 'Enter' &&
			this.state.oldPassword !== '' &&
			this.state.newPassword !== '' &&
			this.state.confirmPassword !== '' &&
			this.state.newPassword === this.state.confirmPassword
		) {
			this.props.onSubmit(this.state.oldPassword, this.state.newPassword);
			return false;
		}
	};
}
