export enum GameConfig {
  LIVES = 6,
  GAME_TIME = 600,
}

export enum Vals {
  ERROR = '#FF0000',
  CORRECT = '#32CD32',
  BLACK = '#000000',
  WHITE = '#FFFFFF',
  NORMAL = WHITE,
  PANEL_DEFAULT_MSG = 'Press the key you wish to guess !',
  CORRECT_MSG = 0,
  INCORRECT_MSG = 1,
  ERRORLIST_MSG = 2,
  BLINK_TIMER = 600,
}
export enum Result {
  PASSED = 'PASSED',
  FAILED = 'FAILED',
}

export enum Login {
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNIN',
}

export const tips = [
  'Use process of elimination to narrow down your guesses',
  "Remember, guessing ' Shrek ' for every movie won't work, but it's worth a shot",
  "Don't stress if you can't solve it. Even Leonardo DiCaprio didn't win an Oscar on his first try",
  'ensure that you are logged in to update your stats and ascend the leaderboard 🏆',
  'Keep practicing to improve your guessing skills',
  'Take your time, but keep an eye on the timer ⏰ for an added challenge',
  '⚠️ Warning : Excessive movie trivia knowledge acquired from this game may result in being the designated film buff in your friend group',
  'Found a bug? Report it in About session and we will squish it, gently',
  "If you're feeling lucky, try guessing ' The Hangover ' - it's a great excuse for any incorrect answer",
  'When in doubt, close your eyes, spin around three times, and randomly tap the keyboard. You never know, you might stumble upon the correct movie title',
  "Fun fact 💡: The true purpose of this game is to make you appreciate movie titles and realize how weird they can be. You're welcome.",
  "Don't stress if you're on a losing streak. We guarantee you'll have a better success rate in guessing movies than predicting the weather.",
  "If you're feeling adventurous, try guessing a movie title backwards. It won't help, but it'll definitely confuse your friends",
  'In case of frustration 😤, take a deep breath and repeat after us: "It\'s just a game"',
  "Feeling like a rebel? Guess ' Fight Club ' and break the first and second rules simultaneously.",
];
export const keyMap = {
  numRow: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  topRow: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  middleRow: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  bottomRow: ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
};

export interface keyState {
  key: string;
  enabled: boolean;
}
export interface keySet {
  numbers: keyState[];
  topRow: keyState[];
  middleRow: keyState[];
  bottomRow: keyState[];
}
