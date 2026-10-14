import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-insurance-tariffs',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './view-insurance-tariffs.html',
  styleUrl: './view-insurance-tariffs.css',
})
export class ViewInsuranceTariffs {
  @Input() patientDetails: any | null = null;
  public selectedInsuranceTariffs: any

  constructor() {

  }

  ngOnInit(): void {
    console.log(this.patientDetails.insuranceTpa);
    this.selectedInsuranceTariffs = this.patientDetails.insuranceTpa;
  }
}
