import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyMovies } from '../Classes/movies';
import { UserRoundStat } from '../Models/user-round-stat.model';
import { UserStatistic } from '../Models/user-statistics.model';
import { AuthService } from './auth.service';
import { UserStat } from '../Models/stats.model';

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
    const statObj = new UserRoundStat();
    statObj.username = this.auth.getUsername();
    statObj.highscore = score;
    statObj.highestRound = round;

    return this.http.put<any>(url, statObj);
  }

  getLeaderboard() {
    let url = this.baseUrl + 'api/Statistics/leaderboard';
    return this.http.get<UserStatistic[]>(url);
  }

  getUserStatistics() {
    let url =
      this.baseUrl +
      `api/Statistics/getUserStat?username=${this.auth.getUsername()}`;
    return this.http.get<UserStat>(url);
  }
}
