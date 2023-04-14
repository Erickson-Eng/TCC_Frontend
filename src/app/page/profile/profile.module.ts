import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { PersonalComponent } from './personal/personal.component';
import { ComponentModule } from 'src/app/shared/component/component.module';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PersonalComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ComponentModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class ProfileModule {}
