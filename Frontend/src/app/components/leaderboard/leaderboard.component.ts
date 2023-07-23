import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, catchError, throwError } from 'rxjs';
import { UserStatistic } from 'src/app/Models/user-statistics.model';
import { ApiService } from 'src/app/services/api.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent implements OnInit, OnDestroy {
  leaderboards: UserStatistic[] = [];
  private subscription!: Subscription;

  constructor(
    private api: ApiService,
    private spinner: SpinnerService,
    private Toaster: ToasterService
  ) {}

  ngOnInit() {
    this.subscription = this.api
      .getLeaderboard()
      .pipe(
        catchError((error) => {
          console.error(error);
          this.Toaster.errorLeaderboard();
          return throwError(() => error);
        })
      )
      .subscribe((data) => {
        this.leaderboards = data;
      });
    this.generateLB();
  }

  get Spinner() {
    return this.spinner;
  }

  generateLB() {
    //testing purposes
    const count = 50;
    for (let index = 1; index <= count; index++) {
      let stat = new UserStatistic();
      stat.username = (Math.random() + 1).toString(36).substring(5);
      stat.highestRound = Math.floor(Math.random() * (16 - 4 + 1)) + 4;
      stat.highscore =
        Math.round((Math.random() * (300 - 100 + 1) + 100) * 100) / 100;
      this.leaderboards.push(stat);
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
