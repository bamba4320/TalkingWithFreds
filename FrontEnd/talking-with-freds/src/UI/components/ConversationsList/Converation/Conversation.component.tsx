import React from 'react';
import './Conversation.component.scss';
import {Image} from 'semantic-ui-react';
import ConversationModel from '../../../../common/models/Conversation.model';
import { observer } from 'mobx-react';
import { isNullOrUndefined } from 'util';

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
				<div className={`conv-profile-img-wrapper ${!isNullOrUndefined(this.props.convDits.profileImg) && this.props.convDits.profileImg !== '' ? '' : 'default-image'}`}>
					<div className='circular-image-wrapper'>
						<Image className='conv-profile-img' src={this.props.convDits.profileImg || require('../../../../static/images/blank_user_profile_image.jfif')} />
						{/* // TODO: start apache / iis web server (site) and use it to get images convs and users  */}
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
