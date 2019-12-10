import {VariantDTO} from './Variant.dto';

export default class SendGiftDTO {
	public fromMemberName?: string;

	public toMemberMobilePhone?: string;

	public toMemberEmail?: string;

	public toMemberName?: string;

	public blessing?: string;

	public categoryNumber!: number;

	public productsVarFromBarcode!: VariantDTO;

	public barCode!: string;

	public sumToLoad?: number;

	public media?: string;

	public sendTime?: string;
}
