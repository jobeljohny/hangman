import { Injectable } from '@angular/core';
import { Round } from '../Classes/Round';
import { ApiService } from './api.service';
import { KeyStates } from '../Classes/key-states';
import { containsNumber, getAlphanumericCharacter } from '../Classes/common';

@Injectable({
  providedIn: 'root',
})
export class GameRoundService {
  round!: Round;
  keyMap!: KeyStates;
  isNumberPresent: boolean = false;

  constructor(private api: ApiService) {
    this.keyMap = new KeyStates();
    this.initialize();
  }

  initialize(): void {
    let movieName = this.api.getMovie();
    this.round = new Round(movieName);
    this.isNumberPresent = containsNumber(movieName);
    this.keyMap.resetAllKeys();
    this.keyMap.disableKey(
      getAlphanumericCharacter(this.round.template.join(''))!
    );
  }
}
