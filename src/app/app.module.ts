import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameplayComponent } from './components/gameplay/gameplay.component';
import { MessagePanelComponent } from './components/gameplay/message-panel/message-panel.component';
import { ProgressbarComponent } from './components/gameplay/progressbar/progressbar.component';
import { ResultModalComponent } from './components/gameplay/result-modal/result-modal.component';
import { ScorebarComponent } from './components/gameplay/scorebar/scorebar.component';
import { HeaderComponent } from './components/header/header.component';
import { HomepageComponent } from './components/homepage/homepage.component';
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
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
