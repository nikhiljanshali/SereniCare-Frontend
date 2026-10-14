import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacilityRoutingModule } from './facility-routing-module';
import { FacilityLayout } from './facility-layout/facility-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DayPilotModule } from '@daypilot/daypilot-lite-angular';
import { FocusTrapDirective } from 'ngx-bootstrap/focus-trap';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { RightSidebar } from '../../shared/component/right-sidebar/right-sidebar';
import { Dashboard } from './pages/dashboard/dashboard';

@NgModule({
  declarations: [
    FacilityLayout,
    Dashboard,
  ],
  imports: [
    CommonModule,
    FacilityRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FocusTrapDirective,
    RightSidebar,
    DayPilotModule,
    PopoverModule
  ]
})
export class FacilityModule { }
