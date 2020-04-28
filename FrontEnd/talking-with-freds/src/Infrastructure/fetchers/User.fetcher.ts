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

    public async updateUser(newUsername:string, profileImage:number){
        return this.post('/updateUser',{newUsername, profileImage});
    }

    // TODO: add fetch for all photos url for user and in conversation fetcher for conv update and create

}

export default new UserFetcher('user')