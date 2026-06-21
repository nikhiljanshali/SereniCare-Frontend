import { Component } from '@angular/core';
import { LocationService } from '../../../../core/services/location-service';
import { Router } from '@angular/router';
import { Clinics } from '../../../../core/services/clinics';
import { IClinicList, IClinics } from '../../../../core/interface/basic.interface';
import { DatePipe } from '@angular/common';
import { ModalService } from '../../../../core/services/modal-service';
import { GlobalFilter } from '../../../../shared/component/global-filter/global-filter';
import { StorageOperation } from '../../../../core/services/storage-operation';
import { UserDetails } from '../../../../core/interface/authentication.interface';
import { Roles } from '../../../../core/enum/common.enum';

@Component({
  selector: 'app-clinic-list',
  imports: [DatePipe],
  templateUrl: './clinic-list.html',
  styleUrl: './clinic-list.css',
})
export class ClinicList {

  public clinicList: IClinicList[] = [];
  public clinicCopyList: IClinicList[] = [];
  public paginatedClinicList: IClinicList[] = [];

  public currentPage = 1;
  public pageSize = 5;
  public totalPages = 0;
  public pages: number[] = [];
  public Math = Math;

  public userDetails: UserDetails | null = null;

  constructor(
    private router: Router,
    private _clinicsService: Clinics,
    public _locationService: LocationService,
    public _modalService: ModalService,
    private _storageOperation: StorageOperation,
  ) {
    this.userDetails = this._storageOperation.get<UserDetails>('user', 'local');
  }

  ngOnInit(): void {
    this.getClinics();
  }

  private getClinics(): void {
    if (this.userDetails?.role == Roles.Admin || this.userDetails?.role == Roles.SystemAdmin) {
      this._clinicsService.getAllClinics().subscribe((res: IClinics) => {
        // this.clinicList = this.clinicCopyList = res.data;
        this.clinicList = this.clinicCopyList = res.data.sort((a: any, b: any) => {
          const numA = Number(a.clinicName.replace('PAT-', ''));
          const numB = Number(b.clinicName.replace('PAT-', ''));
          return numA - numB; // Ascending
        });
        this.setupPagination();
      });
    } else if (this.userDetails?.role == Roles.Doctor) {
      this._clinicsService.getClinicByDoctorId(this._storageOperation.get<any>('userDetails').id).subscribe((res: IClinics) => {
        // this.clinicList = this.clinicCopyList = res.data;
        this.clinicList = this.clinicCopyList = res.data.sort((a: any, b: any) => {
          const numA = Number(a.clinicName.replace('PAT-', ''));
          const numB = Number(b.clinicName.replace('PAT-', ''));
          return numA - numB; // Ascending
        });
        this.setupPagination();
      });
    }
  }

  setupPagination(): void {
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.clinicList.length / this.pageSize);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.updatePaginatedData();
  }

  updatePaginatedData(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedClinicList = this.clinicList.slice(startIndex, endIndex);
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

  public addClinic(): void {
    this.router.navigate(['/layout/doctors/master/add-Clinic']);
  }

  public openFilter(): void {
    const modalRef = this._modalService.openComponentModal(GlobalFilter,
      {
        class: 'modal-dialog-top modal-lg',
        backdrop: 'static',
        keyboard: false,
        initialState: {
          filterDetails: this.clinicList,
          filterColumns: ['clinicName', 'clinicType', 'registrationNumber', 'clinicEmail', 'phone', 'address', 'city', 'pincode', 'createdAt']
        }
      });

    modalRef.content.returnResult.subscribe((data: any) => {
      // console.log(data.length);
      if (data.length) {
        this.clinicList = this.paginatedClinicList = [];
        this.clinicList = this.paginatedClinicList = data;
      }
    });
  }

  public refresh(): void {
    this.clinicList = this.paginatedClinicList = this.clinicCopyList;
    this.setupPagination();
  }

}
