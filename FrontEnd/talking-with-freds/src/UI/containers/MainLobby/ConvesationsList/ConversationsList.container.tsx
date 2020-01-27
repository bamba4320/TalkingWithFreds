import React from 'react';
import './ConversationsList.container.scss';
import ConversationStore from '../../../../BL/stores/Conversation.store';
import ConversationModel from '../../../../common/models/Conversation.model';
import ConversationComponent from '../../../components/ConversationsList/Converation/Conversation.component';
import './ConversationsList.container.scss';
import UserProfileComponent from '../../../components/UserProfile/userProfile.component';
import {Input} from 'semantic-ui-react';

interface IProps {}
interface IState {}

export default class ConversationsListContainer extends React.Component<IProps, IState> {
	public render() {
		return (
			<div className='left-sidebar-wrapper'>
				<div className='user-profile-wrapper'>
					<UserProfileComponent />
				</div>
				<div className='conv-search-wrapper'>
					<Input fluid placeholder={'Search...'} />
				</div>
				<div className='conversations-list-wrapper'>
					{ConversationStore.getUserConversations().map((conversarion: ConversationModel) => {
						return <ConversationComponent convDits={conversarion} />;
					})}
				</div>
			</div>
		);
	}
}
