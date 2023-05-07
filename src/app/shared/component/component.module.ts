import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { RouterModule } from '@angular/router';
import { CardComponent } from './card/card.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { AppMaterialModule } from '../app-material/app-material.module';
import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component';
import { FormsModule } from '@angular/forms';
import { CardV2Component } from './card-v2/card-v2.component';

@NgModule({
  exports: [
    ToolbarComponent,
    CardComponent,
    ImageUploadComponent,
    ThemeSwitcherComponent,
    CardV2Component
  ],
  declarations: [
    ToolbarComponent,
    CardComponent,
    ImageUploadComponent,
    ThemeSwitcherComponent,
    CardV2Component,
  ],
  imports: [CommonModule, RouterModule, AppMaterialModule, FormsModule],
})
export class ComponentModule {}
