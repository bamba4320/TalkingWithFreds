import React from 'react';
import './Conversation.component.scss';
import {Image} from 'semantic-ui-react';

interface IProps{
    img:string;
}
interface IState{}

export default class ConversationComponent extends React.Component<IProps,IState>{

    public render(){
        return(
            <div className='conversation-wrapper'>
                {/* conversation profile image */}
                <div className='conv-profile-img-wrapper'>
                    <Image className='conv-profile-img' src={this.props.img}/>
                </div>
                {/* the conversation details */}
                <div className='conv-details'>
                    <div className='conv-name-and-last-message'></div>
                    <div className='conv-time-seen-and-mute'></div>
                </div>

            </div>
        );
    }
}