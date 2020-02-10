import React from 'react';
import './ConversationsList.container.scss';
import ConversationStore from '../../../../BL/stores/Conversation.store';
import ConversationModel from '../../../../common/models/Conversation.model';
import ConversationComponent from '../../../components/ConversationsList/Converation/Conversation.component';
import './ConversationsList.container.scss';
import UserProfileComponent from '../../../components/UserProfile/userProfile.component';
import {Input} from 'semantic-ui-react';
import {observer} from 'mobx-react';

interface IProps {
	conversationStore: ConversationStore;
}
interface IState {
	selectedConv: string | null;
	filter: string;
}

@observer
export default class ConversationsListContainer extends React.Component<IProps, IState> {
	private conversationStore: ConversationStore;
	constructor(props: IProps) {
		super(props);
		this.state = {
			selectedConv: null,
			filter: '',
		};
		this.conversationStore = this.props.conversationStore;
	}
	public render() {
		return (
			<div className='left-sidebar-wrapper'>
				<div className='user-profile-wrapper'>
					<UserProfileComponent />
				</div>
				<div className='conv-search-wrapper'>
					<Input fluid placeholder={'Search...'} onChange={(e) => this.setState({filter: e.target.value})} />
				</div>
				<div className='conversations-list-wrapper'>
					{this.conversationStore.getUserConversations.map((conv) => {
						if (conv.convName.includes(this.state.filter)) {
							return (
								<ConversationComponent convDits={conv} isSelected={this.isSelected} onConvSelect={this.onConvSelect} />
							);
						}
					})}
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
