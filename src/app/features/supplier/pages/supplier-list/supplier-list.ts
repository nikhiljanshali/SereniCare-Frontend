import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IClinicList, IClinics, ISupplierDetails } from '../../../../core/interface/basic.interface';
import { Clinics } from '../../../../core/services/clinics';
import { LocationService } from '../../../../core/services/location-service';
import { SupplierService } from '../../../../core/services/supplier-service';
import { ModalService } from '../../../../core/services/modal-service';
import { GlobalFilter } from '../../../../shared/component/global-filter/global-filter';

@Component({
  selector: 'app-supplier-list',
  standalone: false,
  // imports: [],
  templateUrl: './supplier-list.html',
  styleUrl: './supplier-list.css',
})
export class SupplierList {
  public supplierList: ISupplierDetails[] = [];
  public supplierCopyList: ISupplierDetails[] = [];
  public paginatedSupplierList: ISupplierDetails[] = [];

  public currentPage = 1;
  public pageSize = 5;
  public totalPages = 0;
  public pages: number[] = [];
  public Math = Math;

  constructor(
    private _supplierService: SupplierService,
    public _locationService: LocationService,
    public _modalService: ModalService,
  ) {
  }

  ngOnInit(): void {
    this.getClinics();
  }

  private getClinics(): void {
    this._supplierService.getAllSuppliers().subscribe((res: any) => {
      if (res.success) {
        // this.supplierList = this.supplierCopyList = res.data;
        this.supplierList = this.supplierCopyList = res.data.sort((a: any, b: any) => {
          const numA = Number(a.supplierCode.replace('SUP-', ''));
          const numB = Number(b.supplierCode.replace('SUP-', ''));
          return numA - numB; // Ascending
        });
        this.setupPagination();
      }
    });
  }

  setupPagination(): void {
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.supplierList.length / this.pageSize);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.updatePaginatedData();
  }

  updatePaginatedData(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedSupplierList = this.supplierList.slice(startIndex, endIndex);
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

  public openFilter(): void {
    const modalRef = this._modalService.openComponentModal(GlobalFilter, {
      class: 'modal-dialog-top modal-lg',
      backdrop: 'static',
      keyboard: false,
      initialState: {
        filterDetails: this.supplierList,
        filterColumns: ['supplierCode', 'firstName', 'lastName', 'supplierType', 'registrationNumber', 'gstNumber',
          'panNumber', 'drugLicenseNumber', 'email', 'website', 'phoneNumber', 'alternatePhoneNumber', 'addressLine1',
          'addressLine2', 'city', 'state']
      }
    });

    modalRef.content.returnResult.subscribe((data: any) => {
      console.log(data.length);
      if (data.length) {
        this.supplierList = this.paginatedSupplierList = [];
        this.supplierList = this.paginatedSupplierList = data;
        this.setupPagination();
      }
    });
  }

  public refresh(): void {
    this.supplierList = this.paginatedSupplierList = this.supplierCopyList;
  }
}
