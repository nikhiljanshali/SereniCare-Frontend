import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientLayout } from './patient-layout/patient-layout';
import { roleGuard } from '../../core/guards/role-guard-guard';
import { Roles } from '../../core/enum/common.enum';
import { PatientRegistration } from './pages/patient-registration/patient-registration';
import { PatientList } from './pages/patient-list/patient-list';

const routes: Routes = [
  {
    path: '',
    component: PatientLayout,
    children: [
      {
        path: 'master/registration',
        component: PatientRegistration,
        canActivate: [roleGuard],
        data: { roles: [Roles.SystemAdmin, Roles.Patient] }
      },
      {
        path: 'master/list',
        component: PatientList,
        canActivate: [roleGuard],
        data: { roles: [Roles.SystemAdmin, Roles.Patient, Roles.Doctor] }
      },
      { path: '', redirectTo: 'appointments', pathMatch: 'full' },
    ]
  },
  // ✅ fallback
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
