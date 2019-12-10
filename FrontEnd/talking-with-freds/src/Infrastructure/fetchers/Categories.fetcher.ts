import {GiftsKosherFilter} from 'common/generalconsts/giftFilters.enums';
import GiftsFilterDTO from 'common/models/DTOs/GiftsFilter.dto';
import {NextContext} from 'next';
import {BaseFetcher} from './base/Base.fetcher';

class CategoriesFetcher extends BaseFetcher {
	/**
	 * we don't use it because techni problems of content editor - 22/10/2019
	 * we use GetCategoryById instead
	 */
	public async getCtaegoriesHeader() {
		return this.get('/getCategoryHeader');
	}

	public async GetCategoryPage(id: any, isLoggedIn: boolean, ctx?: NextContext) {
		if (isLoggedIn) {
			const headersWithToken = this.extractTokenFromNextContextAsHeaders(ctx);
			return this.get(`/GetCategoryPage?categoryId=${id}`, headersWithToken);
		} else {
			return this.get(`/GetCategoryPage?categoryId=${id}`);
		}
	}

	public async GetCategoryPageBranches(id: any) {
		return this.get(`/GetBusinessesAndBranchesCount?categoryNumber=${id}`);
	}
	/*
	This method gets the filtered categories gifts by a filterDTO 
	and returns the filters and the filtered categories
	 */
	public async getSearchedCategoriesByFilter(giftsFilterModel: GiftsFilterDTO) {
		return this.post('/getCategoryFilterPage', giftsFilterModel);
	}

	/**
	 * This method gets the current user id
	 * and returns all of that user's favorite cards.
	 */
	public async getUserFavorites(ctx?: NextContext): Promise<any> {
		const headersWithToken = this.extractTokenFromNextContextAsHeaders(ctx);
		return this.get('/GetFavoritePages', headersWithToken);
	}

	/**
	 * Update user favorite cards array at DB after adding
	 * @param givenCategory new Favorited Category
	 */
	public async updateUserFavorites(givenCategoryID: number) {
		const body = {categoryId: givenCategoryID};
		return this.post('/SetFavoritePage', body);
	}

	/**
	 * Update user favorite cards array at DB after removing
	 * @param givenCategory deleted Category
	 */
	public async deleteUserFavorites(givenCategoryID: number) {
		return this.del(`/DeleteFavoritePage?categoryId=${givenCategoryID}`);
	}

	/**
	 * Get the updeted Category Card from server
	 * @param categoryIds wished categories ids array.
	 */
	public async getCategoryByIdList(categoriesIds: number[]): Promise<any> {
		let quaryParams = '';
		for (let i = 0; i < categoriesIds.length; i++) {
			quaryParams += 'categorylist=' + categoriesIds[i] + '&';
		}
		quaryParams = quaryParams.substr(0, quaryParams.length - 1);
		if (quaryParams) {
			return this.get(`/GetCategoryByIdList?${quaryParams}`);
		}
		return [];
	}

	public async getCategoryById(categoryId: number): Promise<any> {
		return this.get(`GetCategoryById?categoryId=${categoryId}`);
	}

	public async getSentGifts(ctx?: NextContext) {
		const headersWithToken = this.extractTokenFromNextContextAsHeaders(ctx);
		return this.get('/GetSentGifts', headersWithToken);
	}

	public async getReceivedGifts(ctx?: NextContext) {
		const headersWithToken = this.extractTokenFromNextContextAsHeaders(ctx);
		return this.get('/GetReceivedGifts', headersWithToken);
	}

	// TODO: BAR - Improve this
	public async getBranchesByFilters(
		categoryId?: number,
		businessId?: number,
		kosherFilters?: number[],
		region?: number[],
		benefitGroupIdFilter?: number
	) {
		const categoryQuery = categoryId ? `categoryId=${categoryId}` : '';

		const businessQuery = businessId ? `${categoryId ? '&' : ''}businessId=${businessId}` : '';
		const benefitGroupId = benefitGroupIdFilter
			? `${categoryId || businessId ? '&' : ''}benefitGroupId=${benefitGroupIdFilter}`
			: '';

		let regionQuery = '';
		if (region && region.length > 0 && !region.includes(0)) {
			regionQuery = region
				.map(
					(regionValue, index) =>
						`${index !== 0 ? '&' : categoryId || businessId || benefitGroupId ? '&' : ''}regions=${regionValue}`
				)
				.join('');
		}

		let kosherQuery = '';
		if (kosherFilters && kosherFilters.length > 0 && !kosherFilters.includes(parseInt(GiftsKosherFilter.all, 10))) {
			kosherQuery = kosherFilters
				.map(
					(kosherValue, index) =>
						`${
							index !== 0 ? '&' : categoryId || businessId || benefitGroupId || (region && region.length > 0) ? '&' : ''
						}kosherType=${kosherValue}`
				)
				.join('');
		}

		const isQuery = categoryQuery || businessQuery || benefitGroupId || regionQuery || kosherQuery;
		return this.get(
			`getBranchesList${
				isQuery ? '?' : ''
			}${categoryQuery}${businessQuery}${benefitGroupId}${regionQuery}${kosherQuery}`
		);
	}

	public async fetchBranchDetails(branchId: number, businessId: number, categoryId?: number) {
		return this.get(
			`getBranchDetails?branchId=${branchId}&businessId=${businessId}${categoryId ? '&categoryId=' + categoryId : ''}`
		);
	}

	public async getAutoCompleteResults(searchText: string) {
		return this.get(`/AutoCompleted?searchtext=${searchText}`);
	}
}
export default new CategoriesFetcher(`category`);
