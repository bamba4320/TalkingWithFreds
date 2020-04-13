const _ = require('lodash');
class socketManager {
	constructor() {
		// The socketCache array contains items as followed: {uid, sockets:[]}
		this.socketCache = [];
	}

	// send client 'who are you?' event
	requestSocketForUid(socket) {
		console.log(`emmiting getUid`);
		socket.emit('getUid', {});
	}

	// check if the user already has a soket connected
	findSocketById(uid) {
		console.log(`looking for socket with id: ${uid}`);
		const find = _.find(this.socketCache, {uid});
		if (find) {
			console.log(`socket with id of ${uid} has been found`);
			return find;
		} else {
			console.log(`socket with id of ${uid} has not been found`);
			return null;
		}
	}

	// add socket to cache
	cacheSocket(uid, socket) {
		const socketInCache = this.findSocketById(uid);
		if (!socketInCache) {
			console.log(`push socket to socketCache with uid: ${uid} and socketId: ${socket.id}`);
			this.socketCache.push({uid: uid, sockets: [socket]});
		} else {
			console.error(`socket with uid: ${uid} already cached!! inserting to sockets array...`);
			socketInCache.sockets.push(socket);
			console.log(`socket cache after push to array`, this.socketCache);
		}
	}

	// send event throught socket
	emit(uid, event, content) {
		const userSocket = this.findSocketById(uid);
		if (userSocket) {
			if (userSocket.sockets) {
				console.log(`emitting ${event} with content: ${content}`);
				userSocket.sockets.foreach((socket) => {
					socket.emit(event, content);
				});
				return true;
			} else {
				console.error('socket not exists in userSocket!');
				return false;
			}
		} else {
			console.error(`no socket found with uid: ${uid}`);
			return false;
		}
	}

	// remove socket from cache
	clearCacheSocket(socketId) {
		let socketIndex = -1;
		const socketObjectIndex = _.findIndex(this.socketCache, function (obj) {
			for (let i = 0; i < obj.socket.length; i++) {
				if (obj.sockets[i].id === socketId) {
					socketIndex = i;
					return true;
				}
			}
			return false;
		});
		console.log(`socket obj index is ${socketObjectIndex} and socket index in object is ${socketIndex}`);
		if (socketObjectIndex >= 0) {
			if (this.socketCache[socketObjectIndex].sockets.length === 1) {
				console.log(`deleting single socket with id: ${socketId}`);
				this.socketCache.splice(socketObjectIndex, 1);
			} else {
				if (socketIndex >= 0) {
					console.log(`deleting socket from arrat with id: ${socketId}`);
					this.socketCache[socketObjectIndex].sockets.splice(socketIndex, 1);
				}
			}
		} else {
			console.error(`could not find socket with id ${socketId} in socketCache`);
		}
	}
}

module.exports = new socketManager();
