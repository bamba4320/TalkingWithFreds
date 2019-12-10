import {TagsContext} from 'common/generalconsts/custom.enums';
import SliderDTO from 'common/models/DTOs/Slider.dto';
import TagDTO from 'common/models/DTOs/Tag.dto';
import MediaFetcher from 'Infrastructure/fetchers/Media.fetcher';
import TagsFetcher from 'Infrastructure/fetchers/Tags.fetcher';
import {sortBy} from 'lodash';
import {action, computed, IObservableArray, observable} from 'mobx';
import MenuStore from './Menu.store';

export default class ForWorkersStore {
	@observable
	private imagesSlider: IObservableArray<SliderDTO> = observable([]);

	@observable
	private topTag: TagDTO = new TagDTO();

	private menuStore: MenuStore;

	constructor(menuStore: MenuStore, initData?: ForWorkersStore) {
		this.menuStore = menuStore;
		if (initData) {
			this.imagesSlider.replace(initData.imagesSlider);
			this.topTag = initData.topTag;
		}
	}
	@computed
	public get getCategories() {
		return this.menuStore.menuCategories;
	}
	@computed
	public get getTags() {
		return this.topTag;
	}
	@computed
	public get getSliders() {
		return this.imagesSlider;
	}
	@action
	public async fetchTopTag() {
		try {
			this.topTag = await TagsFetcher.getTopTag(TagsContext.FOR_WORKERS);
		} catch (err) {}
	}
	@action
	public async fetchSliders() {
		try {
			const res: SliderDTO[] = await MediaFetcher.getImagesSlider(TagsContext.FOR_WORKERS);
			this.imagesSlider.replace(
				sortBy(res, (slider) => {
					return slider.sortOrder;
				})
			);
		} catch (err) {}
	}
}
