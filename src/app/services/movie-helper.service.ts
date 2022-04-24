import { Injectable } from '@angular/core';
import { Vals } from '../enums/config';

@Injectable({
  providedIn: 'root',
})
export class MovieHelperService {
  private movie: string[] = [];
  constructor() {}

  getMovieAndTemplate(movieName: string): [string[], string[]] {
    let movie = [];
    let template = [];
    let MovieNameLower = movieName.toLowerCase();
    //setHangImage(lives);
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
    this.movie = movie;
    return [movie, template];
  }
  setPanelMsg(type: any,value: string, ): string {
    switch (type) {
      case Vals.CORRECT:
        return this.gbu(value) + ' is a correct guess ' + Vals.SMILE_EMOJI;
      case Vals.INCORRECT_MSG:
        return this.gbu(value) + ' is an incorrect guess ' + Vals.CONF_EMOJI;
      case Vals.ERRORLIST_MSG:
        return this.gbu(value) + ' is already in the error list';
      case Vals.WIN_MSG:
        return "You Won!  "+Vals.SMILE_EMOJI+" Yes, The Movie was " + this.gb(value)
      case Vals.LOST_MSG:
        return "You lost "+Vals.CONF_EMOJI+", The Movie was " + this.gb(value)
      default:
        return '';
    }
  }
  gbu(text: string) {
    return '<b>' + text.toUpperCase() + '</b>';
  }
  gb(text: string) {
    return '<b>' + text + '</b>';
  }
}
