import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorLayout } from './doctor-layout/doctor-layout';
import { Roles } from '../../core/enum/common.enum';
import { roleGuard } from '../../core/guards/role-guard-guard';
import { DoctorRegistration } from './pages/doctor-registration/doctor-registration';
import { DoctorList } from './pages/doctor-list/doctor-list';
import { ClinicList } from './pages/clinic-list/clinic-list';
import { BookAppointments } from './pages/book-appointments/book-appointments';
import { DoctorClinics } from './pages/doctor-clinics/doctor-clinics';
import { DoctorProfile } from './pages/doctor-profile/doctor-profile';

const routes: Routes = [
  {
    path: '',
    component: DoctorLayout,
    children: [
      {
        path: 'master/registration',
        component: DoctorRegistration,
        canActivate: [roleGuard],
        data: { roles: [Roles.SystemAdmin] }
      },
      {
        path: 'master/list',
        component: DoctorList,
        canActivate: [roleGuard],
        data: { roles: [Roles.SystemAdmin] }
      },
      {
        path: 'master/clinics',
        component: ClinicList,
        canActivate: [roleGuard],
        data: { roles: [Roles.SystemAdmin] }
      },

      {
        path: 'master/calendar',
        component: ClinicList,
        canActivate: [roleGuard],
        data: { roles: [Roles.Doctor] }
      },
      {
        path: 'master/appointements',
        component: ClinicList,
        canActivate: [roleGuard],
        data: { roles: [Roles.Doctor] }
      },
      {
        path: 'master/bookappointment',
        component: BookAppointments,
        canActivate: [roleGuard],
        data: { roles: [Roles.Doctor] }
      },

      {
        path: 'master/doctor-profile',
        component: DoctorProfile,
        canActivate: [roleGuard],
        data: { roles: [Roles.SystemAdmin,Roles.Doctor] }
      },
      {
        path: 'master/doctor-clinics',
        component: DoctorClinics,
        canActivate: [roleGuard],
        data: { roles: [Roles.Doctor] }
      },
      { path: '', redirectTo: 'master/registration', pathMatch: 'full' },
    ]
  },
  // ✅ fallback
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
