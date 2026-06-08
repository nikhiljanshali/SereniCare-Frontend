import { Component } from '@angular/core';
import { PrescriptionService } from '../../../../core/services/prescription-services';
import { StorageOperation } from '../../../../core/services/storage-operation';
import { IPrescriptions, IPrescriptionsDetails } from '../../../../core/interface/basic.interface';
import { ModalService } from '../../../../core/services/modal-service';
import { PrescriptionView } from '../prescription-view/prescription-view';

@Component({
  selector: 'app-prescription-list',
  standalone: false,
  // imports: [],
  templateUrl: './prescription-list.html',
  styleUrl: './prescription-list.css',
})
export class PrescriptionList {

  public prescriptionList: IPrescriptionsDetails[] = [];
  public expandedDetails: string | null = null;

  constructor(
    private _prescriptionService: PrescriptionService,
    public _storageOperation: StorageOperation,
    public _modalService: ModalService,
  ) {

  }

  ngOnInit(): void {
    this.getAppointmentList();
  }

  private getAppointmentList(): void {
    this._prescriptionService.getAllPrescriptions().subscribe((res: IPrescriptions) => {
      this.prescriptionList = res.data;
    })
  }

  public toggleDetailsRow(id: string) {
    this.expandedDetails = this.expandedDetails === id ? null : id;
  }

  public viewPrescription(pres: IPrescriptionsDetails): void {
    console.log(pres);
    this._modalService.openComponentModal(PrescriptionView,
      {
        class: 'modal-dialog-centered modal-lg',
        backdrop: 'static',
        keyboard: false,
        initialState: {
          prescriptionDetails: pres,
        }
      }
    );
  }

}
