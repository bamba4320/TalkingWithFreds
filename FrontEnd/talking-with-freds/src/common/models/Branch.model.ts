import {observable} from 'mobx';
import BranchMoreDetailsModel from './BranchMoreDetails.model';

export default class BranchModel {
	@observable
	public branchId: number = 0;

	@observable
	public businessId: number = 0;

	@observable
	public branchName: string = '';

	@observable
	public imageUrl: string = '';

	@observable
	public lineOfBusiness: string = '';

	@observable
	public branchLocation: string = '';

	@observable
	public businessPhoneNumber?: string;

	@observable
	public location: {longitude: string; latitude: string} = {longitude: '0', latitude: '0'};

	@observable
	public moreDetials?: BranchMoreDetailsModel;
}
