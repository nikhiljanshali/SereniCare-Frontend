import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageOperation } from '../../core/services/storage-operation';
import { StorageUserDetails } from '../../core/interface/basic.interface';
import { PatientService } from '../../core/services/patients';
import { LocationService } from '../../core/services/location-service';
import { ApiStateService } from '../../core/services/api-state-service';

@Component({
  selector: 'app-layout',
  // imports: [],
  standalone: false,
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class LayoutComponent {


  constructor(
    private router: Router,
    private _patientService: PatientService,
    private _storageOperation: StorageOperation,
    private _locationService: LocationService,
    private _apiStateService: ApiStateService
  ) {
  }


  ngOnInit(): void {
    const user = this._storageOperation.get<StorageUserDetails>('user');
    if (user?.role.toLowerCase() === 'patient') {
      this.getProfileDetails();
    }
  }

  private getProfileDetails(): void {
    this._patientService.getPatientById(this._storageOperation.get<any>('userDetails').id).subscribe((res: any) => {
      const patientDeteils = res.data[0];
      this._locationService.getLocationName(Number(patientDeteils.country), Number(patientDeteils.state), Number(patientDeteils.city)).subscribe((location) => {
        patientDeteils.country = location.country;
        patientDeteils.state = location.state;
        patientDeteils.city = location.city;
      });
      this._apiStateService.setApiData(patientDeteils);
    });
  }

}
