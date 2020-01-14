
import ConversationFetcher from '../../Infrastructure/fetchers/Conversation.fetcher';

export default class ConversationStore{
    public static getUserConversations(){
        return ConversationFetcher.getUserConversations();
    }
}