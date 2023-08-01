import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { RoundStub } from '../Models/roundStub.model';

@Injectable({
  providedIn: 'root',
})
export class GameStateService {
  Round = 1;
  Score = 0;
  constructor() {
    this.Round = 1;
    this.Score = 0;
  }

  nextRound(timeLeft: number) {
    this.Round += 1;
    this.Score += 10 + Math.round((timeLeft * this.Round) / 4);
  }

  reset() {
    this.Round = 1;
    this.Score = 0;
  }

  setData(round: RoundStub) {
    this.Round = round.round;
    this.Score = round.score;
  }
}
