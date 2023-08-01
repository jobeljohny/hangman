import { Injectable } from '@angular/core';
import { Round } from '../Classes/Round';
import { ApiService } from './api.service';
import { KeyStates } from '../Classes/key-states';
import { containsNumber, getAlphanumericCharacter } from '../Classes/common';
import { RoundStub } from '../Models/roundStub.model';

@Injectable({
  providedIn: 'root',
})
export class GameRoundService {
  round!: Round;
  keyMap!: KeyStates;
  isNumberPresent: boolean = false;

  constructor(private api: ApiService) {
    this.keyMap = new KeyStates();
    this.round = new Round('');
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

  //currently only using for keyStates management
  initializeCompetitive(round: RoundStub) {
    this.isNumberPresent = round.isNumber;
    this.keyMap.resetAllKeys();
    this.keyMap.disableKey(getAlphanumericCharacter(round.template)!);
  }
}
