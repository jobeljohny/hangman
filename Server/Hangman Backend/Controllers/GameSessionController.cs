using Hangman_Backend.Configs;
using Hangman_Backend.Context;
using Hangman_Backend.Helpers;
using Hangman_Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Hangman_Backend.Controllers
{
    public class Key
    {
        public string k { get; set; }
    }


    [Route("api/[controller]")]
    [ApiController]
    public class GameSessionController : ControllerBase
    {

        private readonly AppDbContext _context;
        public GameSessionController(AppDbContext appDbContext)
        {
            _context = appDbContext;
        }

        [Authorize]
        [HttpPut("initializeSession")]
        public async Task<IActionResult> initializeSession()
        {
            
            var username = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name).Value;
 
            var user = await _context.gameSessions
                    .FirstOrDefaultAsync(x=>x.Username == username);
            if (user == null)
                return NotFound(new { Message = "User not found", Id = "USER_NOT_FOUND" });

            user.isPlaying = true;
            user.round = 1;
            user.score = 0;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return Conflict(new { Message = "Update conflict occurred" });
            }

            return Ok(new { Message = "session initialized" });
        }

        [Authorize]
        [HttpPut("newRound")]
        public async Task<IActionResult> newRound()
        {

            var username = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name).Value;

            var user = await _context.gameSessions
                    .FirstOrDefaultAsync(x => x.Username == username);
            if (user == null)
                return NotFound(new { Message = "User not found", Id = "USER_NOT_FOUND" });

            if (!user.isPlaying)
            {
                return BadRequest(new { Message = "Invalid Session" });
            }
            MovieProcessor.CreateNewRound(user);
            try
            {
                await _context.SaveChangesAsync();
                return Ok(new RoundStub(user));
            }
            catch (DbUpdateConcurrencyException)
            {
                return Conflict(new { Message = "Update conflict occurred" });
            }

        }

        [Authorize]
        [HttpPut("validateKey")]
        public async Task<IActionResult> ValidateKey([FromBody] Key key)
        {

            var username = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name).Value;

            var user = await _context.gameSessions
                    .FirstOrDefaultAsync(x => x.Username == username);
            if (user == null)
                return NotFound(new { Message = "User not found", Id = "USER_NOT_FOUND" });

            if (!user.isPlaying)
            {
                return BadRequest(new { Message = "Invalid Session" });
            }

            GameStatus status = MovieProcessor.ValidateKey(user, key.k);
            StatusFlag FlagStub = MovieProcessor.handleFlag(user,status);

            await _context.SaveChangesAsync();
            return Ok(FlagStub);
        }

        private static void UpdateUserStatistics(UserStatistics user, UserStatistics userObj)
        {
            user.GamesPlayed++;

            if (userObj.HighestRound > user.HighestRound)
            {
                user.HighestRound = userObj.HighestRound;
            }

            if (userObj.Highscore > user.Highscore)
            {
                user.Highscore = userObj.Highscore;
            }
        }
    }
    
}
