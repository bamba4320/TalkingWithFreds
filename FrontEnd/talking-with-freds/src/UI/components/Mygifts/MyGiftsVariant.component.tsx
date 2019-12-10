import moment from 'moment';
import React from 'react';
import {FormattedMessage, FormattedNumber, InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import {Card, Header, Image} from 'semantic-ui-react';

interface IProps {
	title: string;
	description?: string;
	price: number;
	srcImg: string;
	imagesPath: string;
	status?: string;
	fromOrTo?: string;
	expiredDate?: string;
	inDate?: string;
	give: boolean;
	transferBy?: string[];
	intl: InjectedIntl;
}

interface IState {}

class MyGiftsVariantComponent extends React.Component<IProps, IState> {
	constructor(props: any) {
		super(props);
		this.state = {};
	}
	public isGray() {
		const intl = this.props.intl as InjectedIntl;
		return this.props.status === 'status.Used' || this.props.status === 'status.Expired';
	}
	public status() {
		const intl = this.props.intl as InjectedIntl;
		if (this.props.status) {
			const stringStatus: string = intl.formatMessage({id: this.props.status});
			if (stringStatus === intl.formatMessage({id: 'status.Used'})) {
				return (
					<Header className='status-header' as='h3' content={intl.formatMessage({id: 'status.Used'})} color='orange' />
				);
			}
			if (stringStatus === intl.formatMessage({id: 'status.Expired'})) {
				return (
					<Header
						className='status-header'
						as='h3'
						content={intl.formatMessage({id: 'status.Expired'})}
						color='orange'
					/>
				);
			}
			if (stringStatus === intl.formatMessage({id: 'status.PariallyUsed'})) {
				return (
					<Header as='h3' className='price-header' primaryheader='1' basealign='1'>
						<FormattedNumber value={this.props.price} currency='ILS' />
						<div className='coin-text'>₪</div>
					</Header>
				);
			}
		}
		if (this.props.price) {
			return (
				<Header as='h3' className='price-header' primaryheader='1' basealign='1'>
					<FormattedNumber value={this.props.price} currency='ILS' />
					<div className='coin-text'>₪</div>
				</Header>
			);
		}
	}
	public renderTranfer() {
		const intl = this.props.intl as InjectedIntl;
		if (this.props.transferBy) {
			const trans: string = this.props.transferBy
				.map((transferId) => {
					return intl.formatMessage({id: transferId});
				})
				.join(intl.formatMessage({id: 'myGifts.and'}));
			if (moment(this.props.inDate, 'DD/MM/YYYY').isAfter(moment(), 'day')) {
				return <FormattedMessage id='myGifts.willSend' values={{tranferBy: trans}} />;
			}
			return <FormattedMessage id='myGifts.sent' values={{tranferBy: trans}} />;
		}
	}
	public renderTitle() {
		return (
			<Header as='h3' className='card-header' cardheader='1' inlineheader='1'>
				{this.props.title}
				<Header.Subheader>
					<Card.Description>{this.props.description}</Card.Description>
				</Header.Subheader>
			</Header>
		);
	}
	public render() {
		if (this.props.give) {
			return (
				<Card className='variant-card'>
					<Image src={this.props.imagesPath + this.props.srcImg} wrapped className='card-image' categorycardimage='1' />
					<Card.Content className='card-content'>
						{this.renderTitle()}
						<Header as='h3' className='give-price-header' primaryheader='1' basealign='1'>
							<FormattedNumber value={this.props.price} />
							<div className='coin-text'>₪</div>
						</Header>
					</Card.Content>
					<Card.Content className='give-second-card-content'>
						<Header as='h5' className='give-from-header'>
							<FormattedMessage id='myGifts.to' values={{name: this.props.fromOrTo}} />
						</Header>
						<Header as='h5' className='give-date-header'>
							{this.renderTranfer()}
							<FormattedMessage id='myGifts.inDate' values={{date: this.props.inDate}} />
						</Header>
					</Card.Content>
				</Card>
			);
		}
		return (
			<Card className='variant-card'>
				<Image
					src={this.props.imagesPath + this.props.srcImg}
					wrapped
					className='card-image'
					categorycardimage='1'
					grayimage={this.isGray() ? '1' : null}
				/>
				<Card.Content className='card-content'>
					{this.renderTitle()}
					<Header as='h5' inlineheader='1' className='date-header'>
						<FormattedMessage id='myGifts.expired' values={{date: this.props.expiredDate}} />
						{/* בתוקף עד: {this.props.expiredDate} */}
					</Header>
					{this.status()}
				</Card.Content>
				<Card.Content className='second-card-content'>
					<Header as='h5' className='from-header'>
						<FormattedMessage id='myGifts.from' values={{name: this.props.fromOrTo}} />
						{/* מ: {this.props.fromOrTo} */}
					</Header>
					<Header as='h5' className='date-header'>
						<FormattedMessage id='myGifts.inDate' values={{date: this.props.inDate}} />
						{/* בתאריך {this.props.inDate} */}
					</Header>
				</Card.Content>
			</Card>
		);
	}
}
export default withIntl(MyGiftsVariantComponent);
