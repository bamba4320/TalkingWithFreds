import io from 'socket.io-client';
import {observable, action, computed} from 'mobx';
import {wsUrl} from '../../../common/generalConsts';
import {events} from './events';

export default class WebSocketStore {
	// socket connection needs
	private socket: SocketIOClient.Socket;

	@observable
	private socketEventsObserver: {event: any; data: any};

	constructor() {
		this.socket = io(wsUrl);
		this.socketEventsObserver = {event: '', data: ''};
		this.connect();
	}

	@action
	private connect() {
		this.socket.on(events.getUid, (data: any) => {
			console.debug('on getUid request in websocket store');
			this.socketEventsObserver = {event: events.getUid, data};
		});

		this.socket.on(events.typing, (data: any) => {
			console.debug('on typing in websocket store');
			this.socketEventsObserver = {event: events.typing, data};
		});

		this.socket.on(events.newMessage, (data: any) => {
			console.debug('on newMessage in websocket store');
			this.socketEventsObserver = {event: events.newMessage, data};
		});

		this.socket.on(events.convRead, (data: any) => {
			console.debug('on convRead in websocket store');
			this.socketEventsObserver = {event: events.convRead, data};
		});

		this.socket.on(events.newConversation, (data:any)=>{
			console.debug('on new conversation in websocket store');
			this.socketEventsObserver = {event: events.newConversation, data};
		});

		return () => {
			console.debug('disconnecting from socket');
			this.socket.disconnect();
		};
	}

	public sendUid(uid: string) {
		this.socket.emit(events.uid, {id: uid});
	}

	@computed
	get getSocketEventsObserver() {
		return this.socketEventsObserver;
	}

	public sendConvRead(data:any){
		this.socket.emit(events.convRead, data);
	}
}
