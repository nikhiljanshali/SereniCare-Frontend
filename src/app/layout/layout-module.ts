import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutRoutingModule } from './layout-routing-module';
import { Layout } from './layout/layout';
import { SharedModule } from '../shared/shared-module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PatientModule } from '../features/patient/patient-module';
import { ClinicModule } from '../features/clinic/clinic-module';
import { DoctorModule } from '../features/doctors/doctor-module';
import { AppointmentsModule } from '../features/appointments/appointments-module';

@NgModule({
  declarations: [Layout],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    AppointmentsModule,
    PatientModule,
    ClinicModule,
    DoctorModule,
    RouterModule,
    SharedModule,
    ModalModule.forRoot()
  ]
})
export class LayoutModule { }
