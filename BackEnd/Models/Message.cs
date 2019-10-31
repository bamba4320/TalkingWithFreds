using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TalkingWithFreds.API.Models
{
    public class Message
    {
        int    MessageId;             // The Message id from DB.
        int    MessageSenderId;       // The id of the sender User.
        int    MessageConversationId; // The id of the parent conversation
        string MessageContent;        // The message content. Stage 1 - support only text messages.
    }
}
