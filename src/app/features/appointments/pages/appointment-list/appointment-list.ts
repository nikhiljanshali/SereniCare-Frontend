import { Component, viewChild } from '@angular/core';
import { LocationService } from '../../../../core/services/location-service';
import { Router } from '@angular/router';
import { PatientService } from '../../../../core/services/patients';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { RightSidebar } from '../../../../shared/component/right-sidebar/right-sidebar';
import { IPatientsData, IPatients, IAppointmentLsit } from '../../../../core/interface/basic.interface';
import { StorageOperation } from '../../../../core/services/storage-operation';
import { UserDetails } from '../../../../core/interface/authentication.interface';
import { Roles } from '../../../../core/enum/common.enum';
import { AppointmentBookService } from '../../../../core/services/appointment-book';
import { ModalService } from '../../../../core/services/modal-service';
import { GlobalFilter } from '../../../../shared/component/global-filter/global-filter';

@Component({
  selector: 'app-appointment-list',
  standalone: false,
  // imports: [],
  templateUrl: './appointment-list.html',
  styleUrl: './appointment-list.css',
})
export class AppointmentList {

  public sidebar = viewChild<RightSidebar>('medicalSidebar');
  public patientsList: IPatientsData[] = [];
  public appointmentList: IAppointmentLsit[] = [];
  public appointmentCopyList: IAppointmentLsit[] = [];
  public expandedInsurance: string | null = null;
  public expandedAppointment: string | null = null;
  public userDetails: UserDetails | null = null;

  public paginatedAppointmentList: any[] = [];

  public currentPage = 1;
  public pageSize = 6;
  public totalPages = 0;
  public pages: number[] = [];
  public Math = Math;

  constructor(
    private router: Router,
    private _appointmentBookService: AppointmentBookService,
    public _locationService: LocationService,
    public _modalService: ModalService,
    public _storageOperation: StorageOperation
  ) {
    this.userDetails = this._storageOperation.get<UserDetails>('user', 'local');
  }

  ngOnInit(): void {
    this.getAppointments();
  }

  private getAppointments(): void {
    if (this.userDetails?.role == Roles.Admin || this.userDetails?.role == Roles.SystemAdmin) {
      this._appointmentBookService.getAllAppointmentBooking().subscribe((res: any) => {
        if (res.success) {
          this.appointmentList = this.appointmentCopyList = res.data.sort((a: any, b: any) => {
            const numA = Number(a.appointmentNumber.replace('APT-', ''));
            const numB = Number(b.appointmentNumber.replace('APT-', ''));
            return numA - numB; // Ascending
          });
          this.setupPagination();
        }
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

  public openFilter(): void {
    const modalRef = this._modalService.openComponentModal(GlobalFilter, {
      class: 'modal-dialog-top modal-lg',
      backdrop: 'static',
      keyboard: false,
      initialState: {
        filterDetails: this.appointmentList,
        filterColumns: ['appointmentNumber', 'createdAt', 'firstName', 'middleName', 'lastName', 'appointmentType', 'consultationMode', 'appointmentStatus', 'bookingSource', 'symptoms', 'paymentStatus']
      }
    });

    modalRef.content.returnResult.subscribe((data: any) => {
      console.log(data.length);
      if (data.length) {
        this.appointmentList = this.paginatedAppointmentList = [];
        this.appointmentList = this.paginatedAppointmentList = data;
        this.setupPagination();
      }
    });
  }

  public refresh(): void {
    this.appointmentList = this.paginatedAppointmentList = this.appointmentCopyList;
    this.setupPagination();
  }


  setupPagination(): void {
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.appointmentList.length / this.pageSize);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.updatePaginatedData();
  }

  updatePaginatedData(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedAppointmentList = this.appointmentList.slice(startIndex, endIndex);
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

}
