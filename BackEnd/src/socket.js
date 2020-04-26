const socketServer = require('socket.io')();
const port = 4321;
const socketManager = require('./socket/socketManager');
const conversationController = require('./BL/Controllers/conversation.controller');

// connection
socketServer.on('connection', (client) => {
	console.log(`socket connected: ${client.id}`);
	socketManager.requestSocketForUid(client);

	client.on('uid', (data) => {
		console.log('uid event');
		if (data) {
			socketManager.cacheSocket(data.id, client);
		} else {
			console.error('data is null');
		}
	});

	client.on('typing', (data) => {
		console.log('typing event');
		if (data) {
			socketManager.emit(data.told, 'typing', data);
		} else {
			console.error('data is null');
		}
	});

	client.on('convRead', (data) => {
		console.log('convRead event');
		if (data) {
			conversationController.clearUserUnseenInConv(data);
		} else {
			console.error('data is null');
		}
	});

	client.on('logEvent', (data) => {
		console.info('in logEvent with data', data);
		if (data) {
			console.info('logEvent:', data);
		} else {
			console.error('data is null');
		}
	});

	client.on('disconnect', function () {
		socketManager.clearCacheSocket(client.id);
	});
	// client.on('subscribeToMessageSent')
});

// start socket server
socketServer.listen(port);
console.log('Socket server is ready and listening at port 4321');
