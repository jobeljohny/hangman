import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  isDarkMode:Boolean=true;

  constructor() { 
    
  }
  toggleMode(){
    console.log("dark mode");
    this.isDarkMode = !this.isDarkMode;
    document.body.className=this.isDarkMode?'dark':'light';
  }
}
