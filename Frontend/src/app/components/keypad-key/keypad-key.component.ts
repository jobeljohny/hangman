import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-keypad-key',
  template: ` <div [ngClass]="'not-selectable'">{{ key }}</div> `,
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
  @Input('key') key = '0';
}
