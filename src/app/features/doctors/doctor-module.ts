import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing-module';
import { ReactiveFormsModule } from '@angular/forms';
import { FocusTrapDirective } from 'ngx-bootstrap/focus-trap';
import { DoctorLayout } from './doctor-layout/doctor-layout';
import { DoctorRegistration } from './pages/doctor-registration/doctor-registration';


@NgModule({
  declarations: [
    DoctorLayout,
    DoctorRegistration
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FocusTrapDirective,
    DoctorRoutingModule
  ]
})
export class DoctorModule { }
