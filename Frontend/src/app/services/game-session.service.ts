import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom, map } from 'rxjs';
import { KeyStates } from '../Classes/key-states';
import { Status } from '../Models/Status.model';
import { RoundStub } from '../Models/roundStub.model';
import { GameStatus, urls } from '../enums/config';

@Injectable({
  providedIn: 'root',
})
export class GameSessionService {
  sessionInitialized = false;
  Round: RoundStub;
  pressedKey!: string;
  sessionInitializer$: any;
  roundInitializer$: any;
  keyMap!: KeyStates;
  isRoundLive = false;
  constructor(private http: HttpClient, private toast: ToastrService) {
    this.Round = new RoundStub();

    this.sessionInitializer$ = this.http
      .put<any>(urls['sessionInit'], {})
      .pipe(map((response) => response));

    this.roundInitializer$ = this.http
      .put<any>(urls['initGameRound'], {})
      .pipe(map((response) => response));
  }

  async initSession() {
    if (!this.sessionInitialized) {
      console.log('initializing');

      await firstValueFrom(this.sessionInitializer$);
      this.sessionInitialized = true;
      console.log('initialized');
    } else {
      console.log('already initialized');
    }
  }
  async initializeGameRound() {
    this.Round = await firstValueFrom(this.roundInitializer$);
    console.log(this.Round);

    this.isRoundLive = true;
  }
  async validateKey(key: string) {
    this.pressedKey = key;
    let status = this.internalValidation(key);
    if (status) return status;
    console.log('validating backend');

    return await firstValueFrom(
      this.http
        .put<Status>(urls['validateKey'], { k: key })
        .pipe(map((response) => response))
    );
  }

  async timedOut() {
    return await firstValueFrom(
      this.http
        .put<Status>(urls['gameTimeout'], {})
        .pipe(map((response) => response))
    );
  }

  internalValidation(key: string) {
    let status;
    if (this.Round.errorBuffer.includes(key)) {
      status = new Status();
      status.flag = GameStatus.ALREADY_ERROR_BUFF;
    } else if (this.Round.template.includes(key)) {
      status = new Status();
      status.flag = GameStatus.CORRECT_GUESS;
      status.template = this.Round.template;
    }
    return status;
  }

  pushError() {
    this.Round.lives--;
    this.Round.errorBuffer += this.pressedKey;
  }

  updateTemplate(template: string | undefined) {
    this.Round.template = template as string;
  }

  reset() {
    this.sessionInitialized = false;
    this.Round = new RoundStub();
    this.pressedKey = '';
    this.isRoundLive = false;
  }
}
