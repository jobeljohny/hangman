using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace Hangman_Backend.Models
{
    public class GameSession
    {
        [Key]
        public string Username { get; set; }
        public bool isPlaying { get; set; }
        public string? MovieName { get; set; }
        public string? Movie { get; set; }
        public string? Template { get; set; }
        public bool? isNumber { get; set; }
        public int? lives { get; set; }
        public float? score { get; set; }
        public int? round { get; set; }
        public string? errorBuffer { get; set; }
        public DateTime? startTime { get; set; }
        public DateTime? endTime { get; set; }
        
        public GameSession(string Username)
        {
            this.Username = Username;
            isPlaying = false;
        }
    }
}
