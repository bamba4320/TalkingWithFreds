using System;
using System.Collections.Generic;

namespace TalkingWithFredsAPI.Models
{
    public partial class UserInConversation
    {
        public int ConvId { get; set; }
        public int UId { get; set; }
        public bool? IsAdmin { get; set; }

        public Conversations Conv { get; set; }
        public Users U { get; set; }
    }
}
