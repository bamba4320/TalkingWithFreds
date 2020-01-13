import React from 'react';
import './ChatWindow.container.scss';

interface IProps{}
interface IState{}

export default class ChatWindowContainer extends React.Component<IProps, IState>{

    public render(){
        return (<div className='chat-window-super-wrapper'>
            <h1>Chat window</h1>
        </div>);
    }
}