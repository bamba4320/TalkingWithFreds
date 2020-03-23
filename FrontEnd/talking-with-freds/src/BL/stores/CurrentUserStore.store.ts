import UserFetcher from "../../Infrastructure/fetchers/User.fetcher";
import  {observable, computed, action } from "mobx";
import UserModel from "../../common/models/User.model";
import ConversationStore from "./Conversation.store";

export default class CurrentUserStore{
    @observable private currentUser:UserModel | null;

    private conversationStore:ConversationStore;


    constructor(convStore:ConversationStore){
        this.currentUser = null;
        this.conversationStore = convStore;
    }

    @computed
    public get isUserLoggedIn(){
        return this.currentUser !== null;
    }

    @action
    public async initUserFromAPI(){
        const authData = await UserFetcher.getUserFromAPI();
        const newUser = new UserModel();
        newUser.id = authData.id;
        newUser.email = authData.email;
        newUser.username = authData.usename;
        this.currentUser = newUser;
        this.conversationStore.initUserConversations();
        

    }
}