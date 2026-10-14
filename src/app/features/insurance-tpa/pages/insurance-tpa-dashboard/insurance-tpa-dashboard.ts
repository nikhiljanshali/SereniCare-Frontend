import { Component, viewChild } from '@angular/core';
import { ModalService } from '../../../../core/services/modal-service';
import { AddInsuranceTPA } from '../add-insurance-tpa/add-insurance-tpa';
import { InsuranceTpaService } from '../../../../core/services/insurace-tpa';
import { InsuranceTAPDetails } from '../../../../core/interface/basic.interface';
import { RightSidebar } from '../../../../shared/component/right-sidebar/right-sidebar';
import { NotificationServices } from '../../../../core/services/notification-services';

@Component({
  selector: 'app-insurance-tpa-dashboard',
  standalone: false,
  // imports: [],
  templateUrl: './insurance-tpa-dashboard.html',
  styleUrl: './insurance-tpa-dashboard.css',
})
export class InsuranceTpaDashboard {
  public sidebar = viewChild<RightSidebar>('medicalSidebar');
  public insuranceTpaList: InsuranceTAPDetails[] = [];
  public filteredInsuranceTpaList: InsuranceTAPDetails[] = [];
  public activeTab: string = 'insurancemaster';
  public tabs = [
    {
      id: 'insurancemaster',
      label: 'Insurance & TPA Master',
      icon: 'bi-bar-chart-line'
    },
  ];
  public statusOptions: string[] = ['Active', 'Suspended', 'Expired', 'Under Negotiation'];

  public searchText = '';
  public selectedStatus = 'Active';


  constructor(
    public _modalService: ModalService,
    public _insuranceTpaService: InsuranceTpaService,
    private _notificationServices: NotificationServices,
  ) {
  }

  ngOnInit(): void {
    this.getAllInsuranceTpaDetails();
  }


  public getAllInsuranceTpaDetails(): void {
    this._insuranceTpaService.getAllInsuranceTPAs().subscribe({
      next: (response) => {
        this.insuranceTpaList = response.data;
        this.filteredInsuranceTpaList =
          [
            ...this.insuranceTpaList
          ];
      },
      error: (error) => {
        console.error('Failed to load medical services', error);
      }
    });
  }

  public AddNewInsuranceTpa(): void {
    const modalRef = this._modalService.openComponentModal(AddInsuranceTPA,
      {
        class: 'modal-dialog-centered modal-xl',
        backdrop: 'static',
        keyboard: false,
        initialState: {
          // doctorDetails: doctor,
          // isModel: true,
        }
      }
    );
    modalRef.content.insuranceTPASaved.subscribe((data: any) => {
      console.log('Add New Service button clicked');
      this.getAllInsuranceTpaDetails();
    });
  }


  public applyFilters(): void {
    const search = this.searchText.trim().toLowerCase();

    this.filteredInsuranceTpaList = this.insuranceTpaList.filter((item: any) => {
      // 1. Top-level fields
      const name = (item.name ?? '').toString().toLowerCase();
      const tpaCode = (item.tpaCode ?? '').toString().toLowerCase();
      const type = (item.type ?? '').toString().toLowerCase();
      const taxIdOrIRDAI = (item.taxIdOrIRDAI ?? '').toString().toLowerCase();

      // 2. Nested contact details
      const contact = item.contactDetails ?? {};
      const email = (contact.email ?? '').toString().toLowerCase();
      const phone = (contact.phone ?? '').toString().toLowerCase();
      const tollFreeNumber = (contact.tollFreeNumber ?? '').toString().toLowerCase();
      const website = (contact.website ?? '').toString().toLowerCase();

      // 3. Nested address
      const address = item.address ?? {};
      const city = (address.city ?? '').toString().toLowerCase();
      const state = (address.state ?? '').toString().toLowerCase();
      const street = (address.street ?? '').toString().toLowerCase();

      // 4. Check nodal officers array
      const matchesNodalOfficers = (item.nodalOfficers || []).some((officer: any) => {
        const officerName = (officer.name ?? '').toString().toLowerCase();
        const officerEmail = (officer.email ?? '').toString().toLowerCase();
        const officerPhone = (officer.phone ?? '').toString().toLowerCase();
        const designation = (officer.designation ?? '').toString().toLowerCase();

        return (
          officerName.includes(search) ||
          officerEmail.includes(search) ||
          officerPhone.includes(search) ||
          designation.includes(search)
        );
      });

      // 5. Check contracted tariff array
      const matchesTariff = (item.contractedTariff || []).some((tariff: any) => {
        const roomType = (tariff.roomType ?? '').toString().toLowerCase();
        return roomType.includes(search);
      });

      // Combined Search Match
      const matchesSearch =
        !search ||
        name.includes(search) ||
        tpaCode.includes(search) ||
        type.includes(search) ||
        taxIdOrIRDAI.includes(search) ||
        email.includes(search) ||
        phone.includes(search) ||
        tollFreeNumber.includes(search) ||
        website.includes(search) ||
        city.includes(search) ||
        state.includes(search) ||
        street.includes(search) ||
        matchesNodalOfficers ||
        matchesTariff;

      // Status Filter (Checks contractDetails.status e.g., 'Active' | 'Expired')
      const matchesStatus =
        this.selectedStatus === 'All' ||
        item.contractDetails?.status === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }

  public clearSearch(): void {
    this.searchText = '';
    this.applyFilters();
  }

  public resetList(): void {
    this.clearSearch();
    this.getAllInsuranceTpaDetails();
  }

  public openDetailsPage(insurance: InsuranceTAPDetails): void {
    let patientDetails = {
      insuranceDetail: insurance
    }
    this.sidebar()?.openRightSidebar('Insurance Tpa Details', 'insurance-details', patientDetails);
  }

  public editInsuranceTap(insurance: InsuranceTAPDetails): void {
    const modalRef = this._modalService.openComponentModal(AddInsuranceTPA,
      {
        class: 'modal-dialog-centered modal-xl',
        backdrop: 'static',
        keyboard: false,
        initialState: {
          insuranceDetail: insurance
        }
      }
    );
    modalRef.content.insuranceTPASaved.subscribe((data: any) => {
      console.log('Add New Service button clicked');
      this.getAllInsuranceTpaDetails();
    });
  }

  public deleteInsuranceTpa(insurance: InsuranceTAPDetails): void {
    this._notificationServices.confirm('Delete', 'Are you sure you want to delete this record?').then((result) => {
      if (result.isConfirmed) {
        this._insuranceTpaService.deleteInsuranceTPA(insurance._id).subscribe({
          next: (res: any) => {
            console.log(res);
          },
          error: (error) => {
            console.error('Error updating medical service:', error);
          },
          complete: () => {
            this.getAllInsuranceTpaDetails();
          }
        });
      }
    });
  }
}
