import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  visibility: BehaviorSubject<boolean>;

  constructor() {
    this.visibility = new BehaviorSubject(false);
  }

  show() {
    console.log('showing');

    this.visibility.next(true);
  }

  hide() {
    console.log('hiding');
    this.visibility.next(false);
  }
}
