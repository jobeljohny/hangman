import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameRoundService } from 'src/app/services/game-round.service';
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
  constructor(
    private theme: ThemeService,
    private gameRound: GameRoundService
  ) {}

  ngOnInit(): void {
    this.subscription = this.gameRound.getProgressValue.subscribe(
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
