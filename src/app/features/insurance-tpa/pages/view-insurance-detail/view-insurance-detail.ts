import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-insurance-detail',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './view-insurance-detail.html',
  styleUrl: './view-insurance-detail.css',
})
export class ViewInsuranceDetail {
  @Input() patientDetails: any | null = null;
  public selectedInsuranceDetail: any

  constructor() {

  }

  ngOnInit(): void {
    console.log(this.patientDetails.insuranceDetail);
    this.selectedInsuranceDetail = this.patientDetails.insuranceDetail;
  }
}
