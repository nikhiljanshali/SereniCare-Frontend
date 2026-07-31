import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientDetails } from './../../../core/interface/basic.interface';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-side-bar-patient-header',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './side-bar-patient-header.html',
  styleUrl: './side-bar-patient-header.css',
})
export class SideBarPatientHeader {

  @Input() patientDetails: any;

  constructor() {
  }

  ngOnInit(): void {
  }

}
