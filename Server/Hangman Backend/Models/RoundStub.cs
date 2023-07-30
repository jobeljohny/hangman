namespace Hangman_Backend.Models
{
    public class RoundStub
    {
        public string template { get; set; }
        public string errorBuffer { get; set; }
        public int? round { get; set; }
        public float? score { get; set; }
        public bool? isNumber { get; set; }
        public int? lives { get; set; }



        public RoundStub(GameSession session) {
            template = session.Template;
            errorBuffer = session.errorBuffer;
            round = session.round;
            score = session.score;
            isNumber = session.isNumber;
            lives = session.lives;
        }
    }
}
