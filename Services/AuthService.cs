using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using TemplateTestJuly1st.Models;
using TemplateTestJuly1st.ViewModel;

namespace TemplateTestJuly1st.Service
{
  public class AuthService
  {
    private double jwtLifespan = 2592000;
    private string jwtSecret = "some really big random string";

    public object CreateAuthData(Teacher teacher)
    {
      var expirationTime = DateTime.UtcNow.AddSeconds(jwtLifespan);

      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(new[]
        {
            new Claim(ClaimTypes.Name, teacher.UserName),
            new Claim("id", teacher.Id.ToString())
        }),
        Expires = expirationTime,
        // new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256Signature)
        SigningCredentials = new SigningCredentials(
              new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret)),
              SecurityAlgorithms.HmacSha256Signature
          )
      };
      var tokenHandler = new JwtSecurityTokenHandler();
      var token = tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescriptor));

      return new AuthData
      {
        Token = token,
        TokenExpirationTime = ((DateTimeOffset)expirationTime).ToUnixTimeSeconds(),
        Id = teacher.Id,
        Teacher = teacher
      };
    }

    public string HashPassword(Teacher teacher, string passwordToHash)
    {
      return new PasswordHasher<Teacher>().HashPassword(teacher, passwordToHash);
    }

    public bool VerifyPassword(Teacher teacher, string providedPassword)
    {
      return new PasswordHasher<Teacher>().VerifyHashedPassword(teacher, teacher.PasswordHash, providedPassword) == PasswordVerificationResult.Success;
    }
  }
}