using System;
using System.Collections.Generic;

namespace TalkingWithFredsAPI.Models
{
    public partial class Conversations
    {
        public Conversations()
        {
            ConvMessages = new HashSet<ConvMessages>();
            UserInConversation = new HashSet<UserInConversation>();
        }

        public int ConvId { get; set; }
        public bool? IsGroup { get; set; }
        public string ConvName { get; set; }

        public ICollection<ConvMessages> ConvMessages { get; set; }
        public ICollection<UserInConversation> UserInConversation { get; set; }
    }
}
