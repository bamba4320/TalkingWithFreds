using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TalkingWithFreds.API.ExternalModules
{
    public class ConstValues
    {
        // sql connection string
        public static string ConnectionString = "Data Source=DESKTOP-N7FPIC6;initial Catalog=TalkingWithFreds;Integrated Security=SSPI";

        // DataBase tables names
        public enum TablesNames { USERS, CONVERSATIONS, MESSAGES, USER_IN_CONVERSATION};
        public static Dictionary<TablesNames, string> Tables = new Dictionary<TablesNames, string>
        {
            { TablesNames.USERS               , "dbo.Users"              },
            { TablesNames.CONVERSATIONS       , "dbo.Conversations"      },
            { TablesNames.MESSAGES            , "dbo.ConvMessages"       },
            { TablesNames.USER_IN_CONVERSATION, "dbo.UserInConversation" },
        };

        // DataBase tables properties names

        // User Properties
        public enum UserProperties { ID, USERNAME, PASSWORD, EMAIL, NICKNAME };
        public static Dictionary<UserProperties, string> DBUserProperties = new Dictionary<UserProperties, string>
        {
            { UserProperties.ID      , Tables[TablesNames.USERS]+".u_id"       },
            { UserProperties.USERNAME, Tables[TablesNames.USERS]+".u_username" },
            { UserProperties.PASSWORD, Tables[TablesNames.USERS]+".u_password" },
            { UserProperties.EMAIL   , Tables[TablesNames.USERS]+".u_email"    },
            { UserProperties.NICKNAME, Tables[TablesNames.USERS]+".u_nickname" }
        };

        // Conversation Properties
        public enum ConversationProperties { ID, NAME, IS_GROUP};
        public static Dictionary<ConversationProperties, string> DBConversationProperties = new Dictionary<ConversationProperties, string>
        {
            { ConversationProperties.ID      , Tables[TablesNames.CONVERSATIONS]+".conv_id"   },
            { ConversationProperties.NAME    , Tables[TablesNames.CONVERSATIONS]+".conv_name" },
            { ConversationProperties.IS_GROUP, Tables[TablesNames.CONVERSATIONS]+".is_group"  },
        };

        // Message Properties
        public enum MessagesProperties { ID, SENDER, CONVERSATION, SEND_TIME, CONTENT };
        public static Dictionary<MessagesProperties, string> DBMessagesProperties = new Dictionary<MessagesProperties, string>
        {
            {MessagesProperties.ID          , Tables[TablesNames.MESSAGES]+".message_id"           },
            {MessagesProperties.SENDER      , Tables[TablesNames.MESSAGES]+".sender_id"            },
            {MessagesProperties.CONVERSATION, Tables[TablesNames.MESSAGES]+".conv_id"              },
            {MessagesProperties.SEND_TIME   , Tables[TablesNames.MESSAGES]+".message_sending_time" },
            {MessagesProperties.CONTENT     , Tables[TablesNames.MESSAGES]+".message_content"      },
        };

        // User In Conversation Properties
        public enum UserInConverstionProperties { CONVERSATION_ID, USER_ID, IS_ADMIN};
        public static Dictionary<UserInConverstionProperties, string> DBUserInConversationProperties = new Dictionary<UserInConverstionProperties, string>
        {
            { UserInConverstionProperties.CONVERSATION_ID, Tables[TablesNames.USER_IN_CONVERSATION]+".conv_id"  },
            { UserInConverstionProperties.USER_ID        , Tables[TablesNames.USER_IN_CONVERSATION]+".u_id"     },
            { UserInConverstionProperties.IS_ADMIN       , Tables[TablesNames.USER_IN_CONVERSATION]+".is_admin" },
        };
    }
}
