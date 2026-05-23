import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { roleGuard } from '../core/guards/role-guard-guard';
import { Roles } from '../core/enum/common.enum';

const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      // 🏥 Dashboard - Accessible by all authenticated users
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard').then(m => m.Dashboard)
      },
      // 👨‍⚕️ Appointment Module - Role: Doctor, Patient, SystemAdmin
      {
        path: 'appointments',
        loadChildren: () =>
          import('./../features/appointments/appointments-module').then(m => m.AppointmentsModule),
        canActivate: [roleGuard],
        data: { roles: [Roles.SystemAdmin, Roles.Doctor, Roles.Patient] }
      },

      // 👨‍⚕️ Patient Module - Role: Doctor, Patient, SystemAdmin
      {
        path: 'patients',
        loadChildren: () =>
          import('./../features/patient/patient-module').then(m => m.PatientModule),
        canActivate: [roleGuard],
        data: { roles: [Roles.SystemAdmin, Roles.Patient] }
      },
      // 🏨 Doctors Module - Role: SystemAdmin, Admin
      {
        path: 'doctors',
        loadChildren: () =>
          import('../features/doctors/doctor-module').then(m => m.DoctorModule),
        canActivate: [roleGuard],
        data: { roles: [Roles.SystemAdmin, Roles.Doctor] }
      },
      // 🔄 Default route
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  // fallback
  { path: '**', redirectTo: 'signin' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
