import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientLayout } from './patient-layout/patient-layout';
import { Roles } from '../../core/enum/common.enum';
import { PatientRegistration } from './pages/patient-registration/patient-registration';
import { PatientList } from './pages/patient-list/patient-list';
import { PatientMedicalHistory } from './pages/patient-medical-history/patient-medical-history';
import { PatientProfile } from './pages/patient-profile/patient-profile';
import { PatientExamination } from './pages/patient-examination/patient-examination';
import { roleGuard } from '../../core/guards/role.guard';
import { PatientChiefOfComplaint } from './pages/patient-chief-of-complaint/patient-chief-of-complaint';
import { PatientPresentIllness } from './pages/patient-present-illness/patient-present-illness';
import { PatientPhycialExamiantionDetails } from '../../shared/component/patients/patient-phycial-examiantion-details/patient-phycial-examiantion-details';

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
        path: 'master/profile',
        component: PatientProfile,
        canActivate: [roleGuard],
        data: {
          roles: [Roles.SystemAdmin, Roles.Patient],
          animation: 'PatientProfile'
        }
      },
      {
        path: 'master/chiefofComplaint',
        component: PatientChiefOfComplaint,
        canActivate: [roleGuard],
        data: {
          roles: [Roles.SystemAdmin, Roles.Patient],
        }
      },
      {
        path: 'master/presentillness',
        component: PatientPresentIllness,
        canActivate: [roleGuard],
        data: {
          roles: [Roles.SystemAdmin, Roles.Patient],
        }
      },
      {
        path: 'master/physicalexamination',
        component: PatientPhycialExamiantionDetails,
        canActivate: [roleGuard],
        data: {
          roles: [Roles.SystemAdmin, Roles.Patient],
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
      {
        path: 'master/examination/:patientId',
        component: PatientExamination,
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
