import Conversation from "./Conversation";
import User from "./User";

export default class ConvMessage {
  messageId: number;
  senderId: number;
  convId: number;
  messageSendingTime: Date;
  messageContent: string;
  conv: Conversation;
  sender: User;
}
