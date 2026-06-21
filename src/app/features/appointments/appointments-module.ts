import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentLayout } from './appointment-layout/appointment-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { FocusTrapDirective } from 'ngx-bootstrap/focus-trap';
import { AppointmentsRoutingModule } from './appointments-routing-module';
import { AppointmentList } from './pages/appointment-list/appointment-list';

@NgModule({
  declarations: [
    AppointmentLayout,
    AppointmentList
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FocusTrapDirective,
    AppointmentsRoutingModule,
  ]
})
export class AppointmentsModule { }
