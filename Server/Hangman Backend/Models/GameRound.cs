using Hangman_Backend.Configs;
using System.Text.RegularExpressions;

namespace Hangman_Backend.Models
{
    public class GameRound
    {
        public string movieName { get; set; }
        public string movie { get; set; }
        public string template { get; set; }
        public int lives { get; set; }
        public bool WIN { get; set; }
        public bool LOST { get; set; }
        public string wrongBuffer { get; set; }
        public bool isNumber { get; set; }    
        public DateTime startTime { get; set; }
        public DateTime endTime { get; set; }

        public GameRound() 
        {
            movieName = movieFetcher.getMovie();
            isNumber = ContainsNumber(movieName);
            setMovieAndTemplate();
            lives = GameConfig.LIVES;
            LOST = false;
            WIN = false;
            wrongBuffer = string.Empty;
            startTime = DateTime.UtcNow;
            endTime = DateTime.UtcNow.AddSeconds(GameConfig.GAME_TIME+10);
   
        }
        private void setMovieAndTemplate()
        {
             movie = "";
             template = "";
            string movieNameLower = movieName.ToLower();
            for (int i = 0; i < movieNameLower.Length; i++)
            {
                if (movieNameLower[i] == ' ')
                {
                    movie += "/";
                    template += "/";
                }
                else
                {
                    movie += movieNameLower[i].ToString();
                    template += "_";
                }
            }

            Random random = new Random();
            while (true)
            {
                int randomIndex = random.Next(0, movie.Length);
                char randomChar = movie[randomIndex];
                if (randomChar != '/')
                {
                    for (int i = 0; i < movie.Length; i++)
                    {
                        if (movie[i] == randomChar)
                        {
                            char[] templateArray = template.ToCharArray();
                            templateArray[i] = randomChar;
                            template = new string(templateArray);
                        }
                    }

                    break;
                }
            }
        }
        public static bool ContainsNumber(string input)
        {
            Regex regex = new Regex(@"\d");
            return regex.IsMatch(input);
        }

    }
}
