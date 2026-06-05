import { Component } from '@angular/core';
import { DoctorService } from '../../../../core/services/doctor';
import { DatePipe } from '@angular/common';
import { LocationService } from '../../../../core/services/location-service';
import { Router } from '@angular/router';
import { IDoctorsData, IDoctors } from '../../../../core/interface/basic.interface';

@Component({
  selector: 'app-doctor-list',
  imports: [DatePipe],
  templateUrl: './doctor-list.html',
  styleUrl: './doctor-list.css',
})
export class DoctorList {

  doctorsList: IDoctorsData[] = [];
  expandedDoctorId: string | null = null;

  constructor(
    private router: Router,
    private _doctorService: DoctorService,
    public _locationService: LocationService
  ) {
  }

  ngOnInit(): void {
    this.getDoctors();
    this._locationService.getLocationName(1, 101, 1002).subscribe(res => {
    });
  }


  private getDoctors(): void {
    this._doctorService.getAllDoctors().subscribe((res: IDoctors) => {
      this.doctorsList = res.data;

      this.doctorsList.forEach((doc: any) => {
        const countryId = Number(doc.country);
        const stateId = Number(doc.state);
        const cityId = Number(doc.city);

        this._locationService.getLocationName(countryId, stateId, cityId).subscribe((location) => {
          // attach resolved names to doctor object
          doc.country = location.country;
          doc.state = location.state;
          doc.city = location.city;
        });
      });
    });
  }

  public toggleRow(id: string) {
    this.expandedDoctorId = this.expandedDoctorId === id ? null : id;
  }

  public createDoctor(): void {
    this.router.navigate(['/layout/doctors/master/registration']);
  }

  public editDoctor(doctor: IDoctorsData): void {
    // this.router.navigate(['/layout/doctors/master/registration', doctor._id]);
    this.router.navigate(['/layout/doctors/master/doctor-profile', doctor._id]);
  }
}
