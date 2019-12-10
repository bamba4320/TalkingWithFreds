import {BenefitPageTypes} from 'common/generalconsts/benefitPageTypes.enum';
import {GiftsKosherFilter} from 'common/generalconsts/giftFilters.enums';
import BenefitPageModel from 'common/models/BenefitPage.model';
import BranchModel from 'common/models/Branch.model';
import CategoryConverter from 'common/models/converters/Category.convertor';
import GiftsConverter from 'common/models/converters/Gifts.convertor';
import BranchDTO from 'common/models/DTOs/Branch.dto';
import BranchMoreDetailsDTO from 'common/models/DTOs/BranchMoreDetails.dto';
import OptionsDTO from 'common/models/DTOs/Options.dto';
import LocationUtils from 'common/utils/location/location.util';
import CategoriesFetcher from 'Infrastructure/fetchers/Categories.fetcher';
import {action, computed, IObservableArray, observable} from 'mobx';
import {NextContext} from 'next';

export default class BenefitStore {
	@observable
	private benefitPage: BenefitPageModel = new BenefitPageModel();

	@observable
	private branchesArray: IObservableArray<BranchModel> = observable([]);

	@observable
	private activeAreaFilterArray: IObservableArray<number> = observable([0]);

	@observable
	private activeBenefitGroupIdFilter: OptionsDTO = new OptionsDTO(0, 'הכל');

	@observable
	private activeKosherFilterArray: IObservableArray<number> = observable([parseInt(GiftsKosherFilter.all, 10)]);

	@observable
	private oldActiveAreaFilterArray: IObservableArray<number> = observable([]);

	@observable
	private oldActiveKosherFilterArray: IObservableArray<number> = observable([]);

	@observable
	private isMobileActivateFilterClicked: boolean = false;

	@observable
	private isFirstTimeInBranchesModal: boolean = true;

	@observable
	private isBranchesResultLoaded: boolean = false;

	constructor(benefitInitData?: BenefitStore) {
		if (benefitInitData) {
			this.benefitPage = benefitInitData.benefitPage;
		}
	}

	@computed
	public get getBenefitPage() {
		return this.benefitPage;
	}

	@computed
	public get getBranchesArray() {
		return this.branchesArray;
	}

	@computed
	public get getActiveAreaFilterArray() {
		return this.activeAreaFilterArray;
	}

	@computed
	public get getActiveKosherFilterArray() {
		return this.activeKosherFilterArray;
	}

	@computed
	public get getOldActiveAreaFilterArray() {
		return this.oldActiveAreaFilterArray;
	}

	@computed
	public get getOldActiveKosherFilterArray() {
		return this.oldActiveKosherFilterArray;
	}

	@computed
	public get getIsMobileActivateFilterClicked() {
		// this will be true when the user presses the 'find results' button in the
		// branches modal so that the modal wont revert the changes the user made
		// (look at MobileAreaFilterModal/MobileKosherFilterModal at componentWillUnMount to see the check of the modal)
		return this.isMobileActivateFilterClicked;
	}

	@action
	public async setIsMobileActivateFilterClicked(value: boolean) {
		this.isMobileActivateFilterClicked = value;
	}

	@computed
	public get getIsFirstTimeInBranchesModal() {
		return this.isFirstTimeInBranchesModal;
	}

	@computed
	public get getIsBranchesResultLoaded() {
		return this.isBranchesResultLoaded;
	}

	@computed
	public get getActivebenefitGroupIdFilter() {
		return this.activeBenefitGroupIdFilter;
	}

	@computed
	public get getIsBenefitPageHidden() {
		return this.benefitPage.categoryShowType === BenefitPageTypes.hiddenPage;
	}

	@computed
	public get getIsBenefitPageInformative() {
		return this.benefitPage.categoryShowType === BenefitPageTypes.informativePage;
	}

