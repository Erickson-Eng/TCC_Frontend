import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GymRoutingModule } from './gym-routing.module';
import { CreateGymComponent } from './create-gym/create-gym.component';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { ComponentModule } from 'src/app/shared/component/component.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ListGymComponent } from './list-gym/list-gym.component';
import { GymService } from './gym.service';
import { ProfileGymComponent } from './profile-gym/profile-gym.component';
import { AgendaGymComponent } from './agenda-gym/agenda-gym.component';
import { AgendamentoGymComponent } from './agendamento-gym/agendamento-gym.component';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { ProfileService } from '../profile/profile.service';
import { CommunityService } from '../community/community.service';

@NgModule({
  declarations: [
    CreateGymComponent,
    ListGymComponent,
    ProfileGymComponent,
    AgendaGymComponent,
    AgendamentoGymComponent,
  ],
  imports: [
    CommonModule,
    GymRoutingModule,
    AppMaterialModule,
    ComponentModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxMatTimepickerModule
  ],
  providers: [GymService, ProfileService, CommunityService],
})
export class GymModule {}
