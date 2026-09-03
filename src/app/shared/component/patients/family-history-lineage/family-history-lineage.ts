import { NotificationServices } from '../../../../core/services/notification-services';
import { IDiseasesData, IDoctorsData, ISurgeryData } from '../../../../core/interface/basic.interface';
import { Component, EventEmitter, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from '../../../../core/services/doctor';
import { forkJoin } from 'rxjs';
import { SurgeryService } from '../../../../core/services/surgery';
import { CommonMethod } from '../../../../core/services/common-method';
import { DiseasesService } from '../../../../core/services/diseases';
import { ModalService } from '../../../../core/services/modal-service';
import { FamilyHistoryLineageService } from '../../../../core/services/family-history-lineage';
import { StorageOperation } from '../../../../core/services/storage-operation';


@Component({
  selector: 'app-family-history-lineage',
  standalone: false,
  // imports: [],
  templateUrl: './family-history-lineage.html',
  styleUrl: './family-history-lineage.css',
})
export class FamilyHistoryLineage {

  @Input() hideList: boolean = false;
  @Input() patientId: string | null = null;
  public returnResult = new EventEmitter<any>()
  public showView: boolean = true;


  public CAUSE_OF_DEATH = [
    'Not Applicable',
    'Unknown',

    // Cardiovascular
    'Myocardial Infarction (Heart Attack)',
    'Cardiac Arrest',
    'Heart Failure',
    'Coronary Artery Disease',
    'Stroke (Cerebrovascular Accident)',
    'Hypertensive Heart Disease',
    'Aortic Aneurysm',

    // Respiratory
    'Pneumonia',
    'Chronic Obstructive Pulmonary Disease (COPD)',
    'Asthma',
    'Respiratory Failure',
    'Pulmonary Embolism',

    // Cancer
    'Breast Cancer',
    'Lung Cancer',
    'Colon Cancer',
    'Prostate Cancer',
    'Liver Cancer',
    'Pancreatic Cancer',
    'Leukemia',
    'Other Malignancy',

    // Infectious Diseases
    'Sepsis',
    'Tuberculosis',
    'COVID-19',
    'Meningitis',
    'Hepatitis',

    // Endocrine & Metabolic
    'Diabetes Mellitus',
    'Diabetic Ketoacidosis',
    'Hypoglycemia',

    // Neurological
    'Alzheimer\'s Disease',
    'Parkinson\'s Disease',
    'Epilepsy',
    'Brain Hemorrhage',

    // Renal
    'Chronic Kidney Disease',
    'Renal Failure',

    // Liver
    'Liver Cirrhosis',
    'Liver Failure',

    // Trauma
    'Road Traffic Accident',
    'Head Injury',
    'Fall',
    'Burn Injury',
    'Drowning',

    // External Causes
    'Suicide',
    'Homicide',
    'Poisoning',
    'Drug Overdose',

    // Pregnancy Related
    'Maternal Complications',

    // Other
    'Natural Causes',
    'Old Age',
    'Other'
  ];

  public GENETIC_FACTORS = [
    'No Known Genetic Disorder',
    'Unknown',
    'BRCA1 Mutation',
    'BRCA2 Mutation',
    'Lynch Syndrome',
    'Familial Adenomatous Polyposis (FAP)',
    'Li-Fraumeni Syndrome',
    'Multiple Endocrine Neoplasia (MEN)',
    'Sickle Cell Disease',
    'Sickle Cell Trait',
    'Thalassemia',
    'Hemophilia A',
    'Hemophilia B',
    'G6PD Deficiency',
    'Familial Hypercholesterolemia',
    'Hypertrophic Cardiomyopathy',
    'Long QT Syndrome',
    'Marfan Syndrome',
    'Arrhythmogenic Right Ventricular Cardiomyopathy (ARVC)',
    'Huntington\'s Disease',
    'Muscular Dystrophy',
    'Charcot-Marie-Tooth Disease',
    'Spinocerebellar Ataxia',
    'Cystic Fibrosis',
    'Phenylketonuria (PKU)',
    'Wilson Disease',
    'Hereditary Hemochromatosis',
    'Gaucher Disease',
    'Tay-Sachs Disease',
    'Ehlers-Danlos Syndrome',
    'Osteogenesis Imperfecta',
    'Polycystic Kidney Disease',
    'Alport Syndrome',
    'Retinitis Pigmentosa',
    'Congenital Deafness',
    'Usher Syndrome',
    'Down Syndrome',
    'Turner Syndrome',
    'Klinefelter Syndrome',
    'Fragile X Syndrome',
    'Neurofibromatosis Type 1',
    'Neurofibromatosis Type 2',
    'Alpha-1 Antitrypsin Deficiency',
    'Achondroplasia',
    'Hereditary Angioedema',
    'Other'
  ];

  public familyHistoryLineageForm!: FormGroup;
  public problemList: IDiseasesData[] = [];
  public surgeryList: ISurgeryData[] = [];
  public doctorsList: IDoctorsData[] = [];
  public familyHistoryLineageList: any[] = [];
  public expandedFamilyHistory: string | null = null;


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _surgeryService: SurgeryService,
    private _dDoctorService: DoctorService,
    private _diseasesService: DiseasesService,
    private _familyHistoryLineageService: FamilyHistoryLineageService,
    private _notificationServices: NotificationServices,
    private _commonMethod: CommonMethod,
    public _modalService: ModalService,
    private _storageOperation: StorageOperation,
  ) {
    this.route.paramMap.subscribe(params => {
      const routePatientId = params.get('patientId');
      this.patientId =
        this.patientId ||
        routePatientId ||
        this._storageOperation.get<any>('userDetails').id;
      console.log('Patient ID:', this.patientId);
    });
  }

  ngOnInit() {
    this.initForm();
    this.loadMasterData();
  }

  private loadMasterData(): void {
    if (!this.hideList) {
      this._familyHistoryLineageService.getFamilyHistoryLineageByPatientId(this.patientId ?? '').subscribe({
        next: (res) => {
          this.familyHistoryLineageList = res.data;
          console.log(this.familyHistoryLineageList);
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
        // console.log(this.problemList);
      },
      error: (err) => console.error(err)
    });
  }


  initForm() {
    this.familyHistoryLineageForm = this.fb.group({
      patientId: [this.patientId],
      relationship: ['', Validators.required],
      status: ['Living', Validators.required],
      currentAge: [null, Validators.required],
      causeOfDeath: [''],
      genetic: ['', Validators.required],
      multipleConditions: ['', Validators.required],
      comments: ['', Validators.required],
      medicalConditions: this.fb.array([
        this.createMedicalCondition()
      ])
    });

    // // Controls which depend on noFamilyHistory
    // const familyControls = ['problem', 'father', 'mother', 'brother', 'sister', 'child', 'paternal', 'meternal', 'comments'];
    // this.familyHistoryLineageForm.get('noFamilyHistory')?.valueChanges.subscribe((value) => {
    //   familyControls.forEach(controlName => {
    //     const control = this.familyHistoryLineageForm.get(controlName);
    //     if (value === true) {
    //       control?.disable();
    //       control?.clearValidators();
    //       control?.setValue('');
    //     } else {
    //       control?.enable();
    //     }
    //     control?.updateValueAndValidity();
    //   });
    // });
  }

  private createMedicalCondition(): FormGroup {
    return this.fb.group({
      medicalCondition: ['', Validators.required],
      ageAtDiagnosis: [null],
      complications: [''],
      comments: ['']
    });
  }

  get medicalConditions(): FormArray {
    return this.familyHistoryLineageForm.get('medicalConditions') as FormArray;
  }

  public addMedicalCondition(): void {
    this.medicalConditions.push(this.createMedicalCondition());
  }

  public removeMedicalCondition(index: number): void {
    if (this.medicalConditions.length > 1) {
      this.medicalConditions.removeAt(index);
    }
  }


  public saveFamilyHistoryLineage(): void {
    if (this.familyHistoryLineageForm.invalid) {
      this.familyHistoryLineageForm.markAllAsTouched();
      this._commonMethod.logInvalidControls(this.familyHistoryLineageForm);
      return;
    }
    if (!this.isEdit) {
      const payload = this.familyHistoryLineageForm.value;
      console.log(payload);
      // return;
      this._familyHistoryLineageService.createFamilyHistoryLineage(payload).subscribe((res: any) => {
        this.showView = true;
        this.loadMasterData();
        if (this.hideList) {
          this.returnResult.emit(true);
          this._modalService.closeComponentModal();
        }
      });
    } else {
      const payload = this.familyHistoryLineageForm.getRawValue();
      console.log(payload);
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
      this._familyHistoryLineageService.updateFamilyHistoryLineage(this.selectedfamilyhistory._id, payload).subscribe((res: any) => {
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
    this.familyHistoryLineageForm.reset();
    this.familyHistoryLineageForm.patchValue({
      patientId: this.patientId
    })
  }


  public isEdit: boolean = false;
  public selectedfamilyhistory: any;
  public editFamilyHistoryLineage(familyhistory: any): void {
    this.selectedfamilyhistory = familyhistory;
    this.showView = false;
    this.isEdit = true;
    this.familyHistoryLineageForm.patchValue(familyhistory);
  }
  public deleteFamilyHistoryLineage(familyhistory: any): void {
    this._notificationServices.confirm('Delete', 'Are you sure you want to delete this record?').then((result) => {
      if (result.isConfirmed) {
        this._familyHistoryLineageService.deleteFamilyHistoryLineage(familyhistory._id).subscribe((res: any) => {
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

  public openFamilyHistoryDetails(id: string) {
    this.expandedFamilyHistory = this.expandedFamilyHistory === id ? null : id;
  }

  public refresh(): void {
    this.loadMasterData();
  }
}

