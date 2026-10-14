import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-appointment-details',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './view-appointment-details.html',
  styleUrl: './view-appointment-details.css',
})
export class ViewAppointmentDetails {
  @Input() patientDetails: any | null = null;
  public selectedAppointmentDetails: any

  constructor() {

  }

  ngOnInit(): void {
    console.log(this.patientDetails.appointmentDtails);
    this.selectedAppointmentDetails = this.patientDetails.appointmentDtails;
  }
}
