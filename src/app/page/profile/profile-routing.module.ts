import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalComponent } from './personal/personal.component';
import { AthleteComponent } from './athlete/athlete.component';

const routes: Routes = [
  {path: '', component:PersonalComponent},
  {path: 'athlete', component:AthleteComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
