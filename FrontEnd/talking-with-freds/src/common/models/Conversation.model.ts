export default class ConversationModel {
	public convId?: string;
	public convName?: string;
	public lastMessageTime?: string | Date;
	public lastMessage?: string;
	public profileImg?: string;
	public isGroup: boolean = false;
}
