import { IPatientsData, IVitalsDetails } from './../../../core/interface/basic.interface';
import { StorageOperation } from './../../../core/services/storage-operation';
import { CommonMethod } from './../../../core/services/common-method';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ModalService } from '../../../core/services/modal-service';
import { DoctorService } from '../../../core/services/doctor';

@Component({
  selector: 'app-patient-vital-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-vital-history.html',
  styleUrl: './patient-vital-history.css',
})
export class PatientVitalHistory {

  // patientDetails: IPatientsData[] = [];
  public patientDetails: any | null = null;
  public vitalList: IVitalsDetails[] = [];

  constructor(
    public _modalService: ModalService,
    private _doctorService: DoctorService,
    private _storageOperation: StorageOperation,
    private _commonMethod: CommonMethod
  ) {

  }

  ngOnInit(): void {
    this.getPatientVitalHistory();
    console.log(this.patientDetails);
  }

  private getPatientVitalHistory(): void {
    this._doctorService.getVitalsByPatientId(this.patientDetails?._id).subscribe((res: any) => {
      this.vitalList = res.data;
      console.info(this.vitalList);
    })
  }

  public closeModePopup(): void {
    this._modalService.closeComponentModal();
  }

}
