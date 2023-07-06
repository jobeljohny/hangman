import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyMovies } from '../Classes/movies';
import { UserRoundStat } from '../Models/user-round-stat.model';
import { UserStatistic } from '../Models/user-statistics.model';
import { AuthService } from './auth.service';
import { UserStat } from '../Models/stats.model';
import { baseUrl } from '../Config/api-config';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
 
  private getUsersUrl = baseUrl + 'User';
  constructor(private http: HttpClient, private auth: AuthService) {}

  getUsers() {
    return this.http.get<any>(baseUrl + 'User');
  }

  getMovie() {
    const movie = MyMovies[Math.floor(Math.random() * MyMovies.length)];
    return movie;
  }

  updateUserStat(score: number, round: number) {
    let url = baseUrl+'Statistics/updateStat';
    const statObj = new UserRoundStat();
    statObj.username = this.auth.getUsername();
    statObj.highscore = score;
    statObj.highestRound = round;

    return this.http.put<any>(url, statObj);
  }

  getLeaderboard() {
    let url = baseUrl+'Statistics/leaderboard';
    return this.http.get<UserStatistic[]>(url);
  }

  getUserStatistics() {
    let url =
      baseUrl+
      `Statistics/getUserStat?username=${this.auth.getUsername()}`;
    return this.http.get<UserStat>(url);
  }
}
