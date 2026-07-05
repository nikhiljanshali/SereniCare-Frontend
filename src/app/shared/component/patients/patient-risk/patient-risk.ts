import { NotificationServices } from '../../../../core/services/notification-services';
import { Component, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { CommonMethod } from '../../../../core/services/common-method';
import { AllergiesServices } from '../../../../core/services/allergies';
import { RiskMasterService } from '../../../../core/services/risk-master';
import { PatientRiskService } from '../../../../core/services/patient-risk';
import { ModalService } from '../../../../core/services/modal-service';

@Component({
  selector: 'app-patient-risk',
  standalone: false,
  // imports: [],
  templateUrl: './patient-risk.html',
  styleUrl: './patient-risk.css',
})
export class PatientRisk {
  @Input() hideList: boolean = false;
  @Input() patientId: string | null = null;
  public returnResult = new EventEmitter<any>()

  public patientRiskForm!: FormGroup;
  public riskList: any[] = [];
  public patientRiskList: any[] = [];
  // private patientId: string | null = null;
  public showView: boolean = true;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _patientRiskService: PatientRiskService,
    private _notificationServices: NotificationServices,
    private _allergies: AllergiesServices,
    private _riskMasterService: RiskMasterService,
    private _commonMethod: CommonMethod,
    public _modalService: ModalService
  ) {
    this.route.paramMap.subscribe(params => {
      this.patientId = params.get('patientId');
    });
  }

  ngOnInit() {
    this.initForm();
    this.loadMasterData();
    // this.setupAllergyToggle();
  }

  private loadMasterData(): void {
    if (!this.hideList) {
      this._patientRiskService.getPatientRiskByPatientId(this.patientId ?? '').subscribe({
        next: (res) => {
          this.patientRiskList = res.data;
        }
      });
    }
    forkJoin({
      riskes: this._riskMasterService.getAllRiskMaster(),
    }).subscribe({
      next: ({ riskes }) => {
        this.riskList = riskes.data;
      },
      error: (err) => console.error(err)
    });
  }


  initForm() {
    this.patientRiskForm = this.fb.group({
      patientId: [this.patientId],
      riskCode: ['', Validators.required],
      riskDescription: ['', Validators.required],
      riskComment: ['', Validators.required],
      reportedOn: ['', Validators.required],
    });
  }

  public onRiskChange(): void {
    const selectedRisk = this.patientRiskForm.get('riskCode')?.value;
    this.patientRiskForm.patchValue({
      riskDescription: selectedRisk.name
    });
    console.log(selectedRisk);
    console.log(selectedRisk._id);
    console.log(selectedRisk.code);
    console.log(selectedRisk.name);
  }

  public savePatientRisk(): void {
    if (this.patientRiskForm.invalid) {
      this.patientRiskForm.markAllAsTouched();
      this._commonMethod.logInvalidControls(this.patientRiskForm);
      return;
    }
    if (!this.isEdit) {
      const payload = this.patientRiskForm.value;;
      this._patientRiskService.createPatientRisk(payload).subscribe(() => {
        this.showView = true;
        this.patientRiskForm.reset();
        this.patientRiskForm.patchValue({
          patientId: this.patientId
        })
        this.loadMasterData();
        if (this.hideList) {
          this.returnResult.emit(true);
          this._modalService.closeComponentModal();
        }
      });
    } else {
      const payload = this.patientRiskForm.value;

      this._patientRiskService.updatePatientRisk(this.selectedPatientAllergeis._id, payload).subscribe(() => {
        this.showView = true;
        this.isEdit = false;
        this.patientRiskForm.reset();
        this.patientRiskForm.patchValue({
          patientId: this.patientId
        })
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
    this.patientRiskForm.reset();
    this.patientRiskForm.patchValue({
      patientId: this.patientId
    });
  }


  public isEdit: boolean = false;
  public selectedPatientAllergeis: any;
  public editPatientRisk(patientRisk: any): void {
    this.selectedPatientAllergeis = patientRisk;
    this.showView = false;
    this.isEdit = true;
    const selectedRisk = this.riskList.find((med: any) => med.name === this.selectedPatientAllergeis.riskDescription);
    this.patientRiskForm.patchValue({
      ...patientRisk,
      riskCode: selectedRisk ?? null,
      reportedOn: this._commonMethod.formatDateForInput(patientRisk.reportedOn)
    });
  }
  public deletePatientRisk(patientRisk: any): void {
    this._notificationServices.confirm('Delete', 'Are you sure you want to delete this record?').then((result) => {
      if (result.isConfirmed) {
        this._patientRiskService.deletePatientRisk(patientRisk._id).subscribe((res: any) => {
          this.loadMasterData();
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
