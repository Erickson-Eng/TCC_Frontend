import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCommunityComponent } from './create-community/create-community.component';
import { ListCommunityComponent } from './list-community/list-community.component';

const routes: Routes = [
  { path: 'create', component: CreateCommunityComponent },
  { path: 'list', component: ListCommunityComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunityRoutingModule {}
