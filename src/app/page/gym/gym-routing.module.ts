import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateGymComponent } from './create-gym/create-gym.component';
import { ListGymComponent } from './list-gym/list-gym.component';
import { ProfileGymComponent } from './profile-gym/profile-gym.component';

const routes: Routes = [
  { path: 'create', component: CreateGymComponent },
  { path: 'list', component: ListGymComponent },
  { path: 'profile/:id', component: ProfileGymComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GymRoutingModule {}
