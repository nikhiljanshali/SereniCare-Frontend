import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Sidebar } from '../../../core/services/sidebar';
import { PatientMedicalHistoryDetails } from '../../../features/patient/pages/patient-medical-history-details/patient-medical-history-details';
import { EditDoctorDetails } from '../../../features/doctors/pages/edit-doctor-details/edit-doctor-details';
import { EditAppointmentBooking } from '../../../features/doctors/pages/edit-appointment-booking/edit-appointment-booking';

@Component({
  selector: 'app-right-sidebar',
  standalone: true,
  imports: [CommonModule, PatientMedicalHistoryDetails, EditDoctorDetails, EditAppointmentBooking],
  templateUrl: './right-sidebar.html',
  styleUrl: './right-sidebar.css',
})
export class RightSidebar {
  public rightBarDetails: any;
  
  // Inject your shared state service
  protected sidebarService = inject(Sidebar);

  public closed$ = this.sidebarService.close$;

  /**
   * Updates the content dynamic variables and slides open the drawer panel
   */
  public openRightSidebar(title: string, content: string, details: any): void {
    this.rightBarDetails = details;
    this.sidebarService.open(title, content, details);
  }

  /**
   * Close the right sidebar
   */
  public closeRightSidebar(result?: any): void {
    this.sidebarService.close(result);
  }


  onsaveSuccess(event: any): void {
    if (event) {
      this.sidebarService.close(event);
    }
  }
}
