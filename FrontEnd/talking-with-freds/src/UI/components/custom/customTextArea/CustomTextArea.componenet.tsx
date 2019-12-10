import Lang from 'Infrastructure/Language/Language';
import React from 'react';
import {Container, Form} from 'semantic-ui-react';
interface IProps {
	placeholder: string;
	maxLength: number;
	id?: string;
	value: string;
	onChange: (e: any, values: any) => void;
	onBlur?: any;
	name?: string;
	disabled?: boolean;
	sendGiftBlessing?: boolean;
	is100Percent?: boolean;
}

export default class CustomTextAreaComponent extends React.Component<IProps> {
	public render() {
		return (
			<Container
				textareaheader='1'
				sendgiftblessingtextarea={this.props.sendGiftBlessing ? '1' : null}
				fullwidthcontainer={this.props.is100Percent ? '1' : null}
				className={`custom-text-area-container ${this.props.disabled ? 'diabled-text-area-container' : ''}`}
				disabled={this.props.disabled}>
				<Form.TextArea
					className='custom-text-area'
					rows={4}
					type='text'
					id={this.props.id}
					name={this.props.name}
					value={this.props.value}
					onChange={(e: any, values: any) => {
						if (e.target.value.length <= this.props.maxLength) {
							this.props.onChange(e, values);
						}
					}}
					placeholder={this.props.placeholder}
					onBlur={this.props.onBlur}
					disabled={this.props.disabled}
				/>
				<Container className='tavim-container' fullwidthcontainer={this.props.is100Percent ? '1' : null}>
					<div className='tavim-text'>
						{/* replace all "Enter" with ' ' */}
						{this.props.maxLength -
							(this.props.value ? this.props.value.replace(/\r?\n|\r/g, ' ').length : 0) +
							Lang.format('contact.Letters')}
					</div>
				</Container>
			</Container>
		);
	}
}
