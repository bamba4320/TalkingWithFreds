using System;
using System.Collections.Generic;

namespace TalkingWithFredsAPI.Models
{
    public partial class Users
    {
        public Users()
        {
            ConvMessages = new HashSet<ConvMessages>();
            UserInConversation = new HashSet<UserInConversation>();
        }

        public int UId { get; set; }
        public string UUsername { get; set; }
        public string UPassword { get; set; }
        public string UEmail { get; set; }
        public string UNickname { get; set; }

        public ICollection<ConvMessages> ConvMessages { get; set; }
        public ICollection<UserInConversation> UserInConversation { get; set; }
    }
}
