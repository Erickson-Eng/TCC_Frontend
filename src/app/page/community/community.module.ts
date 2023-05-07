import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunityRoutingModule } from './community-routing.module';
import { CreateCommunityComponent } from './create-community/create-community.component';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { ComponentModule } from 'src/app/shared/component/component.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ListCommunityComponent } from './list-community/list-community.component';
import { CommunityService } from './community.service';

@NgModule({
  declarations: [CreateCommunityComponent, ListCommunityComponent],
  imports: [
    CommonModule,
    CommunityRoutingModule,
    AppMaterialModule,
    ComponentModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [CommunityService],
})
export class CommunityModule {}
