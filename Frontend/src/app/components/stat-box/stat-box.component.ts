import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-box',
  templateUrl: './stat-box.component.html',
  styleUrls: ['./stat-box.component.scss'],
})
export class StatBoxComponent {
  @Input('title') title: string = '';
  @Input('value') value: number = 0;
  @Input('ImgSrc') src: string = '';
}
