import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { RouterModule } from '@angular/router';
import { CardComponent } from './card/card.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { AppMaterialModule } from '../app-material/app-material.module';
import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  exports: [
    ToolbarComponent,
    CardComponent,
    ImageUploadComponent,
    ThemeSwitcherComponent,
  ],
  declarations: [
    ToolbarComponent,
    CardComponent,
    ImageUploadComponent,
    ThemeSwitcherComponent,
  ],
  imports: [CommonModule, RouterModule, AppMaterialModule, FormsModule],
})
export class ComponentModule {}
