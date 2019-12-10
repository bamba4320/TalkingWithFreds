import {MODAL_STORE, SEARCH_STORE, UI_STORE} from 'BL/stores';
import ModalStore from 'BL/stores/Modal.store';
import SearchStore from 'BL/stores/Search.store';
import UiStore from 'BL/stores/Ui.store';
import SearchResultDTO from 'common/models/DTOs/SearchResult.dto';
import {routesPaths} from 'common/routes/routesPaths.consts';
import {debounce} from 'lodash';
import {inject, observer} from 'mobx-react';
import Router, {SingletonRouter, withRouter} from 'next/router';
import {Component, SyntheticEvent} from 'react';
import {InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import {Divider, Header, Icon, Search, Segment} from 'semantic-ui-react';
import CustomIdLinkComponent from 'UI/components/custom/customLink/CustomIdLink.component';

interface IProps {
	[SEARCH_STORE]?: SearchStore;
	[MODAL_STORE]?: ModalStore;
	[UI_STORE]?: UiStore;
	isMobile?: boolean;
	intl?: InjectedIntl;
	router?: SingletonRouter;
	notAbsolut?: boolean;
}
interface IState {
	results: SearchResultDTO[];
	isShowErrorMessage: boolean;
}

@inject(SEARCH_STORE, MODAL_STORE, UI_STORE)
@observer
class SearchContainer extends Component<IProps, IState> {
	private defaultSearchText: string;
	private searchStore: SearchStore;
	private modalStore: ModalStore;
	private uiStore: UiStore;
	private intl: InjectedIntl;
	private isMouseClicked: boolean;
	constructor(props: IProps) {
		super(props);
		this.searchStore = this.props[SEARCH_STORE] as SearchStore;
		this.modalStore = this.props[MODAL_STORE] as ModalStore;
		this.uiStore = this.props[UI_STORE] as UiStore;
		this.intl = this.props.intl as InjectedIntl;
		this.defaultSearchText = this.intl.formatMessage({id: 'navbar.SearchForBrandsOrCards'});
		this.isMouseClicked = false;
		this.state = {
			results: [],
			isShowErrorMessage: false,
		};
	}

	public componentDidMount() {
		this.searchStore.setSearchText(this.defaultSearchText);
		if (this.props.isMobile && document.getElementById('search')) {
			this.searchStore.setSearchText('');
			document.getElementById('search')!.focus();
		}
	}

	public render() {
		return this.props.isMobile ? this.renderMobile() : this.renderDesktop();
	}

	private renderDesktop = () => {
		return (
			<Segment inverted desktopmenu='1' searchsegment='1' noabsolutsearch={this.props.notAbsolut ? '1' : null}>
				<Search
					id='search'
					minCharacters={2}
					noResultsMessage={this.noResultMessage() || ''}
					size='big'
					icon={<Icon name='search' searchicon='1' />}
					onSearchChange={(_e, data) => {
						this.searchStore.setSearchText(data.value!);
						this.debouncedSearch();
					}}
					onBlur={(_e, data) => {
						if (!data.value) {
							this.searchStore.setSearchText(this.defaultSearchText);
						}
					}}
					onFocus={(_e, data) => {
						if (data.value === this.defaultSearchText) {
							this.searchStore.setSearchText('');
						}
					}}
					value={this.searchStore.getSearchText}
					results={this.state.results}
					resultRenderer={this.desktopResultRenderer}
					onResultSelect={this.handleResultSelect}
				/>
				{this.searchStore.getSearchText && this.searchStore.getSearchText !== this.defaultSearchText && (
					<Icon
						onClick={this.onDeleteClick}
						noabsoluticon={this.props.notAbsolut ? '1' : null}
						name='x'
						searchdeleteicon='1'
						autosize='1'
					/>
				)}
			</Segment>
		);
	};

	private renderMobile = () => {
		return (
			<>
				<Segment placeholder nomargin='1' mobilesearchpaddingbottom='1' className='mobile-search-container'>
					<div className='search-wrapper-div'>
						<Search
							id='search'
							className='seacrh-container'
							minCharacters={2}
							noResultsMessage={this.noResultMessage()}
							size='big'
							open={false}
							icon={<Icon name='search' className='search-icon' />}
							onSearchChange={(_event: SyntheticEvent, data) => {
								this.searchStore.setSearchText(data.value!);
								this.debouncedSearch();
							}}
							onBlur={(_event: SyntheticEvent, data) => {
								if (!data.value) {
									this.searchStore.setSearchText(this.defaultSearchText);
								}
							}}
							onFocus={(_event: SyntheticEvent, data) => {
								if (data.value === this.defaultSearchText) {
									this.searchStore.setSearchText('');
								}
							}}
							value={this.searchStore.getSearchText}
							results={this.state.results}
						/>
						{this.searchStore.getSearchText !== '' && this.searchStore.getSearchText !== this.defaultSearchText && (
							<Icon
								onClick={() => {
									this.onDeleteClick();
									this.setState({results: []});
								}}
								name='x'
								cursorpointer='1'
								className='x-icon'
								disabled={
									this.searchStore.getSearchText === '' || this.searchStore.getSearchText === this.defaultSearchText
								}
							/>
						)}
					</div>
				</Segment>
				{this.mobileResultsRender()}
			</>
		);
	};

	handleResultSelect = (_e: any, {result}: {result: SearchResultDTO}) => {
		this.searchStore.setSearchText('');
		if (!this.isMouseClicked) {
			Router.push(
				{pathname: routesPaths.giftPage.root, query: {id: result.categoryNumber}},
				`${routesPaths.giftPage.root}/${result.categoryNumber}`
			).then(() => window && window.scrollTo(0, 0));
		} else {
			this.isMouseClicked = false;
		}
	};

	private desktopResultRenderer = (props: any) => {
		return (
			<div className='results-main-div'>
				{props.firstHeader && (
					<Header boldheader='1' textfontheader='1' smallheader1p3='1' marginbottom25px='1'>
						{props.firstHeader}
					</Header>
				)}
				<CustomIdLinkComponent
					pathname={routesPaths.giftPage.root}
					id={props.categoryNumber}
					onClick={() => {
						this.searchStore.setSearchText('');
						this.isMouseClicked = true;
					}}>
					<div className='search-result-link'>
						<Header className='header-text-ellipsis' textfontheader='1' nomargin='1' smallheader1p2='1' blackheader='1'>
							{props.displayName}
						</Header>
						<Header zeromargintop='1'>
							<Header.Subheader className='header-text-ellipsis'>{props.shortMarketingDescription}</Header.Subheader>
						</Header>
						{this.props.isMobile && <Divider />}
					</div>
				</CustomIdLinkComponent>
			</div>
		);
	};

	private mobileResultRenderer = (props: any) => {
		return (
			<div className='results-main-div'>
				{props.firstHeader && (
					<Header boldheader='1' textfontheader='1' smallheader1p3='1' marginbottom25px='1'>
						{props.firstHeader}
					</Header>
				)}
				<div
					className='search-result-link'
					// tslint:disable-next-line:jsx-no-lambda
					onClick={() => {
						this.uiStore.blockUiSite();
						this.modalStore.closeModal(true);
						this.props.router!.push(
							{pathname: routesPaths.giftPage.root, query: {id: props.categoryNumber}},
							`${routesPaths.giftPage.root}/${props.categoryNumber}`
						);
					}}>
					<Header className='header-text-ellipsis' textfontheader='1' nomargin='1' smallheader1p2='1' blackheader='1'>
						{props.displayName}
					</Header>
					<Header zeromargintop='1'>
						<Header.Subheader className='header-text-ellipsis'>{props.shortMarketingDescription}</Header.Subheader>
					</Header>
					{this.props.isMobile && <Divider />}
				</div>
			</div>
		);
	};

	private mobileResultsRender = () => {
		if (this.searchStore.getSearchText.length > 1) {
			return this.state.results.length === 0 && this.searchStore.getSearchText !== this.defaultSearchText ? (
				<div className='mobile-result-container'>
					<Header
						className='mobile-no-results-header-in-modal'
						size='small'
						boldheader='1'
						textfontheader='1'
						marginbottom60px='1'>
						{this.noResultMessage()}
					</Header>
				</div>
			) : (
				<div>{this.state.results.map((result) => this.mobileResultRenderer({...result}))}</div>
			);
		} else {
			return <div />;
		}
	};

	private debouncedSearch = debounce(() => {
		if (this.searchStore.getSearchText.length > 1) {
			this.searchStore.getSearchResults().then((results: SearchResultDTO[]) => {
				this.setState({results: results, isShowErrorMessage: true});
			});
		} else {
			this.setState({results: [], isShowErrorMessage: false});
		}
	}, 350);

	private noResultMessage = () => {
		return this.state.isShowErrorMessage
			? `${this.intl.formatMessage({id: 'navbar.NoResultsInSearch'})} "${this.searchStore.getSearchText}"`
			: this.intl.formatMessage({id: 'general.LoadingResults'});
	};

	private onDeleteClick = () => {
		this.searchStore.setSearchText('');
		if (document.getElementById('search')) {
			document.getElementById('search')!.focus();
		}
	};
}

export default withRouter(withIntl(SearchContainer));
