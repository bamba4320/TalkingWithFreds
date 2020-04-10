import {observable} from 'mobx';

export default class ConversationModel {
	@observable
	public convId?: string;
	@observable
	public convName?: string;
	@observable
	public lastMessage?: string;
	@observable
	public profileImg?: string;
	@observable
	public isGroup: boolean = false;
}
