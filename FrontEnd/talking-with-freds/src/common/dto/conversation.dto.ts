export default class ConversationDTO {
	public _id?: string;
	public convName?: string;
	public lastMessage?: string;
	public profileImg?: string;
	public isGroup: boolean = false;
}
