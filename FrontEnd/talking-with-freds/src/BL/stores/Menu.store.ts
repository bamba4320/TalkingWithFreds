import CategoryDTO from 'common/models/DTOs/Category.dto';
import CategoriesFetcher from 'Infrastructure/fetchers/Categories.fetcher';
import {sortBy} from 'lodash';
import {action, computed, IObservableArray, observable} from 'mobx';
import ConfigurationStore from './Configuration.store';
import ImageDTO from 'common/models/DTOs/Image.dto';
import Lang from 'Infrastructure/Language/Language';

export default class MenuStore {
	@observable
	private _isMenuDropdownOpen: boolean = false;

	@observable
	private _dropdownContent?: any;

	@observable
	private _isSidebarOpen: boolean = false;

	@observable
	private _menuCategories: IObservableArray<CategoryDTO> = observable([]);

	@observable
	private isLoaded: boolean = false;

	private configurationStore: ConfigurationStore;

	constructor(configurationStore: ConfigurationStore) {
		this.configurationStore = configurationStore;
	}

	@computed
	public get isMenuDropdownOpen() {
		return this._isMenuDropdownOpen;
	}

	@computed
	public get dropdownContent() {
		return this._dropdownContent;
	}

	@computed
	public get isSidebarOpen() {
		return this._isSidebarOpen;
	}

	@computed
	public get menuCategories() {
		return this._menuCategories;
	}

	public get getIsLoaded() {
		return this.isLoaded;
	}

	@action
	public openMenuDropdown(content: any) {
		this._isMenuDropdownOpen = true;
		this._dropdownContent = content;
	}

	@action
	public closeMenuDropdown() {
		this._isMenuDropdownOpen = false;
		this._dropdownContent = null;
	}

	@action
	public setSidebar(isOpen: boolean) {
		this._isSidebarOpen = isOpen;
	}

	@action
	public async fetchCategoriesHeader() {
		try {
			if (this._menuCategories.length === 0) {
				CategoriesFetcher.getCategoryById(this.configurationStore.configuration.headCategoryId).then(
					(category: CategoryDTO) => {
						let categoriesDtoArray: CategoryDTO[] = [];
						if (category.subCategories) {
							const subCategories = [...category.subCategories];
							subCategories.forEach((sc) => {
								if (sc.images && sc.images[0] && sc.images[0].file) {
									sc.images[0].file = this.configurationStore.configuration.imagesPath + sc.images[0].file;
								}
							});
							categoriesDtoArray.push(...subCategories);
							categoriesDtoArray = sortBy(categoriesDtoArray, (category) => {
								return category.sortOrder;
							});
						}
						// all categories option
						const allCategoriesOption = new CategoryDTO();
						allCategoriesOption.categoryName = Lang.format('Gifts.allCategories');
						allCategoriesOption.images = [];
						const allCategoriesImage = new ImageDTO();
						allCategoriesImage.file = '/static/images/allCategories.jpg';
						allCategoriesImage.alt = Lang.format('Gifts.allCategories');
						allCategoriesOption.images.push(allCategoriesImage);
						// pushing the 'all' options
						categoriesDtoArray.push(allCategoriesOption);
						// sets the store array to the categoriesDtoArray
						this._menuCategories.replace(categoriesDtoArray);
						this.isLoaded = true;
					}
				);
			}
		} catch (err) {
			// inserts an empty array in case there was an error
			this._menuCategories.replace([]);
		}
	}
}
