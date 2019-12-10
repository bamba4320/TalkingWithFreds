import * as React from 'react';
import {Container, Form, Icon, Input} from 'semantic-ui-react';

export interface ICustomFormInputProps {
	value?: string;
	onChange: any;
	placeholder?: string;
	name?: string;
	onBlur?: any;
	error?: any; // the string to show on error-pass (boolean-for-showing-error && string-to-show)
	maxLength?: any;
	minheight65?: boolean;
	icon?: any;
	onClick?: any;
	newsletterinputdesktop?: boolean;
	newsletterinputmobile?: boolean;
	type?: string;
	disabled?: boolean;
	className?: string;
	id?: string;
	errorColor?: string;
	isNoPadding?: boolean;
	onFocus?: any;
}

export interface ICustomFormInputState {}

export default class CustomFormInputComponent extends React.Component<ICustomFormInputProps, ICustomFormInputState> {
	constructor(props: ICustomFormInputProps) {
		super(props);
		this.state = {};
	}

	public render() {
		return (
			<Form.Field
				className={this.props.newsletterinputdesktop ? 'newsletterinputdesktop-input-form-field' : 'input-form-field'}
				minheight70={!this.props.minheight65 ? '1' : null}
				minheight65={this.props.minheight65 ? '1' : null}
				nopadding={this.props.isNoPadding ? '1' : null}
				error={this.props.error}>
				<Input
					className={
						this.props.newsletterinputdesktop
							? 'newsletterinputdesktop'
							: this.props.className
							? this.props.className
							: ''
					}
					id={this.props.id}
					icon={
						this.props.icon
							? this.props.icon
							: this.props.error && <Icon name='warning circle' color={this.props.errorColor} />
					}
					iconPosition='left'
					name={this.props.name}
					onBlur={this.props.onBlur}
					placeholder={this.props.placeholder}
					value={this.props.value}
					onChange={this.props.onChange}
					maxLength={this.props.maxLength}
					onClick={this.props.onClick}
					type={this.props.type ? this.props.type : 'text'}
					disabled={this.props.disabled}
					onFocus={this.props.onFocus}
				/>
				<Container
					style={{color: this.props.errorColor ? this.props.errorColor : ' '}}
					validationcontainer='1'
					marginright0='1'>
					{this.props.error}
				</Container>
			</Form.Field>
		);
	}
}
