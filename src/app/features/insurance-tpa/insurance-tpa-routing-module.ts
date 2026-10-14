import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsuranceTPALayout } from './insurance-tpalayout/insurance-tpalayout';
import { InsuranceTpaDashboard } from './pages/insurance-tpa-dashboard/insurance-tpa-dashboard';
import { roleGuard } from '../../core/guards/role.guard';
import { Roles } from '../../core/enum/common.enum';

const routes: Routes = [
  {
    path: '',
    component: InsuranceTPALayout,
    children: [
      {
        path: 'master/dashboard',
        component: InsuranceTpaDashboard,
        canActivate: [roleGuard],
        data: { roles: [Roles.SystemAdmin] }
      },
      { path: '', redirectTo: 'master/dashboard', pathMatch: 'full' },
    ]
  },
  // ✅ fallback route, must be the last one
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuranceTPARoutingModule { }
