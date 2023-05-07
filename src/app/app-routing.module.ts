import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'account' },
  {
    path: 'account',
    loadChildren: () =>
      import('./page/account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./page/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./page/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'gym',
    loadChildren: () =>
      import('./page/gym/gym.module').then((m) => m.GymModule),
  },
  {
    path: 'community',
    loadChildren: () =>
      import('./page/community/community.module').then(
        (m) => m.CommunityModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
