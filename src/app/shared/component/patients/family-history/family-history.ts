import { NotificationServices } from '../../../../core/services/notification-services';
import { IDiseasesData, IDoctorsData, ISurgeryData } from '../../../../core/interface/basic.interface';
import { Component, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from '../../../../core/services/doctor';
import { forkJoin } from 'rxjs';
import { PastSurgicalService } from '../../../../core/services/past-surgical';
import { SurgeryService } from '../../../../core/services/surgery';
import { CommonMethod } from '../../../../core/services/common-method';
import { DiseasesService } from '../../../../core/services/diseases';
import { FamilyHistoryService } from '../../../../core/services/family-history';
import { ModalService } from '../../../../core/services/modal-service';

@Component({
  selector: 'app-family-history',
  standalone: false,
  // imports: [],
  templateUrl: './family-history.html',
  styleUrl: './family-history.css',
})
export class FamilyHistory {
  @Input() hideList: boolean = false;
  @Input() patientId: string | null = null;
  public returnResult = new EventEmitter<any>()
  public showView: boolean = true;

  public familyHistoryForm!: FormGroup;
  public problemList: IDiseasesData[] = [];
  public surgeryList: ISurgeryData[] = [];
  public doctorsList: IDoctorsData[] = [];
  public familyHistoryList: any[] = [];


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _surgeryService: SurgeryService,
    private _dDoctorService: DoctorService,
    private _diseasesService: DiseasesService,
    private _pastSurgicalService: PastSurgicalService,
    private _familyHistoryService: FamilyHistoryService,
    private _notificationServices: NotificationServices,
    private _commonMethod: CommonMethod,
    public _modalService: ModalService
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
    if (!this.hideList) {
      this._familyHistoryService.getFamilyHistoryByPatientId(this.patientId ?? '').subscribe({
        next: (res) => {
          this.familyHistoryList = res.data;
        }
      });
    }
    forkJoin({
      doctors: this._dDoctorService.getAllDoctors(),
      diseases: this._diseasesService.getAllDiseases(),
      surgeries: this._surgeryService.getAllSurgery(),
    }).subscribe({
      next: ({ doctors, diseases, surgeries }) => {
        this.doctorsList = doctors.data;
        this.problemList = diseases.data;
        this.surgeryList = surgeries.data;
      },
      error: (err) => console.error(err)
    });
  }


  initForm() {
    this.familyHistoryForm = this.fb.group({
      patientId: [this.patientId],

      noFamilyHistory: [false],

      problem: ['', Validators.required],
      father: [false],
      mother: [false],
      brother: [false],
      sister: [false],
      child: [false],
      paternal: [false],
      meternal: [false],

      comments: [''],
    });

    // Controls which depend on noFamilyHistory
    const familyControls = ['problem', 'father', 'mother', 'brother', 'sister', 'child', 'paternal', 'meternal', 'comments'];
    this.familyHistoryForm.get('noFamilyHistory')?.valueChanges.subscribe((value) => {
      familyControls.forEach(controlName => {
        const control = this.familyHistoryForm.get(controlName);
        if (value === true) {
          // Disable and remove required validation
          control?.disable();
          control?.clearValidators();
          control?.setValue('');
        } else {
          // Enable and add required validation
          control?.enable();
          // control?.setValidators([Validators.required]);
        }
        control?.updateValueAndValidity();
      });
    });
  }

  public saveFamilyHistory(): void {
    if (this.familyHistoryForm.invalid) {
      this.familyHistoryForm.markAllAsTouched();
      this._commonMethod.logInvalidControls(this.familyHistoryForm);
      return;
    }
    if (!this.isEdit) {
      const payload = this.familyHistoryForm.value;
      console.log(payload);
      // return;
      this._familyHistoryService.createFamilyHistory(payload).subscribe((res: any) => {
        this.showView = true;
        this.loadMasterData();
        if (this.hideList) {
          this.returnResult.emit(true);
          this._modalService.closeComponentModal();
        }
      });
    } else {
      const payload = this.familyHistoryForm.getRawValue();
      if (payload.noFamilyHistory) {
        Object.assign(payload, {
          problem: 'Not Applicable',
          father: false,
          mother: false,
          brother: false,
          sister: false,
          child: false,
          paternal: false,
          meternal: false,
          comments: ''
        });
      }
      this._familyHistoryService.updateFamilyHistory(this.selectedfamilyhistory._id, payload).subscribe((res: any) => {
        this.showView = true;
        this.isEdit = false;
        this.loadMasterData();
      });
    }
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
    this.familyHistoryForm.reset();
    this.familyHistoryForm.patchValue({
      patientId: this.patientId
    })
  }


  public isEdit: boolean = false;
  public selectedfamilyhistory: any;
  public editFamilyHistory(familyhistory: any): void {
    this.selectedfamilyhistory = familyhistory;
    this.showView = false;
    this.isEdit = true;
    this.familyHistoryForm.patchValue(familyhistory);
  }
  public deleteFamilyHistory(familyhistory: any): void {
    this._notificationServices.confirm('Delete', 'Are you sure you want to delete this record?').then((result) => {
      if (result.isConfirmed) {
        this._familyHistoryService.deleteFamilyHistory(familyhistory._id).subscribe((res: any) => {
          this.loadMasterData();
          console.log(res);
        })
      }
    });
  }

  public closeModePopup(): void {
    // Logic to close the modal popup
    this._modalService.closeComponentModal();
  }

  public refresh(): void {
    this.loadMasterData();
  }
}


