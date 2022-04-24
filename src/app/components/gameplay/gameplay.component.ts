import { Component, HostListener, OnInit } from '@angular/core';
import { finalize, map, of, switchMap, takeWhile, tap, timer } from 'rxjs';
import { GameConfig, Vals } from 'src/app/enums/config';
import { MovieHelperService } from 'src/app/services/movie-helper.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-gameplay',
  templateUrl: './gameplay.component.html',
  styleUrls: ['./gameplay.component.scss'],
})
export class GameplayComponent implements OnInit {
  movieName:string=''
  movie: string[] = [];
  template: string[] = [];
  lives:number = GameConfig.LIVES;
  WIN = false;
  LOST = false;
  timeLeft = GameConfig.GAME_TIME;
  wrongBuffer: string[] = [];
  panelMessage:string=''

  constructor(private api: ApiService, private ut: MovieHelperService) {
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
    this.activateTimer(); //required!
  }
  activateTimer(){
    of(5).pipe( // <- time in seconds we want the delay.
    map(v => v * 1000),
    switchMap(delay => {
        const start = new Date().getTime();
        return timer(0, 100).pipe( // <- speed of updates.
            map(() => (new Date().getTime() - start) / delay),
            takeWhile(result => result < 1, true),
        );
    }),
    tap(v => console.log(v)), // <- your stuff
    finalize(() =>console.log('done')), // <- your stuff
).subscribe();
  }
  resetBuffers() {
    
    this.movie = [];
    this.template = [];
    this.lives = GameConfig.LIVES;
    this.WIN = false;
    this.LOST = false;
    this.timeLeft = GameConfig.GAME_TIME;
    this.wrongBuffer = [];
    this.panelMessage=Vals.PANEL_DEFAULT_MSG;
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
      //blink(CORRECT);
      this.updateTemplate(key);
      this.panelMessage=this.ut.setPanelMsg(Vals.CORRECT,key)
      this.checkWin();
    } else {
      if (this.wrongBuffer.includes(key)) {
        //blinkErrorBuffer();
        this.panelMessage=this.ut.setPanelMsg(Vals.ERRORLIST_MSG,key)
        return;
      }
      //blink(ERROR);
      this.wrongBuffer.push(key);
      this.panelMessage=this.ut.setPanelMsg(Vals.INCORRECT_MSG,key)
      this.lives-=1
      this.checkLost();
    }
  }
   checkWin() {
    if (!this.template.includes("-")){
       this.WIN = true;
       //pauseTimer();
       //clearInterval(downloadTimer);
       this.panelMessage=this.ut.setPanelMsg(Vals.WIN_MSG,this.movieName)
    }
  }
   checkLost() {
    if (this.lives == 0) {
      this.LOST = true;
      //pauseTimer();
      //clearInterval(downloadTimer);
      this.panelMessage=this.ut.setPanelMsg(Vals.LOST_MSG,this.movieName)
    }
  }
}
