import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsuranceTPARoutingModule } from './insurance-tpa-routing-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DayPilotModule } from '@daypilot/daypilot-lite-angular';
import { FocusTrapDirective } from 'ngx-bootstrap/focus-trap';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { RightSidebar } from '../../shared/component/right-sidebar/right-sidebar';
import { InsuranceTPALayout } from './insurance-tpalayout/insurance-tpalayout';
import { InsuranceTpaDashboard } from './pages/insurance-tpa-dashboard/insurance-tpa-dashboard';
import { AddInsuranceTPA } from './pages/add-insurance-tpa/add-insurance-tpa';


@NgModule({
  declarations: [
    InsuranceTPALayout,
    InsuranceTpaDashboard,
    AddInsuranceTPA
  ],
  imports: [
    CommonModule,
    InsuranceTPARoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FocusTrapDirective,
    RightSidebar,
    DayPilotModule,
    PopoverModule
  ]
})
export class InsuranceTPAModule { }
