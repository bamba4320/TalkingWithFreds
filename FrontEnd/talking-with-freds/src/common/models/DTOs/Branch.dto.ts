export default class BranchDTO {
	public address: string = '';

	public branchId: number = 0;

	public businessId: string = '0';

	public branchName: string = '';

	public location!: {longitude: string; latitude: string};

	public phone: string = '';

	public storeName: string = '';

	public businessAlias: string = '';

	public businessLogoFile: string = '';
}
