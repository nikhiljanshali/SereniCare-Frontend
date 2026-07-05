import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { PatientService } from '../../../../core/services/patients';
import { IPatients, IPatientsData } from '../../../../core/interface/basic.interface';
import { LocationService } from '../../../../core/services/location-service';

@Component({
  selector: 'app-patient-medical-history',
  standalone: false,
  // imports: [],
  templateUrl: './patient-medical-history.html',
  styleUrl: './patient-medical-history.css',
})
export class PatientMedicalHistory {

  public activeTab: number = 1;

  public tabs = [
    { id: 1, title: 'Past Medical' },
    { id: 2, title: 'Past Surgical' },
    { id: 3, title: 'Family History' },
    { id: 4, title: 'Allergies' },
    { id: 5, title: 'Risk Factors' },
    { id: 6, title: 'Adverse Drug Reaction' },
    { id: 7, title: 'Family History Lineage' }
  ];

  private patientId: string | null = null;
  public patientDetails: IPatientsData | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _patientService: PatientService,
    public _locationService: LocationService,
  ) {
    this.route.paramMap.subscribe(params => {
      const id = params.get('patientId');
      this.patientId = params.get('patientId');
    });
  }

  ngOnInit(): void {
    this.getPatientDetails();
  }

  private getPatientDetails(): void {
    this._patientService.getPatientById(this.patientId ?? '').subscribe((res: any) => {
      const patientDeteils = res.data[0]
      this._locationService.getLocationName(Number(patientDeteils.country), Number(patientDeteils.state), Number(patientDeteils.city)).subscribe((location) => {
        patientDeteils.country = location.country;
        patientDeteils.state = location.state;
        patientDeteils.city = location.city;
      });
      this.patientDetails = patientDeteils;
    })
  }

  public changeTab(id: number) {
    this.activeTab = id;
  }

  public backToList(): void {
    this.router.navigate(['/layout/patients/master/list'])
  }


}
