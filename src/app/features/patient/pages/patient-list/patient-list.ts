import { Component, viewChild } from '@angular/core';
import { LocationService } from '../../../../core/services/location-service';
import { Router } from '@angular/router';
import { PatientService } from '../../../../core/services/patients';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { RightSidebar } from '../../../../shared/component/right-sidebar/right-sidebar';
import { IPatientsData, IPatients, Appointment } from '../../../../core/interface/basic.interface';
import { StorageOperation } from '../../../../core/services/storage-operation';
import { UserDetails } from '../../../../core/interface/authentication.interface';
import { Roles } from '../../../../core/enum/common.enum';
import { ModalService } from '../../../../core/services/modal-service';
import { GlobalFilter } from '../../../../shared/component/global-filter/global-filter';
import { VitalDetails } from '../../../doctors/pages/vital-details/vital-details';
import { PatientVitalHistory } from '../../../../shared/component/patient-vital-history/patient-vital-history';

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
  public patientsCopyList: IPatientsData[] = [];
  public paginatedPatientList: IPatientsData[] = [];
  public expandedInsurance: string | null = null;
  public expandedAppointment: string | null = null;
  public userDetails: UserDetails | null = null;
  public isMoreMenuOpen = false;

  public currentPage = 1;
  public pageSize = 10;
  public totalPages = 0;
  public pages: number[] = [];
  public Math = Math;

  constructor(
    private router: Router,
    private _patientService: PatientService,
    public _locationService: LocationService,
    public _storageOperation: StorageOperation,
    public _modalService: ModalService,
  ) {
    this.userDetails = this._storageOperation.get<UserDetails>('user', 'local');
  }

  ngOnInit(): void {
    this.getPatients();
  }


  private getPatients(): void {
    if (this.userDetails?.role == Roles.Admin || this.userDetails?.role == Roles.SystemAdmin) {
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
          // this.patientsList = this.patientsCopyList = updatedPatients;
          this.patientsList = this.patientsCopyList = updatedPatients.sort((a: any, b: any) => {
            const numA = Number(a.patientCode.replace('PAT-', ''));
            const numB = Number(b.patientCode.replace('PAT-', ''));
            return numA - numB; // Ascending
          });
          this.setupPagination();
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
          // this.patientsList = this.patientsCopyList = updatedPatients;
          this.patientsList = this.patientsCopyList = updatedPatients.sort((a: any, b: any) => {
            const numA = Number(a.patientCode.replace('PAT-', ''));
            const numB = Number(b.patientCode.replace('PAT-', ''));
            return numA - numB; // Ascending
          });
          this.setupPagination();
        });
      });
    }

  }

  setupPagination(): void {
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.patientsList.length / this.pageSize);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.updatePaginatedData();
  }

  updatePaginatedData(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedPatientList = this.patientsList.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePaginatedData();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedData();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedData();
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
    this.sidebar()?.openRightSidebar('Patient Medical History', 'patient', patient);
  }

  public openFilter(): void {
    const modalRef = this._modalService.openComponentModal(GlobalFilter,
      {
        class: 'modal-dialog-top modal-lg',
        backdrop: 'static',
        keyboard: false,
        initialState: {
          filterDetails: this.patientsList,
          filterColumns: ['patientCode', 'firstName', 'lastName', 'patientCode', 'email', 'phone', 'age', 'aadhaarNumber', 'gender', 'status']
        }
      });

    modalRef.content.returnResult.subscribe((data: any) => {
      console.log(data.length);
      if (data.length) {
        this.patientsList = this.paginatedPatientList = [];
        this.patientsList = this.paginatedPatientList = data;
      }
    });
  }

  public refresh(): void {
    this.patientsList = this.paginatedPatientList = this.patientsCopyList;
    this.setupPagination();
  }

  public recordChiefComplaint(patient: IPatientsData, appointment: Appointment): void {
    var json = {
      patient: patient,
      appointment: appointment,
    }
    this.sidebar()?.openRightSidebar('Patient Chief Complaint Details', 'patient-chief-complaint', json);
  }

  public openVitalPopup(patient: IPatientsData, appointment: Appointment): void {
    var json = {
      patient: patient,
      appointment: appointment,
    }
    this.sidebar()?.openRightSidebar('Patient Vital Details', 'patient-vital-details', json);
    // const modalRef = this._modalService.openComponentModal(VitalDetails, {
    //   class: 'modal-dialog-centered modal-lg',
    //   backdrop: 'static',
    //   keyboard: false,
    //   initialState: {
    //     // filterDetails: this.appointmentList,
    //     // filterColumns: ['appointmentNumber', 'createdAt', 'firstName', 'middleName', 'lastName', 'appointmentType', 'consultationMode', 'appointmentStatus', 'bookingSource', 'symptoms', 'paymentStatus']
    //   }
    // });

    // modalRef.content.returnResult.subscribe((data: any) => {
    //   console.log(data.length);
    // });
  }

  public openVitalHistoryPopup(patient: IPatientsData): void {
    const modalRef = this._modalService.openComponentModal(PatientVitalHistory, {
      class: 'modal-dialog-centered modal-xl',
      backdrop: 'static',
      keyboard: false,
      initialState: {
        patientDetails: patient,
      }
    });

    modalRef.content.returnResult.subscribe((data: any) => {
      console.log(data.length);
    });
  }

  public openMedicalHistoryPopup(patient: IPatientsData): void {
    const modalRef = this._modalService.openComponentModal(PatientVitalHistory, {
      class: 'modal-dialog-centered modal-xl',
      backdrop: 'static',
      keyboard: false,
      initialState: {
        patientDetails: patient,
      }
    });

    modalRef.content.returnResult.subscribe((data: any) => {
      console.log(data.length);
    });
  }

  public redirectToMedicalHistory(patient: IPatientsData): void {
    this.router.navigate(['layout/patients/master/details/'+`${patient._id}`]);
  }

}
