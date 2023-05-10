import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateGymComponent } from './create-gym/create-gym.component';
import { ListGymComponent } from './list-gym/list-gym.component';

const routes: Routes = [
  { path: 'create', component: CreateGymComponent },
  { path: 'list', component: ListGymComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GymRoutingModule {}
