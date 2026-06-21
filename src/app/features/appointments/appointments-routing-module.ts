import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { roleGuard } from '../../core/guards/role-guard-guard';
import { Roles } from '../../core/enum/common.enum';
import { AppointmentLayout } from './appointment-layout/appointment-layout';
import { AppointmentList } from './pages/appointment-list/appointment-list';

const routes: Routes = [
  {
    path: '',
    component: AppointmentLayout,
    children: [
      {
        path: 'master/list',
        component: AppointmentList,
        canActivate: [roleGuard],
        data: { roles: [Roles.SystemAdmin] }
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
export class AppointmentsRoutingModule { }
