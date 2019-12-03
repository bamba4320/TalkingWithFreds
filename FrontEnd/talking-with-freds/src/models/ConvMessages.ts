import Conversation from "./Conversation";
import User from "./User";

export default class ConvMessage {
  messageId: number = 0;
  senderId: number = 0;
  convId: number = 0;
  messageSendingTime: Date = new Date();
  messageContent: string = '';
  conv: Conversation = new Conversation();
  sender: User = new User();
}
