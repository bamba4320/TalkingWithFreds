import BaseFetcher from './Base.fetcher';

class UserFetcher extends BaseFetcher {
    public async getUserFromAPI(){
        return this.get('/getUser');
    }
}

export default new UserFetcher('user')