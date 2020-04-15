import ConversationDTO from "../dto/conversation.dto";
import ConversationModel from "../models/Conversation.model";
import { imagePreURL } from "../generalConsts";

export default class ConversationConverter{
    public static convertConversationDTOToModel(conversationDTO:ConversationDTO){
        const conversation = new ConversationModel();
        conversation.convId = conversationDTO._id;
        conversation.convName = conversationDTO.convName;
        conversation.lastMessage = conversationDTO.lastMessage;
        conversation.profileImg = imagePreURL+conversationDTO.profileImg;
        conversation.isGroup = conversationDTO.isGroup;

        return conversation;
    }
}