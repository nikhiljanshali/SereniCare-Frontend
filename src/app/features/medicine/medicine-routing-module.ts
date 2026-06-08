import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicineLayout } from './medicine-layout/medicine-layout';
import { roleGuard } from '../../core/guards/role-guard-guard';
import { Roles } from '../../core/enum/common.enum';
import { AddMedicine } from './pages/add-medicine/add-medicine';
import { MedicineList } from './pages/medicine-list/medicine-list';
import { ImportMedicine } from './pages/import-medicine/import-medicine';

const routes: Routes = [
  {
    path: '',
    component: MedicineLayout,
    children: [
      {
        path: 'master/add',
        component: AddMedicine,
        canActivate: [roleGuard],
        data: { roles: [Roles.SystemAdmin] }
      },
      {
        path: 'master/list',
        component: MedicineList,
        canActivate: [roleGuard],
        data: { roles: [Roles.SystemAdmin] }
      },
      {
        path: 'master/import',
        component: ImportMedicine,
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
export class MedicineRoutingModule { }
