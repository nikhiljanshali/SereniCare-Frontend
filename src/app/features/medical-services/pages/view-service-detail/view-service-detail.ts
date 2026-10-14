import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-service-detail',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './view-service-detail.html',
  styleUrl: './view-service-detail.css',
})
export class ViewServiceDetail {
  @Input() patientDetails: any | null = null;
  public selectedMedicalService: any

  constructor() {

  }

  ngOnInit(): void {
    console.log(this.patientDetails.service);
    this.selectedMedicalService = this.patientDetails.service;
  }

}
