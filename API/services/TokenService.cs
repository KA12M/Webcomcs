using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace API.services
{
    public class TokenService
    {
        private readonly IConfiguration config;
        private readonly UserManager<AppUser> userManager;

        public TokenService(IConfiguration config, UserManager<AppUser> userManager)
        {
            this.config = config;
            this.userManager = userManager;
        }

        public async Task<string> CreateToken(AppUser user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["JWTSettings:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var claims = await BuildClaims(user);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                // Audience = config["JWTSettings:Audience"],
                // Issuer = config["JWTSettings:Issuer"],
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddHours(6),
                SigningCredentials = creds,
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        private async Task<List<Claim>> BuildClaims(AppUser user)
        {
            var roles = await userManager.GetRolesAsync(user);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Email, user.Email),
            };
            foreach (var role in roles) claims.Add(new Claim(ClaimTypes.Role, role));

            return claims;
        }

    }
}