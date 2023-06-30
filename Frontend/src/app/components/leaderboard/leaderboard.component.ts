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

  constructor(private api: ApiService) {
    //TODO remove this
    // this.generateLB();
  }

  ngOnInit() {
    this.api.getLeaderboard().subscribe((data) => {
      this.leaderboards = data;
      console.log(this.leaderboards);
    });
  }

  generateLB() {
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
}
