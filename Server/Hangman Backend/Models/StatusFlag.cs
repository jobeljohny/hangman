using Hangman_Backend.Configs;

namespace Hangman_Backend.Models
{
    public class StatusFlag
    {
        public GameStatus Flag { get; set; }
        public string? movieName { get; set; }
        public string? template { get; set; }

        public StatusFlag(GameStatus flag) {
            Flag = flag;
        }
    }
}
