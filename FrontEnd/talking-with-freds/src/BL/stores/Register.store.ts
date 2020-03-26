import LoginFetcher from "../../Infrastructure/fetchers/Login.fetcher";
import RegisterFetcher from "../../Infrastructure/fetchers/Register.fetcher";

export default class RegisterStore{
    public async addNewUser(email:string, username:string, password:string){
        return await RegisterFetcher.registerUser(email,username,password);
    }
}