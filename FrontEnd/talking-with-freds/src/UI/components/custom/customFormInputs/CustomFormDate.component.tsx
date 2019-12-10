import {MODAL_STORE} from 'BL/stores';
import ModalStore from 'BL/stores/Modal.store';
import MobileDetectUtils from 'common/utils/processUtils/MobileDetectUtils';
import MobileDetect from 'mobile-detect';
import {inject, observer} from 'mobx-react';
import moment from 'moment';
import * as React from 'react';
import {DateInput} from 'semantic-ui-calendar-react';
import {Container, Form, Grid} from 'semantic-ui-react';
import CustomFormInputComponent from './CustomFormInput.component';

export interface ICustomFormDateProps {
	[MODAL_STORE]?: ModalStore;
	onChange: any;
	placeholder?: string;
	onBlur?: any;
	error?: any; // the string to show on error-pass (boolean-for-showing-error && string-to-show)
	onClick?: any;
	inLine?: boolean;
	maxDate?: any;
	minDate?: any;
	value: string;
	name: string;
	mobileDetect: MobileDetect;
	isFromPurchase?: boolean;
}

export interface ICustomFormDateState {
	iphonePinkColor: string;
}
@inject(MODAL_STORE)
@observer
export default class CustomFormDateComponent extends React.Component<ICustomFormDateProps, ICustomFormDateState> {
	public modalStore: ModalStore;

	constructor(props: ICustomFormDateProps) {
		super(props);
		this.state = {
			iphonePinkColor: '',
		};
		this.modalStore = this.props[MODAL_STORE] as ModalStore;
	}

	public componentDidMount() {
		if (MobileDetectUtils.detectMobileDevice(this.props.mobileDetect, 'iPhone')) {
			this.setState({iphonePinkColor: 'iphonePinkColor'});
		}
	}

	public Date(
		placeholder: any,
		inLine: any,
		maxDate: any,
		minDate: any,
		value: any,
		onBlur: any,
		onChange: any,
		error: any,
		name: any
	) {
		const arr = new Array();
		arr.push(new Date());
		const valueArr = value.split('/');
		const valMoment = moment({
			year: parseInt(valueArr[2], 10),
			month: parseInt(valueArr[1], 10) - 1,
			day: parseInt(valueArr[0], 10),
		});
		return (
			<Form.Field nopadding='1' minheight70='1'>
				<DateInput
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					startMode={value ? 'day' : 'year'}
					iconPosition='left'
					closable
					inline={inLine}
					markColor='purple'
					pickerWidth='23rem'
					pickerStyle={{minWidth: '22rem', margin: 'auto', border: 'none', fontSize: '1.2em'}}
					closeOnMouseLeave={false}
					localization='he'
					maxDate={maxDate}
					minDate={minDate}
					duration={-200}
					marked={!valMoment.isSame(moment(), 'day') ? arr : []}
					popupPosition='top center'
					hideMobileKeyboard
					preserveViewMode={true}
					icon='chevron down'
					onBlur={onBlur}
					dateFormat='DD/MM/YYYY'
					name={name}
				/>

				<Container dateinputmargin='1' validationcontainer='1'>
					{error}
				</Container>
			</Form.Field>
		);
	}
	public render() {
		return (
			<Form.Field nopadding='1'>
				<Grid padded>
					<Grid.Column zeropadding='1' only='mobile tablet' mobile={16} tablet={16}>
						<div
							onClick={() => {
								this.modalStore.openModal(
									this.Date(
										this.props.placeholder,
										true,
										this.props.maxDate,
										this.props.minDate,
										this.props.value,
										this.props.onBlur,
										this.props.onChange,
										this.props.error,
										this.props.name
									),
									{
										title: 'general.ChooseDate',
									}, this.props.isFromPurchase
								);
							}}>
							<CustomFormInputComponent
								value={this.props.value}
								onChange={this.props.onChange}
								placeholder={this.props.placeholder}
								onBlur={this.props.onBlur}
								icon='angle down'
								error={this.props.error}
								disabled
								className={`date-input ${this.state.iphonePinkColor}`}
							/>
						</div>
					</Grid.Column>
					<Grid.Column zeropadding='1' only='computer' computer={16}>
						{this.Date(
							this.props.placeholder,
							false,
							this.props.maxDate,
							this.props.minDate,
							this.props.value,
							this.props.onBlur,
							this.props.onChange,
							this.props.error,
							this.props.name
						)}
					</Grid.Column>
				</Grid>
			</Form.Field>
		);
	}
}
