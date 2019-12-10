import {CONFIGURATION_STORE, SEARCH_STORE, UI_STORE} from 'BL/stores';
import ConfigurationStore from 'BL/stores/Configuration.store';
import SearchStore from 'BL/stores/Search.store';
import UiStore from 'BL/stores/Ui.store';
import {
	CategoriesSort,
	desktopFilterScrollOption,
	FilterGiftsProps,
	FilterQueryOptions,
} from 'common/generalconsts/giftFilters.enums';
import GiftsFilterModel from 'common/models/GiftsFilter.model';
import SearchedCategoriesModel from 'common/models/SearchedCategories.model';
import SelectOptionModel from 'common/models/SelectOption.model';
import {addQueryParam, removeQueryParamAndPush} from 'common/routes/historyUtils';
import Lang from 'Infrastructure/Language/Language';
import _ from 'lodash';
import {inject, observer} from 'mobx-react';
import {SingletonRouter, withRouter} from 'next/router';
import React, {Component} from 'react';
import {FormattedMessage, InjectedIntl} from 'react-intl';
import {Dropdown, Header, Icon, Image, Pagination, Segment} from 'semantic-ui-react';
import SearchedCategoriesComponent from 'UI/components/GiftsCategories/SearchedCategories.component';

interface IProps {
	[FilterGiftsProps.filterdGifts]: SearchedCategoriesModel[];
	[FilterGiftsProps.filters]: GiftsFilterModel;
	router: SingletonRouter;
	[UI_STORE]?: UiStore;
	[SEARCH_STORE]?: SearchStore;
	[CONFIGURATION_STORE]?: ConfigurationStore;
	intl?: InjectedIntl;
	shouldLazyLoad?: boolean;
}
interface IState {
	currentSelectOption: SelectOptionModel;
	dropdownOpen: boolean;
}

@inject(UI_STORE, SEARCH_STORE, CONFIGURATION_STORE)
@observer
class SearchedCategoriesContainer extends Component<IProps, IState> {
	private uiStore: UiStore;
	private searchStore: SearchStore;
	private configurationStore: ConfigurationStore;
	private selectOptions: SelectOptionModel[] = [];
	constructor(props: Readonly<IProps>) {
		super(props);
		this.uiStore = this.props[UI_STORE] as UiStore;
		this.searchStore = this.props[SEARCH_STORE] as SearchStore;
		this.configurationStore = this.props[CONFIGURATION_STORE] as ConfigurationStore;
		this.selectOptions.push(new SelectOptionModel(Lang.format('gifts.NoSort'), CategoriesSort.noSort));
		this.selectOptions.push(new SelectOptionModel(Lang.format('gifts.SortLowToHigh'), CategoriesSort.LowToHigh));
		this.selectOptions.push(new SelectOptionModel(Lang.format('gifts.SortHighToLow'), CategoriesSort.HighToLow));
		this.state = {
			// sets the current option to the one from the array that has the value equal to the
			// one from the props that equals to the query
			currentSelectOption: this.selectOptions.find((option) => {
				return option.value.toString() === this.props[FilterGiftsProps.filters].priceSort.toString();
			})!,
			dropdownOpen: false,
		};
	}

	public render() {
		return (
			<div className='searched-categories-container'>
				{this.props[FilterGiftsProps.filterdGifts].length > 0 && (
					<Segment placeholder rowflexsegment='1' spacebetween='1' maxwidth100percent='1'>
						<Header size='large'>
							<FormattedMessage id='gifts.GiftsFound' values={{results: this.searchStore.getAmountOfAllResults}} />
						</Header>
						<Dropdown
							value={this.state.currentSelectOption.value}
							text={this.state.currentSelectOption.text}
							onChange={this.changeOption}
							onOpen={this.changeIcon}
							onClose={this.changeIcon}
							icon={<Icon name={this.state.dropdownOpen ? 'chevron up' : 'chevron down'} leftfixed='1' />}
							options={this.selectOptions}
							categoriessort='1'
						/>
					</Segment>
				)}
				<SearchedCategoriesComponent
					filterdGifts={this.props[FilterGiftsProps.filterdGifts]}
					shouldLazyLoad={this.props.shouldLazyLoad ? this.props.shouldLazyLoad : false}
				/>
				{this.props[FilterGiftsProps.filterdGifts].length > 0 && (
					<Segment className='pagination-segment' placeholder nopadding='1' maxwidth100percent='1'>
						<Pagination
							className='inner-pagination'
							activePage={this.props[FilterGiftsProps.filters].pageFilter}
							firstItem={null}
							lastItem={null}
							secondary
							totalPages={this.calculateNumOfPages()}
							onPageChange={this.handleChangePage}
							nextItem={{
								'aria-label': 'Next item',
								content: <Image src='/static/icons/arrow-left.svg' />,
							}}
							prevItem={{
								'aria-label': 'Previous item',
								content: <Image src='/static/icons/arrow-right.svg' />,
							}}
						/>
					</Segment>
				)}
			</div>
		);
	}

	private changeOption = (_e: any, data: any) => {
		const changedOption = new SelectOptionModel(data.options[data.value].text, data.value);
		this.uiStore.blockUiSite();
		if (changedOption.value === CategoriesSort.noSort) {
			removeQueryParamAndPush(this.props.router, FilterQueryOptions.priceSort);
		} else {
			addQueryParam(this.props.router, FilterQueryOptions.priceSort, changedOption.value, false);
		}
		this.setState({currentSelectOption: changedOption, dropdownOpen: false});
	};

	private changeIcon = () => {
		this.setState({dropdownOpen: !this.state.dropdownOpen});
	};

	// adds a page filter to the query
	private handleChangePage = (_e: any, data: any) => {
		const queryValue: number = data.activePage;
		this.uiStore.blockUiSite();
		addQueryParam(this.props.router, FilterQueryOptions.pageFilter, queryValue, false, desktopFilterScrollOption);
	};

	private calculateNumOfPages = () => {
		const flatAmountOfPages =
			this.searchStore.getAmountOfAllResults / this.configurationStore.configuration.numOfBenefitsInGifts;
		const roundedAmountOfPages = _.round(flatAmountOfPages);
		if (roundedAmountOfPages === flatAmountOfPages) {
			return flatAmountOfPages;
		}
		return _.round(flatAmountOfPages + 0.5);
	};
}

export default withRouter(SearchedCategoriesContainer);
