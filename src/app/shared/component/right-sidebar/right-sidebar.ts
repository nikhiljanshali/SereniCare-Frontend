import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Sidebar } from '../../../core/services/sidebar';
import { PatientMedicalHistoryDetails } from '../../../features/patient/pages/patient-medical-history-details/patient-medical-history-details';
import { MedicineDetails } from '../../../features/medicine/pages/medicine-details/medicine-details';
import { EditDoctorDetails } from '../../../features/doctors/pages/edit-doctor-details/edit-doctor-details';
import { EditAppointmentBooking } from '../../../features/doctors/pages/edit-appointment-booking/edit-appointment-booking';
import { ChiefComplaint } from '../../../features/doctors/pages/chief-complaint/chief-complaint';
import { VitalDetails } from '../../../features/doctors/pages/vital-details/vital-details';
import { PatientHipDetails } from '../../../features/doctors/pages/patient-hip-details/patient-hip-details';
import { ViewServiceDetail } from '../../../features/medical-services/pages/view-service-detail/view-service-detail';
import { ViewInsuranceTariffs } from '../../../features/medical-services/pages/view-insurance-tariffs/view-insurance-tariffs';
import { ViewServicePackageDetail } from '../../../features/medical-services/pages/view-service-package-detail/view-service-package-detail';
import { ViewInsuranceDetail } from '../../../features/insurance-tpa/pages/view-insurance-detail/view-insurance-detail';
import { ViewAppointmentDetails } from '../../../features/appointments/pages/view-appointment-details/view-appointment-details';
import { PatientEdit } from '../../../features/patient/pages/patient-edit/patient-edit';


@Component({
  selector: 'app-right-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    PatientMedicalHistoryDetails, MedicineDetails, EditDoctorDetails, EditAppointmentBooking,
    ChiefComplaint, VitalDetails, PatientHipDetails, PatientEdit,
    ViewServiceDetail, ViewInsuranceTariffs, ViewServicePackageDetail, ViewInsuranceDetail, ViewAppointmentDetails
  ],
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