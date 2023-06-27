import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyMovies } from '../Classes/movies';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://localhost:7197';
  private getUsersUrl = this.baseUrl + '/api/User';
  constructor(private http: HttpClient, private auth: AuthService) {}

  getUsers() {
    return this.http.get<any>(this.getUsersUrl);
  }

  getMovie() {
    const movie = MyMovies[Math.floor(Math.random() * MyMovies.length)];
    return movie;
  }

  updateUserStat() {
    if (this.auth.isLoggedIn()) {
    }
  }
}
