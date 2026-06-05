import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing-module';
import { ReactiveFormsModule } from '@angular/forms';
import { FocusTrapDirective } from 'ngx-bootstrap/focus-trap';
import { DoctorLayout } from './doctor-layout/doctor-layout';
import { DoctorRegistration } from './pages/doctor-registration/doctor-registration';
import { DoctorAppointment } from './pages/doctor-appointment/doctor-appointment';
import { AdminDoctorView } from './pages/admin-doctor-view/admin-doctor-view';
import { DoctorProfile } from './pages/doctor-profile/doctor-profile';
import { RightSidebar } from '../../shared/component/right-sidebar/right-sidebar';
import { DayPilotModule } from '@daypilot/daypilot-lite-angular';

@NgModule({
  declarations: [
    DoctorLayout,
    DoctorRegistration,
    DoctorAppointment,
    AdminDoctorView,
    DoctorProfile,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FocusTrapDirective,
    DoctorRoutingModule,
    RightSidebar,
    DayPilotModule
  ]
})
export class DoctorModule { }
