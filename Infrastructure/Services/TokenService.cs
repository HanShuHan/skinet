using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Core.Entities.Identity;
using Core.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Infrastructure.Services;

public class TokenService : ITokenService
{
    private readonly IConfiguration _config;

    public TokenService(IConfiguration config)
    {
        _config = config;
    }

    public string CreateToken(AppUser user)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Token:Key"]));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature); 
        
        var claims = new List<Claim>
        {
            new(ClaimTypes.Email, user.Email)
        };
        
        var token = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Issuer = _config["Token:Issuer"],
            Audience = _config["Token:Audience"],
            TokenType = _config["Token:Type"],
            IssuedAt = DateTime.Now,
            Expires = DateTime.Now.AddSeconds(1),
            SigningCredentials = credentials
        };
        var tokenHandler = new JwtSecurityTokenHandler();

        return tokenHandler.WriteToken(tokenHandler.CreateToken(token));
    }
}