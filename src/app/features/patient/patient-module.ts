import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FocusTrapDirective } from "ngx-bootstrap/focus-trap";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RightSidebar } from '../../shared/component/right-sidebar/right-sidebar';
import { PatientAppointmentBook } from './pages/patient-appointment-book/patient-appointment-book';
import { PatientAppointmentList } from './pages/patient-appointment-list/patient-appointment-list';
import { PatientCalendarView } from './pages/patient-calendar-view/patient-calendar-view';
import { PatientList } from './pages/patient-list/patient-list';
import { PatientMedicalHistory } from './pages/patient-medical-history/patient-medical-history';
import { PatientRegistration } from './pages/patient-registration/patient-registration';
import { PatientLayout } from './patient-layout/patient-layout';
import { PatientRoutingModule } from './patient-routing-module';
import { PatientProfile } from './pages/patient-profile/patient-profile';
import { PatientRisk } from '../../shared/component/patients/patient-risk/patient-risk';
import { PatientExamination } from './pages/patient-examination/patient-examination';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { FamilyHistory } from '../../shared/component/patients/family-history/family-history';
import { PatientDrugReaction } from '../../shared/component/patients/patient-drug-reaction/patient-drug-reaction';
import { PatientAllergies } from '../../shared/component/patients/patient-allergies/patient-allergies';
import { FamilyHistoryLineage } from '../../shared/component/patients/family-history-lineage/family-history-lineage';
import { PastSurgical } from '../../shared/component/patients/past-surgical/past-surgical';
import { PastMedical } from '../../shared/component/patients/past-medical/past-medical';

@NgModule({
  declarations: [
    PatientLayout,
    PatientAppointmentList,
    PatientCalendarView,
    PatientAppointmentBook,
    PatientRegistration,
    PatientProfile,
    PatientList,
    PatientMedicalHistory,
    PastMedical,
    PastSurgical,
    PatientRisk,
    PatientExamination,
    FamilyHistory,
    FamilyHistoryLineage,
    PatientDrugReaction,
    PatientAllergies
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PatientRoutingModule,
    FocusTrapDirective,
    RightSidebar,
    PopoverModule
  ]
})
export class PatientModule { }
