import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
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
import { ToastrModule } from 'ngx-toastr';
import { StatsPageComponent } from './components/stats-page/stats-page.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { HttpLoaderInterceptor } from './interceptors/http-loader.interceptor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
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
    StatsPageComponent,
    LeaderboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpLoaderInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
