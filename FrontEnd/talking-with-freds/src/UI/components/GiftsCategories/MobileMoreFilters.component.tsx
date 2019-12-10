import {CategoriesSort, GiftsKosherFilter} from 'common/generalconsts/giftFilters.enums';
import OptionsDTO from 'common/models/DTOs/Options.dto';
import {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import {Accordion, Divider, Header, Icon, Menu} from 'semantic-ui-react';

interface IProps {
	areaFilters: OptionsDTO[];
	tagsFilters: OptionsDTO[];
	handleAreaChange: any;
	handleKosherChange: any;
	handlePriceSortChange: any;
	isAreaActive: any;
	isKosherActive: any;
	isPriceSortActive: any;
	removeAreaFilter: any;
	removeKosherFilter: any;
	removePriceSort: any;
	handleTagsFilterChange: any;
	isTagFilterActive: any;
	removeTagsFilter: any;
}
interface IState {
	activeIndex: number;
}

class MobileMoreFiltersComponent extends Component<IProps, IState> {
	constructor(props: Readonly<IProps>) {
		super(props);
		this.state = {
			activeIndex: -1,
		};
	}

	public render() {
		return (
			<Accordion fluid className='more-filters-container' exclusive={false}>
				{/* AREA
				<Accordion.Title
					className='accordion-title'
					textfont='1'
					active={this.state.activeIndex === 0}
					index={0}
					onClick={this.handleAccordionClick}>
					<FormattedMessage id='gifts.FilterByArea' />
					<Icon name='dropdown' className='accordion-icon' />
				</Accordion.Title>
				<Accordion.Content active={this.state.activeIndex === 0}>
					<Menu vertical fluid mobilefiltermenu='1'>
						<Divider className='accordion-divider' nobordertop='1' />
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
							{this.props.isAreaActive(0) && <Icon name='check' color='orange' />}
						</Menu.Item>
						{this.props.areaFilters.map((areaFilter) => {
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
									{this.props.isAreaActive(areaFilter.value) && <Icon name='check' color='orange' />}
								</Menu.Item>
							);
						})}
					</Menu>
				</Accordion.Content>
				{this.state.activeIndex !== 0 && <Divider className='accordion-divider' />} */}
				{/* Kosher */}
				<Accordion.Title
					className='accordion-title'
					textfont='1'
					active={this.state.activeIndex === 1}
					index={1}
					onClick={this.handleAccordionClick}>
					<FormattedMessage id='gifts.FilterByKosher' />
					<Icon name='dropdown' className='accordion-icon' />
				</Accordion.Title>
				<Accordion.Content active={this.state.activeIndex === 1}>
					<Menu vertical fluid mobilefiltermenu='1'>
						<Divider className='accordion-divider' nobordertop='1' />
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
							{this.props.isKosherActive(GiftsKosherFilter.all) && <Icon name='check' color='orange' />}
						</Menu.Item>
						<Menu.Item
							flexitem='1'
							onClick={() => {
								this.props.handleKosherChange(GiftsKosherFilter.kosher);
							}}>
							<Header nomargin='1'>
								<Header.Subheader>
									<FormattedMessage id='gifts.Kosher' />
								</Header.Subheader>
							</Header>
							{this.props.isKosherActive(GiftsKosherFilter.kosher) && <Icon name='check' color='orange' />}
						</Menu.Item>
						<Menu.Item
							flexitem='1'
							onClick={() => {
								this.props.handleKosherChange(GiftsKosherFilter.lmehadrin);
							}}>
							<Header nomargin='1'>
								<Header.Subheader>
									<FormattedMessage id='gifts.Lmehadrin' />
								</Header.Subheader>
							</Header>
							{this.props.isKosherActive(GiftsKosherFilter.lmehadrin) && <Icon name='check' color='orange' />}
						</Menu.Item>
					</Menu>
				</Accordion.Content>
				{this.state.activeIndex !== 1 && <Divider className='accordion-divider' />}
				{/* PRICE SORTS */}
				<Accordion.Title
					className='accordion-title'
					textfont='1'
					active={this.state.activeIndex === 2}
					index={2}
					onClick={this.handleAccordionClick}>
					<FormattedMessage id='gifts.SortByPrice' />
					<Icon name='dropdown' className='accordion-icon' />
				</Accordion.Title>
				<Accordion.Content active={this.state.activeIndex === 2}>
					<Menu vertical fluid mobilefiltermenu='1'>
						<Divider className='accordion-divider' nobordertop='1' />
						<Menu.Item
							flexitem='1'
							onClick={() => {
								this.props.removePriceSort();
							}}>
							<Header nomargin='1'>
								<Header.Subheader>
									<FormattedMessage id='gifts.NoSort' />
								</Header.Subheader>
							</Header>
							{this.props.isPriceSortActive(CategoriesSort.noSort) && <Icon name='check' color='orange' />}
						</Menu.Item>
						<Menu.Item
							flexitem='1'
							onClick={() => {
								this.props.handlePriceSortChange(CategoriesSort.LowToHigh);
							}}>
							<Header nomargin='1'>
								<Header.Subheader>
									<FormattedMessage id='gifts.SortLowToHigh' />
								</Header.Subheader>
							</Header>
							{this.props.isPriceSortActive(CategoriesSort.LowToHigh) && <Icon name='check' color='orange' />}
						</Menu.Item>
						<Menu.Item
							flexitem='1'
							onClick={() => {
								this.props.handlePriceSortChange(CategoriesSort.HighToLow);
							}}>
							<Header nomargin='1'>
								<Header.Subheader>
									<FormattedMessage id='gifts.SortHighToLow' />
								</Header.Subheader>
							</Header>
							{this.props.isPriceSortActive(CategoriesSort.HighToLow) && <Icon name='check' color='orange' />}
						</Menu.Item>
					</Menu>
				</Accordion.Content>
				{this.state.activeIndex !== 2 && <Divider className='accordion-divider' />}
				{/* TAGS */}
				<Accordion.Title
					className='accordion-title'
					textfont='1'
					active={this.state.activeIndex === 3}
					index={3}
					onClick={this.handleAccordionClick}>
					<FormattedMessage id='gifts.FilterByTags' />
					<Icon name='dropdown' className='accordion-icon' />
				</Accordion.Title>
				<Accordion.Content active={this.state.activeIndex === 3}>
					<Menu vertical fluid mobilefiltermenu='1'>
						<Divider className='accordion-divider' nobordertop='1' />
						<Menu.Item
							flexitem='1'
							onClick={() => {
								this.props.removeTagsFilter();
							}}>
							<Header nomargin='1'>
								<Header.Subheader>
									<FormattedMessage id='gifts.AllTags' />
								</Header.Subheader>
							</Header>
							{this.props.isTagFilterActive(0) && <Icon name='check' color='orange' />}
						</Menu.Item>
						{this.props.tagsFilters.map((tagFilter) => {
							return (
								<Menu.Item
									key={tagFilter.value}
									flexitem='1'
									onClick={() => {
										this.props.handleTagsFilterChange(tagFilter.value);
									}}>
									<Header nomargin='1'>
										<Header.Subheader>{tagFilter.text}</Header.Subheader>
									</Header>
									{this.props.isTagFilterActive(tagFilter.value) && <Icon name='check' color='orange' />}
								</Menu.Item>
							);
						})}
					</Menu>
				</Accordion.Content>
				{this.state.activeIndex !== 3 && <Divider className='accordion-divider' />}
			</Accordion>
		);
	}

	private handleAccordionClick = (_e: any, titleProps: any) => {
		const {index} = titleProps;
		const {activeIndex} = this.state;
		const newIndex = activeIndex === index ? -1 : index;

		this.setState({activeIndex: newIndex});
	};
}
export default MobileMoreFiltersComponent;
