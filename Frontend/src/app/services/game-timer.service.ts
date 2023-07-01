import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  map,
  take,
  takeUntil,
  timer,
} from 'rxjs';
import { GameConfig } from '../enums/config';

@Injectable({
  providedIn: 'root',
})
export class GameTimerService {
  progressValue: number = 0.0;
  progressValue$: BehaviorSubject<number>;
  getProgressValue: Observable<number>;
  timerDestroy$ = new Subject<void>();
  private timeOutFn!: () => void;

  constructor() {
    this.progressValue$ = new BehaviorSubject<number>(0);
    this.getProgressValue = this.progressValue$.asObservable();
  }
  start() {
    this.timerDestroy$ = new Subject<void>();
    this.progressValue = 0.0;
    this.progressValue$.next(0);
    timer(0, 1000)
      .pipe(
        take(GameConfig.GAME_TIME),
        takeUntil(this.timerDestroy$),
        map((elapsed) => GameConfig.GAME_TIME - elapsed - 1)
      )
      .subscribe((secondsLeft) => {
        this.updateProgress(secondsLeft);
        if (secondsLeft <= 0) this.timeOutFn();
      });
  }
  stop() {
    this.timerDestroy$.next();
  }

  updateProgress(timeLeft: number) {
    this.progressValue =
      (100 * (GameConfig.GAME_TIME - timeLeft)) / GameConfig.GAME_TIME;

    this.progressValue$.next(this.progressValue);
  }

  setTimeOutFn(fn: () => void) {
    this.timeOutFn = fn;
  }
}
