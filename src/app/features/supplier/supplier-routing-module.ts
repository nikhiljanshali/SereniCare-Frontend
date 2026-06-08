import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierLayout } from './supplier-layout/supplier-layout';
import { Roles } from '../../core/enum/common.enum';
import { roleGuard } from '../../core/guards/role-guard-guard';
import { SupplierRegistration } from './pages/supplier-registration/supplier-registration';
import { SupplierList } from './pages/supplier-list/supplier-list';

const routes: Routes = [
  {
    path: '',
    component: SupplierLayout,
    children: [
      {
        path: 'master/registration',
        component: SupplierRegistration,
        canActivate: [roleGuard],
        data: { roles: [Roles.SystemAdmin] }
      },
      {
        path: 'master/list',
        component: SupplierList,
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
export class SupplierRoutingModule { }
