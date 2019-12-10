import {TagsContext} from 'common/generalconsts/custom.enums';
import SliderDTO from 'common/models/DTOs/Slider.dto';
import TagDTO from 'common/models/DTOs/Tag.dto';
import MediaFetcher from 'Infrastructure/fetchers/Media.fetcher';
import TagsFetcher from 'Infrastructure/fetchers/Tags.fetcher';
import {sortBy} from 'lodash';
import {action, computed, IObservableArray, observable} from 'mobx';
import MenuStore from './Menu.store';

export default class HomePageStore {
	@observable
	private imagesSliderTop: IObservableArray<SliderDTO> = observable([]);

	@observable
	private imagesSliderBottom: IObservableArray<SliderDTO> = observable([]);

	@observable
	private topTag: TagDTO = new TagDTO();

	private menuStore: MenuStore;

	constructor(menuStore: MenuStore, initData?: HomePageStore) {
		this.menuStore = menuStore;
		if (initData) {
			this.imagesSliderTop.replace(initData.imagesSliderTop);
			this.imagesSliderBottom.replace(initData.imagesSliderBottom);
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
	public get getSlidersTop() {
		return this.imagesSliderTop;
	}
	@computed
	public get getSlidersBottom() {
		return this.imagesSliderBottom;
	}
	@action
	public async fetchTopTag() {
		try {
			this.topTag = await TagsFetcher.getTopTag(TagsContext.HOME_PAGE);
		} catch (err) {}
	}
	@action
	public async fetchSliders() {
		try {
			const res: SliderDTO[] = await MediaFetcher.getImagesSlider(TagsContext.UPPER_SLIDER);
			this.imagesSliderTop.replace(
				sortBy(res, (slider) => {
					return slider.sortOrder;
				})
			);
			const res2: SliderDTO[] = await MediaFetcher.getImagesSlider(TagsContext.LOWER_SLIDER);
			this.imagesSliderBottom.replace(
				sortBy(res2, (slider) => {
					return slider.sortOrder;
				})
			);
		} catch (err) {}
	}
}
