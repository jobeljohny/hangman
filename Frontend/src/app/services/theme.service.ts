import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isDarkMode: Boolean = true;

  constructor() {}
  toggleMode() {
    console.log('dark mode');
    this.isDarkMode = !this.isDarkMode;
    document.body.className = this.isDarkMode ? 'dark' : 'light';
    localStorage.setItem('isDarkMode', this.isDarkMode.toString());
  }
  setMode(darkmode: string) {
    if (darkmode === 'true') this.isDarkMode = true;
    else this.isDarkMode = false;

    document.body.className = this.isDarkMode ? 'dark' : 'light';
  }
}
