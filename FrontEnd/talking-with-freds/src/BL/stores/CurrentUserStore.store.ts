import UserFetcher from "../../Infrastructure/fetchers/User.fetcher";
import  {observable, computed } from "mobx";
import UserModel from "../../common/models/User.model";

export default class CurrentUserStore{
    @observable private currentUser:UserModel | null;

    constructor(){
        this.currentUser = null;
    }

    @computed
    public isUserLoggedIn(){
        return this.currentUser !== null;
    }
}