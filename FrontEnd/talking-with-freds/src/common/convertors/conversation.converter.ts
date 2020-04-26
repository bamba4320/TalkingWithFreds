import ConversationDTO from '../dto/conversation.dto';
import ConversationModel from '../models/Conversation.model';
import {imagePreURL} from '../generalConsts';
import {isNullOrUndefined} from 'util';

export default class ConversationConverter {
	public static convertConversationDTOToModel(conversationDTO: ConversationDTO) {
		const conversation = new ConversationModel();
		console.log(conversationDTO);
		conversation.convId = conversationDTO._id;
		conversation.convName = conversationDTO.convName;
		conversation.lastMessage = conversationDTO.lastMessage;
		conversation.lastMessageTime = conversationDTO.lastMessageTime;
		conversation.lastMessageUser = conversationDTO.lastMessageUser;
		conversation.isGroup = conversationDTO.isGroup;
		if (!isNullOrUndefined(conversationDTO.profileImg)) {
			conversation.profileImg = imagePreURL + conversationDTO.profileImg;
		}

		return conversation;
	}
}
