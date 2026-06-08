import { Component, viewChild } from '@angular/core';
import { IClinicList, IClinics } from '../../../../core/interface/basic.interface';
import { Clinics } from '../../../../core/services/clinics';
import { LocationService } from '../../../../core/services/location-service';
import { Router } from '@angular/router';
import { MedicineService } from '../../../../core/services/medicine-services';
import { RightSidebar } from '../../../../shared/component/right-sidebar/right-sidebar';

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

  constructor(
    private router: Router,
    private _clinicsService: Clinics,
    private _medicineService: MedicineService,
    public _locationService: LocationService
  ) {
  }

  ngOnInit(): void {
    this.getMedicines();
  }

  private getMedicines(): void {
    this._medicineService.getAllMedicines().subscribe((res: any) => {
      this.medicineList = res.data;
    });
  }

  openMedicineDetails(patient: any) {
    this.sidebar()?.openRightSidebar(
      '',
      'medicine-detail',
      patient
    );
  }
}
