import MessageModel from './Message.model';

export default class ConversationModel {
	public convId?: string;
	public convName?: string;
	public lastMessage?: string;
	public profileImg?: string;
	public isGroup:boolean = false;
}
