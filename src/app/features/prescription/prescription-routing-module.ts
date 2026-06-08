import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrescriptionLayout } from './prescription-layout/prescription-layout';
import { roleGuard } from '../../core/guards/role-guard-guard';
import { Roles } from '../../core/enum/common.enum';
import { CreatePrescription } from './pages/create-prescription/create-prescription';
import { PrescriptionList } from './pages/prescription-list/prescription-list';

const routes: Routes = [
  {
    path: '',
    component: PrescriptionLayout,
    children: [
      {
        path: 'master/create/:patientId/:appointmentId',
        component: CreatePrescription,
        canActivate: [roleGuard],
        data: { roles: [Roles.SystemAdmin, Roles.Doctor] }
      },
      {
        path: 'master/list',
        component: PrescriptionList,
        canActivate: [roleGuard],
        data: { roles: [Roles.SystemAdmin, Roles.Doctor] }
      },
    ]
  },
  // ✅ fallback
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrescriptionRoutingModule { }
