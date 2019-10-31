using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using TalkingWithFreds.API.ExternalModules;

namespace TalkingWithFreds.API.BLs
{
    public class UserBL
    {

        /// <summary>
        /// Varify Login inputs vs DataBase
        /// </summary>
        /// <param name="LoginInput">given Username or email</param>
        /// <param name="password"> given password </param>
        /// <returns> is valid user </returns>
        public bool AuthenticateLogin(string LoginInput, string password)
        {
            return AuthenticateEmail(LoginInput, password) || AuthenticateUsername(LoginInput, password);
        }

        /// <summary>
        /// valid email login
        /// </summary>
        /// <param name="email"> input email</param>
        /// <param name="password">input password</param>
        /// <returns> is exist</returns>
        private bool AuthenticateEmail(string email, string password)
        {
            try
            {
                return SQLCommunicator.Select(
                    ConstValues.DBUserProperties[ConstValues.UserProperties.ID], 
                    ConstValues.Tables[ConstValues.TablesNames.USERS], 
                    $"where {ConstValues.DBUserProperties[ConstValues.UserProperties.EMAIL]} = {email} and {ConstValues.DBUserProperties[ConstValues.UserProperties.PASSWORD]} = {password}")
                    .Tables[0].Rows.Count > 0;
         
            }
            catch (Exception ex) { throw ex; }
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="username">input username</param>
        /// <param name="password">input password</param>
        /// <returns> is exist </returns>
        private bool AuthenticateUsername(string username, string password)
        {
            try
            {
                return SQLCommunicator.Select(
                    ConstValues.DBUserProperties[ConstValues.UserProperties.ID],
                    ConstValues.Tables[ConstValues.TablesNames.USERS],
                    $"where {ConstValues.DBUserProperties[ConstValues.UserProperties.USERNAME]} = {username} and {ConstValues.DBUserProperties[ConstValues.UserProperties.PASSWORD]} = {password}")
                    .Tables[0].Rows.Count > 0;

            }
            catch (Exception ex) { throw ex; }
        }

    }
}
