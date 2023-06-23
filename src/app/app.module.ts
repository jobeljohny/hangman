import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameplayComponent } from './components/gameplay/gameplay.component';
import { ProgressbarComponent } from './components/gameplay/progressbar/progressbar.component';
import { ScorebarComponent } from './components/gameplay/scorebar/scorebar.component';
import { ResultModalComponent } from './components/gameplay/result-modal/result-modal.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { MessagePanelComponent } from './components/gameplay/message-panel/message-panel.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HeaderComponent } from './components/header/header.component';
import { LoginSignupComponent } from './components/login-signup/login-signup.component';
@NgModule({
  declarations: [
    AppComponent,
    GameplayComponent,
    ProgressbarComponent,
    ScorebarComponent,
    ResultModalComponent,
    HomepageComponent,
    MessagePanelComponent,
    HeaderComponent,
    LoginSignupComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, MatDialogModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
