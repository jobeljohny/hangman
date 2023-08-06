import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../Config/api-config';
import { UserStat } from '../Models/stats.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminApiService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  getUsers() {
    return this.http.get<any>(baseUrl + 'User');
  }

  resetStatistics() {
    let url = baseUrl + 'Statistics/resetStatistics';
    return this.http.post<any>(url, {});
  }

  removeUser(username: string) {
    let url = baseUrl + `User/${username}`;
    return this.http.delete<UserStat>(url);
  }

  updateMovies(movies: any) {
    let url = baseUrl + 'User/updateMovielist';
    return this.http.post(url, movies);
  }
}
