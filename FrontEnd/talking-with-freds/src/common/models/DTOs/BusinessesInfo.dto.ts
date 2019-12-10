import BusinessDTO from './Businesses.dto';

export class BusinessesInfoDTO {
	public aliasID?: number;
	public aliasName: string = '';
	public aliasDescription: string = '';
	public businesses = new Array<BusinessDTO>();
}
