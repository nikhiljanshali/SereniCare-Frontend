import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientLayout } from './patient-layout/patient-layout';
import { PatientRoutingModule } from './patient-routing-module';
import { PatientAppointmentList } from './pages/patient-appointment-list/patient-appointment-list';
import { PatientCalendarView } from './pages/patient-calendar-view/patient-calendar-view';
import { PatientAppointmentBook } from './pages/patient-appointment-book/patient-appointment-book';
import { PatientRegistration } from './pages/patient-registration/patient-registration';
import { PatientList } from './pages/patient-list/patient-list';
import { FocusTrapDirective } from "ngx-bootstrap/focus-trap";
import { ReactiveFormsModule } from '@angular/forms';
import { RightSidebar } from '../../shared/component/right-sidebar/right-sidebar';


@NgModule({
  declarations: [
    PatientLayout,
    PatientAppointmentList,
    PatientCalendarView,
    PatientAppointmentBook,
    PatientRegistration,
    PatientList
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PatientRoutingModule,
    FocusTrapDirective,
    RightSidebar
  ]
})
export class PatientModule { }
