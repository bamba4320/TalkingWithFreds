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
import {isNullOrUndefined} from 'util';

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
					<MoreOptionsMenuComponent />
				</div>
				<div className='conv-search-wrapper'>
					<Input fluid placeholder={'Search...'} onChange={(e) => this.setState({filter: e.target.value})} />
				</div>
				<div className='conversations-list-wrapper'>{this.renderConversations()}</div>
			</div>
		);
	}

	private renderConversations() {
		let key = 0;
		if (
			!isNullOrUndefined(conversationStore.getUserConversations) &&
			conversationStore.getUserConversations.length > 0
		) {
			return conversationStore.getUserConversations.map((conv) => {
				if (this.state.filter !== '') {
					if (conv.convName && conv.convName.toLowerCase().includes(this.state.filter.toLowerCase())) {
						return (
							<ConversationComponent
								convDits={conv}
								isSelected={this.isSelected}
								onConvSelect={this.onConvSelect}
								key={key++}
							/>
						);
					} else {
						return <div key={key++} />;
					}
				} else {
					return (
						<ConversationComponent
							convDits={conv}
							isSelected={this.isSelected}
							onConvSelect={this.onConvSelect}
							key={key++}
						/>
					);
				}
			});
		}
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
