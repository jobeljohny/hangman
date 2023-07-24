import { Component } from '@angular/core';

@Component({
  selector: 'app-num-warn',
  template: `
    <div matTooltip="digits present">
      <img src="assets/nums-block.svg" alt="" />
    </div>
  `,
  styles: [
    `
      @import '../../Styles/palette.scss';
      div {
        img {
          width: 30px;
          filter: $svg-filter;
        }
        &:hover {
          cursor: pointer;
        }
      }
    `,
  ],
})
export class NumWarnComponent {}
