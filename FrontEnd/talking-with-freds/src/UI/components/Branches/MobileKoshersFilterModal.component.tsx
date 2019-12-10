import {BENEFIT_STORE} from 'BL/stores';
import BenefitStore from 'BL/stores/Benefit.store';
import {GiftsKosherFilter} from 'common/generalconsts/giftFilters.enums';
import {inject, observer} from 'mobx-react';
import {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import {Header, Icon, Menu} from 'semantic-ui-react';

interface IProps {
	handleKosherChange: any;
	removeKosherFilter: any;
	[BENEFIT_STORE]?: BenefitStore;
}
interface IState {}

// this component uses the store because on mobile this is a modal that is over the first branches modal, so it cant see
//  the changes of the store through a function in props, but needs to be an observer on the store
@inject(BENEFIT_STORE)
@observer
class MobileKosherFiltersModalComponent extends Component<IProps, IState> {
	private benefitStore: BenefitStore;
	constructor(props: Readonly<IProps>) {
		super(props);
		this.benefitStore = this.props[BENEFIT_STORE] as BenefitStore;
		this.state = {};
	}

	public componentWillUnmount() {
		// this is to check if the user clicked on the back button in the modal so it would revet his changes back to what they were
		!this.benefitStore.getIsMobileActivateFilterClicked &&
			this.benefitStore.setActiveKosherFilterArray([...this.benefitStore.getOldActiveKosherFilterArray]);
	}

	public render() {
		return (
			<Menu vertical fluid mobilefiltermenu='1'>
				<Menu.Item
					flexitem='1'
					onClick={() => {
						this.props.removeKosherFilter();
					}}>
					<Header nomargin='1'>
						<Header.Subheader>
							<FormattedMessage id='gifts.All' />
						</Header.Subheader>
					</Header>
					{this.benefitStore.getActiveKosherFilterArray.includes(parseInt(GiftsKosherFilter.all.toString(), 10)) && (
						<Icon name='check' color='orange' />
					)}
				</Menu.Item>
				<Menu.Item
					flexitem='1'
					onClick={() => {
						this.props.handleKosherChange(parseInt(GiftsKosherFilter.kosher.toString(), 10));
					}}>
					<Header nomargin='1'>
						<Header.Subheader>
							<FormattedMessage id='gifts.Kosher' />
						</Header.Subheader>
					</Header>
					{this.benefitStore.getActiveKosherFilterArray.includes(parseInt(GiftsKosherFilter.kosher.toString(), 10)) && (
						<Icon name='check' color='orange' />
					)}
				</Menu.Item>
				<Menu.Item
					flexitem='1'
					onClick={() => {
						this.props.handleKosherChange(parseInt(GiftsKosherFilter.lmehadrin.toString(), 10));
					}}>
					<Header nomargin='1'>
						<Header.Subheader>
							<FormattedMessage id='gifts.Lmehadrin' />
						</Header.Subheader>
					</Header>
					{this.benefitStore.getActiveKosherFilterArray.includes(
						parseInt(GiftsKosherFilter.lmehadrin.toString(), 10)
					) && <Icon name='check' color='orange' />}
				</Menu.Item>
			</Menu>
		);
	}
}
export default MobileKosherFiltersModalComponent;
