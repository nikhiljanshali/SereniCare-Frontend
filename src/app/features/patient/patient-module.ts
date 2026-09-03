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
import { PatientGeneralSurvey } from '../../shared/component/patients/patient-general-survey/patient-general-survey';
import { PatientCardioVascular } from '../../shared/component/patients/patient-cardio-vascular/patient-cardio-vascular';
import { PatientRespiratory } from '../../shared/component/patients/patient-respiratory/patient-respiratory';
import { PatientNeurological } from '../../shared/component/patients/patient-neurological/patient-neurological';
import { PatientGastrointestinal } from '../../shared/component/patients/patient-gastrointestinal/patient-gastrointestinal';
import { PatientHeent } from '../../shared/component/patients/patient-heent/patient-heent';
import { PatientGenitourinary } from '../../shared/component/patients/patient-genitourinary/patient-genitourinary';
import { PatientMusculoskeletalExamination } from '../../shared/component/patients/patient-musculoskeletal-examination/patient-musculoskeletal-examination';
import { PatientSkinExamination } from '../../shared/component/patients/patient-skin-examination/patient-skin-examination';
import { PatientPsychiatric } from '../../shared/component/patients/patient-psychiatric/patient-psychiatric';
import { PatientPhycialExamiantionDetails } from '../../shared/component/patients/patient-phycial-examiantion-details/patient-phycial-examiantion-details';
import { PatientDetailHeader } from '../../shared/component/patient-detail-header/patient-detail-header';
import { NgLabelTemplateDirective, NgOptionTemplateDirective, NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { DayPilotModule } from '@daypilot/daypilot-lite-angular';

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
    PatientAllergies,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PatientRoutingModule,
    FocusTrapDirective,
    DayPilotModule,
    NgSelectModule,
    NgLabelTemplateDirective,
    NgOptionTemplateDirective,
    NgSelectComponent,
    RightSidebar,
    PopoverModule,
    PatientDetailHeader,
    PatientGeneralSurvey,
    PatientCardioVascular,
    PatientRespiratory,
    PatientNeurological,
    PatientGastrointestinal,
    PatientHeent,
    PatientGenitourinary,
    PatientMusculoskeletalExamination,
    PatientSkinExamination,
    PatientPsychiatric,
    PatientPhycialExamiantionDetails,
  ]
})
export class PatientModule { }
