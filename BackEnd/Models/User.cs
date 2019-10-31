using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TalkingWithFreds.API.Models
{
    public class User
    {
        int       UserId;               // The user id from DB. 
        string    UserUsername;         // The user login username
        string    UserPassword;         // The user login password.
        string    UserEmail;            // The User Email.
        string    UserNickname;         // The name that will be displayed to other players.
        List<int> UserConversationsIds; // List of all User conversations.

    }
}
