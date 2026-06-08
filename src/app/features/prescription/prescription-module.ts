import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';

import { PrescriptionRoutingModule } from './prescription-routing-module';
import { ReactiveFormsModule } from '@angular/forms';
import { DayPilotModule } from '@daypilot/daypilot-lite-angular';
import { FocusTrapDirective } from 'ngx-bootstrap/focus-trap';
import { RightSidebar } from '../../shared/component/right-sidebar/right-sidebar';
import { PrescriptionLayout } from './prescription-layout/prescription-layout';
import { CreatePrescription } from './pages/create-prescription/create-prescription';
import { PrescriptionList } from './pages/prescription-list/prescription-list';


@NgModule({
  declarations: [
    PrescriptionLayout,
    CreatePrescription,
    PrescriptionList
  ],
  imports: [
    CommonModule,
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    FocusTrapDirective,
    RightSidebar,
    DayPilotModule,
    PrescriptionRoutingModule,
  ]
})
export class PrescriptionModule { }
