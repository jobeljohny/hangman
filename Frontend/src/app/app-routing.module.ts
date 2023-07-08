import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameplayComponent } from './components/gameplay/gameplay.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { StatsPageComponent } from './components/stats-page/stats-page.component';
import { authGuard } from './gaurds/auth.guard';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { InstructionsPageComponent } from './components/instructions-page/instructions-page.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'game', component: GameplayComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'stats', component: StatsPageComponent, canActivate: [authGuard] },
  { path: 'instructions', component: InstructionsPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
