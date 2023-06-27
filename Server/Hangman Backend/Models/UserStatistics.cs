using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hangman_Backend.Models
{
    public class UserStatistics
    {
        [Key]
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; } 
        public int? Highscore { get; set; }
        public int? HighestRound { get; set; }
        public int? GamesPlayed { get; set; }

    }
}
