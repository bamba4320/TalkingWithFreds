const _= require('lodash');
class socketManager{
    
    constructor(){
        // The socketCache array contains items as followed: {uid, socket} 
        this.socketCache = [];
    }

    findSocketById(uid){
        console.log(`looking for socket with id: ${uid}`);
        const find = _.find(this.socketCache, {uid});
        if(find){
            console.log(`socket with id of ${uid} has been found`);
            return find;
        }else{
            console.log(`socket with id of ${uid} has not been found`);
            return null;
        }

    }

}

module.export = new socketManager();