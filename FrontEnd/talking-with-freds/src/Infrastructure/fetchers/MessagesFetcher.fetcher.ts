export default class MessagesFetcher {
	public static async getConversationsMessages(convId: number) {
		return [
			{
				messageId: 1,
				senderId: 1,
				convId: convId,
				messageSendingTime: new Date(),
				messageContent: 'Test1',
			},
			{
				messageId: 2,
				senderId: 2,
				convId: convId,
				messageSendingTime: new Date(),
				messageContent: 'Test1',
			},
			{
				messageId: 3,
				senderId: 1,
				convId: convId,
				messageSendingTime: new Date(),
				messageContent: 'Test1',
			},
			{
				messageId: 4,
				senderId: 2,
				convId: convId,
				messageSendingTime: new Date(),
				messageContent: 'Test1',
			},
			{
				messageId: 5,
				senderId: 1,
				convId: convId,
				messageSendingTime: new Date(),
				messageContent: 'Test1',
			},
			{
				messageId: 6,
				senderId: 2,
				convId: convId,
				messageSendingTime: new Date(),
				messageContent: 'Test1',
			},
			{
				messageId: 7,
				senderId: 1,
				convId: convId,
				messageSendingTime: new Date(),
				messageContent: 'Test1',
			},
			{
				messageId: 8,
				senderId: 2,
				convId: convId,
				messageSendingTime: new Date(),
				messageContent: 'Test1',
			},
		];
	}
}
