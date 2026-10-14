import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FacilityType, IFacility } from '../../../../core/interface/basic.interface';
import { LocationService } from '../../../../core/services/location-service';
import { ModalService } from '../../../../core/services/modal-service';
import { FacilityTypeServices } from '../../../../core/services/facility-type-service';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { MasterFacilityType } from '../master-facility-type/master-facility-type';
import { LoaderService } from '../../../../core/services/loader';
import { NotificationServices } from '../../../../core/services/notification-services';
import { take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-master-facility-type-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PopoverModule
  ],
  templateUrl: './master-facility-type-list.html',
  styleUrl: './master-facility-type-list.css',
})
export class MasterFacilityTypeList {
  public facilityTypeList: IFacility[] = [];
  public copyFacilityTypeList: IFacility[] = [];
  public paginatedFacilityTypeList: IFacility[] = [];
  public filteredfacilityTypeList: IFacility[] = [];

  public currentPage = 1;
  public pageSize = 10;
  public totalPages = 0;
  public pages: number[] = [];
  public Math = Math;

  public searchText = '';
  public selectedStatus = 'Active';
  public statusList = [
    { id: 1, key: 'active', value: 'Active' },
    { id: 2, key: 'inactive', value: 'Inactive' },
    { id: 3, key: 'discontinue', value: 'Discontinue' }
  ];

  constructor(
    public router: Router,
    public _locationService: LocationService,
    public _modalService: ModalService,
    public _facilityTypeServices: FacilityTypeServices,
    public _loaderService: LoaderService,
    public _notificationServices: NotificationServices
  ) {
    // this.userDetails = this._storageOperation.get<UserDetails>('user', 'local');
  }

  ngOnInit(): void {
    this.getMasterFacilityTypeList();
  }

  private getMasterFacilityTypeList(): void {
    this._loaderService.show();
    this._facilityTypeServices.getAllFacilityTypes().subscribe((res: any) => {
      const data = res.data ?? [];
      this.facilityTypeList = [...data].sort((a: any, b: any) => {
        const categoryCompare = (a.category || '').localeCompare(b.category || '', undefined, { sensitivity: 'base' });
        if (categoryCompare !== 0) {
          return categoryCompare;
        }
        // Then sort by facility name
        return (a.facility?.name || '').localeCompare(
          b.facility?.name || '',
          undefined,
          { sensitivity: 'base' }
        );
      });
      // Keep a separate copy for search/filter
      this.copyFacilityTypeList = [...this.facilityTypeList];
      this._loaderService.hide();
      this.setupPagination();
    });
  }

  private setupPagination(): void {
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.facilityTypeList.length / this.pageSize);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.updatePaginatedData();
  }

  public updatePaginatedData(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedFacilityTypeList = this.facilityTypeList.slice(startIndex, endIndex);
  }

  public goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePaginatedData();
  }

  public nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedData();
    }
  }

  public previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedData();
    }
  }


  public refresh(): void {
    this.getMasterFacilityTypeList();
  }

  public isShowFilter: boolean = false;
  public toggleFilter(): void {
    this.isShowFilter = !this.isShowFilter;
  }

  // openFilter(): void { }
  // viewFacilityType(facilityType: FacilityType): void { }

  public AddFacilityType(): void {
    const modalRef = this._modalService.openComponentModal(MasterFacilityType, {
      class: 'modal-dialog-centered modal-lg',
      backdrop: 'static',
      keyboard: false,
      initialState: {
        facilityTypeData: null,
        isModel: true,
      }
    });

    modalRef.content.facilityTypeSaved.subscribe((data: any) => {
      // this.getBookedAppointment();
    });
  }

  public editFacilityType(facilityType: FacilityType): void {
    const modalRef = this._modalService.openComponentModal(MasterFacilityType, {
      class: 'modal-dialog-centered modal-lg',
      backdrop: 'static',
      keyboard: false,
      initialState: {
        facilityTypeData: facilityType,
        isModel: true,
      }
    });

    modalRef.content.facilityTypeSaved.subscribe((data: any) => {
      this.getMasterFacilityTypeList();
    });
  }

  public deleteFacilityType(facilityType: FacilityType): void {
    const selectedId = facilityType._id;
    if (!selectedId) {
      console.error('Facility Type ID is missing.'); return;
    }
    this._notificationServices.confirm('Delete', 'Are you sure you want to delete this record?').then((result) => {
      if (result.isConfirmed) {
        this._facilityTypeServices.deleteFacilityType(selectedId).pipe(take(1)).subscribe({
          next: (data) => {
            this.getMasterFacilityTypeList();
          },
          error: (err) => {
            console.error('Delete failed:', err);
          }
        });
      }
    });
  }

  public applyFilters(): void {
    const search = (this.searchText || '').trim().toLowerCase();

    this.filteredfacilityTypeList = this.copyFacilityTypeList.filter((item: any) => {
      const category = (item?.category ?? '').toString().toLowerCase();
      const facilityName = (item?.facility?.name ?? '').toString().toLowerCase();

      // Check if any subFacility name matches the search query
      const hasMatchingSubFacility = Array.isArray(item?.facility?.subFacilities) &&
        item.facility.subFacilities.some((sub: any) =>
          (sub?.name ?? '').toString().toLowerCase().includes(search)
        );

      const matchesSearch =
        !search ||
        category.includes(search) ||
        facilityName.includes(search) ||
        hasMatchingSubFacility;

      // Optional status filter (if your data or UI includes a status field)
      const matchesStatus =
        !this.selectedStatus ||
        this.selectedStatus === 'All' ||
        item?.status == null ||
        item?.status === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });

    this.facilityTypeList = [...this.filteredfacilityTypeList];
    this.setupPagination();
  }

  public resetList(): void {
    this.clearSearch();
    this.getMasterFacilityTypeList();
  }

  public clearSearch(): void {
    this.searchText = '';
    this.applyFilters();
  }

  public backToList(): void {
    this.router.navigate(['/layout/facility/master/dashboard']);
  }
}
