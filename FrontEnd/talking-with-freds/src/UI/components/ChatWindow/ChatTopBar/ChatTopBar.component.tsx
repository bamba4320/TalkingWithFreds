import React from 'react';
import {Image} from 'semantic-ui-react';
import './ChatTopBar.component.scss';

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
				<Image
					avatar
					src={this.props.chatImage || require('../../../../static/images/blank_user_profile_image.jfif')}
				/>
				<div className='conv-name-wrapper'>{this.props.convName}</div>
			</div>
		);
	}
}
