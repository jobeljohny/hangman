import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameTimerService } from 'src/app/services/game-timer.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.scss'],
})
export class ProgressbarComponent implements OnInit {
  value = 0;
  transitionFlag: boolean = false;
  private subscription!: Subscription;
  constructor(private theme: ThemeService, private timer: GameTimerService) {}

  ngOnInit(): void {
    this.subscription = this.timer.getProgressValue.subscribe(
      (progressValue: number) => {
        this.value = progressValue;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  get isDarkMode() {
    return this.theme.isDarkMode;
  }
}
