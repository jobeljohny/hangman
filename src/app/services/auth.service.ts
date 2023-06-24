import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://localhost:7197';
  private loginUrl = this.baseUrl + '/api/User/authenticate';
  private registerUrl = this.baseUrl + '/api/User/register';
  constructor(private http: HttpClient) {}

  register(userObj: any) {
    return this.http.post<any>(this.registerUrl, userObj);
  }

  login(loginObj: any) {
    return this.http.post<any>(this.loginUrl, loginObj);
  }
}
