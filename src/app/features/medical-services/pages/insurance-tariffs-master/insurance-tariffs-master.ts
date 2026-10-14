import { Component, viewChild } from '@angular/core';
import { MedicalServices } from '../../../../core/services/medical-services';
import { ModalService } from '../../../../core/services/modal-service';
import { AddTpaOverrideRate } from '../add-tpa-override-rate/add-tpa-override-rate';
import { IInsuranceTpaDetails, InsuranceTariffstatisticsData } from '../../../../core/interface/basic.interface';
import { RightSidebar } from '../../../../shared/component/right-sidebar/right-sidebar';
import { NotificationServices } from '../../../../core/services/notification-services';

@Component({
  selector: 'app-insurance-tariffs-master',
  standalone: false,
  templateUrl: './insurance-tariffs-master.html',
  styleUrl: './insurance-tariffs-master.css',
})
export class InsuranceTariffsMaster {
  public sidebar = viewChild<RightSidebar>('medicalSidebar');
  public insuranceTpaList: IInsuranceTpaDetails[] = [];
  public filteredinsuranceTpaList: IInsuranceTpaDetails[] = [];
  public searchText = '';
  public selectedStatus = 'Active';
  public statusOptions: string[] = ['Active', 'Expired'];
  public insuranceTariffstatisticsData!: InsuranceTariffstatisticsData;

  constructor(
    public _modalService: ModalService,
    public _medicalServices: MedicalServices,
    private _notificationServices: NotificationServices,
  ) {
  }

  ngOnInit(): void {
    this.getAllInsuranceTariff();
    this.getServiceStatistics();
  }

  private getAllInsuranceTariff(): void {
    this._medicalServices.getAllTariffs().subscribe({
      next: (response) => {
        this.insuranceTpaList = response.data;
        this.filteredinsuranceTpaList = [
          ...this.insuranceTpaList
        ];
      },
      error: (error) => {
        console.error('Failed to load medical services', error);
      }
    });
  }

  public getServiceStatistics(): void {
    this._medicalServices.getTariffsStatistics().subscribe({
      next: (response) => {
        this.insuranceTariffstatisticsData = response.data;
      },
      error: (error) => {
        console.error('Failed to load medical services', error);
      }
    });
  }

  public addTpaInsuranceOverrideRate(): void {
    const modalRef = this._modalService.openComponentModal(AddTpaOverrideRate,
      {
        class: 'modal-dialog-centered modal-lg',
        backdrop: 'static',
        keyboard: false,
        initialState: {
          // doctorDetails: doctor,
          // isModel: true,
        }
      }
    );
    modalRef.content.tpaOverritedRateSaved.subscribe((data: any) => {
      console.log('Add New Service button clicked');
      this.getAllInsuranceTariff();
    });
  }

  public applyFilters(): void {
    const search = this.searchText.trim().toLowerCase();

    this.filteredinsuranceTpaList = this.insuranceTpaList.filter((item: any) => {

      const service = item.service ?? {};
      const insuranceProvider = item.insuranceProvider ?? {};

      // Service fields
      const serviceCode = (service.serviceCode ?? '').toString().toLowerCase();
      const serviceName = (service.name ?? '').toString().toLowerCase();
      const category = (service.category ?? '').toString().toLowerCase();
      const subCategory = (service.subCategory ?? '').toString().toLowerCase();
      const department = (service.department ?? '').toString().toLowerCase();

      // Insurance Provider fields
      const tpaCode = (insuranceProvider.tpaCode ?? '').toString().toLowerCase();
      const tpaName = (insuranceProvider.name ?? '').toString().toLowerCase();
      const tpaType = (insuranceProvider.type ?? '').toString().toLowerCase();

      // Tariff fields
      const status = (item.status ?? '').toString().toLowerCase();

      const matchesSearch =
        !search ||
        serviceCode.includes(search) ||
        serviceName.includes(search) ||
        category.includes(search) ||
        subCategory.includes(search) ||
        department.includes(search) ||
        tpaCode.includes(search) ||
        tpaName.includes(search) ||
        tpaType.includes(search);

      const matchesStatus =
        this.selectedStatus === 'All' ||
        item.status === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }

  public clearSearch(): void {
    this.searchText = '';
    this.applyFilters();
  }

  public resetList(): void {
    this.clearSearch();
    this.getAllInsuranceTariff();
  }

  public openDetailsPage(tpa: IInsuranceTpaDetails): void {
    let patientDetails = {
      insuranceTpa: tpa
    }
    this.sidebar()?.openRightSidebar('Insurance Tariffs Details', 'insurance-tariffs-details', patientDetails);
  }

  public editInsuranceTpaDetail(tpa: IInsuranceTpaDetails): void {
    const modalRef = this._modalService.openComponentModal(AddTpaOverrideRate,
      {
        class: 'modal-dialog-centered modal-lg',
        backdrop: 'static',
        keyboard: false,
        initialState: {
          insuranceTpaDetail: tpa,
        }
      }
    );
    modalRef.content.tpaOverritedRateSaved.subscribe((data: any) => {
      console.log('Add New Service button clicked');
      this.getAllInsuranceTariff();
    });
  }

  public deleteInsuranceTpaDetail(tpa: IInsuranceTpaDetails): void {
    this._notificationServices.confirm('Delete', 'Are you sure you want to delete this record?').then((result) => {
      if (result.isConfirmed) {
        this._medicalServices.deleteTariff(tpa._id).subscribe({
          next: (res: any) => {
            console.log(res);
          },
          error: (error) => {
            console.error('Error updating medical service:', error);
          },
          complete: () => {
            this.getAllInsuranceTariff();
          }
        });
      }
    });
  }

  public uploadData(): void {

  }

}
