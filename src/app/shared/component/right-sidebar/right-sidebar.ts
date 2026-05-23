import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Sidebar } from '../../../core/services/sidebar';
import { PatientMedicalHistoryDetails } from '../patient-medical-history-details/patient-medical-history-details';

@Component({
  selector: 'app-right-sidebar',
  standalone: true,
  imports: [CommonModule, PatientMedicalHistoryDetails],
  templateUrl: './right-sidebar.html',
  styleUrl: './right-sidebar.css',
})
export class RightSidebar {
  public rightBarDetails: any;
  // Inject your shared state service
  protected sidebarService = inject(Sidebar);

  /**
   * Updates the content dynamic variables and slides open the drawer panel
   */
  public openRightSidebar(title: string, content: string, details: any): void {
    this.rightBarDetails = details;
    // console.log(this.rightBarDetails.medicalHistories);
    this.sidebarService.open(title, content, details);
  }

  /**
   * Close the right sidebar
   */
  public closeRightSidebar(): void {
    this.sidebarService.close();
  }
}
