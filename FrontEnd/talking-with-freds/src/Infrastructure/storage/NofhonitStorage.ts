import FavoriteCategoryModel from 'common/models/FavoriteCategory.model';

enum StorageKeys {
	userFavorites = 'userFavorites',
}

class NofshonitStorage {
	public clearStorage() {
		// Clear Favorites from the local and sassion storage
		localStorage.removeItem(StorageKeys.userFavorites);
	}

	/**
	 * Save the current user Favorite categories array at the
	 * local storage
	 * @param userFavorites Favorites array to save.
	 */
	public updateFavorites(userFavorites: FavoriteCategoryModel[]) {
		this.clearStorage();
		const userFavoritesIds: number[] = [];
		userFavorites.forEach((userFavorite) => userFavoritesIds.push(userFavorite.categoryId));
		localStorage.setItem(StorageKeys.userFavorites, JSON.stringify(userFavoritesIds));
	}

	/**
	 * Get the favorites array of the user from the localStorage
	 */
	public getFavorites(): number[] {
		const favorites = localStorage.getItem(StorageKeys.userFavorites);
		if (favorites) {
			return JSON.parse(favorites);
		} else {
			return [];
		}
	}
}

export default new NofshonitStorage();
