import CurrentUserStore from "./CurrentUserStore.store";
import UserFetcher from "../../Infrastructure/fetchers/User.fetcher";

export default class AuthStore{
    private currentUserStore:CurrentUserStore;
    constructor(currentUserStore:CurrentUserStore){
        this.currentUserStore = currentUserStore;
    }

    public async authenticateLogin(username:string, password:string){
        const user = await UserFetcher.authenticateLogin(username, password);
    }
}