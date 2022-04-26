import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-scorebar',
  templateUrl: './scorebar.component.html',
  styleUrls: ['./scorebar.component.scss']
})
export class ScorebarComponent implements OnInit {
  @Input() score:number=-1;
  @Input() round:number=-1;

  constructor() { }

  ngOnInit(): void {
  }

}
