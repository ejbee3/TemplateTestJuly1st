using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TemplateTestJuly1st.Models;
using TemplateTestJuly1st.Service;
using TemplateTestJuly1st.ViewModel;
using templatetestjuly1st;

namespace TemplateTestJuly1st.Controllers
{
  [Route("auth")]
  [ApiController]
  public class AuthController : ControllerBase
  {

    private DatabaseContext _context;

    public AuthController(DatabaseContext context)
    {
      this._context = context;
    }

    [HttpPost("login")]
    public async Task<ActionResult> LoggingIn([FromBody] RegisterViewModel loginInfo)
    {
      var user = await _context.Teachers.FirstOrDefaultAsync(t => t.UserName == loginInfo.Email);
      if (user == null)
      {
        return Unauthorized();
      }
      else
      {
        if (new AuthService().VerifyPassword(user, loginInfo.Password))
        {
          // create a new token
          var rv = new AuthService().CreateAuthData(user);
          return Ok(rv);
        }
        else
        {
          return Unauthorized();
        }
      }
    }

    [HttpPost("register")]
    public async Task<ActionResult> Register([FromBody] RegisterViewModel registerInformation)
    {
      // check if the user exists
      var exists = await _context.Teachers.AnyAsync(u => u.UserName == registerInformation.Email);
      // if exists, return an error
      if (exists)
      {
        return BadRequest(new { message = "user with the email already exists" });
      }
      // else create a user
      var user = new Teacher
      {
        UserName = registerInformation.Email,
        Email = registerInformation.Email,
        FullName = registerInformation.FullName,
      };
      // hash password
      var hashed = new AuthService().HashPassword(user, registerInformation.Password);
      user.PasswordHash = hashed;
      _context.Teachers.Add(user);
      await _context.SaveChangesAsync();
      // return a token so the user can do user things
      var rv = new AuthService().CreateAuthData(user);
      return Ok(rv);
    }


  }
}