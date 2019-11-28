using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TalkingWithFreds.API.BLs;
using TalkingWithFredsAPI.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TalkingWithFreds.API.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private UserBL _userBL;
        public UserController(TalkingWithFredsContext context)
        {
            _userBL = new UserBL(context);
        }

        [HttpGet]
        [Route("ttt")]
        public string TestUser()
        {
            return _userBL.TestUser();
        }

        [HttpPost]
        [Route("AddUser")]
        public async Task<bool> AddUser([FromBody] Users user)
        {
            return await _userBL.AddUser(user);
        }

        [HttpGet]
        [Route("GetUser")]
        public Users GetUser()
        {
            return _userBL.GetUser();
        }
    }
}
