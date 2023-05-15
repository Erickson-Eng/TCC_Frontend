import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'account/auth' },
  {
    path: 'account',
    loadChildren: () =>
      import('./page/account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'profile',
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import('./page/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'home',
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import('./page/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'gym',
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import('./page/gym/gym.module').then((m) => m.GymModule),
  },
  {
    path: 'community',
    canActivate: [AuthGuardService],
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
