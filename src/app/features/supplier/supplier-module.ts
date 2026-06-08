import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierRoutingModule } from './supplier-routing-module';
import { ReactiveFormsModule } from '@angular/forms';
import { DayPilotModule } from '@daypilot/daypilot-lite-angular';
import { FocusTrapDirective } from 'ngx-bootstrap/focus-trap';
import { RightSidebar } from '../../shared/component/right-sidebar/right-sidebar';
import { SupplierLayout } from './supplier-layout/supplier-layout';
import { SupplierRegistration } from './pages/supplier-registration/supplier-registration';
import { SupplierList } from './pages/supplier-list/supplier-list';


@NgModule({
  declarations: [
    SupplierLayout,
    SupplierRegistration,
    SupplierList
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FocusTrapDirective,
    RightSidebar,
    DayPilotModule,
    SupplierRoutingModule
  ]
})
export class SupplierModule { }
