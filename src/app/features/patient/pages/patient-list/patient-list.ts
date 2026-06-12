import { Component, viewChild } from '@angular/core';
import { LocationService } from '../../../../core/services/location-service';
import { Router } from '@angular/router';
import { PatientService } from '../../../../core/services/patients';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { RightSidebar } from '../../../../shared/component/right-sidebar/right-sidebar';
import { IPatientsData, IPatients } from '../../../../core/interface/basic.interface';
import { StorageOperation } from '../../../../core/services/storage-operation';
import { UserDetails } from '../../../../core/interface/authentication.interface';
import { Roles } from '../../../../core/enum/common.enum';

@Component({
  selector: 'app-patient-list',
  // imports: [],
  standalone: false,
  templateUrl: './patient-list.html',
  styleUrl: './patient-list.css',
})
export class PatientList {
  public sidebar = viewChild<RightSidebar>('medicalSidebar');
  public patientsList: IPatientsData[] = [];
  public expandedInsurance: string | null = null;
  public expandedAppointment: string | null = null;
  public userDetails: UserDetails | null = null;

  constructor(
    private router: Router,
    private _patientService: PatientService,
    public _locationService: LocationService,
    public _storageOperation: StorageOperation
  ) {
    this.userDetails = this._storageOperation.get<UserDetails>('user', 'local');

  }

  ngOnInit(): void {
    this.getPatients();
  }


  private getPatients(): void {
    if (this.userDetails?.role == Roles.Patient || this.userDetails?.role == Roles.Admin || this.userDetails?.role == Roles.SystemAdmin) {
      this._patientService.getPatients().subscribe((res: IPatients) => {
        const patients = res.data || [];
        const locationRequests = patients.map((pat: IPatientsData) => {
          const countryId = Number(pat.country);
          const stateId = Number(pat.state);
          const cityId = Number(pat.city);
          return this._locationService.getLocationName(countryId, stateId, cityId).pipe(map((location) => ({
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
    } else if (this.userDetails?.role == Roles.Doctor) {
      this._patientService.getPatientsByDoctorId(this._storageOperation.get<any>('userDetails', 'local').id).subscribe((res: IPatients) => {
        const patients = res.data || [];
        const locationRequests = patients.map((pat: IPatientsData) => {
          const countryId = Number(pat.country);
          const stateId = Number(pat.state);
          const cityId = Number(pat.city);
          return this._locationService.getLocationName(countryId, stateId, cityId).pipe(map((location) => ({
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
  }

  public toggleInsuranceRow(id: string) {
    this.expandedInsurance = this.expandedInsurance === id ? null : id;
    this.expandedAppointment = null;
  }

  public togglePrescriptionRow(id: string) {
    this.expandedAppointment = this.expandedAppointment === id ? null : id;
    this.expandedInsurance = null;
  }

  public createPatient(): void {
    this.router.navigate(['/layout/patients/master/registration']);
  }

  public editPatient(patient: IPatientsData): void {
    this.router.navigate(['/layout/patients/master/registration', patient._id]);
  }

  public writeAPrescription(patientId: string, appointmentId: string): void {
    console.log(patientId, appointmentId);
    this.router.navigate(['/layout/prescription/master/create', patientId, appointmentId])
  }

  public openMedicalHistory(patient: IPatientsData) {
    this.sidebar()?.openRightSidebar('', 'patient', patient);
  }
}
