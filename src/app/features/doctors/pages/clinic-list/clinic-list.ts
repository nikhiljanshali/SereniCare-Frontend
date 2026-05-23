import { Component } from '@angular/core';
import { LocationService } from '../../../../core/services/location-service';
import { Router } from '@angular/router';
import { Clinics } from '../../../../core/services/clinics';
import { IClinicList, IClinics } from '../../../../core/interface/basic.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-clinic-list',
  imports: [DatePipe],
  templateUrl: './clinic-list.html',
  styleUrl: './clinic-list.css',
})
export class ClinicList {

  public clinicList: IClinicList[] = [];

  constructor(
    private router: Router,
    private _clinicsService: Clinics,
    public _locationService: LocationService
  ) {
  }

  ngOnInit(): void {
    this.getClinics();
  }

  private getClinics(): void {
    console.log('Get Clinics');
    this._clinicsService.getAllClinics().subscribe((res: IClinics) => {
      console.log(res);
      this.clinicList = res.data;
      // this.doctorsList = res.data;

      // this.doctorsList.forEach((doc: any) => {
      //   const countryId = Number(doc.country);
      //   const stateId = Number(doc.state);
      //   const cityId = Number(doc.city);

      //   this._locationService.getLocationName(countryId, stateId, cityId).subscribe((location) => {
      //     // attach resolved names to doctor object
      //     doc.country = location.country;
      //     doc.state = location.state;
      //     doc.city = location.city;
      //   });
      // });
    });
  }


}
