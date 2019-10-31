using System;
using System.Collections.Generic;

namespace TalkingWithFredsAPI.Models
{
    public partial class ConvMessages
    {
        public int MessageId { get; set; }
        public int SenderId { get; set; }
        public int ConvId { get; set; }
        public DateTime MessageSendingTime { get; set; }
        public string MessageContent { get; set; }

        public Conversations Conv { get; set; }
        public Users Sender { get; set; }
    }
}
