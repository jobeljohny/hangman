import { Injectable } from '@angular/core';
import { Round } from '../Classes/Round';
import { ApiService } from './api.service';

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
