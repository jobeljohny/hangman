import { Component, Input, OnInit } from '@angular/core';
import { GameConfig } from 'src/app/enums/config';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.scss'],
})
export class ProgressbarComponent implements OnInit {
  @Input() value: number = 0.0;
  transitionFlag:boolean=false;
  constructor() {
    
  }

  ngOnInit(): void {}
  

}
