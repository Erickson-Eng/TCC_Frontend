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

@NgModule({
  declarations: [CreateGymComponent, ListGymComponent, ProfileGymComponent],
  imports: [
    CommonModule,
    GymRoutingModule,
    AppMaterialModule,
    ComponentModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [GymService],
})
export class GymModule {}
