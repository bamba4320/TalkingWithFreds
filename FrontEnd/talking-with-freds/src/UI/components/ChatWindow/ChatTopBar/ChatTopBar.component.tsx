import React from 'react';
import './ChatTopBar.component.scss';
import {Image} from 'semantic-ui-react';

interface IProps {
	convName: string;
	isGroup: boolean;
	groupMembers?: string[];
	chatImage: string;
}
interface IState {}

export default class ChatTopBarComponent extends React.Component<IProps, IState> {
	public render() {
		return (
			<div className='top-bar-wrapper'>
				<div className='chat-img-wrapper'>
					<div className='circular-image-wrapper'>
						<Image className='chat-img' src={require(this.props.chatImage)} />
					</div>
				</div>
			</div>
		);
	}
}
