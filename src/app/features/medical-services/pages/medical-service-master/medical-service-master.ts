import { Component, viewChild } from '@angular/core';
import { ModalService } from '../../../../core/services/modal-service';
import { AddMedicalService } from '../add-medical-service/add-medical-service';
import { MedicalServices } from '../../../../core/services/medical-services';
import { MedicalServicesDetails, ServiceMasterStatistics, ServiceMasterStatisticsData } from '../../../../core/interface/basic.interface';
import { RightSidebar } from '../../../../shared/component/right-sidebar/right-sidebar';
import { NotificationServices } from '../../../../core/services/notification-services';

@Component({
  selector: 'app-medical-service-master',
  standalone: false,
  templateUrl: './medical-service-master.html',
  styleUrl: './medical-service-master.css',
})
export class MedicalServiceMaster {
  public sidebar = viewChild<RightSidebar>('medicalSidebar');
  public medicalServicesDetailsList: MedicalServicesDetails[] = [];
  public filteredMedicalServicesDetailsList: MedicalServicesDetails[] = [];
  public serviceMasterStatistics!: ServiceMasterStatisticsData;
  public searchText = '';
  public selectedStatus = 'Active';
  public statusList = [
    { id: 1, key: 'active', value: 'Active' },
    { id: 2, key: 'inactive', value: 'Inactive' },
    { id: 3, key: 'discontinue', value: 'Discontinue' }
  ];

  constructor(
    public _modalService: ModalService,
    public _medicalServices: MedicalServices,
    private _notificationServices: NotificationServices,
  ) {
  }

  ngOnInit(): void {
    this.getAllMedicalServices();
    this.getServiceStatistics();
  }

  public getAllMedicalServices(): void {
    this._medicalServices.getAllServices().subscribe({
      next: (response) => {
        this.medicalServicesDetailsList = response.data || [];

        this.filteredMedicalServicesDetailsList = [
          ...this.medicalServicesDetailsList
        ];
      },
      error: (error) => {
        console.error('Failed to load medical services', error);
      }
    });
  }

  public getServiceStatistics(): void {
    this._medicalServices.getServiceStatistics().subscribe({
      next: (response) => {
        this.serviceMasterStatistics = response.data;
        console.log(this.serviceMasterStatistics);
      },
      error: (error) => {
        console.error('Failed to load medical services', error);
      }
    });
  }

  public getStatusBackground(status: string): string {
    switch (status) {
      case 'Active':
        return '#dcfce7';

      case 'In-Active':
        return '#fef3c7';

      case 'Discontinue':
        return '#fee2e2';

      default:
        return '#f3f4f6';
    }
  }

  public getStatusColor(status: string): string {
    switch (status) {
      case 'Active':
        return '#166534';

      case 'In-Active':
        return '#92400e';

      case 'Discontinue':
        return '#991b1b';

      default:
        return '#6b7280';
    }
  }

  public addNewService(): void {
    const modalRef = this._modalService.openComponentModal(AddMedicalService,
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
    modalRef.content.serviceSaved.subscribe((data: any) => {
      console.log('Add New Service button clicked');
      this.getAllMedicalServices();
    });
  }

  public openDetailsPage(service: MedicalServicesDetails): void {
    let patientDetails = {
      service: service
    }
    this.sidebar()?.openRightSidebar('Service Details', 'service-details', patientDetails);
  }

  public editServiceDetails(service: MedicalServicesDetails): void {
    const modalRef = this._modalService.openComponentModal(AddMedicalService,
      {
        class: 'modal-dialog-centered modal-lg',
        backdrop: 'static',
        keyboard: false,
        initialState: {
          serviceDetail: service,
        }
      }
    );
    // modalRef.content.serviceSaved.subscribe((data: any) => {
    //   console.log('Add New Service button clicked');
    //   this.getAllMedicalServices();
    // });
  }

  public deleteServiceDetails(service: MedicalServicesDetails): void {
    this._notificationServices.confirm('Delete', 'Are you sure you want to delete this record?').then((result) => {
      if (result.isConfirmed) {
        this._medicalServices.deleteService(service._id).subscribe({
          next: (res: any) => {
            console.log(res);
          },
          error: (error) => {
            console.error('Error updating medical service:', error);
          },
          complete: () => {
            this.getAllMedicalServices();
          }
        });
      }
    });
  }

  public applyFilters(): void {
    const search = this.searchText.trim().toLowerCase();
    this.filteredMedicalServicesDetailsList =
      this.medicalServicesDetailsList.filter((service: any) => {
        const serviceCode = (service.serviceCode ?? '').toString();
        const name = (service.name ?? '').toString();
        const category = (service.category ?? '').toString();
        const department = (service.department ?? '').toString();

        const matchesSearch =
          !search ||
          serviceCode.toLowerCase().includes(search) ||
          name.toLowerCase().includes(search) ||
          category.toLowerCase().includes(search) ||
          department.toLowerCase().includes(search);

        const matchesStatus =
          this.selectedStatus === 'All' ||
          service.status === this.selectedStatus;

        return matchesSearch && matchesStatus;
      });
  }

  public clearSearch(): void {
    this.searchText = '';
    this.applyFilters();
  }

  public resetList(): void {
    this.clearSearch();
    this.getAllMedicalServices();
  }

  public uploadData(): void {
        
  }
}
