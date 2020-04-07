import {observer} from 'mobx-react';
import React from 'react';
import {Input} from 'semantic-ui-react';
import rootStores from '../../../../BL/stores';
import {CONVERSATION_STORE} from '../../../../BL/stores/storesKeys';
import ConversationModel from '../../../../common/models/Conversation.model';
import ConversationComponent from '../../../components/ConversationsList/Converation/Conversation.component';
import UserProfileComponent from '../../../components/UserProfile/userProfile.component';
import './ConversationsList.container.scss';
import MoreOptionsMenuComponent from '../../../components/MoreOptionsMenu/MoreOptionsMenu.component';

const conversationStore = rootStores[CONVERSATION_STORE];
interface IProps {}
interface IState {
	selectedConv?: string;
	filter: string;
}

@observer
export default class ConversationsListContainer extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			selectedConv: undefined,
			filter: '',
		};
	}
	public render() {
		return (
			<div className='left-sidebar-wrapper'>
				<div className='left-sidebar-top-bar-wrapper'>
					<div className='user-profile-wrapper'>
						<UserProfileComponent />
					</div>
					<MoreOptionsMenuComponent/>
				</div>
				<div className='conv-search-wrapper'>
					<Input fluid placeholder={'Search...'} onChange={(e) => this.setState({filter: e.target.value})} />
				</div>
				<div className='conversations-list-wrapper'>
					{conversationStore.getUserConversations.map((conv) => {
						console.log(conv, this.state.filter);
						if (this.state.filter !== '') {
							if (conv.convName && conv.convName.includes(this.state.filter)) {
								return (
									<ConversationComponent
										convDits={conv}
										isSelected={this.isSelected}
										onConvSelect={this.onConvSelect}
									/>
								);
							} else {
								return <div />;
							}
						} else {
							return (
								<ConversationComponent convDits={conv} isSelected={this.isSelected} onConvSelect={this.onConvSelect} />
							);
						}
					})}
				</div>
			</div>
		);
	}

	public onConvSelect = (convDits: ConversationModel) => {
		if (this.state.selectedConv !== convDits.convId) {
			conversationStore.selectConversation(convDits);
			this.setState({selectedConv: convDits.convId});
		}
	};

	public isSelected = (convId: string) => {
		if (this.state.selectedConv && convId) {
			return this.state.selectedConv === convId;
		}
	};
}
