import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-stats-page',
  templateUrl: './stats-page.component.html',
  styleUrls: ['./stats-page.component.scss'],
})
export class StatsPageComponent implements OnInit {
  users: any = [];

  username = 'brute7';
  firstname = 'Godwin';
  lastname = 'VS';
  gamesPlayed = 45;
  higestScore = 456.56;
  highestRound = 8;
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getUsers().subscribe((res) => {
      this.users = res;
    });
  }
}
