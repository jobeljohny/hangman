import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyMovies } from '../Classes/movies';
import { AuthService } from './auth.service';
import { UserStat } from '../Models/user-stat.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://localhost:7197/';
  private getUsersUrl = this.baseUrl + 'api/User';
  constructor(private http: HttpClient, private auth: AuthService) {}

  getUsers() {
    return this.http.get<any>(this.getUsersUrl);
  }

  getMovie() {
    const movie = MyMovies[Math.floor(Math.random() * MyMovies.length)];
    return movie;
  }

  updateUserStat(score: number, round: number) {
    let url = this.baseUrl + 'api/Statistics/updateStat';
    const statObj = new UserStat();
    statObj.username = this.auth.getUsername();
    statObj.highscore = score;
    statObj.highestRound = round;

    return this.http.put<any>(url, statObj);
  }
}
