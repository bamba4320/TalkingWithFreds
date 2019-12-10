import {BENEFIT_STORE} from 'BL/stores';
import BenefitStore from 'BL/stores/Benefit.store';
import OptionsDTO from 'common/models/DTOs/Options.dto';
import {inject, observer} from 'mobx-react';
import {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import {Header, Icon, Menu} from 'semantic-ui-react';

interface IProps {
	handleAreaChange: any;
	removeAreaFilter: any;
	areaFilters: OptionsDTO[];
	[BENEFIT_STORE]?: BenefitStore;
}
interface IState {}

// this component uses the store because on mobile this is a modal that is over the first branches modal, so it cant see
// the changes of the store through a function in props, but needs to be an observer on the store
@inject(BENEFIT_STORE)
@observer
class MobileAreaFiltersModalComponent extends Component<IProps, IState> {
	private benefitStore: BenefitStore;
	constructor(props: Readonly<IProps>) {
		super(props);
		this.benefitStore = this.props[BENEFIT_STORE] as BenefitStore;
		this.state = {};
	}

	public componentWillUnmount() {
		// this is to check if the user clicked on the back button in the modal so it would revet his changes back to what they were
		!this.benefitStore.getIsMobileActivateFilterClicked &&
			this.benefitStore.setActiveAreaFilterArray([...this.benefitStore.getOldActiveAreaFilterArray]);
	}

	public render() {
		return (
			<Menu vertical fluid mobilefiltermenu='1'>
				<Menu.Item
					flexitem='1'
					onClick={() => {
						this.props.removeAreaFilter();
					}}>
					<Header nomargin='1'>
						<Header.Subheader>
							<FormattedMessage id='gifts.AllAreas' />
						</Header.Subheader>
					</Header>
					{this.benefitStore.getActiveAreaFilterArray.includes(0) && <Icon name='check' color='orange' />}
				</Menu.Item>
				{this.props.areaFilters &&
					this.props.areaFilters.map((areaFilter) => {
						return (
							<Menu.Item
								key={areaFilter.value}
								flexitem='1'
								onClick={() => {
									this.props.handleAreaChange(areaFilter.value);
								}}>
								<Header nomargin='1'>
									<Header.Subheader>{areaFilter.text}</Header.Subheader>
								</Header>
								{this.benefitStore.getActiveAreaFilterArray.includes(areaFilter.value) && (
									<Icon name='check' color='orange' />
								)}
							</Menu.Item>
						);
					})}
			</Menu>
		);
	}
}
export default MobileAreaFiltersModalComponent;
