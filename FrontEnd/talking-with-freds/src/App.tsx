import React from 'react';
import './App.css';
import MainLobbyContainer from './UI/containers/MainLobby/MainLobby.container';
import {Router, Switch, Route, Redirect} from 'react-router-dom';
import ConversationStore from './BL/stores/Conversation.store';
import MessagesStore from './BL/stores/MessagesStore.store';
import CurrentUserStore from './BL/stores/CurrentUserStore.store';
import LoginContainer from './UI/containers/Login/Login.container';
import AuthStore from './BL/stores/Auth.store';

interface IProps {}
interface IState {}

class App extends React.Component<IProps, IState> {
	private conversationStore: ConversationStore;
	private messagesStore: MessagesStore;
	private currentUserStore: CurrentUserStore;
	private authStore: AuthStore;

	constructor(props: IProps) {
		super(props);
		this.currentUserStore = new CurrentUserStore();
		// TODO: add init current user from api
		this.conversationStore = new ConversationStore();
		this.messagesStore = new MessagesStore();
		this.authStore = new AuthStore();
	}

	public render() {
		return (
			<div className='App'>
				<Switch>
					<Route exact={true} path='/Login'>
						{!this.currentUserStore.isUserLoggedIn ? (
							<LoginContainer authStore={this.authStore} />
						) : (
							<Redirect to='/MainLobby' />
						)}
					</Route>
					<Route exact={true} path='/MainLobby'>
						{this.currentUserStore.isUserLoggedIn ? (
							<MainLobbyContainer conversationStore={this.conversationStore} messagesStore={this.messagesStore} />
						) : (
							<Redirect to='/Login' />
						)}
					</Route>
					<Route exact={true} path='/'>
						{this.currentUserStore.isUserLoggedIn ? <Redirect to='/MainLobby' /> : <Redirect to='/Login' />}
					</Route>
				</Switch>
			</div>
		);
	}
}

export default App;
