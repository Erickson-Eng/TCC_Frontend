import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { RouterModule } from '@angular/router';
import { CardComponent } from './card/card.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { AppMaterialModule } from '../app-material/app-material.module';



@NgModule({
  exports: [
    ToolbarComponent,
    CardComponent,
    ImageUploadComponent
  ],
  declarations: [
    ToolbarComponent,
    CardComponent,
    ImageUploadComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AppMaterialModule
  ]
})
export class ComponentModule { }
