import React from 'react';
import './ConversationsList.container.scss';
import ConversationStore from '../../../../BL/stores/Conversation.store';
import ConversationModel from '../../../../common/models/Conversation.model';
import ConversationComponent from '../../../components/ConversationsList/Converation/Conversation.component';
import './ConversationsList.container.scss';
import UserProfileComponent from '../../../components/UserProfile/userProfile.component';
import {Input} from 'semantic-ui-react';

interface IProps {}
interface IState {
	selectedConv: string | null;
}

export default class ConversationsListContainer extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			selectedConv: null,
		};
	}
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
					{ConversationStore.getUserConversations().map((conversarion: ConversationModel) => (
						<ConversationComponent
							convDits={conversarion}
							onConvSelect={this.onConvSelect}
							isSelected={this.isSelected}
						/>
					))}
				</div>
			</div>
		);
	}

	public onConvSelect = (convId: string) => {
		if (this.state.selectedConv !== convId) {
			this.setState({selectedConv: convId});
		}
	};

	public isSelected = (convId: string) => {
		if (this.state.selectedConv && convId) {
			return this.state.selectedConv === convId;
		}
	};
}
