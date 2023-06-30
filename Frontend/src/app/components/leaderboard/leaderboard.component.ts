import { Component, OnInit } from '@angular/core';
import { UserStatistic } from 'src/app/Models/user-statistics.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent implements OnInit {
  leaderboards: UserStatistic[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getLeaderboard().subscribe((data) => {
      this.leaderboards = data;
      console.log(this.leaderboards);
    });
  }
}
