import { Injectable } from '@angular/core';
import { GameConfig, Vals } from '../enums/config';
import { ApiService } from './api.service';
import { Round } from '../Classes/Round';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { GameTimerService } from './game-timer.service';

@Injectable({
  providedIn: 'root',
})
export class GameRoundService {
  round!: Round;

  constructor(private api: ApiService) {
    this.initialize();
  }

  initialize(): void {
    let movieName = this.api.getMovie();
    this.round = new Round(movieName);
  }
}
