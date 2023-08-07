using Hangman_Backend.Configs;
using Hangman_Backend.Context;
using Hangman_Backend.Helpers;
using Hangman_Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Hangman_Backend.Services;

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
        private readonly IGameSessionService _gameSessionService;
        public GameSessionController(IGameSessionService gameSessionService,AppDbContext appDbContext)
        {
            _context = appDbContext;
            _gameSessionService = gameSessionService;
        }

        private string GetUsername() => User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value;

        [Authorize]
        [HttpPut("initializeSession")]
        public async Task<IActionResult> initializeSession()
        {

            var username = GetUsername();
            var user = new GameSession(username);

            if (user == null)
                return NotFound(new { Message = "User not found", Id = "USER_NOT_FOUND" });

            _gameSessionService.StoreGameSession(user);
            return Ok(new { Message = "session initialized" });
        }

        [Authorize]
        [HttpPut("gameTimeout")]
        public async Task<IActionResult> gameTimeout()
        {

            var username = GetUsername();
            var user = _gameSessionService.RetrieveGameSession(username);

            if (user == null)
                return NotFound(new { Message = "User not found", Id = "USER_NOT_FOUND" });

            StatusFlag FlagStub = MovieProcessor.handleFlag(user, GameStatus.TIMEOUT);
            _gameSessionService.RemoveGameSession(username);

            return Ok(FlagStub);
        }

        [Authorize]
        [HttpPut("newRound")]
        public async Task<IActionResult> newRound()
        {
            var username = GetUsername();
            var user = _gameSessionService.RetrieveGameSession(username);
            
            if (user == null)
                return NotFound(new { Message = "User not found", Id = "USER_NOT_FOUND" });

            if (!user.isPlaying)
                return BadRequest(new { Message = "Invalid Session" });
            

            MovieProcessor.CreateNewRound(user, getRandomMovie());   
            _gameSessionService.StoreGameSession(user);

            return Ok(new RoundStub(user));

        }

        [Authorize]
        [HttpPut("validateKey")]
        public async Task<IActionResult> ValidateKey([FromBody] Key key)
        {

            var username = GetUsername();
            var user = _gameSessionService.RetrieveGameSession(username);

            if (user == null)
                return NotFound(new { Message = "User not found", Id = "USER_NOT_FOUND" });

            if (!user.isPlaying)
                return BadRequest(new { Message = "Invalid Session" });
            

            var status = MovieProcessor.ValidateKey(user, key.k);
            var flagStub = MovieProcessor.handleFlag(user, status, key.k);
            _gameSessionService.StoreGameSession(user);

            if (status == GameStatus.WON)
            {
                var statUser = await _context.UserStatistics.FirstOrDefaultAsync(x => x.Username == username);
                UpdateUserStatistics(statUser, user);
                await _context.SaveChangesAsync();
            }
            else if(status == GameStatus.LOST || status == GameStatus.TIMEOUT)
            {
                _gameSessionService.RemoveGameSession(username);
            }

            return Ok(flagStub);
        }



        private static void UpdateUserStatistics(UserStatistics user, GameSession userObj)
        {
            user.GamesPlayed++;

            if (userObj.round > user.HighestRound)
                user.HighestRound = userObj.round;

            if (userObj.score > user.Highscore)
                user.Highscore = (int)userObj.score;  
        }

        private string getRandomMovie()
        {
            var movieCount = _context.movieFetcher.Count();
            var randomIndex = new Random().Next(0, movieCount);
            var fetcher =  _context.movieFetcher.Skip(randomIndex).FirstOrDefault();

            return fetcher.movie;
        }

       
    }
    
}
