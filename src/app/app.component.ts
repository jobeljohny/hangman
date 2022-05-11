import { Component } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hangman';
  constructor(private theme:ThemeService){}
  get isDarkMode(){
    return this.theme.isDarkMode;
  }
  darkMode() {
    this.theme.toggleMode();
  }
}