	@action
	public async setActivebenefitGroupIdFilter(value: OptionsDTO) {
		this.activeBenefitGroupIdFilter = value;
	}
	@action
	public setIsFirstTimeInBranchesModal(value: boolean) {
		this.isFirstTimeInBranchesModal = value;
	}

	@action
	public async setIsBranchesResultLoaded(value: boolean) {
		this.isBranchesResultLoaded = value;
	}

	@action
	public async fetchBenefitPage(categoryId: any, isLoggedIn: boolean, ctx?: NextContext) {
		try {
			const categoriesProduct = await CategoriesFetcher.GetCategoryPage(categoryId, isLoggedIn, ctx);
			this.benefitPage = CategoryConverter.DtoToBenefitModel(categoriesProduct);
		} catch (e) {
			throw e;
		}
	}

	@action
	public async fetchBenefitPageBranches(categoryId: any) {
		try {
			const branches = await CategoriesFetcher.GetCategoryPageBranches(categoryId);
			this.benefitPage = CategoryConverter.businessesInfoDtoToBenefitModel(this.benefitPage, branches);
		} catch (e) {
			throw e;
		}
	}

	@action
	public async fetchBranches(
		categoryId?: number,
		businessId?: number,
		kosherFilters?: number[],
		region?: number[],
		benefitGroupIdFilter?: number,
		userPosition?: Position
	) {
		try {
			const branchDtoArray = await CategoriesFetcher.getBranchesByFilters(
				categoryId,
				businessId,
				kosherFilters,
				region,
				benefitGroupIdFilter
			);
			let branchModelArray: BranchModel[] = [];
			if (branchDtoArray.branches && branchDtoArray.branches.length > 0) {
				branchModelArray = await branchDtoArray.branches.map((dto: BranchDTO) => {
					return GiftsConverter.branchDtoToModel(dto);
				});
			}
			if (userPosition) {
				branchModelArray = branchModelArray.sort((a, b) => {
					// these conditions put the null values at the end
					if (!a.location.latitude || !a.location.longitude) {
						return 1;
					}
					if (!b.location.latitude || !b.location.longitude) {
						return -1;
					}

					const distanceA = LocationUtils.calculateDistance(
						userPosition!.coords.latitude,
						userPosition!.coords.longitude,
						parseFloat(a.location.latitude),
						parseFloat(a.location.longitude)
					);

					const distanceB = LocationUtils.calculateDistance(
						userPosition!.coords.latitude,
						userPosition!.coords.longitude,
						parseFloat(b.location.latitude),
						parseFloat(b.location.longitude)
					);
					return distanceA - distanceB;
				});
			}
			this.branchesArray.replace(branchModelArray);
		} catch (e) {
			console.error(e);
			this.branchesArray.replace([]);
		}
	}

	@action
	public setActiveAreaFilterArray(newArray: number[]) {
		this.activeAreaFilterArray.replace(newArray);
	}

	@action
	public setActiveKosherFilterArray(newArray: number[]) {
		this.activeKosherFilterArray.replace(newArray);
	}

	@action
	public setOldActiveAreaFilterArray(newArray: number[]) {
		this.oldActiveAreaFilterArray.replace(newArray);
	}

	@action
	public setOldActiveKosherFilterArray(newArray: number[]) {
		this.oldActiveKosherFilterArray.replace(newArray);
	}

	@action
	public initBranchesFilters() {
		this.setIsFirstTimeInBranchesModal(true);
		this.setActiveAreaFilterArray([0]);
		this.setActiveKosherFilterArray([parseInt(GiftsKosherFilter.all, 10)]);
		this.setOldActiveAreaFilterArray([0]);
		this.setOldActiveKosherFilterArray([parseInt(GiftsKosherFilter.all, 10)]);
	}

	@action
	public async fetchBranchDetails(branchId: number, businessId: number, categoryId?: number) {
		const details: BranchMoreDetailsDTO = await CategoriesFetcher.fetchBranchDetails(branchId, businessId, categoryId);

		return GiftsConverter.branchMoreDetailsDtoToModel(details);
	}
}
