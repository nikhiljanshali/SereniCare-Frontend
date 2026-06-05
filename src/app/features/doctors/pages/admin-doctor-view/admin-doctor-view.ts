import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../../../core/services/doctor';
import { LocationService } from '../../../../core/services/location-service';
import { ActivatedRoute, Router } from '@angular/router';
import { IDoctorsData, IDoctors } from '../../../../core/interface/basic.interface';

@Component({
  selector: 'app-admin-doctor-view',
  standalone: false,
  // imports: [],
  templateUrl: './admin-doctor-view.html',
  styleUrl: './admin-doctor-view.css',
})
export class AdminDoctorView {
  doctorsList: IDoctorsData[] = [];
  expandedDoctorId: string | null = null;
  avatarClasses: string[] = [
    'dp-avatar-teal',
    'dp-avatar-violet',
    'dp-avatar-orange',
    'dp-avatar-green',
    'dp-avatar-blue',
    'dp-avatar-pink'
  ];

  backgroundClasses: string[] = [
    'dp-card-banner-1',
    'dp-card-banner-2',
    'dp-card-banner-3',
    'dp-card-banner-4',
    'dp-card-banner-5',
    'dp-card-banner-6'
  ];

  tagClasses: string[] = [
    'dp-tag-teal',
    'dp-tag-violet',
    'dp-tag-blue',
    'dp-tag-red',
    'dp-tag-orange',
    'dp-tag-amber',
    'dp-tag-green',
    'dp-tag-indigo'
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _doctorService: DoctorService,
    public _locationService: LocationService
  ) {
    this.route.paramMap.subscribe(params => {
      // const id = params.get('id');
    });
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

  public getRandomAvatarClass(doctor: any): string {
    const fullName = `${doctor.firstName}${doctor.lastName}`;
    let hash = 0;
    for (let i = 0; i < fullName.length; i++) {
      hash = fullName.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash % this.avatarClasses.length);
    return this.avatarClasses[index];
  }

  public getRandomBackgroundClass(doctor: any): string {
    const fullName = `${doctor.firstName}${doctor.lastName}`;
    // Generate consistent random index based on name
    let hash = 0;
    for (let i = 0; i < fullName.length; i++) {
      hash = fullName.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash % this.backgroundClasses.length);
    return this.backgroundClasses[index];
  }

  public getRandomTagClass(doctor: any): string {
    const fullName = `${doctor.firstName}${doctor.lastName}`;
    // Generate consistent random index based on name
    let hash = 0;
    for (let i = 0; i < fullName.length; i++) {
      hash = fullName.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash % this.tagClasses.length);
    return this.tagClasses[index];
  }

  public createDoctor(): void {
    this.router.navigate(['/layout/doctors/master/registration']);
  }

  public viewDoctor(doctorId: string): void {
    this.router.navigate(['/layout/doctors/master/doctor-profile', doctorId]);
  }
}
