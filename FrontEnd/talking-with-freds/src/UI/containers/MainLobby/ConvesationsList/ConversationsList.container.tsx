import React from 'react';
import './ConversationsList.container.scss';
import ConversationStore from '../../../../BL/stores/Conversation.store';
import ConversationModel from '../../../../common/models/Conversation.model';
import ConversationComponent from '../../../components/ConversationsList/Converation/Conversation.component';

interface IProps {}
interface IState {}

export default class ConversationsListContainer extends React.Component<IProps, IState> {
	public render() {
		return (
			<div className='conversations-list-wrapper'>
				{ConversationStore.getUserConversations().map((conversarion: ConversationModel) => {
					return <ConversationComponent convDits={conversarion} />;
				})}
			</div>
		);
	}
}
