import { Component, EventEmitter, Input, Output } from '@angular/core';
import { KeyStates } from 'src/app/Classes/key-states';

@Component({
  selector: 'app-virtual-keypad',
  templateUrl: './virtual-keypad.component.html',
  styleUrls: ['./virtual-keypad.component.scss'],
})
export class VirtualKeypadComponent {
  @Input('keyStates') keystates!: KeyStates;
  @Output() keyClick = new EventEmitter<string>();
  constructor() {}

  get keys() {
    return this.keystates.keys;
  }

  onKeyClick(key: string) {
    this.keyClick.emit(key);
  }
}
