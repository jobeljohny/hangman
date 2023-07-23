import { Component, EventEmitter, Output } from '@angular/core';
import { KeyStates } from 'src/app/Classes/key-states';

@Component({
  selector: 'app-virtual-keypad',
  templateUrl: './virtual-keypad.component.html',
  styleUrls: ['./virtual-keypad.component.scss'],
})
export class VirtualKeypadComponent {
  keystates: KeyStates;
  @Output() keyClick = new EventEmitter<string>();
  constructor() {
    this.keystates = new KeyStates();
  }

  get keys() {
    return this.keystates.keys;
  }

  onKeyClick(key: string) {
    this.keyClick.emit(key);
  }
}
