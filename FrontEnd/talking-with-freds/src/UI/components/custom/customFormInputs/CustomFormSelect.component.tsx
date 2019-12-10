import OptionsDTO from 'common/models/DTOs/Options.dto';
import * as React from 'react';
import {Container, Form, Grid, Icon, Select} from 'semantic-ui-react';

export interface ICustomFormSelectProps {
	onChange: any;
	onChangeMobile: any;
	placeholder?: string;
	name?: string;
	onBlur?: any;
	error?: any; // the string to show on error-pass (boolean-for-showing-error && string-to-show)
	options: OptionsDTO[];
	upward?: boolean;
	value?: number;
	sendGiftsMobile?: boolean;
}

export interface ICustomFormSelectState {}

export default class CustomFormSelectComponent extends React.Component<ICustomFormSelectProps, ICustomFormSelectState> {
	constructor(props: ICustomFormSelectProps) {
		super(props);
		this.state = {};
	}

	public renderDesktop = () => {
		// checks if need to be a controled select like in MainSendGiftsForm.container
		return this.props.value === undefined ? (
			<Form.Field minheight70='1' error={this.props.error}>
				<Select
					icon={<Icon name='chevron down' leftfixed='1' />}
					name={this.props.name}
					options={this.props.options}
					placeholder={this.props.placeholder}
					onChange={this.props.onChange}
					onBlur={this.props.onBlur}
					upward={this.props.upward}
				/>
				<Container validationcontainer='1'>{this.props.error}</Container>
			</Form.Field>
		) : (
			<Form.Field minheight70='1' error={this.props.error}>
				<Select
					sendgiftstimedropdown={this.props.sendGiftsMobile ? '1' : null}
					icon={<Icon name='chevron down' leftfixed='1' />}
					name={this.props.name}
					options={this.props.options}
					placeholder={this.props.placeholder}
					onChange={this.props.onChange}
					onBlur={this.props.onBlur}
					upward={this.props.upward}
					value={this.props.value}
				/>
				<Container validationcontainer='1'>{this.props.error}</Container>
			</Form.Field>
		);
	};

	public renderMobile = () => {
		return (
			<Form.Field className='custom-form-select' minheight70='1' error={this.props.error}>
				<select
					className={`select-mobile ${this.props.error ? 'error' : ''}`}
					onChange={this.props.onChangeMobile}
					name={this.props.name}
					onBlur={this.props.onBlur}>
					<option value='' hidden>
						{this.props.placeholder}
					</option>
					{this.props.options
						.filter((option) => !option.disabled)
						.map((option: OptionsDTO, index: number) => (
							<option value={option.value} key={`option${option.value}i${index}`}>
								{option.text}
							</option>
						))}
				</select>
				<Icon name='chevron down' className={this.props.error ? 'error' : ''} leftfixed='1' />
				<Container validationcontainer='1'>{this.props.error}</Container>
			</Form.Field>
		);
	};

	public render() {
		return (
			<Grid padded>
				<Grid.Column zeropadding='1' only='mobile tablet' mobile={16} tablet={16}>
					{this.renderMobile()}
				</Grid.Column>
				<Grid.Column zeropadding='1' only='computer' computer={16}>
					{this.renderDesktop()}
				</Grid.Column>
			</Grid>
		);
	}
}
