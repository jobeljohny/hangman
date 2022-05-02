import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameplayComponent } from './components/gameplay/gameplay.component';
import { HomepageComponent } from './components/homepage/homepage.component';

const routes: Routes = [
  {path:'',component:HomepageComponent},
  {path:'game',component:GameplayComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
