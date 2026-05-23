import { Component, viewChild } from '@angular/core';
import { LocationService } from '../../../../core/services/location-service';
import { Router } from '@angular/router';
import { PatientService } from '../../../../core/services/patients';
import { IPatients, IPatientsData } from '../../../../core/interface/patients.interface';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { RightSidebar } from '../../../../shared/component/right-sidebar/right-sidebar';

@Component({
  selector: 'app-patient-list',
  // imports: [],
  standalone: false,
  templateUrl: './patient-list.html',
  styleUrl: './patient-list.css',
})
export class PatientList {
  sidebar = viewChild<RightSidebar>('medicalSidebar');
  patientsList: IPatientsData[] = [];
  expandedPatientId: string | null = null;

  constructor(
    private router: Router,
    private _patientService: PatientService,
    public _locationService: LocationService
  ) {
  }

  ngOnInit(): void {
    this.getPatients();
  }


  private getPatients(): void {
    this._patientService.getPatients().subscribe((res: IPatients) => {
      const patients = res.data || [];

      const locationRequests = patients.map((pat: IPatientsData) => {
        const countryId = Number(pat.country);
        const stateId = Number(pat.state);
        const cityId = Number(pat.city);

        return this._locationService
          .getLocationName(countryId, stateId, cityId)
          .pipe(
            map((location) => ({
              ...pat,
              country: location.country ?? '',
              state: location.state ?? '',
              city: location.city ?? '',
            }))
          );
      });

      forkJoin(locationRequests).subscribe((updatedPatients) => {
        this.patientsList = updatedPatients;
      });
    });
  }

  public toggleRow(id: string) {
    this.expandedPatientId = this.expandedPatientId === id ? null : id;
  }

  public createPatient(): void {
    this.router.navigate(['/layout/patients/master/registration']);
  }

  public editPatient(patient: IPatientsData): void {
    this.router.navigate(['/layout/patients/master/registration', patient._id]);
  }

  public openMedicalHistory(patient: IPatientsData) {
    this.sidebar()?.openRightSidebar(
      '',
      'patient',
      patient
    );
  }
}
