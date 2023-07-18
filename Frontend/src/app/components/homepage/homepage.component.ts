import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { tips } from 'src/app/enums/config';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit, OnDestroy {
  currentTipIndex = 0;
  currentTip = tips[this.currentTipIndex];
  private timerSubscription!: Subscription;
  constructor() {}

  ngOnInit() {
    this.startSlideshow();
  }

  ngOnDestroy() {
    this.stopSlideshow();
  }

  startSlideshow() {
    this.timerSubscription = interval(5000).subscribe(() => {
      this.currentTipIndex = (this.currentTipIndex + 1) % tips.length;
      this.currentTip = tips[this.currentTipIndex];
    });
  }

  stopSlideshow() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
