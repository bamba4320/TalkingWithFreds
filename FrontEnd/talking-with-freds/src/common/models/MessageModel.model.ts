export default class MessageModel{
    public messageId:number = 0;
    public senderId:number = 0;
    public convId:number = 0;
    public messageSendingTime:Date = new Date();
    public messageContent:string = '';
}