import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IPatientsData } from '../../../core/interface/basic.interface';

@Component({
  selector: 'app-patient-detail-header',
  imports: [CommonModule],
  templateUrl: './patient-detail-header.html',
  styleUrl: './patient-detail-header.css',
})
export class PatientDetailHeader {
  @Input() patientDetails: IPatientsData | null = null;


  get totalCoverageAmount(): number {
    if (!this.patientDetails?.insuranceDetails?.length) {
      return 0;
    }

    return this.patientDetails.insuranceDetails.reduce(
      (sum: number, insurance: any) =>
        sum + Number(insurance.coverageAmount || 0),
      0
    );
  }

}
