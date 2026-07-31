import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { PatientDetailHeader } from '../../../../shared/component/patient-detail-header/patient-detail-header';
import { switchMap, map } from 'rxjs';
import { IPatientsData, IPresetIllness } from '../../../../core/interface/basic.interface';
import { DoctorService } from '../../../../core/services/doctor';
import { LocationService } from '../../../../core/services/location-service';
import { PatientService } from '../../../../core/services/patients';
import { StorageOperation } from '../../../../core/services/storage-operation';
import { ApiStateService } from '../../../../core/services/api-state-service';

@Component({
  selector: 'app-patient-present-illness',
  imports: [CommonModule, PatientDetailHeader],
  standalone: true,
  templateUrl: './patient-present-illness.html',
  styleUrl: './patient-present-illness.css',
})
export class PatientPresentIllness {
  public patientDetails: IPatientsData | null = null;
  public patientId: string | null = null;
  public paresetIllness: IPresetIllness[] = [];

  public expanded: string | null = null;

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

      this.loadHistoryOfPresentIllness(patient._id);
    });
  }

  ngOnInit(): void {
    // No need to call getProfileDetails()
  }

  private loadHistoryOfPresentIllness(patientId: string): void {
    this._doctorService
      .getHistoryOfPresentIllnessByPatientId(patientId)
      .subscribe(res => {
        if (res.success) {
          this.paresetIllness = [...res.data].sort(
            (a: any, b: any) =>
              new Date(a.createdAt).getTime() -
              new Date(b.createdAt).getTime()
          );

          console.log(this.paresetIllness);
        }
      });
  }

  public toggleRow(id: string) {
    this.expanded = this.expanded === id ? null : id;
  }
}
