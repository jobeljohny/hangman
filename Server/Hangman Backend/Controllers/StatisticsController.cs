using Hangman_Backend.Context;
using Hangman_Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

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
            var username = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name).Value;
            var user = await _context.UserStatistics
                .FirstOrDefaultAsync(x => x.Username == username);
           
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

            return Ok(new { Message = "user stat updated" });
        }

        [HttpGet("leaderboard")]
        public async Task<ActionResult<UserStatistics>> GetLeaderBoard()
        {
            var leaderBoard = await _context.UserStatistics
                .OrderByDescending(s => s.Highscore)
                .Take(50).ToListAsync();

            return Ok(leaderBoard);
        }

        [Authorize]
        [HttpGet("getUserStat")]
        public async Task<ActionResult<Stats>> GetUserStat(string username)
        {
            var userObj =  await _context.UserStatistics
                        .Where(x => x.Username == username).FirstOrDefaultAsync();

            var rank =  await _context.UserStatistics
                .Where(s => s.Username == username)
                .Select(s => _context.UserStatistics.Count(st => st.Highscore > s.Highscore) + 1)
                .FirstOrDefaultAsync();

            var statObj = new Stats
            {
                statistics = userObj,
                rank = rank,
            };
            return Ok(statObj);
        }

        //ADMIN TOOLS
        [Authorize("AdminOnly")]
        [HttpPost("resetStatistics")]
        public async Task<IActionResult> resetStatistics()
        {
            List<UserStatistics> userStatisticsList =await _context.UserStatistics.ToListAsync();

            if (userStatisticsList.Any())
            {
                foreach (UserStatistics userStatistics in userStatisticsList)
                {
                    userStatistics.HighestRound = 0;
                    userStatistics.Highscore = 0;
                    userStatistics.GamesPlayed = 0;
                }

                await _context.SaveChangesAsync();

                return Ok(new { Message = "All users reset successfully" });
            }

            return NotFound(new {Message= "No users found" });
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
