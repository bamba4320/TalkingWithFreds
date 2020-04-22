import {observer} from 'mobx-react';
import React from 'react';
import {Image} from 'semantic-ui-react';
import ConversationModel from '../../../../common/models/Conversation.model';
import './Conversation.component.scss';

interface IProps {
	convDits: ConversationModel;
	onConvSelect: any;
	isSelected: any;
}
interface IState {}

@observer
export default class ConversationComponent extends React.Component<IProps, IState> {
	public render() {
		return (
			<div
				className={`conversation-wrapper ${this.props.isSelected(this.props.convDits.convId) ? 'selected' : ''}`}
				onClick={() => this.props.onConvSelect(this.props.convDits)}>
				{/* conversation profile image */}

				<Image
					avatar
					className='conv-profile-img'
					src={this.props.convDits.profileImg || require('../../../../static/images/blank_user_profile_image.jfif')}
				/>

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
