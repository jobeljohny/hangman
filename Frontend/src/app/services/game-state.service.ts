import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { GameConfig } from '../enums/config';

@Injectable({
  providedIn: 'root',
})
export class GameStateService {
  Round = 1;
  Score = 0;
  constructor(private api: ApiService, private auth: AuthService) {
    this.Round = 1;
    this.Score = 0;
  }

  nextRound(timeLeft: number) {
    timeLeft = GameConfig.GAME_TIME - timeLeft;
    this.Round += 1;
    this.Score += 10 + Math.round((timeLeft * this.Round) / 3);
    this.updateServer();
  }

  updateServer() {
    if (this.auth.isLoggedIn())
      this.api.updateUserStat(this.Score, this.Round).subscribe({
        next: (res) => {},
        error: (err) => {
          console.log(err);
        },
      });
  }
  reset() {
    this.Round = 1;
    this.Score = 0;
  }
}
