import { Component } from '@angular/core';
import { PrescriptionService } from '../../../../core/services/prescription-services';
import { StorageOperation } from '../../../../core/services/storage-operation';
import { IPrescriptions, IPrescriptionsDetails } from '../../../../core/interface/basic.interface';
import { ModalService } from '../../../../core/services/modal-service';
import { PrescriptionView } from '../prescription-view/prescription-view';
import { GlobalFilter } from '../../../../shared/component/global-filter/global-filter';

@Component({
  selector: 'app-prescription-list',
  standalone: false,
  // imports: [],
  templateUrl: './prescription-list.html',
  styleUrl: './prescription-list.css',
})
export class PrescriptionList {

  public prescriptionList: IPrescriptionsDetails[] = [];
  public prescriptionCopyList: IPrescriptionsDetails[] = [];
  public expandedDetails: string | null = null;
  public paginatedPrescriptionList: IPrescriptionsDetails[] = [];

  public currentPage = 1;
  public pageSize = 5;
  public totalPages = 0;
  public pages: number[] = [];
  public Math = Math;

  constructor(
    private _prescriptionService: PrescriptionService,
    public _storageOperation: StorageOperation,
    public _modalService: ModalService,
  ) {

  }

  ngOnInit(): void {
    this.getAppointmentList();
  }

  private getAppointmentList(): void {
    this._prescriptionService.getAllPrescriptions().subscribe((res: IPrescriptions) => {
      // this.prescriptionList = this.prescriptionCopyList = res.data;
      this.prescriptionList = this.prescriptionCopyList = res.data.sort((a: any, b: any) => {
        const numA = Number(a.prescriptionNumber.replace('PRESCRIP-', ''));
        const numB = Number(b.prescriptionNumber.replace('PRESCRIP-', ''));
        return numA - numB; // Ascending
      });
      this.setupPagination();
    })
  }

  setupPagination(): void {
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.prescriptionList.length / this.pageSize);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.updatePaginatedData();
  }

  updatePaginatedData(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedPrescriptionList = this.prescriptionList.slice(startIndex, endIndex);
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


  public toggleDetailsRow(id: string) {
    this.expandedDetails = this.expandedDetails === id ? null : id;
  }

  public viewPrescription(pres: IPrescriptionsDetails): void {
    console.log(pres);
    this._modalService.openComponentModal(PrescriptionView,
      {
        class: 'modal-dialog-centered modal-lg',
        backdrop: 'static',
        keyboard: false,
        initialState: {
          prescriptionDetails: pres,
        }
      }
    );
  }

  public openFilter(): void {
    const modalRef = this._modalService.openComponentModal(GlobalFilter, {
      class: 'modal-dialog-top modal-lg',
      backdrop: 'static',
      keyboard: false,
      initialState: {
        filterDetails: this.prescriptionList,
        filterColumns: ['prescriptionNumber', 'prescribedDate', 'followUpDate', 'advice', 'notes', 'status', 'presc']
      }
    });

    modalRef.content.returnResult.subscribe((data: any) => {
      if (data.length) {
        this.prescriptionList = this.paginatedPrescriptionList = [];
        this.prescriptionList = this.paginatedPrescriptionList = data;
        this.setupPagination();
      }
    });
  }

  public refresh(): void {
    this.prescriptionList = this.paginatedPrescriptionList = this.prescriptionCopyList;
  }

}
