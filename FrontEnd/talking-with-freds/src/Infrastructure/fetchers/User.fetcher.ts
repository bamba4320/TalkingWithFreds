import BaseFetcher from './Base.fetcher';

class UserFetcher extends BaseFetcher {
    public async getUserFromAPI(){
        return this.get('/getUser');
    }

    public async getOtherUsers(){
        return this.get('/getFriends');
    }


}

export default new UserFetcher('user')