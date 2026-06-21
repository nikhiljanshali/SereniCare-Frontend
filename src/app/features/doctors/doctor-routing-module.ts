import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorLayout } from './doctor-layout/doctor-layout';
import { Roles } from '../../core/enum/common.enum';
import { roleGuard } from '../../core/guards/role-guard-guard';
import { DoctorRegistration } from './pages/doctor-registration/doctor-registration';
import { DoctorList } from './pages/doctor-list/doctor-list';
import { ClinicList } from './pages/clinic-list/clinic-list';
import { DoctorProfile } from './pages/doctor-profile/doctor-profile';
import { AdminDoctorView } from './pages/admin-doctor-view/admin-doctor-view';
import { DoctorAppointment } from './pages/doctor-appointment/doctor-appointment';
import { AppointmentBooking } from './pages/appointment-booking/appointment-booking';
import { AddClinic } from './pages/add-clinic/add-clinic';

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
        data: { roles: [Roles.SystemAdmin, Roles.Doctor] }
      },
      {
        path: 'master/doctor-list',
        component: AdminDoctorView,
        canActivate: [roleGuard],
        data: { roles: [Roles.SystemAdmin] }
      },
      {
        path: 'master/appointements',
        component: ClinicList,
        canActivate: [roleGuard],
        data: { roles: [Roles.Doctor] }
      },
      {
        path: 'master/doctor-profile/:id',
        component: DoctorProfile,
        canActivate: [roleGuard],
        data: { roles: [Roles.SystemAdmin, Roles.Doctor] }
      },
      {
        path: 'master/doctor-appointments',
        component: DoctorAppointment,
        canActivate: [roleGuard],
        data: { roles: [Roles.SystemAdmin, Roles.Doctor] }
      },
      {
        path: 'master/book-appointments',
        component: AppointmentBooking,
        canActivate: [roleGuard],
        data: { roles: [Roles.SystemAdmin, Roles.Doctor] }
      },
      {
        path: 'master/add-Clinic',
        component: AddClinic,
        canActivate: [roleGuard],
        data: { roles: [Roles.SystemAdmin, Roles.Doctor] }
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
