
import ConversationFetcher from '../../Infrastructure/fetchers/Conversation.fetcher';
import {observable, action, computed} from 'mobx';
import ConversationModel from '../../common/models/Conversation.model';

export default class ConversationStore{

    @observable
    private currentUserConversations:ConversationModel[];

    @observable
    private currentSelectedConversation:ConversationModel | null;
    
    constructor(){
        this.currentUserConversations = [];
        this.currentSelectedConversation = null;
    }

    @action
    public async initUserConversations(){
        this.currentUserConversations = await ConversationFetcher.getUserConversations();
    }

    @action
    public selectConversation(conv:ConversationModel){
        this.currentSelectedConversation = conv;
    }

    @action
    public cleanConversations(){
        this.currentUserConversations = [];
        this.currentSelectedConversation = null;
    }


    @computed
    get getUserConversations(){
        return this.currentUserConversations;
    }

    @computed
    get getCurrentSelectedConversation(){
        return this.currentSelectedConversation;
    }
}