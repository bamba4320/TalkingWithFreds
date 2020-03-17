import BaseFetcher from './Base.fetcher';

export default class UserFetcher extends BaseFetcher {
    static routeBaseURL = '/user';

    public static async authenticateLogin(email:string, password:string){
        return await (await this.post('/login/authenticateLogin', {email:email, password:password})).data;
    }
}