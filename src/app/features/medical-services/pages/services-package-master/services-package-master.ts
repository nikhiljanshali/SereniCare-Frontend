import { Component, viewChild } from '@angular/core';
import { ModalService } from '../../../../core/services/modal-service';
import { AddPackages } from '../add-packages/add-packages';
import { MedicalServices } from '../../../../core/services/medical-services';
import { IncludedService, IServicePackageDetails, ServicePackageStatisticsData } from '../../../../core/interface/basic.interface';
import { RightSidebar } from '../../../../shared/component/right-sidebar/right-sidebar';
import { NotificationServices } from '../../../../core/services/notification-services';

@Component({
  selector: 'app-services-package-master',
  standalone: false,
  templateUrl: './services-package-master.html',
  styleUrl: './services-package-master.css',
})
export class ServicesPackageMaster {

  public sidebar = viewChild<RightSidebar>('medicalSidebar');
  public searchText = '';
  public selectedStatus = 'Active';
  public servicePackageList: IServicePackageDetails[] = [];
  public filteredservicePackageList: IServicePackageDetails[] = [];
  public statusOptions: string[] = ['Active', 'Inactive'];
  public servicePackageStatisticsData!: ServicePackageStatisticsData;

  constructor(
    public _modalService: ModalService,
    public _medicalServices: MedicalServices,
    private _notificationServices: NotificationServices,
  ) {
  }

  ngOnInit(): void {
    this.getAllPackages();
    this.getServiceStatistics();
  }

  private getAllPackages(): void {
    this._medicalServices.getAllPackages().subscribe({
      next: (response) => {
        this.servicePackageList = response.data;
        this.filteredservicePackageList = [
          ...this.servicePackageList
        ];
      },
      error: (error) => {
        console.error('Failed to load medical services', error);
      }
    });
  }

  public getServiceStatistics(): void {
    this._medicalServices.getPackageStatistics().subscribe({
      next: (response) => {
        this.servicePackageStatisticsData = response.data;
      },
      error: (error) => {
        console.error('Failed to load medical services', error);
      }
    });
  }

  public getServiceNames(includedServices?: IncludedService[]): string {
    if (!includedServices || !includedServices.length) return 'N/A';
    return includedServices
      .map(item => item.service?.name)
      .filter(Boolean)
      .map(name => `• ${name}`)
      .join('\n');
  }


  public getDiscountInfo(totalCost?: number, packagePrice?: number): string {
    if (totalCost == null || packagePrice == null || totalCost <= 0) {
      return 'N/A';
    }
    const discountAmount = totalCost - packagePrice;
    // If there's no discount (package price is higher or equal)
    if (discountAmount <= 0) {
      return '₹0 (0%)';
    }
    const discountPercent = ((discountAmount / totalCost) * 100).toFixed(1);
    return `₹${discountAmount} (${discountPercent}%)`;
  }


  public addPackages(): void {
    const modalRef = this._modalService.openComponentModal(AddPackages,
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
    modalRef.content.packageSaved.subscribe((data: any) => {
      this.getAllPackages();
    });
  }

  public applyFilters(): void {
    const search = this.searchText.trim().toLowerCase();
    this.filteredservicePackageList = this.servicePackageList.filter((pack: any) => {
      // Top-level package fields
      const packageCode = (pack.packageCode ?? '').toString().toLowerCase();
      const packageName = (pack.packageName ?? '').toString().toLowerCase();
      const description = (pack.description ?? '').toString().toLowerCase();
      const status = (pack.status ?? '').toString().toLowerCase();

      // Check if any included service matches the search term
      const matchesIncludedServices = (pack.includedServices || []).some((inc: any) => {
        const service = inc.service ?? {};
        const serviceCode = (service.serviceCode ?? '').toString().toLowerCase();
        const serviceName = (service.name ?? '').toString().toLowerCase();
        const category = (service.category ?? '').toString().toLowerCase();
        const subCategory = (service.subCategory ?? '').toString().toLowerCase();
        const department = (service.department ?? '').toString().toLowerCase();

        return (
          serviceCode.includes(search) ||
          serviceName.includes(search) ||
          category.includes(search) ||
          subCategory.includes(search) ||
          department.includes(search)
        );
      });

      const matchesSearch =
        !search ||
        packageCode.includes(search) ||
        packageName.includes(search) ||
        description.includes(search) ||
        matchesIncludedServices;

      const matchesStatus =
        this.selectedStatus === 'All' ||
        pack.status === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }

  public clearSearch(): void {
    this.searchText = '';
    this.applyFilters();
  }

  public resetList(): void {
    this.clearSearch();
    this.getAllPackages();
  }

  public openDetailsPage(pack: IServicePackageDetails): void {
    let patientDetails = {
      servicepackage: pack
    }
    this.sidebar()?.openRightSidebar('Service Package Details', 'service-package-detail', patientDetails);
  }

  public deleteServicePackage(pack: IServicePackageDetails): void {
    this._notificationServices.confirm('Delete', 'Are you sure you want to delete this record?').then((result) => {
      if (result.isConfirmed) {
        this._medicalServices.deletePackage(pack._id).subscribe({
          next: (res: any) => {
            console.log(res);
          },
          error: (error) => {
            console.error('Error updating medical service:', error);
          },
          complete: () => {
            this.getAllPackages();
          }
        });
      }
    });
  }
  
  public uploadData(): void {

  }

}
