import BaseFetcher from './Base.fetcher';

class UserFetcher extends BaseFetcher {
    public async getUserFromAPI(){
        return this.get('/getUser');
    }

    public async getOtherUsers(){
        return this.get('/getFriends');
    }

    public async changeUserPassword(oldPassword:string, newPassword:string){
        return this.post('/changePassword',{oldPassword, newPassword});
    }


}

export default new UserFetcher('user')