import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicalServicesLayout } from './medical-services-layout/medical-services-layout';
import { roleGuard } from '../../core/guards/role.guard';
import { Roles } from '../../core/enum/common.enum';
import { MedicalServiceDashboard } from './pages/medical-service-dashboard/medical-service-dashboard';

const routes: Routes = [
  {
    path: '',
    component: MedicalServicesLayout,
    children: [
      {
        path: 'master/dashboard',
        component: MedicalServiceDashboard,
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
export class MedicalServicesRoutingModule { }
