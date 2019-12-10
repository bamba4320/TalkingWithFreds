import {UI_STORE} from 'BL/stores';
import UiStore from 'BL/stores/Ui.store';
import {
	desktopFilterScrollOption,
	FilterGiftsProps,
	FilterQueryOptions,
	GiftsKosherFilter,
	GiftsPriceFilter,
} from 'common/generalconsts/giftFilters.enums';
import OptionsDTO from 'common/models/DTOs/Options.dto';
import GiftsFilterModel from 'common/models/GiftsFilter.model';
import {removeQueryParamAndPush, setQueryParam, updateQueryParam} from 'common/routes/historyUtils';
import {inject, observer} from 'mobx-react';
import {SingletonRouter, withRouter} from 'next/router';
import {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import {Button, Header, Segment} from 'semantic-ui-react';

interface IProps {
	[FilterGiftsProps.filters]: GiftsFilterModel;
	router: SingletonRouter;
	[UI_STORE]?: UiStore;
	areaFiltersArray: OptionsDTO[];
	tagsFiltersArray: OptionsDTO[];
}
interface IState {}

@inject(UI_STORE)
@observer
class DesktopFiltersComponent extends Component<IProps, IState> {
	public uiStore: UiStore;
	constructor(props: Readonly<IProps>) {
		super(props);
		this.uiStore = this.props[UI_STORE] as UiStore;
		this.state = {};
	}

	public render() {
		return (
			<Segment placeholder nopadding='1' className='filters-container'>
				<Header size='large'>
					<FormattedMessage id='gifts.Filters' />
				</Header>
				{/* PRICE */}
				<Header className='segment-header'>
					<FormattedMessage id='gifts.Price' />
				</Header>
				<div className='main-div '>
					<Button
						toggle
						opositebutton='1'
						normalfont='1'
						textoverflow='1'
						circular
						active={this.isPriceButtonActive(GiftsPriceFilter.allPrices)}
						onClick={() => {
							this.removeQuery(FilterQueryOptions.priceFilter);
						}}>
						<FormattedMessage id='gifts.All' />
					</Button>
					<Button
						toggle
						opositebutton='1'
						normalfont='1'
						textoverflow='1'
						circular
						active={this.isPriceButtonActive(GiftsPriceFilter.upTo100)}
						onClick={() => {
							this.handlePriceFilterClick(GiftsPriceFilter.upTo100);
						}}>
						<FormattedMessage id='gifts.UpTo100' />
					</Button>
					<Button
						toggle
						opositebutton='1'
						normalfont='1'
						textoverflow='1'
						circular
						active={this.isPriceButtonActive(GiftsPriceFilter.from100To200)}
						onClick={() => {
							this.handlePriceFilterClick(GiftsPriceFilter.from100To200);
						}}>
						<FormattedMessage id='gifts.From100To200' />
					</Button>
					<Button
						toggle
						opositebutton='1'
						normalfont='1'
						textoverflow='1'
						circular
						active={this.isPriceButtonActive(GiftsPriceFilter.from200To300)}
						onClick={() => {
							this.handlePriceFilterClick(GiftsPriceFilter.from200To300);
						}}>
						<FormattedMessage id='gifts.From200To300' />
					</Button>
					<Button
						toggle
						opositebutton='1'
						normalfont='1'
						textoverflow='1'
						circular
						active={this.isPriceButtonActive(GiftsPriceFilter.from300To400)}
						onClick={() => {
							this.handlePriceFilterClick(GiftsPriceFilter.from300To400);
						}}>
						<FormattedMessage id='gifts.From300To400' />
					</Button>
					<Button
						toggle
						opositebutton='1'
						normalfont='1'
						textoverflow='1'
						circular
						active={this.isPriceButtonActive(GiftsPriceFilter.from400To500)}
						onClick={() => {
							this.handlePriceFilterClick(GiftsPriceFilter.from400To500);
						}}>
						<FormattedMessage id='gifts.From400To500' />
					</Button>
					<Button
						toggle
						opositebutton='1'
						normalfont='1'
						textoverflow='1'
						circular
						active={this.isPriceButtonActive(GiftsPriceFilter.from500AnUp)}
						onClick={() => {
							this.handlePriceFilterClick(GiftsPriceFilter.from500AnUp);
						}}>
						<FormattedMessage id='gifts.From500AndUp' />
					</Button>
				</div>
				{/* AREA */}
				{/* <Header className={'segment-header'}>
					<FormattedMessage id='gifts.AreaInCountry' />
				</Header>
				<div className='main-div '>
					<Button
						toggle
						opositebutton='1'
						normalfont='1'
						textoverflow='1'
						circular
						active={this.isAreaButtonActive(0)}
						onClick={() => {
							this.removeQuery(FilterQueryOptions.areaFilter);
						}}>
						<FormattedMessage id='gifts.AllAreas' />
					</Button>
					{this.props.areaFiltersArray.map((areaFilter) => {
						return (
							<Button
								key={areaFilter.value}
								toggle
								opositebutton='1'
								normalfont='1'
								textoverflow='1'
								circular
								active={this.isAreaButtonActive(areaFilter.value)}
								onClick={() => {
									this.handleAreaFilterClick(areaFilter.value);
								}}>
								{areaFilter.text}
							</Button>
						);
					})}
				</div> */}
				{/* KOSHER */}
				<Header className={'segment-header'}>
					<FormattedMessage id='gifts.Kashrut' />
				</Header>
				<div className='main-div '>
					<Button
						toggle
						opositebutton='1'
						normalfont='1'
						textoverflow='1'
						circular
						active={this.isKosherButtonActive(GiftsKosherFilter.all)}
						onClick={() => {
							this.removeQuery(FilterQueryOptions.kosherFilter);
						}}>
						<FormattedMessage id='gifts.All' />
					</Button>
					<Button
						toggle
						opositebutton='1'
						normalfont='1'
						textoverflow='1'
						circular
						active={this.isKosherButtonActive(GiftsKosherFilter.kosher)}
						onClick={() => {
							this.handleKosherFilterClick(GiftsKosherFilter.kosher);
						}}>
						<FormattedMessage id='gifts.Kosher' />
					</Button>
					<Button
						toggle
						opositebutton='1'
						normalfont='1'
						textoverflow='1'
						circular
						active={this.isKosherButtonActive(GiftsKosherFilter.lmehadrin)}
						onClick={() => {
							this.handleKosherFilterClick(GiftsKosherFilter.lmehadrin);
						}}>
						<FormattedMessage id='gifts.Lmehadrin' />
					</Button>
				</div>
				{/* TAGS */}
				<Header className={'segment-header'}>
					<FormattedMessage id='gifts.Tags' />
				</Header>
				<div className='main-div '>
					<Button
						toggle
						opositebutton='1'
						normalfont='1'
						textoverflow='1'
						circular
						active={this.isTagsButtonActive(0)}
						onClick={() => {
							this.removeQuery(FilterQueryOptions.tagFilter);
						}}>
						<FormattedMessage id='gifts.AllTags' />
					</Button>
					{this.props.tagsFiltersArray.map((tagFilter) => {
						return (
							<Button
								key={tagFilter.value}
								toggle
								opositebutton='1'
								normalfont='1'
								textoverflow='1'
								circular
								active={this.isTagsButtonActive(tagFilter.value)}
								onClick={() => {
									this.handleTagFilterClick(tagFilter.value);
								}}>
								{tagFilter.text}
							</Button>
						);
					})}
				</div>
			</Segment>
		);
	}

	// removes a query param - which means that an 'all' option has been selected because there is no filter for that option
	private removeQuery(queryKey: FilterQueryOptions) {
		this.uiStore.blockUiSite();
		removeQueryParamAndPush(this.props.router, queryKey, desktopFilterScrollOption);
	}

	// adds a price filter to the query
	private handlePriceFilterClick(queryValue: GiftsPriceFilter) {
		if (!this.isPriceButtonActive(queryValue)) {
			this.uiStore.blockUiSite();
			updateQueryParam(
				this.props.router,
				FilterQueryOptions.priceFilter,
				queryValue,
				false,
				FilterQueryOptions.pageFilter,
				desktopFilterScrollOption
			);
		}
	}

	// adds a area filter to the query
	private handleAreaFilterClick(queryValue: number | string) {
		if (!this.isAreaButtonActive(queryValue)) {
			this.uiStore.blockUiSite();
			updateQueryParam(
				this.props.router,
				FilterQueryOptions.areaFilter,
				queryValue,
				true,
				FilterQueryOptions.pageFilter,
				desktopFilterScrollOption
			);
		} else {
			if (this.props[FilterGiftsProps.filters].areaFilter.length > 1) {
				this.uiStore.blockUiSite();
				const filterdArray = this.props[FilterGiftsProps.filters].areaFilter.split(',').filter((value) => {
					return value.toString() !== queryValue.toString();
				});
				setQueryParam(
					this.props.router,
					filterdArray.join(','),
					FilterQueryOptions.areaFilter,
					desktopFilterScrollOption
				);
			}
		}
	}

	// adds a kosher filter to the query
	private handleKosherFilterClick(queryValue: GiftsKosherFilter) {
		if (!this.isKosherButtonActive(queryValue)) {
			this.uiStore.blockUiSite();
			updateQueryParam(
				this.props.router,
				FilterQueryOptions.kosherFilter,
				queryValue,
				true,
				FilterQueryOptions.pageFilter,
				desktopFilterScrollOption
			);
		} else {
			if (this.props[FilterGiftsProps.filters].kosherFilter.toString().length > 1) {
				this.uiStore.blockUiSite();
				const filterdArray = this.props[FilterGiftsProps.filters].kosherFilter
					.toString()
					.split(',')
					.filter((value) => {
						return value.toString() !== queryValue.toString();
					});
				setQueryParam(
					this.props.router,
					filterdArray.join(','),
					FilterQueryOptions.kosherFilter,
					desktopFilterScrollOption
				);
			}
		}
	}

	// adds a tag filter to the query
	private handleTagFilterClick(queryValue: number | string) {
		if (!this.isTagsButtonActive(queryValue)) {
			this.uiStore.blockUiSite();
			updateQueryParam(
				this.props.router,
				FilterQueryOptions.tagFilter,
				queryValue,
				true,
				FilterQueryOptions.pageFilter,
				desktopFilterScrollOption
			);
		} else {
			if (this.props[FilterGiftsProps.filters].tagsFilter.length > 1) {
				this.uiStore.blockUiSite();
				const filterdArray = this.props[FilterGiftsProps.filters].tagsFilter.split(',').filter((value) => {
					return value.toString() !== queryValue.toString();
				});
				setQueryParam(
					this.props.router,
					filterdArray.join(','),
					FilterQueryOptions.tagFilter,
					desktopFilterScrollOption
				);
			}
		}
	}

	// checks to see which price button should be activated by the query params in the url
	private isPriceButtonActive(queryValue: GiftsPriceFilter) {
		return this.props[FilterGiftsProps.filters].priceFilter.toString() === queryValue.toString();
	}

	// checks to see which area buttons should be activated by the query params in the url
	private isAreaButtonActive(queryValue: number | string) {
		return this.props[FilterGiftsProps.filters].areaFilter.split(',').includes(queryValue.toString()); // .includes because it has several filters
	}

	// checks to see which kosher buttons should be activated by the query params in the url
	private isKosherButtonActive(queryValue: GiftsKosherFilter) {
		return this.props[FilterGiftsProps.filters].kosherFilter.toString().includes(queryValue.toString()); // .includes because it has several filters
	}

	// checks to see which tags buttons should be activated by the query params in the url
	private isTagsButtonActive(queryValue: number | string) {
		return this.props[FilterGiftsProps.filters].tagsFilter.split(',').includes(queryValue.toString()); // .includes because it has several filters
	}
}

export default withRouter(DesktopFiltersComponent);
