import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { PatientDetailHeader } from '../../../../shared/component/patient-detail-header/patient-detail-header';
import { LocationService } from '../../../../core/services/location-service';
import { PatientService } from '../../../../core/services/patients';
import { StorageOperation } from '../../../../core/services/storage-operation';
import { IChiefComplaint, IPatientsData } from '../../../../core/interface/basic.interface';
import { DoctorService } from '../../../../core/services/doctor';
import { map, switchMap } from 'rxjs';
import { ApiStateService } from '../../../../core/services/api-state-service';

@Component({
  selector: 'app-patient-chief-of-complaint',
  imports: [CommonModule, PatientDetailHeader],
  standalone: true,
  templateUrl: './patient-chief-of-complaint.html',
  styleUrl: './patient-chief-of-complaint.css',
})
export class PatientChiefOfComplaint {
  public patientDetails: IPatientsData | null = null;
  public patientId: string | null = null;
  public chiefComplaintList: IChiefComplaint[] = [];

  constructor(
    private _doctorService: DoctorService,
    private _apiStateService: ApiStateService,
  ) {
    effect(() => {
      const patient = this._apiStateService.apiData();
      if (!patient) {
        return;
      }
      this.patientDetails = patient;
      this.patientId = patient._id;
      this.loadChiefComplaints(patient._id);
    });
  }

  ngOnInit(): void {
    // Nothing required here
  }

  private loadChiefComplaints(patientId: string): void {
    this._doctorService.getChiefComplaintsByPatientId(patientId).subscribe(res => {
      if (res.success) {
        this.chiefComplaintList = [...res.data].sort(
          (a: any, b: any) =>
            new Date(a.createdAt).getTime() -
            new Date(b.createdAt).getTime()
        );
      }
    });
  }
}
