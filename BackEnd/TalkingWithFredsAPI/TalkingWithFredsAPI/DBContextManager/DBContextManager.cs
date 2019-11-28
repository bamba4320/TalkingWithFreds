using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TalkingWithFredsAPI.Models;

namespace TalkingWithFredsAPI.DBContextManager
{
    public class DBContextManager
    {
        private readonly TalkingWithFredsContext _context;

        public DBContextManager(TalkingWithFredsContext context)
        {
            _context = context;
        }

        #region USER
        public List<Users> getUsers()
        {
            return _context.Users.ToList();
        }

        public async Task<bool> AddUser(Users userToAdd)
        {
            try
            {
                await _context.AddAsync(userToAdd);
                await _context.SaveChangesAsync();
                return true;
            }catch(Exception ex)
            {
                throw ex;
            }
        }

        #endregion
    }
}
