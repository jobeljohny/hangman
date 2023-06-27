import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Vals } from 'src/app/enums/config';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-message-panel',
  templateUrl: './message-panel.component.html',
  styleUrls: ['./message-panel.component.scss'],
})
export class MessagePanelComponent implements OnChanges {
  panelMessage: string = Vals.PANEL_DEFAULT_MSG;
  @Input('type') type = -1;
  @Input('key') key = '';

  constructor(private theme: ThemeService) {}

  ngOnChanges(): void {
    this.setPanelMsg();
  }

  get isDarkMode() {
    return this.theme.isDarkMode;
  }

  setPanelMsg(): void {
    const value = `<b>${this.key.toUpperCase()}</b>`;
    const messageMap: { [key: number]: string } = {
      [Vals.CORRECT_MSG]: `${value} is a correct guess 😄`,
      [Vals.INCORRECT_MSG]: `${value} is an incorrect guess 😕`,
      [Vals.ERRORLIST_MSG]: `${value} is already in the error list`,
    };
    this.panelMessage = messageMap[this.type] ?? Vals.PANEL_DEFAULT_MSG;
  }
}
