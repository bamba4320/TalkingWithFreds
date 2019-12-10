import React from 'react';
import {Checkbox, Container} from 'semantic-ui-react';
import HtmlMessageComponent from '../customHtmlMessage/customHtmlMessage.component';
import './CustomCheckbox.scss';
interface IProps {
	label: string;
	value: boolean;
	onChange?: any;
	onBlur?: any;
	name?: string;
	error?: any; // the string to show on error-pass (boolean-for-showing-error && string-to-show)
	validation?: boolean;
	htmlOnClick?: () => void;
	errorColor?: string;
	isNewsletter?: boolean;
	onClick?: any;
}

export default class CustomCheckboxComponent extends React.Component<IProps> {
	public render() {
		return (
			<>
				<Container
					className='CustomCheckbox'
					fluid
					margin0='1'
					textalignright='1'
					style={{display: 'flex', padding: !this.props.htmlOnClick && '5px'}}>
					<Checkbox
						checked={this.props.value ? this.props.value : false}
						name={this.props.name}
						onChange={this.props.onChange}
						onBlur={this.props.onBlur}
						label={!this.props.htmlOnClick && this.props.label}
						className={this.props.isNewsletter ? 'newsletter-checkbox' : ''}
						onClick={this.props.onClick}
					/>
					{this.props.htmlOnClick && (
						<div onClick={this.props.htmlOnClick}>
							<HtmlMessageComponent extraClassname='html-checkbox' htmlMessage={this.props.label} />
						</div>
					)}
				</Container>
				{this.props.validation && (
					<Container
						style={{color: this.props.errorColor ? this.props.errorColor : ' '}}
						validationcontainer='1'
						marginright0='1'
						height30px='1'>
						{this.props.error}
					</Container>
				)}
			</>
		);
	}
}
