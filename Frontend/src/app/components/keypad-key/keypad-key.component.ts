import { Component, EventEmitter, Input, Output } from '@angular/core';
import { keyState } from 'src/app/enums/config';

@Component({
  selector: 'app-keypad-key',
  template: `
    <div
      [ngClass]="{ 'not-selectable': true, disabled: !keyState.enabled }"
      (click)="keyClick()"
    >
      {{ keyState.key }}
    </div>
  `,
  styles: [
    `
      div {
        text-align: center;
        color: white;
        width: 40px;
        height: 40px;
        border-radius: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #006ce7;
        text-transform: uppercase;
        margin-left: 10px;
        margin-right: 10px;
        &:hover {
          transform: scale(1.1);
          cursor: pointer;
        }
      }
      .disabled {
        background: #292828;
      }
    `,
    `
      @media only screen and (max-width: 576px) {
        div {
          width: 27px;
          height: 27px;
          margin-left: 4px;
          margin-right: 4px;
        }
      }
    `,
  ],
})
export class KeypadKeyComponent {
  @Input('key') keyState: keyState = { key: ' ', enabled: false };
  @Output() onKeyClicked = new EventEmitter<string>();

  keyClick() {
    if (this.keyState.enabled) this.onKeyClicked.emit(this.keyState.key);
  }
}
