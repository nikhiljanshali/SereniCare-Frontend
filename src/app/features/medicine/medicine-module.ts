import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicineRoutingModule } from './medicine-routing-module';
import { FocusTrapDirective } from 'ngx-bootstrap/focus-trap';
import { RightSidebar } from '../../shared/component/right-sidebar/right-sidebar';
import { DayPilotModule } from '@daypilot/daypilot-lite-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { MedicineLayout } from './medicine-layout/medicine-layout';
import { AddMedicine } from './pages/add-medicine/add-medicine';
import { MedicineList } from './pages/medicine-list/medicine-list';

@NgModule({
  declarations: [
    MedicineLayout,
    AddMedicine,
    MedicineList,
  ],
  imports: [
    CommonModule,
    MedicineRoutingModule,
    ReactiveFormsModule,
    FocusTrapDirective,
    RightSidebar,
    DayPilotModule,    
  ]
})
export class MedicineModule { }
