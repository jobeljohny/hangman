import { Component, Input, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-scorebar',
  templateUrl: './scorebar.component.html',
  styleUrls: ['./scorebar.component.scss']
})
export class ScorebarComponent implements OnInit {
  @Input() score:number=-1;
  @Input() round:number=-1;

  constructor(private theme:ThemeService) { }
  get isDarkMode() {
    return this.theme.isDarkMode;
  }
  ngOnInit(): void {
  }

}
