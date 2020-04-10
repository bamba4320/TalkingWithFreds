import { observable } from "mobx";

export default class MessageModel {
	@observable
	public messageId?: string;
	@observable
	public senderId?: string;
	@observable
	public convId?: string;
	@observable
	public messageSendingTime?: Date;
	@observable
	public messageContent?: string;
}
