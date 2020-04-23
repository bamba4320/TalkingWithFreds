import {observable} from 'mobx';

export default class ConversationModel {
	public convId?: string;
	public convName?: string;
	public lastMessageTime?: string | Date;
	@observable
	public lastMessage?: string;
	public profileImg?: string;
	public isGroup: boolean = false;
}
