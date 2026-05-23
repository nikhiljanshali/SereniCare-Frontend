import { Routes } from '@angular/router';
import { authenticaionGuard } from './core/guards/authenticaion-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'layout', pathMatch: 'full' },
  {
    path: 'layout',
    canActivate: [authenticaionGuard],
    loadChildren: () =>
      import('./layout/layout-module').then(m => m.LayoutModule)
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth-module').then(m => m.AuthModule)
  },
  {
    path: 'clinic',
    loadChildren: () =>
      import('./features/clinic/clinic-module').then(m => m.ClinicModule)
  },
  { path: '**', redirectTo: 'auth/signin' }
];
