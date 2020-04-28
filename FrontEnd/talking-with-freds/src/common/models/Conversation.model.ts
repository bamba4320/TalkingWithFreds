import {observable} from 'mobx';

export default class ConversationModel {
	public convId?: string;
	@observable
	public convName?: string;
	public lastMessageTime?: string | Date;
	public lastMessageUser?: string;
	@observable
	public lastMessage?: string;
	@observable
	public unseemMessagesAmount: number = 0;
	public profileImg?: string;
	public isGroup: boolean = false;
}
