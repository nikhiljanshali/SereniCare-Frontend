import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '../../../../core/services/modal-service';
import { MasterFacilityType } from '../master-facility-type/master-facility-type';
import { CreateFacility } from '../create-facility/create-facility';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  // imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  public searchText = '';
  public isMasterMenuOpen: boolean = false;
  public isMainMenuOpen: boolean = false;

  constructor(
    private router: Router,
    private _modalService: ModalService
  ) { }

  ngOnInit(): void {

  }

  public toggleMasterMenu(): void {
    this.isMainMenuOpen = false;
    this.isMasterMenuOpen = !this.isMasterMenuOpen;
  }

  public toggleMainMenu(): void {
    this.isMasterMenuOpen = false;
    this.isMainMenuOpen = !this.isMainMenuOpen;
  }

  public viewMasterList(): void {
    this.isMasterMenuOpen = false;
    this.router.navigate(['/layout/facility/master/list']);
    // Your prescription logic
  }

  public AddFacilityType(): void {
    const modalRef = this._modalService.openComponentModal(MasterFacilityType, {
      class: 'modal-dialog-centered modal-lg',
      backdrop: 'static',
      keyboard: false,
      initialState: {
        isModel: true,
      }
    });

    // modalRef.content.facilityTypeSaved.subscribe((data: any) => {
    //   // this.getBookedAppointment();
    // });
  }

  public ViewFacilityMasterList(): void {
    this.router.navigate(['/layout/facility/master/facility-type-list'])
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

    // modalRef.content.facilityTypeSaved.subscribe((data: any) => {
    //   // this.getBookedAppointment();
    // });
  }

  public ViewFacilityList(): void {
    this.router.navigate(['/layout/facility/master/list'])
  }

}
