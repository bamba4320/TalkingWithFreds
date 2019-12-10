import FavoriteCategoryConverter from 'common/models/converters/Favorites.converter';
import FavoriteCategoryDTO from 'common/models/DTOs/FavoriteCategory.dto';
import FavoriteCategoryModel from 'common/models/FavoriteCategory.model';
import CategoriesFetcher from 'Infrastructure/fetchers/Categories.fetcher';
import NofhonitStorage from 'Infrastructure/storage/NofhonitStorage';
import {sortBy} from 'lodash';
import {action, computed, IObservableArray, observable} from 'mobx';
import {NextContext} from 'next';

export default class FavoritesStore {
	@observable
	private favoriteCategoriesArray: IObservableArray<FavoriteCategoryModel> = observable([]);

	private isUserLoggedIn: boolean;

	@observable
	private isLoading: boolean;

	@observable
	private shownName: string = '';

	@observable
	private isPopUpOpen: boolean = false;

	constructor(favInitData?: FavoritesStore) {
		this.isUserLoggedIn = false;
		this.isLoading = true;
		if (favInitData) {
			this.favoriteCategoriesArray = favInitData.favoriteCategoriesArray;
			this.isUserLoggedIn = favInitData.isUserLoggedIn;
			this.isLoading = favInitData.isLoading;
		}
	}

	/**
	 * fetch user favorites from storage
	 * server-side or local
	 */
	@action
	public async initFavoritesForUser(isUserLoggedin: boolean, ctx?: NextContext) {
		this.setIsLoading(true);
		this.isUserLoggedIn = isUserLoggedin;
		if (!this.isEmpty) {
			this.favoriteCategoriesArray.clear();
		}
		let temp: FavoriteCategoryDTO[] = [];
		// if user logged in fetch from server
		if (this.isUserLoggedIn) {
			const res: any = await CategoriesFetcher.getUserFavorites(ctx);
			for (let i = 0; i < res.length; i++) {
				temp.push(res[i]);
			}
			temp = sortBy(temp, (category: FavoriteCategoryDTO) => {
				return category.category.sortOrder;
			});
		} else {
			// if user is not logged in fatch from local storage
			const ids: number[] = NofhonitStorage.getFavorites();
			try {
				const res: any = await CategoriesFetcher.getCategoryByIdList(ids);
				for (let i = 0; i < res.length; i++) {
					temp.push(res[i]);
				}
			} catch (e) {}
			temp = sortBy(temp, (category: FavoriteCategoryDTO) => {
				return category.category.sortOrder;
			});
		}
		for (let i = 0; i < temp.length; i++) {
			this.favoriteCategoriesArray.push(FavoriteCategoryConverter.ConvertDTOToModel(temp[i]));
		}
		this.setIsLoading(false);
	}

	/**
	 * Finds if a Category is in Favorites by id.
	 * @param favoriteCategoryId wished category id.
	 */
	@action
	public isFavorite(favoriteCategoryId: number): boolean {
		return (
			this.favoriteCategoriesArray.findIndex(
				(favoriteCategory) => favoriteCategory.categoryId === favoriteCategoryId
			) !== -1
		);
	}

	/**
	 * Add new Favorite Category and update storage.
	 * @param newCategory newly favorited category
	 */
	@action
	public async addFavoriteCategory(newCategoryId: number) {
		try {
			const newCategory: FavoriteCategoryDTO[] = await CategoriesFetcher.getCategoryByIdList([newCategoryId]);
			// adding the new favorite category.
			this.favoriteCategoriesArray.push(FavoriteCategoryConverter.ConvertDTOToModel(newCategory[0]));

			// if user logged in, update on server
			if (this.isUserLoggedIn) {
				await CategoriesFetcher.updateUserFavorites(newCategoryId);
			} else {
				// if user is offline, save to local storage
				NofhonitStorage.updateFavorites(this.favoriteCategoriesArray);
			}
			this.setShownPopUpCategoryName(newCategory[0].category.categoryName);
			this.setIsPopUpOpen(true);
		} catch (err) {}
	}

	/**
	 * Remove category from favorites and update storage
	 * @param categoryToRemove Category to remove
	 */
	@action
	public async removeFavoriteCategory(categoryToRemoveId: number) {
		// removing the favorite category from the array.
		this.favoriteCategoriesArray.splice(
			this.favoriteCategoriesArray.findIndex((category) => category.categoryId === categoryToRemoveId),
			1
		);

		// if user logged in, update on server
		if (this.isUserLoggedIn) {
			await CategoriesFetcher.deleteUserFavorites(categoryToRemoveId);
		} else {
			// if user is offline, save to local storage
			NofhonitStorage.updateFavorites(this.favoriteCategoriesArray);
		}
	}

	@action
	public setShownPopUpCategoryName(newShownName: string) {
		this.shownName = newShownName;
	}

	@action
	public setIsPopUpOpen(value: boolean) {
		this.isPopUpOpen = value;
	}

	@action
	public setIsLoading(value: boolean) {
		this.isLoading = value;
	}

	/**
	 * Is no Favorites
	 */
	@computed
	get isEmpty(): boolean {
		return this.FavoritesAmount === 0;
	}

	/**
	 * Get All Favorites
	 */
	@computed
	get UserFavorites(): FavoriteCategoryModel[] {
		return this.favoriteCategoriesArray;
	}

	/**
	 * Get how much Category are liked
	 */
	@computed
	get FavoritesAmount(): number {
		return this.UserFavorites.length;
	}

	@computed
	get isLoadingFavorites(): boolean {
		return this.isLoading;
	}

	@computed
	get getShownName(): string {
		return this.shownName;
	}

	@computed
	get getIsPopUpOpen(): boolean {
		return this.isPopUpOpen;
	}
}
