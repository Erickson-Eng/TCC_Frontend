import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AthleteComponent } from './athlete/athlete.component';
import { ManagerComponent } from './manager/manager.component';

const routes: Routes = [
  {path: 'athlete/:username?', component:AthleteComponent},
  {path: 'manager/:username?', component: ManagerComponent},
  {path: 'athlete', component:AthleteComponent},
  {path: 'manager', component: ManagerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
