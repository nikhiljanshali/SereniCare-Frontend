import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NurseLayout } from './nurse-layout/nurse-layout';
import { NurseRegistration } from './pages/nurse-registration/nurse-registration';
import { roleGuard } from '../../core/guards/role.guard';
import { Roles } from '../../core/enum/common.enum';
import { NurseList } from './pages/nurse-list/nurse-list';

const routes: Routes = [
  {
    path: '',
    component: NurseLayout,
    children: [
      {
        path: 'master/registration',
        component: NurseRegistration,
        canActivate: [roleGuard],
        data: { roles: [Roles.SystemAdmin] }
      },
      {
        path: 'master/list',
        component: NurseList,
        canActivate: [roleGuard],
        data: { roles: [Roles.SystemAdmin] }
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
export class NurseRoutingModule { }
