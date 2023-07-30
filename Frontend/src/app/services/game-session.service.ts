import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../Config/api-config';
import { ToastrService } from 'ngx-toastr';
import { RoundStub } from '../Models/roundStub.model';
import { Status } from '../Models/Status.model';

@Injectable({
  providedIn: 'root',
})
export class GameSessionService {
  sessionInitialized = false;
  Round: RoundStub;
  pressedKey!: string;
  constructor(private http: HttpClient, private toast: ToastrService) {
    this.Round = new RoundStub();
  }

  initSession() {
    let url = baseUrl + 'GameSession/initializeSession';
    return this.http.put<any>(url, {});
  }
  initializeGameRound() {
    let url = baseUrl + 'GameSession/newRound';
    this.http.put<any>(url, {}).subscribe({
      next: (res) => {
        //console.log(res);
        this.Round = res;
      },
      error: (err) => {
        console.error(err);

        this.toast.error('connection error');
      },
    });
  }
  validateKey(key: string) {
    this.pressedKey = key;
    let url = baseUrl + 'GameSession/validateKey';
    return this.http.put<Status>(url, { k: key });
  }

  pushError() {
    this.Round.lives--;
    this.Round.errorBuffer += this.pressedKey;
  }

  updateTemplate(template: string | undefined) {
    this.Round.template = template as string;
  }
}
