import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(private theme:ThemeService) {
    let mode=localStorage.getItem('isDarkMode');
    if(mode!==null)
      theme.setMode(mode);
   }
   get isDarkMode(){
    return this.theme.isDarkMode;
  }

  ngOnInit(): void {
    

  }

}
