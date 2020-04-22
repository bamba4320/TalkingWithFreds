export default class ConversationDTO {
	public _id?: string;
	public convName?: string;
	public lastMessage?: string;
	public lastMessageTime ?: string | Date;
	public profileImg?: string;
	public isGroup: boolean = false;
}
