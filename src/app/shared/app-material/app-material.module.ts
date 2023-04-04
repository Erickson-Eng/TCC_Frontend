import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';

@NgModule({
  exports: [
    MatIconModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
  ],
})
export class AppMaterialModule {}
