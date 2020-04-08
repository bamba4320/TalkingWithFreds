const ConversationSchema = require('../../common/models/conversation.model');

class ConversationController{
    
    // find all the conversations thats the user is part of 
    async getUserConversations(uid){
        const conversations = await ConversationSchema.find({participants:uid})
        console.log(conversations);
    }
}

module.exports = new ConversationController();