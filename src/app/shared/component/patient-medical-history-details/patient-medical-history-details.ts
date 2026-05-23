import { Component, Input, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPatientsData } from '../../../core/interface/patients.interface';

@Component({
  selector: 'app-patient-medical-history-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-medical-history-details.html',
  styleUrl: './patient-medical-history-details.css',
})
export class PatientMedicalHistoryDetails {
  @Input() patientDetails: any;

  constructor() {

  }

  ngOnInit(): void {
    console.log(this.patientDetails);
  }
}
