import { Component, ElementRef, ViewChild } from '@angular/core';
import { IPrescriptionsDetails } from '../../../../core/interface/basic.interface';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../../../core/services/modal-service';

@Component({
  selector: 'app-prescription-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prescription-view.html',
  styleUrl: './prescription-view.css',
})
export class PrescriptionView {

  @ViewChild('printSection') printSection!: ElementRef;

  public prescriptionDetails: IPrescriptionsDetails | null = null;
  public patientDetails: { firstName?: string; lastName?: string; patientCode?: string } | null = null;
  public doctorDetails: { firstName?: string; lastName?: string } | null = null;
  public appointmentDetails: { appointmentNumber?: string } | null = null;


  constructor(
    public _modalService: ModalService
  ) {
  }


  public closeModePopup(): void {
    // Logic to close the modal popup
    this._modalService.closeComponentModal();
  }
}
