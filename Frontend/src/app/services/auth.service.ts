import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenApiModel } from '../Models/token-api.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://localhost:7197';
  private loginUrl = this.baseUrl + '/api/User/authenticate';
  private registerUrl = this.baseUrl + '/api/User/register';
  private refreshUrl = this.baseUrl + '/api/User/refresh';

  private userPayload: any;

  constructor(private http: HttpClient, private router: Router) {
    this.userPayload = this.decodedToken();
  }

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

  storeRefreshToken(tokenValue: string) {
    localStorage.setItem('refreshToken', tokenValue);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  renewToken(tokenApi: TokenApiModel) {
    return this.http.post<any>(this.refreshUrl, tokenApi);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    return jwtHelper.decodeToken(token);
  }

  updatePayload() {
    this.userPayload = this.decodedToken();
  }

  getUsername() {
    if (this.userPayload) return this.userPayload.unique_name;
  }

  getRole() {
    if (this.userPayload) return this.userPayload.role;
  }
}
