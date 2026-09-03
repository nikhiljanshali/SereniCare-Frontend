import { Component } from '@angular/core';
import { IPrescriptionsDetails, IPrescriptions } from '../../../../core/interface/basic.interface';
import { ModalService } from '../../../../core/services/modal-service';
import { PrescriptionService } from '../../../../core/services/prescription-services';
import { StorageOperation } from '../../../../core/services/storage-operation';
import { GlobalFilter } from '../../../../shared/component/global-filter/global-filter';
import { PrescriptionView } from '../prescription-view/prescription-view';
import { Router } from '@angular/router';
import { NotificationServices } from '../../../../core/services/notification-services';

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

  public userRole: string = '';
  public doctorId: string = '';
  public patientId: string = '';
  public systemId: string = '';

  constructor(
    private router: Router,
    private _prescriptionService: PrescriptionService,
    public _storageOperation: StorageOperation,
    public _modalService: ModalService,
    private _notificationServices: NotificationServices
  ) {

  }

  ngOnInit(): void {
    this.setUserDetails();
    this.getAllPrescriptionList();
  }

  private setUserDetails(): void {
    const storedUser = this._storageOperation.get<any>('user');
    const storedUserDetails = this._storageOperation.get<any>('userDetails');
    this.userRole = storedUser?.role || '';
    if (storedUser) {
      const userId = storedUserDetails.id || '';
      switch (this.userRole) {
        case 'Patient':
          this.patientId = userId;
          break;
        case 'Doctor':
          this.doctorId = userId;
          break;
        case 'System Admin':
          this.systemId = storedUser.id;
          break;
        default:
          break;
      }
    }
  }

  private getAllPrescriptionList(): void {
    if (this.userRole === 'Doctor') {
      this._prescriptionService.getPrescriptionsByDoctor(this.doctorId).subscribe((res: IPrescriptions) => {
        // this.prescriptionList = this.prescriptionCopyList = res.data;
        this.prescriptionList = this.prescriptionCopyList = res.data.sort((a: any, b: any) => {
          const numA = Number(a.prescriptionNumber.replace('PRESCRIP-', ''));
          const numB = Number(b.prescriptionNumber.replace('PRESCRIP-', ''));
          return numA - numB; // Ascending
        });
        this.setupPagination();
      })
    } else if (this.userRole == 'Patient') {
      this._prescriptionService.getPrescriptionsByPatient(this.patientId).subscribe((res: IPrescriptions) => {
        // this.prescriptionList = this.prescriptionCopyList = res.data;
        this.prescriptionList = this.prescriptionCopyList = res.data.sort((a: any, b: any) => {
          const numA = Number(a.prescriptionNumber.replace('PRESCRIP-', ''));
          const numB = Number(b.prescriptionNumber.replace('PRESCRIP-', ''));
          return numA - numB; // Ascending
        });
        this.setupPagination();
      })
    } else if (this.userRole === 'System Admin') {
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
    this._modalService.openComponentModal(PrescriptionView, {
      class: 'modal-dialog-centered modal-xl',
      backdrop: 'static',
      keyboard: false,
      initialState: {
        prescriptionDetails: pres,
      }
    });
  }

  public deletePrescription(pres: IPrescriptionsDetails): void {
    this._notificationServices.confirm('Delete', 'Are you sure you want to delete this record?').then((result) => {
      if (result.isConfirmed) {
        this._prescriptionService.deletePrescription(pres._id).subscribe((res: any) => {
          console.log(res);
          if (res.status) {
            this.getAllPrescriptionList();
          }
        })
      }
    });
  }

  public editPrescription(pres: any): void {
    // Extract IDs safely
    const patientId = pres.patientId?._id || pres.patientId;
    const appointmentId = pres.appointmentId?._id || pres.appointmentId;
    const clinicId = pres.clinicId?._id || pres.clinicId;

    this.router.navigate(
      ['/layout/prescription/master/create', patientId, appointmentId, clinicId],
      {
        state: {
          prescriptionId: pres._id,
          isEdit: true,
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
    this.getAllPrescriptionList();  
    this.prescriptionList = this.paginatedPrescriptionList = this.prescriptionCopyList;
  }

}
