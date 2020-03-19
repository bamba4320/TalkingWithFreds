import UserFetcher from "../../Infrastructure/fetchers/User.fetcher";
import  {observable, computed, action } from "mobx";
import UserModel from "../../common/models/User.model";

export default class CurrentUserStore{
    @observable private currentUser:UserModel | null;

    constructor(){
        this.currentUser = null;
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
    }
}