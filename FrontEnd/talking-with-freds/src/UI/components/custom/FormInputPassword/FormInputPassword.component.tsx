import * as React from 'react';
import {Container, Form, Icon, Input, InputOnChangeData} from 'semantic-ui-react';

export interface IFormInputPasswordProps {
	id?: string;
	label?: string;
	value?: string;
	onChange: any;
	placeholder?: string;
	name?: string;
	onBlur?: any;
	error?: any; // the string to show on error-pass (boolean-for-showing-error && string-to-show)
}

export interface IFormInputPasswordState {
	hidePassword: boolean;
}

export default class FormInputPasswordComponent extends React.Component<
	IFormInputPasswordProps,
	IFormInputPasswordState
> {
	constructor(props: IFormInputPasswordProps) {
		super(props);
		this.state = {
			hidePassword: true,
		};
	}

	public render() {
		const {id, label} = this.props;
		return (
			<Form.Field minheight65='1' error={this.props.error}>
				<label htmlFor={id}>{label}</label>
				<Input
					name={this.props.name}
					onBlur={this.props.onBlur}
					autoComplete={`autocomplete-${id}`}
					icon={
						<Icon
							name={this.state.hidePassword ? 'eye' : 'eye slash'}
							bordered
							link
							onClick={this.toggleHidePassword}
						/>
					}
					placeholder={this.props.placeholder}
					iconPosition='left'
					id={id}
					type={this.state.hidePassword ? 'password' : 'text'}
					value={this.props.value}
					onChange={(e, data) => this.handleChange(e, data)}
				/>
				<Container validationcontainer='1' marginright0='1'>
					{this.props.error}
				</Container>
			</Form.Field>
		);
	}

	private toggleHidePassword = () => {
		this.setState({hidePassword: !this.state.hidePassword});
	};

	private handleChange(e: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) {
		if (data.value !== ' ') {
			this.props.onChange(e, data);
		}
	}
}
