import {BENEFIT_STORE} from 'BL/stores';
import BenefitStore from 'BL/stores/Benefit.store';
import OptionsDTO from 'common/models/DTOs/Options.dto';
import {inject, observer} from 'mobx-react';
import {Component} from 'react';
import {Header, Icon, Menu} from 'semantic-ui-react';

interface IProps {
	handleBussinesesChange: any;
	benefitGroupsIdFilter: OptionsDTO[];
	[BENEFIT_STORE]?: BenefitStore;
}
interface IState {}

@inject(BENEFIT_STORE)
@observer
class MobilebenefitGroupsIdFilterModalComponent extends Component<IProps, IState> {
	private benefitStore: BenefitStore;
	constructor(props: Readonly<IProps>) {
		super(props);
		this.benefitStore = this.props[BENEFIT_STORE] as BenefitStore;
		this.state = {};
	}

	public render() {
		return (
			<Menu vertical fluid mobilefiltermenu='1'>
				{this.props.benefitGroupsIdFilter &&
					this.props.benefitGroupsIdFilter.map((bussinesesFilter) => {
						return (
							<Menu.Item
								key={bussinesesFilter.value}
								flexitem='1'
								onClick={() => {
									this.props.handleBussinesesChange(bussinesesFilter.value, bussinesesFilter.text);
								}}>
								<Header nomargin='1'>
									<Header.Subheader>{bussinesesFilter.text}</Header.Subheader>
								</Header>
								{bussinesesFilter.value === this.benefitStore.getActivebenefitGroupIdFilter.value && (
									<Icon name='check' color='orange' />
								)}
							</Menu.Item>
						);
					})}
			</Menu>
		);
	}
}
export default MobilebenefitGroupsIdFilterModalComponent;
