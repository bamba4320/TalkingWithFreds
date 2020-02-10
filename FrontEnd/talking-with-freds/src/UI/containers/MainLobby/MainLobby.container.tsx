import React from 'react';
import './MainLobby.container.scss';
import ConversationsListContainer from './ConvesationsList/ConversationsList.container';
import ChatWindowContainer from './ChatWindow/ChatWindow.container';
import ConversationStore from '../../../BL/stores/Conversation.store';
import MessagesStore from '../../../BL/stores/MessagesStore.store';

interface IProps{
    conversationStore:ConversationStore;
    messagesStore:MessagesStore;
}
interface IState{}


export default class MainLobbyContainer extends React.Component<IProps, IState>{

    constructor(props:IProps){
        super(props);
    }

    public render(){
        return( 
            <div className='main-lobby-super-wrapper'>
                {/* conversation list part */}
                <div className='conversations-lobby-wrapper'>
                    <ConversationsListContainer conversationStore={this.props.conversationStore}/>
                </div>

                {/* chat part  */}
                <div className='chat-window-lobby-wrapper'>
                    <ChatWindowContainer messagesStore={this.props.messagesStore}/>
                </div>
            </div>
        );
    }

}