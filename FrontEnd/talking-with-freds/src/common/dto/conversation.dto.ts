export default class ConversationDTO {
	public _id?: string;
	public convName?: string;
	public lastMessage?: string;
	public lastMessageTime ?: string | Date;
	public lastMessageUser ?: string;
	public profileImg?: string;
	public unseemMessagesAmount?:number;
	public isGroup: boolean = false;
}
