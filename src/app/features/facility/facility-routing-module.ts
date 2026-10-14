import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacilityLayout } from './facility-layout/facility-layout';
import { roleGuard } from '../../core/guards/role.guard';
import { Dashboard } from './pages/dashboard/dashboard';
import { Roles } from '../../core/enum/common.enum';
import { FacilityList } from './pages/facility-list/facility-list';
import { MasterFacilityType } from './pages/master-facility-type/master-facility-type';
import { MasterFacilityTypeList } from './pages/master-facility-type-list/master-facility-type-list';
import { CreateFacility } from './pages/create-facility/create-facility';
import { WingsNBeds } from './pages/wings-nbeds/wings-nbeds';

const routes: Routes = [
  {
    path: '',
    component: FacilityLayout,
    children: [
      {
        path: 'master/dashboard',
        component: Dashboard,
        canActivate: [roleGuard],
        data: { roles: [Roles.SystemAdmin] }
      },
      {
        path: 'master/create',
        component: CreateFacility,
        canActivate: [roleGuard],
        data: { roles: [Roles.SystemAdmin] }
      },
      {
        path: 'master/list',
        component: FacilityList,
        canActivate: [roleGuard],
        data: { roles: [Roles.SystemAdmin] }
      },
      {
        path: 'master/wingbeds',
        component: WingsNBeds,
        canActivate: [roleGuard],
        data: { roles: [Roles.SystemAdmin] }
      },
      {
        path: 'master/create-facility-type',
        component: MasterFacilityType,
        canActivate: [roleGuard],
        data: { roles: [Roles.SystemAdmin] }
      },
      {
        path: 'master/facility-type-list',
        component: MasterFacilityTypeList,
        canActivate: [roleGuard],
        data: { roles: [Roles.SystemAdmin] }
      },
      { path: '', redirectTo: 'master/dashboard', pathMatch: 'full' },
    ]
  },
  // ✅ fallback
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacilityRoutingModule { }
