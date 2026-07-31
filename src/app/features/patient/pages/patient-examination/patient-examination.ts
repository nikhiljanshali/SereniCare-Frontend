import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPatientsData } from '../../../../core/interface/basic.interface';
import { LocationService } from '../../../../core/services/location-service';
import { PatientService } from '../../../../core/services/patients';
import { PhysicalExamination } from '../../../../core/services/physical-examination';
import { PatientGeneralSurvey } from '../../../../shared/component/patients/patient-general-survey/patient-general-survey';
import { PatientCardioVascular } from '../../../../shared/component/patients/patient-cardio-vascular/patient-cardio-vascular';
import { PatientGastrointestinal } from '../../../../shared/component/patients/patient-gastrointestinal/patient-gastrointestinal';
import { PatientHeent } from '../../../../shared/component/patients/patient-heent/patient-heent';
import { PatientNeurological } from '../../../../shared/component/patients/patient-neurological/patient-neurological';
import { PatientGenitourinary } from '../../../../shared/component/patients/patient-genitourinary/patient-genitourinary';
import { PatientPsychiatric } from '../../../../shared/component/patients/patient-psychiatric/patient-psychiatric';
import { PatientSkinExamination } from '../../../../shared/component/patients/patient-skin-examination/patient-skin-examination';
import { PatientRespiratory } from '../../../../shared/component/patients/patient-respiratory/patient-respiratory';
import { PatientMusculoskeletalExamination } from '../../../../shared/component/patients/patient-musculoskeletal-examination/patient-musculoskeletal-examination';

@Component({
  selector: 'app-patient-examination',
  standalone: false,
  // imports: [],
  templateUrl: './patient-examination.html',
  styleUrl: './patient-examination.css',
})
export class PatientExamination {

  @ViewChild('PatientGeneralSurvey') patientGeneralSurvey!: PatientGeneralSurvey;
  @ViewChild('PatientCardioVascular') patientCardioVascular!: PatientCardioVascular;
  @ViewChild('PatientRespiratory') patientRespiratory!: PatientRespiratory;
  @ViewChild('PatientNeurological') patientNeurological!: PatientNeurological;
  @ViewChild('PatientGastrointestinal') patientGastrointestinal!: PatientGastrointestinal;
  @ViewChild('PatientHeent') patientHeent!: PatientHeent;
  @ViewChild('PatientGenitourinary') patientGenitourinary!: PatientGenitourinary;
  @ViewChild('PatientMusculoskeletalExamination') patientMusculoskeletalExamination!: PatientMusculoskeletalExamination;
  @ViewChild('PatientSkinExamination') patientSkinExamination!: PatientSkinExamination;
  @ViewChild('PatientPsychiatric') patientPsychiatric!: PatientPsychiatric;

  public physicalExamForm!: FormGroup;
  public patientId: string | null = null;
  public patientDetails: IPatientsData | null = null;
  public activeHorizontalTab: number = 1;
  public horizontalTabs = [
    { id: 1, title: 'Physical Examination' },
  ];
  
  public selectedTab = 1;

  public physicalExamTabs = [
    { id: 1, name: 'General Survey', icon: 'bi-person-arms-up', count: 0 },
    { id: 2, name: 'Cardiovascular Examination', icon: 'bi-person-arms-up', count: 0 },
    { id: 3, name: 'Respiratory Examination', icon: 'bi-person-arms-up', count: 0 },
    { id: 4, name: 'Neurological Examination', icon: 'bi-person-arms-up', count: 0 },
    { id: 5, name: 'Gastrointestinal Examination', icon: 'bi-person-arms-up', count: 0 },
    { id: 6, name: 'H.E.E.N.T', icon: 'bi-person-arms-up', count: 0 },
    { id: 7, name: 'Genitourinary (GU) Examination', icon: 'bi-person-arms-up', count: 0 },
    { id: 8, name: 'Musculoskeletal Examination', icon: 'bi-person-arms-up', count: 0 },
    { id: 9, name: 'Skin & Integumentary Examination', icon: 'bi-person-arms-up', count: 0 },
    { id: 10, name: 'Psychiatric / Mental Status', icon: 'bi-person-arms-up', count: 0 },
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _patientService: PatientService,
    public _locationService: LocationService,
    public _physicalExamination: PhysicalExamination
  ) {
    this.route.paramMap.subscribe(params => {
      const id = params.get('patientId');
      this.patientId = params.get('patientId');
    });
  }

