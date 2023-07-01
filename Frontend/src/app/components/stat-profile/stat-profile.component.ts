import { Component, Input } from '@angular/core';
import { UserStatistic } from 'src/app/Models/user-statistics.model';

@Component({
  selector: 'app-stat-profile',
  templateUrl: './stat-profile.component.html',
  styleUrls: ['./stat-profile.component.scss'],
})
export class StatProfileComponent {
  @Input('profile') profile!: UserStatistic;
}
