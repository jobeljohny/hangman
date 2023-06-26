import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  private userName$ = new BehaviorSubject<string>('');
  private role$ = new BehaviorSubject<string>('');

  constructor() {}

  public getRole() {
    return this.role$.asObservable();
  }

  public setRole(role: string) {
    this.role$.next(role);
  }

  public getUserName() {
    return this.userName$.asObservable();
  }

  public setUserName(name: string) {
    this.userName$.next(name);
  }
}