  ngOnInit(): void {
    this.getPatientDetails();
    this.initForm();
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

  public changeHorizontalTab(id: number) {
    this.activeHorizontalTab = id;
  }

  public backToList(): void {
    this.router.navigate(['/layout/patients/master/list'])
  }

  private initForm(): void {
    this.physicalExamForm = this.fb.group({
      patientId: this.patientId,
      generalSurvey: this.fb.group({}),
      cardiovascular: this.fb.group({}),
      respiratory: this.fb.group({}),
      neurological: this.fb.group({}),
      gastrointestinal: this.fb.group({}),
      heent: this.fb.group({}),
      genitourinary: this.fb.group({}),
      musculoskeletal: this.fb.group({}),
      skin: this.fb.group({}),
      psychiatric: this.fb.group({}),
    });
  }

  get generalSurveyForm(): FormGroup {
    return this.physicalExamForm.get('generalSurvey') as FormGroup;
  }

  get cardiovascularForm(): FormGroup {
    return this.physicalExamForm.get('cardiovascular') as FormGroup;
  }

  get respiratoryForm(): FormGroup {
    return this.physicalExamForm.get('respiratory') as FormGroup;
  }

  get neurologicalForm(): FormGroup {
    return this.physicalExamForm.get('neurological') as FormGroup;
  }

  get gastrointestinalForm(): FormGroup {
    return this.physicalExamForm.get('gastrointestinal') as FormGroup;
  }

  get heentForm(): FormGroup {
    return this.physicalExamForm.get('heent') as FormGroup;
  }

  get genitourinaryForm(): FormGroup {
    return this.physicalExamForm.get('genitourinary') as FormGroup;
  }

  get musculoskeletalForm(): FormGroup {
    return this.physicalExamForm.get('musculoskeletal') as FormGroup;
  }

  get skinExaminationForm(): FormGroup {
    return this.physicalExamForm.get('skin') as FormGroup;
  }

  get psychiatricForm(): FormGroup {
    return this.physicalExamForm.get('psychiatric') as FormGroup;
  }

  public savePhysicalExam(): void {
    const payload = this.physicalExamForm.value;
    this._physicalExamination.createPhysicalExamination(payload).subscribe((res: any) => {
      console.log(res);
      this.patientGeneralSurvey.resetForm();
      this.patientCardioVascular.resetForm();
      this.patientRespiratory.resetForm();
      this.patientNeurological.resetForm();
      this.patientGastrointestinal.resetForm();
      this.patientHeent.resetForm();
      this.patientGenitourinary.resetForm();
      this.patientMusculoskeletalExamination.resetForm();
      this.patientSkinExamination.resetForm();
      this.patientPsychiatric.resetForm();
      // this.physicalExamForm.reset();
    });
  }

  public patchDummyData(): void {
    if (this.selectedTab == 1) {
      this.patientGeneralSurvey.generateRandomDummyData();
    } else if (this.selectedTab == 2) {
      this.patientCardioVascular.generateRandomDummyData();
    } else if (this.selectedTab == 3) {
      this.patientRespiratory.generateRandomDummyData();
    } else if (this.selectedTab == 4) {
      this.patientNeurological.generateRandomDummyData();
    } else if (this.selectedTab == 5) {
      this.patientGastrointestinal.generateRandomDummyData();
    } else if (this.selectedTab == 6) {
      this.patientHeent.generateRandomDummyData();
    } else if (this.selectedTab == 7) {
      this.patientGenitourinary.generateRandomDummyData();
    } else if (this.selectedTab == 8) {
      this.patientMusculoskeletalExamination.generateRandomDummyData();
    } else if (this.selectedTab == 9) {
      this.patientSkinExamination.generateRandomDummyData();
    } else if (this.selectedTab == 10) {
      this.patientPsychiatric.generateRandomDummyData();
    }
  }
}

