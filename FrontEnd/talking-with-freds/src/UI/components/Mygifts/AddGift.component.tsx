import ValidationSchemas from 'common/utils/validations/validationSchemas';
import React from 'react';
import {Button, Container, Form, Header, Image} from 'semantic-ui-react';
import CustomFormInputComponent from '../custom/customFormInputs/CustomFormInput.component';
import FormWrapper from '../FormWrapper';
import {InjectedIntl, FormattedMessage} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';

interface IProps {
	text?: string;
	intl: InjectedIntl;
}

interface IState {}

class AddGiftComponent extends React.Component<IProps, IState> {
	constructor(props: any) {
		super(props);
		this.state = {};
	}

	public render() {
		return (
			<div className='add-gift-div'>
				<Header as='h2' className='header'>
					{this.props.intl.formatMessage({id: 'addGift.forPhysicalCardOwners'})}
					<Header.Subheader className='sub-header' content={this.props.text} />
				</Header>
				<FormWrapper
					onSubmit={this.onSubmit}
					validationSchema={ValidationSchemas.addGiftSchema}
					initialValues={{code: ''}}>
					{this.form}
				</FormWrapper>
				<Image src='/static/images/giftCard.png' className='gift-card-img' centered />
			</div>
		);
	}

	private form = (props: {
		values: any;
		touched: any;
		errors: any;
		handleSubmit: any;
		handleChange: any;
		handleBlur: any;
	}) => {
		const {values, touched, errors, handleSubmit, handleChange, handleBlur} = props;
		return (
			<Form onSubmit={handleSubmit} className='form'>
				<CustomFormInputComponent
					value={values.code}
					name='code'
					onBlur={handleBlur}
					placeholder={this.props.intl.formatMessage({id: 'addGift.submitCode'})}
					onChange={handleChange}
					error={errors.code && touched.code && errors.code}
					type='tel'
				/>
				<Container textAlign='center' className='btn-container'>
					<Button primary circular fluidc className='submit-btn' type='submit'>
						<FormattedMessage id='addGift.continue' />
					</Button>
				</Container>
			</Form>
		);
	};
	private onSubmit = (values: {code: string}) => {};
}
export default withIntl(AddGiftComponent);
