import React from 'react';
import './Conversation.component.scss';
import {Image} from 'semantic-ui-react';
import ConversationModel from '../../../../common/models/Conversation.model';

interface IProps {
	convDits: ConversationModel;
	onConvSelect:any;
	isSelected:any;
}
interface IState {}

export default class ConversationComponent extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
	}

	public render() {
		return (
			<div className={`conversation-wrapper ${this.props.isSelected(this.props.convDits.convId)? 'selected' : ''}`}>
				{/* conversation profile image */}
				<div className='conv-profile-img-wrapper'>
					<div className='circular-image-wrapper'>
						<Image className='conv-profile-img' src={require('../../../../static/images/appaProfilePicture.jpg')} />
						{/* <Image className='conv-profile-img' src={require(this.props.convDits.profileImg.toString())} /> */}
					</div>
				</div>
				{/* the conversation details */}
				<div className='conv-details-wrapper'>
					<div className='conv-name-and-last-message'>
						<div className='conv-name'>{this.props.convDits.convName}</div>
						<div className='last-message'>{this.props.convDits.lastMessage}</div>
					</div>
					<div className='conv-time-seen-and-mute'></div>
				</div>
			</div>
		);
	}
}
