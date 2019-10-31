using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TalkingWithFreds.API.Models
{
    public class Conversation
    {
        int       ConversationId;       // The conversation id from DB.
        string    ConversationName;     // The conversation name. If conversation is not a group: empty.
        bool      IsGroup;              // Flag to indeicate weather the conversation is group or not.
        List<int> ConversationUsersIds; // List of all participats users ids.
    }
}
