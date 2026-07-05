import { NotificationServices } from '../../../../core/services/notification-services';
import { IAllergiesData, IAllergiesHistoryDetails } from '../../../../core/interface/basic.interface';
import { Component, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { CommonMethod } from '../../../../core/services/common-method';
import { AllergiesServices } from '../../../../core/services/allergies';
import { PatientAllergiesService } from '../../../../core/services/patient-allergies';
import { ModalService } from '../../../../core/services/modal-service';

@Component({
  selector: 'app-patient-allergies',
  standalone: false,
  // imports: [],
  templateUrl: './patient-allergies.html',
  styleUrl: './patient-allergies.css',
})
export class PatientAllergies {
  @Input() hideList: boolean = false;
  @Input() patientId: string | null = null;
  public returnResult = new EventEmitter<any>()

  public patientAllergiesForm!: FormGroup;
  public allergiesList: IAllergiesData[] = [];
  public patientAllergiesList: IAllergiesHistoryDetails[] = [];
  // private patientId: string | null = null;
  public showView: boolean = true;
  public expanded: string | null = null;

  public AllergenType = [
    'Drug / Medication', 'Food', 'Environmental', 'Insect', 'Latex', 'Chemical',
    'Chemical', 'Animal', 'Other'
  ]

  public Reaction = [
    'Skin Rash', 'Itching', 'Swelling', 'Hives (Urticaria)',
    'Breathing Difficulty', 'Anaphylaxis', 'Nausea', 'Vomiting', 'Diarrhea',
    'Dizziness', 'Fever', 'Eye Irritation', 'Cough', 'Wheezing'
  ]

  public Severity = [
    'Mild', 'Moderate', 'Severe', 'Life Threatening'
  ];

  public Evaluation = [
    'Patient Reported', 'Clinical Assessment', 'Medical Record Review', 'Allergy Testing', 'Skin Test Confirmed', 'Blood Test Confirmed',
    'Challenge Test Confirmed', 'History Based', 'Unknown',
  ];

  public Certainty = [
    'Confirmed', 'Probable', 'Suspected', 'Possible', 'Unlikely', 'Ruled Out', 'Unknown',
  ];


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _patientAllergiesService: PatientAllergiesService,
    private _notificationServices: NotificationServices,
    private _allergies: AllergiesServices,
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
    this.setupAllergyToggle();
  }

  private setupAllergyToggle(): void {

    const controlsToToggle = [
      'allergies',
      'allergyGroup',
      'allergyType',
      'allergyReaction',
      'evaluation',
      'certainty',
      'serverity',
      'comments'
    ];

    this.patientAllergiesForm
      .get('noKnownAllergies')
      ?.valueChanges.subscribe((value) => {

        if (value) {

          // Make other checkbox false
          this.patientAllergiesForm
            .get('assesmentNotPossible')
            ?.setValue(false, { emitEvent: false });

          controlsToToggle.forEach(control => {
            this.patientAllergiesForm.get(control)?.disable();
            this.patientAllergiesForm.get(control)?.setValue(null);
          });

        } else if (!this.patientAllergiesForm.get('assesmentNotPossible')?.value) {

          controlsToToggle.forEach(control => {
            this.patientAllergiesForm.get(control)?.enable();
          });
        }
      });

    this.patientAllergiesForm
      .get('assesmentNotPossible')
      ?.valueChanges.subscribe((value) => {

        if (value) {

          // Make other checkbox false
          this.patientAllergiesForm
            .get('noKnownAllergies')
            ?.setValue(false, { emitEvent: false });

          controlsToToggle.forEach(control => {
            this.patientAllergiesForm.get(control)?.disable();
            this.patientAllergiesForm.get(control)?.setValue(null);
          });

        } else if (!this.patientAllergiesForm.get('noKnownAllergies')?.value) {

          controlsToToggle.forEach(control => {
            this.patientAllergiesForm.get(control)?.enable();
          });
        }
      });
  }

  private loadMasterData(): void {
    if (!this.hideList) {
      this._patientAllergiesService.getPatientAllergiesByPatientId(this.patientId ?? '').subscribe({
        next: (res) => {
          this.patientAllergiesList = res.data;
        }
      });
    }
    forkJoin({
      allergies: this._allergies.getAllAllergies(),
    }).subscribe({
      next: ({ allergies }) => {
        this.allergiesList = allergies.data;
      },
      error: (err) => console.error(err)
    });
  }


  initForm() {
    this.patientAllergiesForm = this.fb.group({
      patientId: [this.patientId],

      noKnownAllergies: [false],
      assesmentNotPossible: [false],
      comments: [''],

      allergies: ['', Validators.required],
      evaluation: [''],
      allergyType: [''],
      allergyGroup: ['', Validators.required],
      allergyReaction: [''],
      certainty: [''],
      serverity: [''],

    });
  }

  public getAllergiesDetails(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    console.log('Selected Allergy:', selectedValue);
    const selectedAllergy = this.allergiesList.find(
      allergy => allergy.name === selectedValue
    );
    console.log('Selected Allergy Object:', selectedAllergy);
    this.patientAllergiesForm.patchValue({
      allergyGroup: selectedAllergy?.groupname ?? ''
    });
  }

  public savePatientAllergies(): void {
    if (this.patientAllergiesForm.invalid) {
      this.patientAllergiesForm.markAllAsTouched();
      this._commonMethod.logInvalidControls(this.patientAllergiesForm);
      return;
    }
    if (!this.isEdit) {
      const payload = this.generatePayload();
      this._patientAllergiesService.createPatientAllergies(payload).subscribe(() => {
        this.showView = true;
        this.patientAllergiesForm.reset();
        this.patientAllergiesForm.patchValue({
          patientId: this.patientId
        })
        this.loadMasterData();
        if (this.hideList) {
          this.returnResult.emit(true);
          this._modalService.closeComponentModal();
        }
      });
    } else {
      const payload = this.patientAllergiesForm.getRawValue();
      this._patientAllergiesService.updatePatientAllergies(this.selectedPatientAllergeis._id, payload).subscribe(() => {
        this.showView = true;
        this.isEdit = false;
        this.patientAllergiesForm.reset();
        this.patientAllergiesForm.patchValue({
          patientId: this.patientId
        })
        this.loadMasterData();
      });
    }
  }

  public generatePayload() {
    const formValue = this.patientAllergiesForm.getRawValue();
    const shouldClearFields =
      formValue.noKnownAllergies ||
      formValue.assesmentNotPossible;
    return {
      ...formValue,
      problem: shouldClearFields ? null : formValue.problem,
      allergyGroup: shouldClearFields ? null : formValue.allergyGroup,
      allergyType: shouldClearFields ? null : formValue.allergyType,
      allergyReaction: shouldClearFields ? null : formValue.allergyReaction,
      evaluation: shouldClearFields ? null : formValue.evaluation,
      certainty: shouldClearFields ? null : formValue.certainty,
      serverity: shouldClearFields ? null : formValue.serverity,
      comments: shouldClearFields ? null : formValue.comments
    };
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
    this.patientAllergiesForm.reset();
    this.patientAllergiesForm.patchValue({
      patientId: this.patientId
    });
  }

  public isEdit: boolean = false;
  public selectedPatientAllergeis: any;
  public editPatientAllergies(patientAllergies: any): void {
    this.selectedPatientAllergeis = patientAllergies;
    this.showView = false;
    this.isEdit = true;
    this.patientAllergiesForm.patchValue(patientAllergies);
  }
  public deletePatienttAllergies(patientAllergies: any): void {
    this._notificationServices.confirm('Delete', 'Are you sure you want to delete this record?').then((result) => {
      if (result.isConfirmed) {
        this._patientAllergiesService.deletePatientAllergies(patientAllergies._id).subscribe((res: any) => {
          this.loadMasterData();
        })
      }
    });
  }

  public toggleRow(id: string) {
    this.expanded = this.expanded === id ? null : id;
  }

  public closeModePopup(): void {
    // Logic to close the modal popup
    this._modalService.closeComponentModal();
  }
  public refresh(): void {
    this.loadMasterData();
  }
}
