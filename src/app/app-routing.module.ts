import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameplayComponent } from './components/gameplay/gameplay.component';

const routes: Routes = [
  {path:'',component:GameplayComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
