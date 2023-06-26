import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://localhost:7197';
  private loginUrl = this.baseUrl + '/api/User/authenticate';
  private registerUrl = this.baseUrl + '/api/User/register';
  constructor(private http: HttpClient, private router: Router) {}

  register(userObj: any) {
    return this.http.post<any>(this.registerUrl, userObj);
  }

  login(loginObj: any) {
    return this.http.post<any>(this.loginUrl, loginObj);
  }

  signOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
