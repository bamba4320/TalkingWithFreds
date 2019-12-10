import {GiftsPriceFilter} from 'common/generalconsts/giftFilters.enums';
import {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import {Header, Icon, Menu} from 'semantic-ui-react';

interface IProps {
	handlePriceChange: any;
	isActive: any;
}
interface IState {}

export default class MobilePriceFiltersComponent extends Component<IProps, IState> {
	constructor(props: Readonly<IProps>) {
		super(props);
		this.state = {};
	}

	public render() {
		return (
			<Menu vertical fluid mobilefiltermenu='1'>
				<Menu.Item
					flexitem='1'
					onClick={() => {
						this.props.handlePriceChange(GiftsPriceFilter.allPrices);
					}}>
					<Header nomargin='1'>
						<Header.Subheader>
							<FormattedMessage id='gifts.AllPrices' />
						</Header.Subheader>
					</Header>
					{this.props.isActive(GiftsPriceFilter.allPrices) && <Icon name='check' color='orange' />}
				</Menu.Item>
				<Menu.Item
					flexitem='1'
					onClick={() => {
						this.props.handlePriceChange(GiftsPriceFilter.upTo100);
					}}>
					<Header nomargin='1'>
						<Header.Subheader>
							<FormattedMessage id='gifts.UpTo100' />
						</Header.Subheader>
					</Header>
					{this.props.isActive(GiftsPriceFilter.upTo100) && <Icon name='check' color='orange' />}
				</Menu.Item>
				<Menu.Item
					flexitem='1'
					onClick={() => {
						this.props.handlePriceChange(GiftsPriceFilter.from100To200);
					}}>
					<Header nomargin='1'>
						<Header.Subheader>
							<FormattedMessage id='gifts.From100To200' defaultMessage='100-200' />
						</Header.Subheader>
					</Header>
					{this.props.isActive(GiftsPriceFilter.from100To200) && <Icon name='check' color='orange' />}
				</Menu.Item>
				<Menu.Item
					flexitem='1'
					onClick={() => {
						this.props.handlePriceChange(GiftsPriceFilter.from200To300);
					}}>
					<Header nomargin='1'>
						<Header.Subheader>
							<FormattedMessage id='gifts.From200To300' defaultMessage='200 - 300' />
						</Header.Subheader>
					</Header>
					{this.props.isActive(GiftsPriceFilter.from200To300) && <Icon name='check' color='orange' />}
				</Menu.Item>
				<Menu.Item
					flexitem='1'
					onClick={() => {
						this.props.handlePriceChange(GiftsPriceFilter.from300To400);
					}}>
					<Header nomargin='1'>
						<Header.Subheader>
							<FormattedMessage id='gifts.From300To400' defaultMessage='300 - 400' />
						</Header.Subheader>
					</Header>
					{this.props.isActive(GiftsPriceFilter.from300To400) && <Icon name='check' color='orange' />}
				</Menu.Item>
				<Menu.Item
					flexitem='1'
					onClick={() => {
						this.props.handlePriceChange(GiftsPriceFilter.from400To500);
					}}>
					<Header nomargin='1'>
						<Header.Subheader>
							<FormattedMessage id='gifts.From400To500' defaultMessage='400 - 500' />
						</Header.Subheader>
					</Header>
					{this.props.isActive(GiftsPriceFilter.from400To500) && <Icon name='check' color='orange' />}
				</Menu.Item>
				<Menu.Item
					flexitem='1'
					onClick={() => {
						this.props.handlePriceChange(GiftsPriceFilter.from500AnUp);
					}}>
					<Header nomargin='1'>
						<Header.Subheader>
							<FormattedMessage id='gifts.From500AndUp' />
						</Header.Subheader>
					</Header>
					{this.props.isActive(GiftsPriceFilter.from500AnUp) && <Icon name='check' color='orange' />}
				</Menu.Item>
			</Menu>
		);
	}
}
