import {observable} from 'mobx';

export default class BranchMoreDetailsModel {
	@observable
	public businessGeneralInformationHTML: string[] = []; // HTML

	@observable
	public branchActivityHours: string = '';

	@observable
	public businessWebstie?: string;

	@observable
	public branchLocation: string = '';

	@observable
	public kosherType: number = 0;

	@observable
	public description: string[] = [];
}
