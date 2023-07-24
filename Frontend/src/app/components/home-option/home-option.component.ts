import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home-option',
  templateUrl: './home-option.component.html',
  styleUrls: ['./home-option.component.scss'],
})
export class HomeOptionComponent {
  @Input('logo') imgPath = '';
  @Input('title') title = '';
  @Input('route') route = '';
}
