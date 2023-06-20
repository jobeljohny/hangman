import { Injectable } from '@angular/core';
import { GameConfig, Vals } from '../enums/config';
import { ApiService } from './api.service';
import { Round } from '../Classes/Round';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameRoundService {
  round!: Round;
  progressValue: number = 0.0;
  progressValue$: BehaviorSubject<number>;
  getProgressValue: Observable<number>;
  constructor(private api: ApiService) {
    this.progressValue$ = new BehaviorSubject<number>(0);
    this.getProgressValue = this.progressValue$.asObservable();
    this.initialize();
  }

  initialize(): void {
    let movieName = this.api.getMovie();
    this.round = new Round(movieName);
    this.progressValue = 0.0;
    this.progressValue$.next(0);
  }

  decrementGameTime() {
    this.round.timeLeft--;
    this.progressValue =
      (100 * (GameConfig.GAME_TIME - this.round.timeLeft)) /
      GameConfig.GAME_TIME;

    this.progressValue$.next(this.progressValue);
  }
}
