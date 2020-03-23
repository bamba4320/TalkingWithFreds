import React from 'react';
import rootStores from '../../../BL/stores';
import { CONVERSATION_STORE, MESSAGES_STORE } from '../../../BL/stores/storesKeys';
import ChatWindowContainer from './ChatWindow/ChatWindow.container';
import ConversationsListContainer from './ConvesationsList/ConversationsList.container';
import './MainLobby.container.scss';

interface IProps{
}
interface IState{}

const conversationStore = rootStores[CONVERSATION_STORE];
const messagesStore = rootStores[MESSAGES_STORE];

export default class MainLobbyContainer extends React.Component<IProps, IState>{
    public render(){
        return( 
            <div className='main-lobby-super-wrapper'>
                {/* conversation list part */}
                <div className='conversations-lobby-wrapper'>
                    <ConversationsListContainer conversationStore={conversationStore}/>
                </div>

                {/* chat part  */}
                <div className='chat-window-lobby-wrapper'>
                    <ChatWindowContainer messagesStore={messagesStore}/>
                </div>
            </div>
        );
    }

}