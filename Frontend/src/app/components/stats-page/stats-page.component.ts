import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, catchError, throwError } from 'rxjs';
import { UserStat } from 'src/app/Models/stats.model';
import { ApiService } from 'src/app/services/api.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-stats-page',
  templateUrl: './stats-page.component.html',
  styleUrls: ['./stats-page.component.scss'],
})
export class StatsPageComponent implements OnInit, OnDestroy {
  userStat!: UserStat;
  private subscription!: Subscription;

  constructor(
    private api: ApiService,
    private spinner: SpinnerService,
    private Toaster: ToasterService
  ) {}

  ngOnInit(): void {
    this.subscription = this.api
      .getUserStatistics()
      .pipe(
        catchError((error) => {
          console.error(error);
          this.Toaster.errorUserStat();
          return throwError(() => error);
        })
      )
      .subscribe((data) => {
        this.userStat = data;
      });
  }
  get Spinner() {
    return this.spinner;
  }
  get stat() {
    return this.userStat.statistics;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
