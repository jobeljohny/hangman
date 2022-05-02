import { Component, Input, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.scss'],
})
export class ProgressbarComponent implements OnInit {
  @Input() value: number = 0.0;
  transitionFlag: boolean = false;
  constructor(private theme: ThemeService) {}

  ngOnInit(): void {}
get isDarkMode(){
  return this.theme.isDarkMode;
}
}

