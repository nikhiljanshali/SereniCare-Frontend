import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientLayout } from './patient-layout/patient-layout';
import { roleGuard } from '../../core/guards/role-guard-guard';
import { Roles } from '../../core/enum/common.enum';
import { PatientRegistration } from './pages/patient-registration/patient-registration';
import { PatientList } from './pages/patient-list/patient-list';
import { PatientMedicalHistory } from './pages/patient-medical-history/patient-medical-history';

const routes: Routes = [
  {
    path: '',
    component: PatientLayout,
    children: [
      {
        path: 'master/registration',
        component: PatientRegistration,
        canActivate: [roleGuard],
        data: {
          roles: [Roles.SystemAdmin, Roles.Patient, Roles.Doctor],
          animation: 'PatientRegistration'
        }
      },
      {
        path: 'master/list',
        component: PatientList,
        canActivate: [roleGuard],
        data: {
          roles: [Roles.SystemAdmin, Roles.Patient, Roles.Doctor],
          animation: 'PatientList'
        }
      },
      {
        path: 'master/details/:patientId',
        component: PatientMedicalHistory,
        canActivate: [roleGuard],
        data: {
          roles: [Roles.SystemAdmin, Roles.Patient, Roles.Doctor],
          animation: 'PatientDetails'
        }
      },
      { path: '', redirectTo: 'master/list', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '' }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
