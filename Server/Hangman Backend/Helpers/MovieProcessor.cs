using Hangman_Backend.Configs;
using Hangman_Backend.Models;

namespace Hangman_Backend.Helpers
{
    public class MovieProcessor
    {
        public static void CreateNewRound(GameSession user,string movie)
        {
            var round = new GameRound(movie);
            user.errorBuffer = round.wrongBuffer;
            user.lives = round.lives;
            user.MovieName = round.movieName;
            user.Movie = round.movie;
            user.Template = round.template;
            user.isNumber = round.isNumber;
            user.startTime = round.startTime;
            user.endTime = round.endTime;

        }
        

        public static string UpdateTemplate(string movie, string template, char key)
        {
            for (int i = 0; i < movie.Length; i++)
            {
                if (movie[i] == key)
                {
                    char[] templateArray = template.ToCharArray();
                    templateArray[i] = key;
                    template = new string(templateArray);
                }
            }
            return template;
        }

        public static GameStatus ValidateKey(GameSession user, string key)

        {
            TimeSpan ts = (TimeSpan)(user.endTime - DateTime.UtcNow);
            var time = ts.TotalSeconds;
            if (time<0)
            {
                return GameStatus.TIMEOUT;
            }

            if (user.Movie.Contains(key))
            {
                user.Template = UpdateTemplate(user.Movie, user.Template, key[0]);
                if (!user.Template.Contains('_'))
                {
                    return GameStatus.WON;
                }
                else
                {
                    return GameStatus.CORRECT_GUESS;
                }
            }

            if (user.errorBuffer.Contains(key))
            {
                return GameStatus.ALREADY_ERROR_BUFF;
            }

            user.errorBuffer += key;
            user.lives -= 1;
            if (user.lives == 0)
            {
                return GameStatus.LOST;
            }
            else
            {
                return GameStatus.INCORRECT_GUESS;
            }
        }

       

        public static StatusFlag handleFlag(GameSession user, GameStatus FLAG, string key="")
        {
            StatusFlag Status = new StatusFlag(FLAG);

            switch (FLAG)
            {
                case GameStatus.TIMEOUT:
                case GameStatus.LOST:
                    user.isPlaying = false;
                    Status.movieName = user.MovieName;
                    break;

                case GameStatus.WON:
                    TimeSpan ts = (TimeSpan)(user.endTime - DateTime.UtcNow);
                    user.round++;
                    user.score += 10 + (int)Math.Round((double)((ts.TotalSeconds * user.round) / 4.0));
                    Status.movieName = user.MovieName;

                    break;

                case GameStatus.CORRECT_GUESS:
                    Status.template = user.Template;
                    break;

                case GameStatus.INCORRECT_GUESS:
                    Status.key = key; 
                    break;

                // For GameStatus.ALREADY_ERROR_BUFF
                
            }

            return Status;
        }
    }

       


    
}
