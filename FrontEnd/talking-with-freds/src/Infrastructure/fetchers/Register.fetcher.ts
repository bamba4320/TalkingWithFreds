import BaseFetcher from './Base.fetcher';

class RegisterFetcher extends BaseFetcher{
    public async registerUser(email:string, username:string, password:string){
        return this.post('/',{email, username, password});
    }
}
export default new RegisterFetcher('register');