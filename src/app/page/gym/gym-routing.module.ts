import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateGymComponent } from './create-gym/create-gym.component';

const routes: Routes = [
  {path:'create', component:CreateGymComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GymRoutingModule { }
