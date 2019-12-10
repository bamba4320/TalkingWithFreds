export class PurchaseDTO {
	public email!: string;
	public identity!: string;
	public creditCardExpirey!: string;
	public creditCard16Digits!: string;
	public cvv!: string;
	public totalPayment!: number;
	public numOfPayments: number = 1;
	public pinCode: string = '';
	public cart!: Array<{
		categoryId: string;
		categoryName: string;
		variant: {
			quantity: number;
			barCode: string;
			loadingAmount: number;
			price: number;
			toMemberName: string;
			fromMemberName: string;
			toMemberMobile: string;
			toMemberEmail: string;
			sendTime: string;
			blessing: string;
			mediaUrl: string;
			immediateSend: boolean;
		};
	}>;
}
