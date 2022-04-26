import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { GameConfig, Vals } from 'src/app/enums/config';
import { MovieHelperService } from 'src/app/services/movie-helper.service';
import { ApiService } from '../../services/api.service';
import { ProgressbarComponent } from './progressbar/progressbar.component';

@Component({
  selector: 'app-gameplay',
  templateUrl: './gameplay.component.html',
  styleUrls: ['./gameplay.component.scss'],
})
export class GameplayComponent implements OnInit {
  @ViewChild('progress')
  progress: ProgressbarComponent;

  movieName: string = '';
  movie: string[] = [];
  template: string[] = [];
  lives: number = GameConfig.LIVES;
  WIN = false;
  LOST = false;
  Round=1;
  Score=0;
  timeLeft = GameConfig.GAME_TIME;
  wrongBuffer: string[] = [];
  panelMessage: string = '';
  progressValue: number = 0.0;
  interval: any = undefined;
  guessBlinker: string = 'black';
  errorBlinker: string = 'black';

  constructor(private api: ApiService, private ut: MovieHelperService) {
    this.progress = new ProgressbarComponent();
    this.initialize();
  }

  ngOnInit(): void {}
  get Lives() {
    return GameConfig.LIVES;
  }

  initialize(): void {
    this.resetBuffers();
    this.movieName = this.api.getMovie();
    [this.movie, this.template] = this.ut.getMovieAndTemplate(this.movieName);
    console.log(this.movie + '|' + this.template);

    this.activateTimer();
  }
  activateTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.progressValue =
          (100 * (GameConfig.GAME_TIME - this.timeLeft)) / GameConfig.GAME_TIME;
      } else {
        this.assignLost();
      }
    }, 1000);
  }
  stopTimer() {
    clearInterval(this.interval);
  }
  resetBuffers() {
    this.movie = [];
    this.template = [];
    this.lives = GameConfig.LIVES;
    this.WIN = false;
    this.LOST = false;
    this.timeLeft = GameConfig.GAME_TIME;
    this.wrongBuffer = [];
    this.panelMessage = Vals.PANEL_DEFAULT_MSG;
    this.progressValue = 0.0;
  }
  updateTemplate(key: string) {
    for (var i = 0; i < this.movie.length; i++) {
      if (this.movie[i] == key) this.template[i] = key;
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    let key = event.key;
    let code = key.charCodeAt(0);
    if (!((code >= 97 && code <= 122) || (code >= 48 && code <= 57))) return;
    if (!this.LOST && !this.WIN) this.process(key);
  }

  process(key: string) {
    if (this.movie.includes(key)) {
      this.blink('GUESSER', Vals.CORRECT);
      this.updateTemplate(key);
      this.panelMessage = this.ut.setPanelMsg(Vals.CORRECT, key);
      this.checkWin();
    } else {
      if (this.wrongBuffer.includes(key)) {
        this.blink('ERROR_BUFFER', Vals.ERROR);
        this.panelMessage = this.ut.setPanelMsg(Vals.ERRORLIST_MSG, key);
        return;
      }
      this.blink('GUESSER', Vals.ERROR);
      this.wrongBuffer.push(key);
      this.panelMessage = this.ut.setPanelMsg(Vals.INCORRECT_MSG, key);
      this.lives -= 1;
      if (this.lives == 0) this.assignLost();
    }
  }
  checkWin() {
    if (!this.template.includes('-')) {
      this.WIN = true;
      this.stopTimer();
      this.panelMessage = this.ut.setPanelMsg(Vals.WIN_MSG, this.movieName);
      this.Round+=1;
      this.Score+=10+Math.round((this.timeLeft*this.Round)/2);
      this.initialize();
    }
  }

  assignLost() {
    this.stopTimer();
    this.LOST = true;
    this.panelMessage = this.ut.setPanelMsg(Vals.LOST_MSG, this.movieName);
  }
  
  blink(entity: string, blinker: string) {
    switch (entity) {
      case 'GUESSER':
        this.guessBlinker = blinker;
        setTimeout(() => (this.guessBlinker = Vals.NORMAL), Vals.BLINK_TIMER);
        break;
      case 'ERROR_BUFFER':
        this.errorBlinker = blinker;
        setTimeout(() => (this.errorBlinker = Vals.NORMAL), Vals.BLINK_TIMER);
        break;
    }
  }
}
