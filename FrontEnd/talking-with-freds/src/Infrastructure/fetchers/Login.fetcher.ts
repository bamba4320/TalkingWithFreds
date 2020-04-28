import BaseFetcher from "./Base.fetcher";

class LoginFetcher extends BaseFetcher{
    public async authenticateLogin(email:string, password:string){
        return this.post('/authenticateLogin', {email:email, password:password});
    }

    public async recoverPassword(email:string){
        return this.post('/recoverPassword',{email});
    }
}
export default new LoginFetcher('login');