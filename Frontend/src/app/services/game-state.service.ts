import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameStateService {
  Round = 1;
  Score = 0;
  constructor() {
    this.Round = 1;
    this.Score = 0;
    console.log('initializing game state');
  }

  nextRound(timeLeft: number) {
    this.Round += 1;
    this.Score += 10 + Math.round((timeLeft * this.Round) / 3);
  }

  reset() {
    this.Round = 1;
    this.Score = 0;
  }
}
