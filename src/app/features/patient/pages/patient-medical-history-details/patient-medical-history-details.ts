import { Component, Input, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarPatientHeader } from '../../../../shared/component/side-bar-patient-header/side-bar-patient-header';
import { IPatientsData } from '../../../../core/interface/basic.interface';

@Component({
  selector: 'app-patient-medical-history-details',
  standalone: true,
  imports: [CommonModule, SideBarPatientHeader],
  templateUrl: './patient-medical-history-details.html',
  styleUrl: './patient-medical-history-details.css',
})
export class PatientMedicalHistoryDetails {
  @Input() patientDetails: any | null = null;

  constructor() {

  }

  ngOnInit(): void {
    console.log(this.patientDetails.patient);
  }
}
