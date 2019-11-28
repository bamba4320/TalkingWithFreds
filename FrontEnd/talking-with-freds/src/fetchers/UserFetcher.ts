import BaseFetcher from './BaseFetcher';

export default class UserFetcher{

    public static testUser(){
        return BaseFetcher.get('/TestUser');
    }
}
