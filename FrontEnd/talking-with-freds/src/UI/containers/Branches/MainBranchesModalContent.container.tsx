import {BENEFIT_STORE, CONFIGURATION_STORE, MODAL_STORE, SEARCH_STORE, UI_STORE} from 'BL/stores';
import BenefitStore from 'BL/stores/Benefit.store';
import ConfigurationStore from 'BL/stores/Configuration.store';
import ModalStore from 'BL/stores/Modal.store';
import SearchStore from 'BL/stores/Search.store';
import UiStore from 'BL/stores/Ui.store';
import {GiftsKosherFilter} from 'common/generalconsts/giftFilters.enums';
import BenefitPageModel from 'common/models/BenefitPage.model';
import GiftsConverter from 'common/models/converters/Gifts.convertor';
import {BusinessesInfoDTO} from 'common/models/DTOs/BusinessesInfo.dto';
import CategoryDTO from 'common/models/DTOs/Category.dto';
import OptionsDTO from 'common/models/DTOs/Options.dto';
import LocationUtils from 'common/utils/location/location.util';
import _ from 'lodash';
import {inject, observer} from 'mobx-react';
import {Component, createRef, RefObject, SyntheticEvent} from 'react';
import {FormattedMessage, InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import {
	Button,
	Dropdown,
	DropdownProps,
	Grid,
	Header,
	Icon,
	Image,
	Menu,
	Pagination,
	Segment,
	Sticky,
} from 'semantic-ui-react';
import BranchCard from 'UI/components/Branches/BranchCard.component';
import MobileAreaFiltersModalComponent from 'UI/components/Branches/MobileAreaFIltersModal.component';
import MobilebenefitGroupsIdFilterModalComponent from 'UI/components/Branches/MobileBussinesesFilterModal.component';
import MobileKosherFiltersModalComponent from 'UI/components/Branches/MobileKoshersFilterModal.component';
import MobileShowResultsComponent from 'UI/components/GiftsCategories/MobileShowResults.component';
import BenefitPrintComponent from '../BenefitPage/BenefitPrint.component';

interface IProps {
	intl?: InjectedIntl;
	isMobile: boolean;
	[SEARCH_STORE]?: SearchStore;
	[BENEFIT_STORE]?: BenefitStore;
	[MODAL_STORE]?: ModalStore;
	[CONFIGURATION_STORE]?: ConfigurationStore;
	[UI_STORE]?: UiStore;
	categoryId: number;
	category: CategoryDTO | BenefitPageModel;
	businessId?: number;
	userPosition?: Position;
	noPrint?: boolean;
	brandsAndStores?: BusinessesInfoDTO[];
	mobileDetect: MobileDetect;
}
interface IState {
	activePage: number;
	dropdownOpen: boolean;
}

@inject(SEARCH_STORE, BENEFIT_STORE, MODAL_STORE, UI_STORE, CONFIGURATION_STORE)
@observer
class MainBranchesModalContentContainer extends Component<IProps, IState> {
	public contextRef = createRef();
	private searchStore: SearchStore;
	private benefitStore: BenefitStore;
	private modalStore: ModalStore;
	private uiStore: UiStore;
	private configurationStore: ConfigurationStore;
	private intl: InjectedIntl;
	private numOfCardsToShow = 7;
	private selectOptions: OptionsDTO[];
	constructor(props: Readonly<IProps>) {
		super(props);
		this.searchStore = this.props[SEARCH_STORE] as SearchStore;
		this.benefitStore = this.props[BENEFIT_STORE] as BenefitStore;
		this.modalStore = this.props[MODAL_STORE] as ModalStore;
		this.uiStore = this.props[UI_STORE] as UiStore;
		this.configurationStore = this.props[CONFIGURATION_STORE] as ConfigurationStore;
		this.intl = this.props.intl as InjectedIntl;
		this.selectOptions =
			!this.props.businessId && this.props.brandsAndStores && this.props.brandsAndStores.length > 1
				? [
						new OptionsDTO(0, this.intl.formatMessage({id: 'gifts.All'})),
						...this.props.brandsAndStores.map((biDto) => {
							return GiftsConverter.BusinessInfoDtoToOptionDto(biDto);
						}),
				  ]
				: [new OptionsDTO(0, this.intl.formatMessage({id: 'gifts.All'}))];
		this.state = {
			activePage: 1,
			dropdownOpen: false,
		};
	}

	public async componentDidMount() {
		if (this.benefitStore.getIsFirstTimeInBranchesModal || this.checkIfNeedToFetchBranches()) {
			this.benefitStore.setIsFirstTimeInBranchesModal(false);
			this.uiStore.blockUiSite();
			await this.searchStore.fetchAreaFilterArray();
			await this.fetchBranches(
				this.benefitStore.getActiveAreaFilterArray,
				this.benefitStore.getActiveKosherFilterArray,
				this.benefitStore.getActivebenefitGroupIdFilter.value
			);
			this.benefitStore.setOldActiveAreaFilterArray([...this.benefitStore.getActiveAreaFilterArray]);
			this.benefitStore.setOldActiveKosherFilterArray([...this.benefitStore.getActiveKosherFilterArray]);
			this.uiStore.unblockUiSite();
		}
	}

	public render() {
		return this.props.isMobile ? this.renderMobile() : this.renderDesktop();
	}

	// this method is to improve the performance by checking if the filters have changed
	// and if they did change, then it fetches the new branches
	private checkIfNeedToFetchBranches() {
		return (
			(this.benefitStore.getActiveAreaFilterArray.length !== this.benefitStore.getOldActiveAreaFilterArray.length ||
				this.benefitStore.getActiveKosherFilterArray.length !==
					this.benefitStore.getOldActiveKosherFilterArray.length) &&
			(_.difference(
				this.benefitStore.getActiveAreaFilterArray.slice().sort(),
				this.benefitStore.getOldActiveAreaFilterArray.slice().sort()
			).length > 0 ||
				_.difference(
					this.benefitStore.getActiveKosherFilterArray.slice().sort(),
					this.benefitStore.getOldActiveKosherFilterArray.slice().sort()
				).length > 0)
		);
	}

	private renderDesktop() {
		return (
			<Grid columns={2} justifycenter='1' paddingtop3rem='1' className='main-branches-modal-content'>
				<Grid.Column width='4'>
					<div>
						<Header size='large'>
							<FormattedMessage id='gifts.Filters' />
						</Header>
						{/* Benefit Groups */}
						{!this.props.businessId && (
							<>
								<Header className='segment-header' fontsize2p2rem='1'>
									<FormattedMessage id='branches.BenefitGroupsSort' />
								</Header>
								<Dropdown
									value={this.benefitStore.getActivebenefitGroupIdFilter.value}
									text={this.benefitStore.getActivebenefitGroupIdFilter.text}
									onChange={this.desktopSelectChangeOption}
									onOpen={this.changeIcon}
									onClose={this.changeIcon}
									icon={<Icon name={this.state.dropdownOpen ? 'chevron up' : 'chevron down'} leftfixed='1' />}
									options={this.selectOptions}
									categoriessort='1'
									paddingtopandbottom5px='1'
								/>
							</>
						)}
						{/* AREA */}
						<Header className='segment-header' fontsize2p2rem='1'>
							<FormattedMessage id='gifts.AreaInCountry' />
						</Header>
						<Segment placeholder className='main-segment'>
							<Button
								toggle
								opositebutton='1'
								normalfont='1'
								circular
								active={this.isAreaFilterActive(0)}
								onClick={() => {
									this.removeAreaFilter();
								}}>
								<FormattedMessage id='gifts.AllAreas' />
							</Button>
							{this.searchStore.getAreaFilterArray &&
								this.searchStore.getAreaFilterArray.map((areaFilter) => {
									return (
										<Button
											key={areaFilter.value}
											toggle
											opositebutton='1'
											normalfont='1'
											circular
											active={this.isAreaFilterActive(areaFilter.value)}
											onClick={() => {
												this.handleAreaFilterChange(areaFilter.value);
											}}>
											{areaFilter.text}
										</Button>
									);
								})}
						</Segment>
						{/* KOSHER */}
						<Header className='segment-header' fontsize2p2rem='1'>
							<FormattedMessage id='gifts.Kashrut' />
						</Header>
						<Segment placeholder className='main-segment'>
							<Button
								toggle
								opositebutton='1'
								normalfont='1'
								circular
								active={this.isKosherFilterActive(parseInt(GiftsKosherFilter.all.toString(), 10))}
								onClick={() => {
									this.removeKosherFilter();
								}}>
								<FormattedMessage id='gifts.All' />
							</Button>
							<Button
								toggle
								opositebutton='1'
								normalfont='1'
								circular
								active={this.isKosherFilterActive(parseInt(GiftsKosherFilter.kosher.toString(), 10))}
								onClick={() => {
									this.handleKosherFilterChange(parseInt(GiftsKosherFilter.kosher.toString(), 10));
								}}>
								<FormattedMessage id='gifts.Kosher' />
							</Button>
							<Button
								toggle
								opositebutton='1'
								normalfont='1'
								circular
								active={this.isKosherFilterActive(parseInt(GiftsKosherFilter.lmehadrin.toString(), 10))}
								onClick={() => {
									this.handleKosherFilterChange(parseInt(GiftsKosherFilter.lmehadrin.toString(), 10));
								}}>
								<FormattedMessage id='gifts.Lmehadrin' />
							</Button>
						</Segment>
					</div>
				</Grid.Column>
				<Grid.Column width='1'>
					<div className='divider' />
				</Grid.Column>
				<Grid.Column width='11'>
					<div>
						<div className='inner-div'>
							<Header size='large'>
								<FormattedMessage
									id='branches.BranchesFound'
									values={{results: this.benefitStore.getBranchesArray.length}}
								/>
							</Header>
							{this.props.noPrint ? (
								<div />
							) : (
								<div className='print-container' onClick={this.onPrintClick}>
									<Icon name='print' primaryicon='1' leftmargin='1' autosize='1' />
									<Button className='print-button' linkbutton='1' whitebackground='1'>
										<FormattedMessage id='branches.PrintList' />
									</Button>
								</div>
							)}
						</div>
						{this.mapDesktopBranches()}
						{this.benefitStore.getBranchesArray.length > 0 && (
							<Segment placeholder nopadding='1' maxwidth100percent='1'>
								<Pagination
									className='inner-pagination'
									activePage={this.state.activePage}
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
				</Grid.Column>
			</Grid>
		);
	}

	private renderMobile() {
		return (
			<div className='mobile-branches-filter-menu'>
				<div ref={this.contextRef as RefObject<HTMLDivElement>}>
					<Sticky context={this.contextRef}>
						<Menu fluid widths={this.props.businessId ? 2 : 3} borderless noborderradius='1'>
							{!this.props.businessId && (
								<>
									<Menu.Item
										cursorpointer='1'
										onClick={() => {
											this.modalStore.openModal(
												<div>
													<MobilebenefitGroupsIdFilterModalComponent
														handleBussinesesChange={this.changeOption}
														benefitGroupsIdFilter={this.selectOptions}
													/>
													<MobileShowResultsComponent
														handleFilterSearch={this.handleMobileFilterSearch}
														handleCleanQuery={this.handleMobileClearFilters}
													/>
												</div>,
												{
													title: this.intl.formatMessage({id: 'branches.BenefitGroupsSort'}),
													isNoMarginFromTop: true,
													isNoPaddingFromTop: true,
												}
											);
										}}>
										<FormattedMessage id='branches.BenefitGroups' />
										{this.isAreaMobileFilterActive() && <Icon name='check' color='orange' />}
									</Menu.Item>
									<div className='menu-divider' />
								</>
							)}
							<Menu.Item
								cursorpointer='1'
								onClick={() => {
									this.modalStore.openModal(
										<div>
											<MobileAreaFiltersModalComponent
												handleAreaChange={this.handleAreaFilterChange}
												removeAreaFilter={this.removeAreaFilter}
												areaFilters={this.searchStore.getAreaFilterArray}
											/>
											<MobileShowResultsComponent
												handleFilterSearch={this.handleMobileFilterSearch}
												handleCleanQuery={this.handleMobileClearFilters}
											/>
										</div>,
										{
											title: this.intl.formatMessage({id: 'gifts.FilterByArea'}),
											isNoMarginFromTop: true,
											isNoPaddingFromTop: true,
										}
									);
								}}>
								<FormattedMessage id='gifts.AreaInCountry' />
								{this.isAreaMobileFilterActive() && <Icon name='check' color='orange' />}
							</Menu.Item>
							<div className='menu-divider' />
							<Menu.Item
								cursorpointer='1'
								onClick={() =>
									this.modalStore.openModal(
										<div>
											<MobileKosherFiltersModalComponent
												handleKosherChange={this.handleKosherFilterChange}
												removeKosherFilter={this.removeKosherFilter}
											/>
											<MobileShowResultsComponent
												handleFilterSearch={this.handleMobileFilterSearch}
												handleCleanQuery={this.handleMobileClearFilters}
											/>
										</div>,
										{
											title: this.intl.formatMessage({id: 'gifts.FilterByKosher'}),
											isNoMarginFromTop: true,
											isNoPaddingFromTop: true,
										}
									)
								}>
								<FormattedMessage id='gifts.Kashrut' />
								{this.isKosherMobileFilterActive() && <Icon name='check' color='orange' />}
							</Menu.Item>
						</Menu>
					</Sticky>
				</div>
				{this.mapMobileBranches()}
				{this.benefitStore.getBranchesArray.length > 0 && (
					<Segment placeholder nopadding='1' className='pagination-segment'>
						<Pagination
							className='inner-pagination'
							activePage={this.state.activePage}
							firstItem={null}
							lastItem={null}
							secondary
							siblingRange={1}
							boundaryRange={0}
							ellipsisItem={null}
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

	private fetchBranches = async (areaFilters?: number[], kosherFilters?: number[], benefitGroupIdFilter?: number) => {
		await this.benefitStore.fetchBranches(
			this.props.categoryId,
			this.props.businessId,
			kosherFilters,
			areaFilters,
			benefitGroupIdFilter,
			this.props.isMobile ? this.props.userPosition : undefined
		);
		this.setState({activePage: 1});
		this.benefitStore.setIsBranchesResultLoaded(true);
	};

	private handleChangePage = (_e: any, data: any) => {
		const newPage: number = data.activePage;
		this.setState({activePage: newPage});
	};

	private mapDesktopBranches = () => {
		if (this.benefitStore.getBranchesArray.length > 0) {
			const startIndex = (this.state.activePage - 1) * this.numOfCardsToShow;
			const currentPageBranches = this.benefitStore.getBranchesArray.slice(
				startIndex,
				startIndex + this.numOfCardsToShow
			);
			return currentPageBranches.map((branchModel, index) => {
				return (
					<BranchCard
						key={`${branchModel.businessId}_${branchModel.branchId}_${index}`}
						branchModel={branchModel}
						category={this.props.category}
						isMobile={this.props.isMobile}
						businessId={branchModel.businessId}
						categoryId={this.props.categoryId}
						mobileDetect={this.props.mobileDetect}
					/>
				);
			});
		} else {
			if (this.benefitStore.getIsBranchesResultLoaded) {
				return (
					<Header marginauto='1' size='huge' color='grey'>
						{this.intl.formatMessage({id: 'branches.couldNotFound'})}
					</Header>
				);
			}
		}
	};

	private mapMobileBranches = () => {
		if (this.benefitStore.getBranchesArray.length > 0) {
			const startIndex = (this.state.activePage - 1) * this.numOfCardsToShow;
			let currentPageBranches = this.benefitStore.getBranchesArray.slice(
				startIndex,
				startIndex + this.numOfCardsToShow
			);
			return currentPageBranches.map((branchModel, index) => {
				return (
					<BranchCard
						key={`${branchModel.businessId}_${branchModel.branchId}_${index}`}
						branchModel={branchModel}
						isMobile={this.props.isMobile}
						distance={
							this.props.isMobile && this.props.userPosition
								? LocationUtils.calculateDistance(
										this.props.userPosition.coords.latitude,
										this.props.userPosition.coords.longitude,
										parseFloat(branchModel.location.latitude),
										parseFloat(branchModel.location.longitude)
								  )
								: undefined
						}
						businessId={branchModel.businessId}
						categoryId={this.props.categoryId}
						category={this.props.category}
						latitude={parseFloat(branchModel.location.latitude)}
						longitude={parseFloat(branchModel.location.longitude)}
						mobileDetect={this.props.mobileDetect}
					/>
				);
			});
		} else {
			if (this.benefitStore.getIsBranchesResultLoaded) {
				return (
					<Header className='no-branches-mobile-modal-message' marginauto='1' size='huge' color='grey'>
						{this.intl.formatMessage({id: 'branches.couldNotFound'})}
					</Header>
				);
			}
		}
	};

	private calculateNumOfPages = () => {
		const flatAmountOfPages = this.benefitStore.getBranchesArray.length / this.numOfCardsToShow;
		const roundedAmountOfPages = _.round(flatAmountOfPages);
		if (roundedAmountOfPages === flatAmountOfPages) {
			return flatAmountOfPages;
		}
		return _.round(flatAmountOfPages + 0.5);
	};

	private handleMobileClearFilters = async () => {
		this.uiStore.blockUiSite();
		this.benefitStore.setActiveAreaFilterArray([0]);
		this.benefitStore.setActiveKosherFilterArray([parseInt(GiftsKosherFilter.all, 10)]);
		this.benefitStore.setOldActiveAreaFilterArray([0]);
		this.benefitStore.setOldActiveKosherFilterArray([parseInt(GiftsKosherFilter.all, 10)]);
		this.modalStore.popModal();
		await this.fetchBranches(
			[0],
			[parseInt(GiftsKosherFilter.all, 10)],
			this.benefitStore.getActivebenefitGroupIdFilter.value
		);
		this.uiStore.unblockUiSite();
	};

	private handleMobileFilterSearch = async () => {
		this.uiStore.blockUiSite();
		await this.benefitStore.setIsMobileActivateFilterClicked(true);
		this.benefitStore.setOldActiveAreaFilterArray([...this.benefitStore.getActiveAreaFilterArray]);
		this.benefitStore.setOldActiveKosherFilterArray([...this.benefitStore.getActiveKosherFilterArray]);
		this.modalStore.popModal();
		await this.fetchBranches(
			this.benefitStore.getActiveAreaFilterArray,
			this.benefitStore.getActiveKosherFilterArray,
			this.benefitStore.getActivebenefitGroupIdFilter.value
		);
		await this.benefitStore.setIsMobileActivateFilterClicked(false);
		this.uiStore.unblockUiSite();
	};

	private handleAreaFilterChange = async (newAreaValue: number) => {
		let areaArray: number[] = [...this.benefitStore.getActiveAreaFilterArray];

		// if the value doesnt already exists
		if (!this.benefitStore.getActiveAreaFilterArray.includes(newAreaValue)) {
			// filter for the first time the user clicked on a filter so it would remove the already exists default filter of all
			areaArray = [...this.benefitStore.getActiveAreaFilterArray.filter((areaValue) => areaValue !== 0)];
			areaArray.push(newAreaValue);
			this.benefitStore.setActiveAreaFilterArray(areaArray);
			// if its not mobile, then it fethces the new branches
			if (!this.props.isMobile) {
				this.uiStore.blockUiSite();
				await this.fetchBranches(
					areaArray,
					this.benefitStore.getActiveKosherFilterArray,
					this.benefitStore.getActivebenefitGroupIdFilter.value
				);
				this.uiStore.unblockUiSite();
			}
		} else {
			if (this.benefitStore.getActiveAreaFilterArray.length > 1) {
				areaArray = [...this.benefitStore.getActiveAreaFilterArray.filter((areaValue) => areaValue !== newAreaValue)];
				this.benefitStore.setActiveAreaFilterArray(areaArray);
				// if its not mobile, then it fethces the new branches
				if (!this.props.isMobile) {
					this.uiStore.blockUiSite();
					await this.fetchBranches(
						areaArray,
						this.benefitStore.getActiveKosherFilterArray,
						this.benefitStore.getActivebenefitGroupIdFilter.value
					);
					this.uiStore.unblockUiSite();
				}
			}
		}
	};

	private handleKosherFilterChange = async (newKosherValue: number) => {
		let kosherArray: number[] = [...this.benefitStore.getActiveKosherFilterArray];

		// if the value doesnt already exists
		if (!this.benefitStore.getActiveKosherFilterArray.includes(newKosherValue)) {
			kosherArray = [
				// filter for the first time the user clicked on a filter so it would remove the already exists default filter of all
				...this.benefitStore.getActiveKosherFilterArray.filter(
					(kosherValue) => kosherValue !== parseInt(GiftsKosherFilter.all, 10)
				),
			];
			kosherArray.push(newKosherValue);
			this.benefitStore.setActiveKosherFilterArray(kosherArray);
			// if its not mobile, then it fethces the new branches
			if (!this.props.isMobile) {
				this.uiStore.blockUiSite();
				await this.fetchBranches(
					this.benefitStore.getActiveAreaFilterArray,
					kosherArray,
					this.benefitStore.getActivebenefitGroupIdFilter.value
				);
				this.uiStore.unblockUiSite();
			}
		} else {
			if (this.benefitStore.getActiveKosherFilterArray.length > 1) {
				kosherArray = [
					...this.benefitStore.getActiveKosherFilterArray.filter((kosherValue) => kosherValue !== newKosherValue),
				];
				this.benefitStore.setActiveKosherFilterArray(kosherArray);
				// if its not mobile, then it fethces the new branches
				if (!this.props.isMobile) {
					this.uiStore.blockUiSite();
					await this.fetchBranches(
						this.benefitStore.getActiveAreaFilterArray,
						kosherArray,
						this.benefitStore.getActivebenefitGroupIdFilter.value
					);
					this.uiStore.unblockUiSite();
				}
			}
		}
	};

	private isAreaFilterActive = (value: number) => {
		return this.benefitStore.getActiveAreaFilterArray.includes(value);
	};

	private isKosherFilterActive = (value: number) => {
		return this.benefitStore.getActiveKosherFilterArray.includes(value);
	};

	private removeAreaFilter = async () => {
		!this.props.isMobile && this.uiStore.blockUiSite();
		this.benefitStore.setActiveAreaFilterArray([0]);
		if (!this.props.isMobile) {
			await this.fetchBranches(
				[0],
				this.benefitStore.getActiveKosherFilterArray,
				this.benefitStore.getActivebenefitGroupIdFilter.value
			);
			this.uiStore.unblockUiSite();
		}
	};

	private removeKosherFilter = async () => {
		!this.props.isMobile && this.uiStore.blockUiSite();
		this.benefitStore.setActiveKosherFilterArray([parseInt(GiftsKosherFilter.all, 10)]);
		if (!this.props.isMobile) {
			await this.fetchBranches(
				this.benefitStore.getActiveAreaFilterArray,
				[parseInt(GiftsKosherFilter.all, 10)],
				this.benefitStore.getActivebenefitGroupIdFilter.value
			);
			this.uiStore.unblockUiSite();
		}
	};

	private isAreaMobileFilterActive = () => {
		return !this.benefitStore.getActiveAreaFilterArray.includes(0);
	};

	private isKosherMobileFilterActive = () => {
		return !this.benefitStore.getActiveKosherFilterArray.includes(parseInt(GiftsKosherFilter.all, 10));
	};

	private onPrintClick = () => {
		const benefitPage = this.benefitStore.getBenefitPage;

		this.modalStore.openModal(
			<>
				<div className='print-modal'>
					<div>
						<BenefitPrintComponent
							benefitPageName={benefitPage.categoryName}
							benefitPageDescription={benefitPage.shortMarketingDescription}
							benefitImage={this.benefitStore.getBenefitPage.image.file}
							imagePath={this.configurationStore.configuration.imagesPath}
							category={benefitPage}
							benefitBrandsAndStores={benefitPage.businessesInfo}
							intl={this.props.intl}
						/>
					</div>
				</div>
			</>,
			{
				noTitle: true,
				fullScreen: true,
				closeFromOutsideModal: true,
				fitContent: true,
			}
		);
	};

	private desktopSelectChangeOption = async (_e: SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
		const value: any = typeof data.value === 'string' ? parseInt(data.value, 10) : data.value;
		let text: any = '';
		if (data.options) {
			data.options.forEach((element) => {
				if (element.value === value) {
					text = element.text;
				}
			});
		}
		this.changeOption(value, text);
		this.uiStore.blockUiSite();
		await this.fetchBranches(
			this.benefitStore.getActiveAreaFilterArray,
			this.benefitStore.getActiveKosherFilterArray,
			this.benefitStore.getActivebenefitGroupIdFilter.value
		);
		this.uiStore.unblockUiSite();
	};

	private changeOption = (value: any, text: any) => {
		this.benefitStore.setActivebenefitGroupIdFilter(new OptionsDTO(value, text));
		this.setState({dropdownOpen: false});
	};

	private changeIcon = () => {
		this.setState({dropdownOpen: !this.state.dropdownOpen});
	};
}

export default withIntl(MainBranchesModalContentContainer);
