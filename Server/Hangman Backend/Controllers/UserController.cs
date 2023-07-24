using Hangman_Backend.Context;
using Hangman_Backend.Helpers;
using Hangman_Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Hangman_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private string symKey;
        private readonly AppDbContext _context;
        public UserController(AppDbContext appDbContext, IConfiguration configuration) {
            _context = appDbContext;
            _configuration = configuration;
            symKey=_configuration.GetValue<string>("SymmetricKey");
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] User userObj)
        {
            if (userObj == null)
            {
                return BadRequest();
            }

            var user = await _context.Users.FirstOrDefaultAsync(x => x.Username == userObj.Username);
            if(user == null)
                return NotFound(new { Message = "User not found",id="USER_NOT_FOUND" });

            if(!PasswordHasher.VerifyPassword(userObj.Password,user.Password))
            {
                return BadRequest(new { Message = "Invalid Credentials", id = "INVALID_PASSWORD" });
            }
            try
            {
                user.Token = CreateJwtToken(user);

                var newAccessToken = user.Token;
                var newRefreshToken = createRefreshToken();

                user.RefreshToken = newRefreshToken;
                user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(5);

                await _context.SaveChangesAsync();
                return Ok(new TokenApiDto()
                {
                    AccessToken = newAccessToken,
                    RefreshToken = newRefreshToken
                });
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
           

           
            
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegesiterUser([FromBody] User userObj)
        {
            if (userObj == null)
                return BadRequest();

            if(await CheckUserNameExistAsync(userObj.Username))
            {
                return BadRequest(new { Message = "Username already taken", id="USER_EXIST" });
            }

            userObj.Password = PasswordHasher.HashPassword(userObj.Password);
            userObj.Role = "user";
            userObj.Token = "";
            
            await _context.Users.AddAsync(userObj);

            var statObj = new UserStatistics() {
                Username = userObj.Username,
                FirstName=userObj.FirstName,
                LastName=userObj.LastName,
                HighestRound =0,
                Highscore =0,
                GamesPlayed = 0
            };

            await _context.UserStatistics.AddAsync(statObj);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                Message = "Registered Successfully"
            });
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh(TokenApiDto tokenApiDto) {
            if (tokenApiDto == null)
                return BadRequest("Invalid Client Request");
            string accessToken = tokenApiDto.AccessToken;
            string refreshToken = tokenApiDto.RefreshToken;
            var principal = GetPrincipleFromExpiredToken(accessToken);
            var username = principal.Identity.Name;
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
            if (user is null || user.RefreshToken != refreshToken || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
                return BadRequest("Invalid Request");
            var newAccessToken = CreateJwtToken(user);
            var newRefreshToken = createRefreshToken();
            user.RefreshToken = newRefreshToken;
            await _context.SaveChangesAsync();
            return Ok(
                new TokenApiDto()
                {
                    AccessToken = newAccessToken,
                    RefreshToken = newRefreshToken,
                }
            );

        }

        //ADMIN TOOLS
        [Authorize("AdminOnly")]
        [HttpDelete("{username}")]
        public async Task<IActionResult> DeleteUser(string username)
        {
            User userToDelete = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);

            if (userToDelete != null)
            {
                 _context.Users.Remove(userToDelete);
                UserStatistics userStat = await _context.UserStatistics.FirstOrDefaultAsync(u => u.Username == username);
                _context.UserStatistics.Remove(userStat);
                await _context.SaveChangesAsync();
                return Ok(new { Message = "User deleted successfully" });
            }
            else
            {
                return NotFound();
            }

            
        }

        

        private Task<bool> CheckUserNameExistAsync(string userName)
        {
            return _context.Users.AnyAsync(x => x.Username == userName);
        }

        private string CreateJwtToken(User user) {

            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(symKey);
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Role,user.Role),
                new Claim(ClaimTypes.Name,user.Username)
            });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);
            var tokenDescriptor = new SecurityTokenDescriptor{ Subject = identity,Expires=DateTime.UtcNow.AddMinutes(5),SigningCredentials = credentials};
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);

            return jwtTokenHandler.WriteToken(token);
        }

        private string createRefreshToken()
        {
            var tokenBytes = RandomNumberGenerator.GetBytes(64);
            var refreshToken = Convert.ToBase64String(tokenBytes);

            var tokenInUser = _context.Users.Any(a => a.RefreshToken == refreshToken);
            if(tokenInUser)
            {
                return createRefreshToken();
            }
            return refreshToken;

        }

        private ClaimsPrincipal GetPrincipleFromExpiredToken(string token)
        {
            var key = Encoding.ASCII.GetBytes(symKey);
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateLifetime = false
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters,out securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;
            if(jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256,StringComparison.InvariantCultureIgnoreCase)) {
                throw new SecurityTokenException("Invalid Token");
            }
            return principal;
        }
    }
}
