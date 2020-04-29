import BaseFetcher from './Base.fetcher';

class RegisterFetcher extends BaseFetcher{
    public async registerUser(email:string, username:string, password:string, selectedImageNumber:number){
        return this.post('/',{email, username, password, selectedImageNumber});
    }
}
export default new RegisterFetcher('register');