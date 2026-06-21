import { Component } from '@angular/core';
import { DoctorService } from '../../../../core/services/doctor';
import { DatePipe } from '@angular/common';
import { LocationService } from '../../../../core/services/location-service';
import { Router } from '@angular/router';
import { IDoctorsData, IDoctors } from '../../../../core/interface/basic.interface';
import { ModalService } from '../../../../core/services/modal-service';
import { GlobalFilter } from '../../../../shared/component/global-filter/global-filter';

@Component({
  selector: 'app-doctor-list',
  imports: [DatePipe],
  templateUrl: './doctor-list.html',
  styleUrl: './doctor-list.css',
})
export class DoctorList {

  public doctorsList: IDoctorsData[] = [];
  public doctorsCopyList: IDoctorsData[] = [];
  public paginatedDoctorList: IDoctorsData[] = [];
  public expandedDoctorId: string | null = null;

  public currentPage = 1;
  public pageSize = 5;
  public totalPages = 0;
  public pages: number[] = [];
  public Math = Math;

  constructor(
    private router: Router,
    private _doctorService: DoctorService,
    public _locationService: LocationService,
    public _modalService: ModalService,
  ) {
  }

  ngOnInit(): void {
    this.getDoctors();
    this._locationService.getLocationName(1, 101, 1002).subscribe(res => {
    });
  }


  private getDoctors(): void {
    this._doctorService.getAllDoctors().subscribe((res: IDoctors) => {
      this.doctorsList = this.doctorsCopyList = res.data;
      this.doctorsList.forEach((doc: any) => {
        const countryId = Number(doc.country);
        const stateId = Number(doc.state);
        const cityId = Number(doc.city);
        this._locationService.getLocationName(countryId, stateId, cityId).subscribe((location) => {
          // attach resolved names to doctor object
          doc.country = location.country;
          doc.state = location.state;
          doc.city = location.city;
        });
      });
      this.doctorsList = this.doctorsCopyList = res.data.sort((a: any, b: any) => {
        const numA = Number(a.doctorCode.replace('DOC-', ''));
        const numB = Number(b.doctorCode.replace('DOC-', ''));
        return numA - numB; // Ascending
      });
      this.setupPagination();
    });
  }

  setupPagination(): void {
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.doctorsList.length / this.pageSize);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.updatePaginatedData();
  }

  updatePaginatedData(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedDoctorList = this.doctorsList.slice(startIndex, endIndex);
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

  public toggleRow(id: string) {
    this.expandedDoctorId = this.expandedDoctorId === id ? null : id;
  }

  public createDoctor(): void {
    this.router.navigate(['/layout/doctors/master/registration']);
  }

  public editDoctor(doctor: IDoctorsData): void {
    // this.router.navigate(['/layout/doctors/master/registration', doctor._id]);
    this.router.navigate(['/layout/doctors/master/doctor-profile', doctor._id]);
  }

  public openFilter(): void {
    const modalRef = this._modalService.openComponentModal(GlobalFilter, {
      class: 'modal-dialog-top modal-lg',
      backdrop: 'static',
      keyboard: false,
      initialState: {
        filterDetails: this.doctorsList,
        filterColumns: ['doctorCode', 'firstName', 'lastName', 'email', 'phone', 'specializations', 'status', 'dateOfBirth', 'city', 'state', 'country']
      }
    });

    modalRef.content.returnResult.subscribe((data: any) => {
      if (data.length) {
        this.doctorsList = this.paginatedDoctorList = [];
        this.doctorsList = this.paginatedDoctorList = data;
      }
    });
  }

  public refresh(): void {
    this.doctorsList = this.paginatedDoctorList = this.doctorsCopyList;
    this.setupPagination();
  }
}
