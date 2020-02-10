
import ConversationFetcher from '../../Infrastructure/fetchers/Conversation.fetcher';
import {observable, action, computed} from 'mobx';
import ConversationModel from '../../common/models/Conversation.model';

export default class ConversationStore{

    @observable
    private currentUserConversations:ConversationModel[];
    
    constructor(){
        this.currentUserConversations = [];
    }

    @action
    public async initUserConversations(){
        this.currentUserConversations = await ConversationFetcher.getUserConversations();
    }

    @computed
    get getUserConversations(){
        return this.currentUserConversations;
    }
}