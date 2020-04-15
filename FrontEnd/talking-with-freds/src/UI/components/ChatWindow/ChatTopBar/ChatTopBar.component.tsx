import React from 'react';
import './ChatTopBar.component.scss';
import {Image} from 'semantic-ui-react';
import {isNullOrUndefined} from 'util';

interface IProps {
	convName?: string;
	isGroup: boolean;
	groupMembers?: string[];
	chatImage?: string;
}
interface IState {}

export default class ChatTopBarComponent extends React.Component<IProps, IState> {
	public render() {
		return (
			<div className='top-bar-wrapper'>
				<div
					className={`chat-img-wrapper ${
						!isNullOrUndefined(this.props.chatImage) && this.props.chatImage !== '' ? '' : 'default-image'
					}`}>
					<div className='circular-image-wrapper'>
						<Image
							className='chat-img'
							src={this.props.chatImage || require('../../../../static/images/blank_user_profile_image.jfif')}
						/>
					</div>
				</div>
				<div className='conv-name-wrapper'>{this.props.convName}</div>
			</div>
		);
	}
}
