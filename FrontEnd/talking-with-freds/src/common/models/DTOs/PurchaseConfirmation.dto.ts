export class PurchaseConfirmationDTO {
	public dtsOrderId!: number;
	public orderConfirmation!: string;
	public variants!: Array<{
		transferGuid: string;
		variantName: string;
		variantBarCode: string;
	}>;
}
