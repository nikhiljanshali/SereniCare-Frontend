import { IMedicineDetails, IDiseasessData, IDiseases, DoctorId, IDoctors, IDoctorsData, ISurgeryData } from './../../../core/interface/basic.interface';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicineService } from '../../../core/services/medicine-services';
import { IMedicine } from '../../../core/interface/basic.interface';
import { DiseasesService } from '../../../core/services/diseases';
import { DoctorService } from '../../../core/services/doctor';
import { forkJoin } from 'rxjs';
import { PastSurgicalService } from '../../../core/services/past-surgical';
import { SurgeryService } from '../../../core/services/surgery';
import { CommonMethod } from '../../../core/services/common-method';

@Component({
  selector: 'app-past-surgical',
  standalone: false,
  // imports: [],
  templateUrl: './past-surgical.html',
  styleUrl: './past-surgical.css',
})
export class PastSurgical {
  public pastSurgicalForm!: FormGroup;
  public surgeryList: ISurgeryData[] = [];
  // public medicineList: IMedicineDetails[] = [];
  // public problemList: IDiseasessData[] = [];
  public doctorsList: IDoctorsData[] = [];
  public pastSurgicalList: any[] = [];
  private patientId: string | null = null;
  public showView: boolean = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _surgeryService: SurgeryService,
    private _dDoctorService: DoctorService,
    private _commonMethod: CommonMethod
  ) {
    this.route.paramMap.subscribe(params => {
      const id = params.get('patientId');
      this.patientId = params.get('patientId');
    });
  }

  ngOnInit() {
    this.initForm();
    this.loadMasterData();
  }

  private loadMasterData(): void {
    forkJoin({
      doctors: this._dDoctorService.getAllDoctors(),
      surgeries: this._surgeryService.getAllSurgery(),
    }).subscribe({
      next: ({ doctors, surgeries }) => {
        this.doctorsList = doctors.data;
        this.surgeryList = surgeries.data;
      },
      error: (error) => {
        console.error('Failed to load master data', error);
      },
      complete: () => {
        console.info('Merge Complete...')
      }
    });
  }


  initForm() {
    this.pastSurgicalForm = this.fb.group({
      patientId: [this.patientId],
      surgeryName: ['', Validators.required],
      surgeryDate: ['', Validators.required],
      surgeonName: ['', Validators.required],
      hospitalName: ['', Validators.required],
      remarks: ['', Validators.required],
      outcome: ['', Validators.required],
      complications: ['', Validators.required],
      complicationDetails: ['', Validators.required],
      anesthesiaType: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  public savePastSurgical(): void {
    debugger;
    if (this.pastSurgicalForm.invalid) {
      this.pastSurgicalForm.markAllAsTouched();
      this._commonMethod.logInvalidControls(this.pastSurgicalForm);
      return;
    }
    const payload = this.pastSurgicalForm.getRawValue();
    console.log(payload);
    // this._pastSurgicalService.createPastSurgical(payload).subscribe((res: any) => {
    //   this.showView = true;
    // })
  }

  public getStatusClass(status: string): string {
    const classes: any = {
      'Active': 'status-active',
      'Resolved': 'status-resolved',
      'Chronic': 'status-chronic',
      'In Remission': 'status-remission'
    };
    return classes[status] || '';
  }

  public getSeverityClass(severity: string): string {
    const classes: Record<string, string> = {
      'Mild': 'severity-mild',
      'Moderate': 'severity-moderate',
      'Severe': 'severity-severe',
      'Critical': 'severity-critical'
    };

    return classes[severity] || '';
  }

  public getOutcomeClass(outcome: string): string {
    const classes: Record<string, string> = {
      'Recovered': 'outcome-recovered',
      'Improved': 'outcome-improved',
      'Stable': 'outcome-stable',
      'Worsened': 'outcome-worsened',
      'Under Treatment': 'outcome-treatment'
    };

    return classes[outcome] || '';
  }

  public toggleView(): void {
    this.showView = !this.showView;
  }
}
