import Lang from 'Infrastructure/Language/Language';
import React from 'react';
import {Button, Container, Form, Grid, Segment} from 'semantic-ui-react';
import CustomFormInputComponent from './custom/customFormInputs/CustomFormInput.component';
import CustomFormSelectComponent from './custom/customFormInputs/CustomFormSelect.component';
import CustomTextAreaComponent from './custom/customTextArea/CustomTextArea.componenet';
import withCheckErrors from './FormikCheckErrorsHOC/withCheckErrors';

interface IContactUsFormComponentProps {
	formProps: any;
	loading: boolean;
	onIterestSelected: any;
	contactUsOptions: any;
	maxLen: any;
	onChangeSelectMobile: any;
	isContactUsForm: boolean;
	checkErros?: () => void;
}
interface IContactUsFormComponentState {}

class ContactUsFormComponent extends React.Component<IContactUsFormComponentProps, IContactUsFormComponentState> {
	constructor(props: IContactUsFormComponentProps) {
		super(props);
		this.state = {};
	}

	public render() {
		const {values, touched, errors, handleSubmit, handleChange, handleBlur} = this.props.formProps;
		return (
			<Form loading={this.props.loading} onSubmit={handleSubmit}>
				{this.props.isContactUsForm && (
					<CustomFormSelectComponent
						name='interest'
						options={this.props.contactUsOptions.slice()}
						placeholder={Lang.format('contact.Interest')}
						onChange={(e: any, {name, value}: {name: any; value: any}) =>
							this.props.onIterestSelected(e, name, value, values)
						}
						onChangeMobile={(e: React.ChangeEvent<HTMLSelectElement>) => {
							this.props.onChangeSelectMobile(parseInt(e.target.value, 10), values);
						}}
						onBlur={handleBlur}
						error={errors.interest && touched.interest && errors.interest}
					/>
				)}
				<CustomFormInputComponent
					value={values.name}
					maxLength='50'
					name='name'
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder={Lang.format('general.FullName')}
					error={errors.name && touched.name && errors.name}
				/>
				<CustomFormInputComponent
					value={values.email}
					name='email'
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder={Lang.format('general.Email')}
					error={errors.email && touched.email && errors.email}
					type='email'
				/>
				<CustomFormInputComponent
					name='phone'
					value={values.phone}
					maxLength={this.props.maxLen.phone}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder={Lang.format('general.Phone')}
					error={errors.phone && touched.phone && errors.phone}
					type='tel'
				/>
				<Form.Field>
					<CustomTextAreaComponent
						placeholder={Lang.format('contact.InWhatCanWeHelp')}
						maxLength={this.props.maxLen.help}
						name='help'
						value={values.help}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
				</Form.Field>
				<Grid>
					<Grid.Column only='mobile tablet' mobile={16} tablet={16}>
						<Segment placeholder>
							<Button primary contactbutton='true' circular type='submit' onClick={this.props.checkErros}>
								{Lang.format('contact.SendMessage')}
							</Button>
						</Segment>
					</Grid.Column>
					<Grid.Column only='computer' computer={16}>
						<Container paddingtop40='1'>
							<Button primary contactbutton='true' circular type='submit' onClick={this.props.checkErros}>
								{Lang.format('contact.SendMessage')}
							</Button>
						</Container>
					</Grid.Column>
				</Grid>
			</Form>
		);
	}
}

export default withCheckErrors(ContactUsFormComponent);
