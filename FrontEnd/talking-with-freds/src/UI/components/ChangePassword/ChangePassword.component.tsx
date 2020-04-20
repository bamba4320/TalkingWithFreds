import React from 'react';
import {Form, Input, Button} from 'semantic-ui-react';
import './ChangePassword.component.scss';

interface IProps {
	onSubmit: any;
}
interface IState {}

export default class ChangePasswordComponent extends React.Component<IProps, IState> {
	private oldPassword: string;
	private newPassword: string;
	private confirmPassword: string;

	constructor(props: IProps) {
		super(props);
		this.oldPassword = '';
		this.newPassword = '';
		this.confirmPassword = '';
	}

	public render() {
		return (
			<Form className='change-password-form'>
				<Input
					type='password'
					placeholder='Old Password'
					onChange={(e) => {
						this.oldPassword = e.target.value;
					}}
				/>
				<Input
					type='password'
					placeholder='New Password'
					onChange={(e) => {
						this.newPassword = e.target.value;
					}}
				/>
				<Input
					type='password'
					placeholder='Confirm new Password'
					onChange={(e) => {
						this.confirmPassword = e.target.value;
					}}
					onKeyDown={this.handleOnKeyDown}
				/>

				<Button
					inverted
					color='blue'
					content='Submit'
					type='button'
					onClick={() => {
						this.props.onSubmit(this.oldPassword, this.newPassword);
					}}
				/>
			</Form>
		);
	}

	public handleOnKeyDown = (e: any) => {
		if (e.key === 'Enter') {
			this.props.onSubmit(this.oldPassword, this.newPassword);
			return false;
		}
	};
}
