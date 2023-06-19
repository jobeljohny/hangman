import { GameConfig } from '../enums/config';

export class Round {
  movieName: string;
  movie: string[];
  template: string[];
  lives: any;
  WIN: boolean;
  LOST: boolean;
  timeLeft: any;
  wrongBuffer: string[];
  constructor(movieName: string) {
    this.movieName = movieName;
    this.lives = GameConfig.LIVES;
    this.timeLeft = GameConfig.GAME_TIME;
    this.LOST = false;
    this.WIN = false;
    this.wrongBuffer = [];
    [this.movie, this.template] = this.getMovieAndTemplate(this.movieName);
  }

  getMovieAndTemplate(movieName: string): [string[], string[]] {
    let movie = [];
    let template = [];
    let MovieNameLower = movieName.toLowerCase();
    for (var i = 0; i < MovieNameLower.length; i++) {
      if (MovieNameLower[i] == ' ') {
        movie.push('/');
        template.push('/');
      } else {
        movie.push(MovieNameLower[i]);
        template.push('-');
      }
    }
    while (true) {
      const randomChar = movie[Math.floor(Math.random() * movie.length)];
      if (randomChar != '/') {
        for (var i = 0; i < movie.length; i++) {
          if (movie[i] == randomChar) {
            template[i] = randomChar;
          }
        }
        break;
      }
    }
    return [movie, template];
  }
}
