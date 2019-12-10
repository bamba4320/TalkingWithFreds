import OptionsDTO from 'common/models/DTOs/Options.dto';
import TagDTO from 'common/models/DTOs/Tag.dto';
import {sortBy} from 'lodash';
import {BaseFetcher} from './base/Base.fetcher';

class TagsFetcher extends BaseFetcher {
	public async getTopTag(context: string, top?: number) {
		try {
			const tags: TagDTO[] = await this.get(`/GetCategorysByTopTag?selectTop=${top ? top : 1}&tagContext=${context}`);
			const firstTag: TagDTO = tags[0];
			firstTag.tagCategoryInfo = sortBy(firstTag.tagCategoryInfo, (tagItem) => {
				return tagItem.categoryTagSort;
			});
			return firstTag;
		} catch (err) {
			throw err;
		}
	}
	public async getTagsFilters() {
		const tags: TagDTO[] = await this.get('/getActiveTags');
		const tagFilterArray = await sortBy(tags, (tag: TagDTO) => tag.tagSort).map(
			(tag: TagDTO) => new OptionsDTO(tag.tagId, tag.tagName)
		);
		return tagFilterArray;
	}
}

export default new TagsFetcher(`tags`);
