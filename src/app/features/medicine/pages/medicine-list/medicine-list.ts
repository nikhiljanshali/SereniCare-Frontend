import { Component, viewChild } from '@angular/core';
import { IClinicList, IClinics } from '../../../../core/interface/basic.interface';
import { Clinics } from '../../../../core/services/clinics';
import { LocationService } from '../../../../core/services/location-service';
import { Router } from '@angular/router';
import { MedicineService } from '../../../../core/services/medicine-services';
import { RightSidebar } from '../../../../shared/component/right-sidebar/right-sidebar';
import { ModalService } from '../../../../core/services/modal-service';
import { GlobalFilter } from '../../../../shared/component/global-filter/global-filter';

@Component({
  selector: 'app-medicine-list',
  standalone: false,
  // imports: [],
  templateUrl: './medicine-list.html',
  styleUrl: './medicine-list.css',
})
export class MedicineList {
  sidebar = viewChild<RightSidebar>('medicalSidebar');
  public medicineList: any[] = [];
  public medicineCopyList: any[] = [];
  public paginatedMedicineList: any[] = [];

  public currentPage = 1;
  public pageSize = 10;
  public totalPages = 0;
  public pages: number[] = [];
  public Math = Math;

  constructor(
    private router: Router,
    private _clinicsService: Clinics,
    private _medicineService: MedicineService,
    public _locationService: LocationService,
    public _modalService: ModalService,
  ) {
  }

  ngOnInit(): void {
    this.getMedicines();
  }

  private getMedicines(): void {
    this._medicineService.getAllMedicines().subscribe((res: any) => {
      // this.medicineList = res.data;
      this.medicineList = this.medicineCopyList = res.data.sort((a: any, b: any) => {
        const numA = Number(a.medicineCode.replace('MED-', ''));
        const numB = Number(b.medicineCode.replace('MED-', ''));
        return numA - numB; // Ascending
      });
      this.setupPagination();
    });
  }

  openMedicineDetails(patient: any) {
    this.sidebar()?.openRightSidebar(
      '',
      'medicine-detail',
      patient
    );
  }

  setupPagination(): void {
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.medicineList.length / this.pageSize);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.updatePaginatedData();
  }

  updatePaginatedData(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedMedicineList = this.medicineList.slice(startIndex, endIndex);
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
        filterDetails: this.medicineList,
        filterColumns: ['medicineName', 'medicineCode', 'genericName', 'manufacturer', 'brandName', 'category', 'unit', 'isActive']
      }
    });

    modalRef.content.returnResult.subscribe((data: any) => {
      console.log(data.length);
      if (data.length) {
        this.medicineList = this.paginatedMedicineList = [];
        this.medicineList = this.paginatedMedicineList = data;
        this.setupPagination();
      }
    });
  }

  public refresh(): void {
    this.medicineList = this.paginatedMedicineList = this.medicineCopyList;
    this.setupPagination();
  }

}
