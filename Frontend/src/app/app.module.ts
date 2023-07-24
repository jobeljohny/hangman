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
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { StatsPageComponent } from './components/stats-page/stats-page.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { StatBoxComponent } from './components/stat-box/stat-box.component';
import { HttpLoaderInterceptor } from './interceptors/http-loader.interceptor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StatProfileComponent } from './components/stat-profile/stat-profile.component';
import { InstructionsPageComponent } from './components/instructions-page/instructions-page.component';
import { AdminToolsComponent } from './components/admin-tools/admin-tools.component';
import { HomeOptionComponent } from './components/home-option/home-option.component';
import { HeaderOptionsDialogComponent } from './components/header-options-dialog/header-options-dialog.component';
import { VirtualKeypadComponent } from './components/virtual-keypad/virtual-keypad.component';
import { KeypadKeyComponent } from './components/keypad-key/keypad-key.component';
import { KeyboardToggleComponent } from './components/keyboard-toggle/keyboard-toggle.component';
import { TipsSliderComponent } from './components/tips-slider/tips-slider.component';
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
    StatBoxComponent,
    StatProfileComponent,
    InstructionsPageComponent,
    AdminToolsComponent,
    HomeOptionComponent,
    HeaderOptionsDialogComponent,
    VirtualKeypadComponent,
    KeypadKeyComponent,
    KeyboardToggleComponent,
    TipsSliderComponent,
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
    provideToastr({
      timeOut: 1500,
      positionClass: 'toast-top-right',
    }),
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
