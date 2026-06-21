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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RightSidebar } from '../../shared/component/right-sidebar/right-sidebar';
import { PatientMedicalHistory } from './pages/patient-medical-history/patient-medical-history';
import { PastMedical } from '../../shared/component/past-medical/past-medical';
import { PastSurgical } from '../../shared/component/past-surgical/past-surgical';


@NgModule({
  declarations: [
    PatientLayout,
    PatientAppointmentList,
    PatientCalendarView,
    PatientAppointmentBook,
    PatientRegistration,
    PatientList,
    PatientMedicalHistory,
    PastMedical,
    PastSurgical
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PatientRoutingModule,
    FocusTrapDirective,
    RightSidebar,
  ]
})
export class PatientModule { }
