import { Component, OnInit } from '@angular/core';
import { UserStat } from 'src/app/Models/stats.model';
import { UserStatistic } from 'src/app/Models/user-statistics.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-stats-page',
  templateUrl: './stats-page.component.html',
  styleUrls: ['./stats-page.component.scss'],
})
export class StatsPageComponent implements OnInit {
  users: any = [];
  userStat: UserStat = new UserStat();

  constructor(private api: ApiService) {
    this.userStat.userStatistics = new UserStatistic();
    this.userStat.userStatistics.firstName = 'John';
    this.userStat.userStatistics.lastName = 'Doe';
    this.userStat.userStatistics.username = 'JohnDoe7';
    this.userStat.userStatistics.gamesPlayed = 231;
    this.userStat.userStatistics.highestRound = 16;
    this.userStat.userStatistics.highscore = 229;
    this.userStat.rank = 7;
  }

  ngOnInit(): void {
    this.api.getUsers().subscribe((res) => {
      this.users = res;
    });
  }

  get stat() {
    return this.userStat.userStatistics;
  }
}
