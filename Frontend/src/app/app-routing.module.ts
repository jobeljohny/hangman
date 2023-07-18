import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameplayComponent } from './components/gameplay/gameplay.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { StatsPageComponent } from './components/stats-page/stats-page.component';
import { authGuard } from './gaurds/auth.guard';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { InstructionsPageComponent } from './components/instructions-page/instructions-page.component';
import { AdminToolsComponent } from './components/admin-tools/admin-tools.component';
import { adminGuard } from './gaurds/admin.guard';

const routes: Routes = [
  {
    path: 'about',
    loadChildren: () =>
      new Promise(() => {
        window.open('https://github.com/jobeljohny/hangman', '_blank');
      }),
  },
  { path: '', component: HomepageComponent },
  { path: 'game', component: GameplayComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'stats', component: StatsPageComponent, canActivate: [authGuard] },
  { path: 'instructions', component: InstructionsPageComponent },
  {
    path: 'admin',
    component: AdminToolsComponent,
    canActivate: [authGuard, adminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
