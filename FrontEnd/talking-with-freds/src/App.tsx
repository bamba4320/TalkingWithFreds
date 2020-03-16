import React from 'react';
import './App.css';
import MainLobbyContainer from './UI/containers/MainLobby/MainLobby.container';
import { Router, Switch, Route } from 'react-router-dom';
import ConversationStore from './BL/stores/Conversation.store';
import MessagesStore from './BL/stores/MessagesStore.store';

interface IProps{}
interface IState{}

class App extends React.Component<IProps, IState>{

  private conversationStore:ConversationStore;
  private messagesStore:MessagesStore;

  constructor(props:IProps){
    super(props);

    this.conversationStore = new ConversationStore();
    this.conversationStore.initUserConversations();
    this.messagesStore = new MessagesStore();
  }

  public render(){
    return(
      <div className='App'>
        <Switch>
          <Route exact={true} path='/Login'>
          </Route>
          <Route exact={true} path='/MainLobby'>
            <MainLobbyContainer 
            conversationStore={this.conversationStore}
            messagesStore={this.messagesStore} />
          </Route>
        </Switch>
      </div>
    );
  }
}


export default App;
