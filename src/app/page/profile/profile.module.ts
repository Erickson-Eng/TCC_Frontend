import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { PersonalComponent } from './personal/personal.component';
import { ComponentModule } from 'src/app/shared/component/component.module';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AthleteComponent } from './athlete/athlete.component';
import { ManagerComponent } from './manager/manager.component';
import { ProfileService } from './profile.service';
import { HttpClientModule } from '@angular/common/http';
import { CommunityService } from '../community/community.service';
import { GymService } from '../gym/gym.service';

@NgModule({
  declarations: [PersonalComponent, AthleteComponent, ManagerComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ComponentModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [ProfileService, CommunityService, GymService],
})
export class ProfileModule {}
