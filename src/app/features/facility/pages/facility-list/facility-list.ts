import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { FacilityServices } from '../../../../core/services/facility-service';
import { ModalService } from '../../../../core/services/modal-service';
import { CreateFacility } from '../create-facility/create-facility';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IFacilityData } from '../../../../core/interface/basic.interface';
import { NotificationServices } from '../../../../core/services/notification-services';
import { take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-facility-list',
  standalone: true,
  imports: [
    DatePipe,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PopoverModule
  ],
  templateUrl: './facility-list.html',
  styleUrl: './facility-list.css',
})
export class FacilityList {

  public facilityList: IFacilityData[] = [];
  public copyfacilityList: IFacilityData[] = [];
  public paginatedFacilityList: IFacilityData[] = [];
  public filteredFacilityList: IFacilityData[] = [];

  public currentPage = 1;
  public pageSize = 8;
  public totalPages = 0;
  public pages: number[] = [];
  public Math = Math;

  public searchText = '';
  public selectedStatus = 'Active';

  constructor(
    private router: Router,
    public _facilityServices: FacilityServices,
    private _modalService: ModalService,
    public _notificationServices: NotificationServices
  ) {

  }

  ngOnInit(): void {
    this.getAllFacilities();
  }

  public getAllFacilities(): void {
    this._facilityServices.getAllFacilities().subscribe({
      next: (data: any) => {
        // console.log('Facilities API Response:', data);
        const facilities = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : Array.isArray(data?.facilities) ? data.facilities : [];
        this.facilityList = [...facilities].sort((a: any, b: any) => {
          // Sort by facility type
          const typeCompare = (a.type || '').localeCompare(b.type || '', undefined, { sensitivity: 'base' });
          if (typeCompare !== 0) { return typeCompare; }
          // Then sort by facility name
          return (a.name || '').localeCompare(b.name || '', undefined, { sensitivity: 'base' });
        });
        // Keep a separate copy for search/filter
        this.copyfacilityList = [...this.facilityList];
        this.setupPagination();
      },
      error: (err) => {
        console.error('Error loading facilities:', err);
      }
    });
  }

  private setupPagination(): void {
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.facilityList.length / this.pageSize);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.updatePaginatedData();
  }

  public updatePaginatedData(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedFacilityList = this.facilityList.slice(startIndex, endIndex);
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
    this.getAllFacilities();
  }

  public AddFacility(): void {
    const modalRef = this._modalService.openComponentModal(CreateFacility, {
      class: 'modal-dialog-centered modal-lg',
      backdrop: 'static',
      keyboard: false,
      initialState: {
        isModel: true,
      }
    });

    modalRef.content.facilitySaved.subscribe((data: any) => {
      this.getAllFacilities();
    });
  }

  public editFacility(facility: IFacilityData): void {
    const modalRef = this._modalService.openComponentModal(CreateFacility, {
      class: 'modal-dialog-centered modal-lg',
      backdrop: 'static',
      keyboard: false,
      initialState: {
        facility: facility,
        isModel: true,
      }
    });

    modalRef.content.facilitySaved.subscribe((data: any) => {
      this.getAllFacilities();
    });
  }

  public deleteFacility(facility: IFacilityData): void {
    const selectedId = facility._id;
    if (!selectedId) {
      console.error('Facility Type ID is missing.'); return;
    }
    this._notificationServices.confirm('Delete', 'Are you sure you want to delete this record?').then((result) => {
      if (result.isConfirmed) {
        this._facilityServices.deleteFacility(selectedId).pipe(take(1)).subscribe({
          next: (data) => {
            this.getAllFacilities();
          },
          error: (err) => {
            console.error('Delete failed:', err);
          }
        });
      }
    });
  }

  public isShowFilter: boolean = false;
  public toggleFilter(): void {
    this.isShowFilter = !this.isShowFilter;
  }

  public applyFilters(): void {
    const search = (this.searchText || '').trim().toLowerCase();

    this.filteredFacilityList = this.copyfacilityList.filter((item: any) => {

      // Basic facility fields
      const facilityCode = (item?.facilityCode ?? '').toString().toLowerCase();
      const facilityName = (item?.name ?? '').toString().toLowerCase();
      const type = (item?.type ?? '').toString().toLowerCase();
      const subType = (item?.subType ?? '').toString().toLowerCase();
      const status = (item?.status ?? '').toString().toLowerCase();

      // Location fields
      const building = (item?.location?.building ?? '').toString().toLowerCase();
      const floor = (item?.location?.floor ?? '').toString().toLowerCase();
      const roomNumber = (item?.location?.roomNumber ?? '').toString().toLowerCase();
      const wing = (item?.location?.wing ?? '').toString().toLowerCase();

      // Other facility fields
      const contactExtension = (item?.contactExtension ?? '')
        .toString()
        .toLowerCase();

      const pharmacyLicenseNo = (
        item?.configuration?.pharmacyLicenseNo ?? ''
      )
        .toString()
        .toLowerCase();

      // Department Head
      const departmentHead = item?.departmentHeadId
        ? `${item.departmentHeadId.firstName ?? ''} ${item.departmentHeadId.lastName ?? ''}`
          .trim()
          .toLowerCase()
        : '';

      // Assigned Staff
      const hasMatchingStaff =
        Array.isArray(item?.assignedStaff) &&
        item.assignedStaff.some((staff: any) => {
          const staffName =
            `${staff?.firstName ?? ''} ${staff?.lastName ?? ''}`
              .trim()
              .toLowerCase();

          return staffName.includes(search);
        });

      // Equipment
      const hasMatchingEquipment =
        Array.isArray(item?.configuration?.equipmentList) &&
        item.configuration.equipmentList.some((equipment: any) => {
          const equipmentName = (equipment?.name ?? '')
            .toString()
            .toLowerCase();

          const equipmentModel = (equipment?.model ?? '')
            .toString()
            .toLowerCase();

          const equipmentStatus = (equipment?.status ?? '')
            .toString()
            .toLowerCase();

          return (
            equipmentName.includes(search) ||
            equipmentModel.includes(search) ||
            equipmentStatus.includes(search)
          );
        });

      // Search filter
      const matchesSearch =
        !search ||
        facilityCode.includes(search) ||
        facilityName.includes(search) ||
        type.includes(search) ||
        subType.includes(search) ||
        status.includes(search) ||
        building.includes(search) ||
        floor.includes(search) ||
        roomNumber.includes(search) ||
        wing.includes(search) ||
        contactExtension.includes(search) ||
        pharmacyLicenseNo.includes(search) ||
        departmentHead.includes(search) ||
        hasMatchingStaff ||
        hasMatchingEquipment;

      // Status filter
      const matchesStatus =
        !this.selectedStatus ||
        this.selectedStatus === 'All' ||
        status === this.selectedStatus.toString().toLowerCase();

      return matchesSearch && matchesStatus;
    });

    this.facilityList = [...this.filteredFacilityList];

    this.setupPagination();
  }

  public clearSearch(): void {
    this.searchText = '';
    this.applyFilters();
  }

  public backToDashboard(): void {
    this.router.navigate(['/layout/facility/master/dashboard']);
  }
}
