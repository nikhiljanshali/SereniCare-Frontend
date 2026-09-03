import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FocusTrapDirective } from 'ngx-bootstrap/focus-trap';
import { DoctorLayout } from './doctor-layout/doctor-layout';
import { DoctorRegistration } from './pages/doctor-registration/doctor-registration';
import { DoctorAppointment } from './pages/doctor-appointment/doctor-appointment';
import { AdminDoctorView } from './pages/admin-doctor-view/admin-doctor-view';
import { DoctorProfile } from './pages/doctor-profile/doctor-profile';
import { RightSidebar } from '../../shared/component/right-sidebar/right-sidebar';
import { DayPilotModule } from '@daypilot/daypilot-lite-angular';
import { AddClinic } from './pages/add-clinic/add-clinic';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ClinicStampUpload } from './pages/clicni-stamp-upload/clinic-stamp-upload';

@NgModule({
  declarations: [
    DoctorLayout,
    DoctorRegistration,
    DoctorAppointment,
    AdminDoctorView,
    DoctorProfile,
    AddClinic,
    ClinicStampUpload
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FocusTrapDirective,
    DoctorRoutingModule,
    RightSidebar,
    DayPilotModule,
    PopoverModule
  ]
})
export class DoctorModule { }
