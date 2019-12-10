import TagCategory from './TagCategory.dto';

export default class TagDTO {
	public tagCategoryInfo?: TagCategory[];

	public tagId: number = 0;

	public tagName: string = '';

	public tagSort: number = 0;
}
