import moment from 'moment';
import {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import {Divider} from 'semantic-ui-react';

interface IProps {
	to?: string;
	from?: string;
	email?: string;
	phone?: string;
	date?: string;
	isToMySelf: boolean;
}

interface IState {}

export default class SubmitCardComponent extends Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {};
	}

	public render() {
		return (
			<div className='submit-card-div'>
				<div className='submit-card-grid'>
					<div className='first-row-flex div-padding'>
						<div className='flex-div'>
							<div className='from-or-to-div'>
								<FormattedMessage id='submit.To' />
							</div>
							{this.props.to}
						</div>
						<div>{this.renderHowToSend()}</div>
					</div>
					{!this.props.isToMySelf && (
						<>
							<Divider nomargin='1' />
							<div className='div-padding'>
								<div className='flex-div'>
									<div className='from-or-to-div'>
										<FormattedMessage id='submit.From' />
									</div>
									{this.props.from}
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		);
	}

	public renderHowToSend() {
		const transferBy: string[] = [];
		if (this.props.email) {
			transferBy.push(this.props.email);
		}
		if (this.props.phone) {
			transferBy.push(this.props.phone.substring(0, 3) + '-' + this.props.phone.substr(3));
		}
		const howToSend: string = transferBy.join('\n');
		return moment(this.props.date, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm') >
			moment().format('YYYY-MM-DD HH:mm') ? (
			<div className='send-with-div'>
				<FormattedMessage id='sendGifts.willSend' />
				<div className='details-div'>{howToSend}</div>
			</div>
		) : (
			<div className='send-with-div'>
				<FormattedMessage id='sendGifts.sent' />
				<div className='details-div'>{howToSend}</div>
			</div>
		);
	}
}
