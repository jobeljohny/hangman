using Hangman_Backend.Context;
using Hangman_Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hangman_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatisticsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public StatisticsController(AppDbContext appDbContext)
        {
            _context = appDbContext;
        }
        [Authorize]
        [HttpPut("updateStat")]
        public async Task<IActionResult> UpdateState([FromBody] UserStatistics userObj)
        {
             if (userObj == null)
                return BadRequest();

            var user = await _context.UserStatistics
                .FirstOrDefaultAsync(x => x.Username == userObj.Username);

            if (user == null)
                return NotFound(new { Message = "User not found", Id = "USER_NOT_FOUND" });
            
            UpdateUserStatistics(user, userObj);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return Conflict(new { Message = "Update conflict occurred" });
            }

            return Ok(new {Message = "user stat updated"});
        }

        private void UpdateUserStatistics(UserStatistics user, UserStatistics userObj)
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
