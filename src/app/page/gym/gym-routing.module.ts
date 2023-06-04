import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateGymComponent } from './create-gym/create-gym.component';
import { ListGymComponent } from './list-gym/list-gym.component';
import { ProfileGymComponent } from './profile-gym/profile-gym.component';
import { AgendaGymComponent } from './agenda-gym/agenda-gym.component';
import { AgendamentoGymComponent } from './agendamento-gym/agendamento-gym.component';

const routes: Routes = [
  { path: 'create', component: CreateGymComponent },
  { path: 'list', component: ListGymComponent },
  { path: 'profile/:id', component: ProfileGymComponent },
  { path: 'appointment/:id', component: AgendaGymComponent },
  { path: ':id/schedule', component: AgendamentoGymComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GymRoutingModule {}
