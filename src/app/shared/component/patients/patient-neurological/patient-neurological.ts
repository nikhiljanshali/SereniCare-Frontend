import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonMethod } from '../../../../core/services/common-method';
import { LocationService } from '../../../../core/services/location-service';
import { PatientService } from '../../../../core/services/patients';
import { EXAMINATION_MASTER } from '../../../methods/pe-request.method';

@Component({
  selector: 'app-patient-neurological',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule
  ],
  templateUrl: './patient-neurological.html',
  styleUrl: './patient-neurological.css',
})
export class PatientNeurological {
  @Input() public patientId: string | null = null;
  @Input() public neurologicalForm!: FormGroup;

  public activeTab: number = 1;

  public tabs = [
    { id: 1, title: 'Cranial Nerves' },
    { id: 2, title: 'Mental Status' },
    { id: 3, title: 'Motor Strength' },
    { id: 4, title: 'DTR' },
    { id: 5, title: 'Sensory Exam' },
    { id: 6, title: 'Coordination & Cerebellar' },
  ];

  public sideOptions = [
    { label: 'L', value: 'L' },
    { label: 'R', value: 'R' },
    { label: 'None', value: 'None' }
  ];

  public muscleGroups = [
    { label: 'Upper Ext. (L)', control: 'UpperExtL' },
    { label: 'Upper Ext. (R)', control: 'UpperExtR' },
    { label: 'Lower Ext. (L)', control: 'LowerExtL' },
    { label: 'Lower Ext. (R)', control: 'LowerExtR' }
  ];

  public sensationTypes = [
    { label: 'Light Touch', control: 'lightTouch' },
    { label: 'Pinprick', control: 'pinprick' },
    { label: 'Vibration', control: 'vibration' },
    { label: 'Proprioception', control: 'proprioception' }
  ];

  public sensationStatus = [
    { value: 'I', class: 'sel-ok' },
    { value: 'D', class: 'sel-mid' },
    { value: 'A', class: 'sel-bad' }
  ];

  public HemisensoryOptions = [
    { label: 'None', value: 'None' },
    { label: 'Left', value: 'Left' },
    { label: 'Right', value: 'Right' },
    { label: 'Bilateral', value: 'Bilateral' }
  ];

  public rombergTestOptions = [
    { label: 'Negative', value: 'Negative' },
    { label: 'Positive', value: 'Positive' }
  ];

  public tandemGaitOptions = [
    { label: 'Normal', value: 'Normal' },
    { label: 'Abnormal', value: 'Abnormal' }
  ];


  public grades = [0, 1, 2, 3, 4, 5];


  public cranialNervesTagList = EXAMINATION_MASTER.neurological.cranialNerves.list;
  public cranialNervesStatements: Record<string, string> = EXAMINATION_MASTER.neurological.cranialNerves.statements;

  public mentalStatusTagList = EXAMINATION_MASTER.neurological.mentalStatus.list;
  public mentalStatusStatements: Record<string, string> = EXAMINATION_MASTER.neurological.mentalStatus.statements;

  public motorStrengthTagList = EXAMINATION_MASTER.neurological.motorStrength.list;
  public motorStrengthStatements: Record<string, string> = EXAMINATION_MASTER.neurological.motorStrength.statements;

  public deepTendonReflexesTagList = EXAMINATION_MASTER.neurological.deepTendonReflexes.list;
  public deepTendonReflexesStatements: Record<string, string> = EXAMINATION_MASTER.neurological.deepTendonReflexes.statements;

  public sensoryExamTagList = EXAMINATION_MASTER.neurological.sensoryExam.list;
  public sensoryExamStatements: Record<string, string> = EXAMINATION_MASTER.neurological.sensoryExam.statements;

  public coordinationGaitTagList = EXAMINATION_MASTER.neurological.coordinationGait.list;
  public coordinationGaitStatements: Record<string, string> = EXAMINATION_MASTER.neurological.coordinationGait.statements;

  public PupilsEyeMovements = EXAMINATION_MASTER.PupilsEyeMovements;
  public FacialHearing = EXAMINATION_MASTER.FacialHearing;
  public PalateSpeechNeck = EXAMINATION_MASTER.PalateSpeechNeck;
  public LevelOfConsciousness = EXAMINATION_MASTER.LevelOfConsciousness;
  public MoodBehavior = EXAMINATION_MASTER.MoodBehavior;
  public Speech = EXAMINATION_MASTER.Speech;
  public ToneAndDriftList = EXAMINATION_MASTER.ToneAndDriftList;
  public GlobalPatternsList = EXAMINATION_MASTER.GlobalPatternsList;
  public DistributionPatternList = EXAMINATION_MASTER.DistributionPatternList;
  public GaitPatternList = EXAMINATION_MASTER.GaitPatternList;
  public RapidMovementTremorList = EXAMINATION_MASTER.RapidMovementTremorList;


  constructor(
    private fb: FormBuilder,
    public _locationService: LocationService,
    public _commonMethod: CommonMethod
  ) {
  }

  ngOnInit(): void {
    this.initNeurological();
  }

  public changeTab(id: number) {
    this.activeTab = id;
  }

  private initNeurological(): void {
    if (
      this.neurologicalForm.contains('cranialNerves') &&
      this.neurologicalForm.contains('mentalStatusOrientation') &&
      this.neurologicalForm.contains('motorStrengthMatrix') &&
      this.neurologicalForm.contains('deepTendonReflexes') &&
      this.neurologicalForm.contains('sensoryExam') &&
      this.neurologicalForm.contains('coordinationCerebellarFunction')
    ) {
      return;
    }
    this.neurologicalForm.addControl('patientId', this.fb.control(this.patientId));

    this.neurologicalForm.addControl('cranialNerves', this.fb.control('', Validators.required));
    this.neurologicalForm.addControl('cnNormalAbnormal', this.fb.control(null));
    this.neurologicalForm.addControl('cranialNervesFindingNotes', this.fb.control(null));
    this.neurologicalForm.addControl('pupilsEyeMovements', this.fb.control(null));
    this.neurologicalForm.addControl('facialHearing', this.fb.control(null));
    this.neurologicalForm.addControl('palateSpeechNeck', this.fb.control(null));
    this.neurologicalForm.addControl('lateralizedFindings', this.fb.array([this.createLateralizedFinding()]));



    this.neurologicalForm.addControl('mentalStatusOrientation', this.fb.control('', Validators.required));
    this.neurologicalForm.addControl('msoNormalAbnormal', this.fb.control(null));
    this.neurologicalForm.addControl('levelConsciousness', this.fb.control(null));
    this.neurologicalForm.addControl('mentalFindingNote', this.fb.control(null));
    this.neurologicalForm.addControl('mentalMoodBehavior', this.fb.control(null));
    this.neurologicalForm.addControl('mentalSpeech', this.fb.control(null));
    this.neurologicalForm.addControl('mentalOrientation', this.fb.array([this.createOrientationGroup()]));



    this.neurologicalForm.addControl('motorStrengthMatrix', this.fb.control('', Validators.required));
    this.neurologicalForm.addControl('msmNormalAbnormal', this.fb.control(null));
    this.neurologicalForm.addControl('glasgowComaScale', this.fb.array([
      this.fb.group({
        eyeResponse: [0, Validators.required],
        verbalResponse: [0, Validators.required],
        motorResponse: [0, Validators.required],
      })
    ]));
    this.neurologicalForm.addControl('msmFindingNotes', this.fb.control(null));
    this.neurologicalForm.addControl('toneDrift', this.fb.control(null));
    this.neurologicalForm.addControl('globalPatterns', this.fb.control(null));
    this.neurologicalForm.addControl(
      'muscleGroup',
      this.fb.array([
        this.fb.group({
          UpperExtL: [0, Validators.required],
          UpperExtR: [0, Validators.required],
          LowerExtL: [0, Validators.required],
          LowerExtR: [0, Validators.required],
        })
      ])
    );



    this.neurologicalForm.addControl('deepTendonReflexes', this.fb.control('', Validators.required));
    this.neurologicalForm.addControl('dtrNormalAbnormal', this.fb.control(null));
    this.neurologicalForm.addControl(
      'reflexes',
      this.fb.array([
        this.fb.group({
          biceps: [0, Validators.required],
          triceps: [0, Validators.required],
          brachioradialis: [0, Validators.required],
          patellarLeft: [0, Validators.required],
          patellarRight: [0, Validators.required],
          achillesLeft: [0, Validators.required],
          achillesRight: [0, Validators.required],
        })
      ])
    );
    this.neurologicalForm.addControl('pathologicalReflexes', this.fb.array([this.createPathologicalReflexes()]));
    this.neurologicalForm.addControl('dtrFindingNotes', this.fb.control(null));


    this.neurologicalForm.addControl('sensoryExam', this.fb.control('', Validators.required));
    this.neurologicalForm.addControl('seNormalAbnormal', this.fb.control(null));
    this.neurologicalForm.addControl(
      'sensoryExamination',
      this.fb.array(this.createSensoryExamination())
    );
    this.neurologicalForm.addControl(
      'hemisensoryLoss',
      this.fb.array([this.createHemisensoryLoss()])
    );
    this.neurologicalForm.addControl('sensoryFindingNote', this.fb.control(null));
    this.neurologicalForm.addControl('sensoryDistributionPattern', this.fb.control(null));

    this.neurologicalForm.addControl('coordinationCerebellarFunction', this.fb.control('', Validators.required));
    this.neurologicalForm.addControl('ccfNormalAbnormal', this.fb.control(null));
    this.neurologicalForm.addControl('gaitPattern', this.fb.control(null));
    this.neurologicalForm.addControl('coordinationCerebellarFindingNotes', this.fb.control(null));
    this.neurologicalForm.addControl('rapidMovementsTremor', this.fb.control(null));
    this.neurologicalForm.addControl(
      'gaitFindings',
      this.fb.array([this.createGaitFindings()])
    );
  }

  private createLateralizedFinding(): FormGroup {
    return this.fb.group({
      facialDroop: ['None', Validators.required],
      uvulaDeviation: ['None'],
      tongueDeviation: ['None']
    });
  }

  get lateralizedFindings(): FormArray {
    return this.neurologicalForm.get('lateralizedFindings') as FormArray;
  }

  public createOrientationGroup(): FormGroup {
    return this.fb.group({
      person: [false],     // Default is false
      place: [false],      // Default is false
      time: [false],       // Default is false
      situation: [false]   // Default is false
    });
  }

  get mentalOrientation(): FormArray {
    return this.neurologicalForm?.get('mentalOrientation') as FormArray;
  }

  get glasgowComaScale(): FormArray {
    return this.neurologicalForm.get('glasgowComaScale') as FormArray;
  }

  get muscleGroup(): FormArray {
    return this.neurologicalForm.get('muscleGroup') as FormArray;
  }

  get reflexes(): FormArray {
    return this.neurologicalForm.get('reflexes') as FormArray;
  }

  private createPathologicalReflexes(): FormGroup {
    return this.fb.group({
      babinski: ['None', Validators.required],
      sustainedClonus: ['None'],
      hoffmansSign: ['None']
    });
  }

  get pathologicalReflexes(): FormArray {
    return this.neurologicalForm.get('pathologicalReflexes') as FormArray;
  }

  private createSensoryExamination(): FormGroup[] {
    const extremities = ['RUE', 'LUE', 'RLE', 'LLE'];

    return extremities.map(extremity =>
      this.fb.group({
        extremity: [extremity],
        lightTouch: ['I', Validators.required],
        pinprick: ['I', Validators.required],
        vibration: ['I', Validators.required],
        proprioception: ['I', Validators.required]
      })
    );
  }

  get sensoryExamination(): FormArray {
    return this.neurologicalForm.get('sensoryExamination') as FormArray;
  }

  private createGaitFindings(): FormGroup {
    return this.fb.group({
      rombergTest: ['Negative', Validators.required],
      tandemGait: ['Normal', Validators.required],
      dysmetria: ['None', Validators.required],
      abnormalHeelToShin: ['None', Validators.required]
    });
  }

  get gaitFindings(): FormArray {
    return this.neurologicalForm.get('gaitFindings') as FormArray;
  }

  private createHemisensoryLoss(): FormGroup {
    return this.fb.group({
      hemisensoryLoss: ['None']
    });
  }

  get hemisensoryLoss(): FormArray {
    return this.neurologicalForm.get('hemisensoryLoss') as FormArray;
  }

  setPerson(item: AbstractControl, value: boolean) {
    item.get('person')?.setValue(value);
    console.log(item.get('person')?.value);
  }

  public onCheckboxChange(event: Event, controlName: string, value: string): void {
    const control = this.neurologicalForm.get(controlName);
    if (!control) return;

    const values = [...(control.value ?? [])];
    const checked = (event.target as HTMLInputElement).checked;

    checked
      ? !values.includes(value) && values.push(value)
      : values.splice(values.indexOf(value), 1);

    control.setValue(values);
  }

  public isCheckboxSelected(controlName: string, value: string): boolean {
    return this.neurologicalForm.get(controlName)?.value?.includes(value) ?? false;
  }


  public selectedCarnialNervers = new Set<string>();
  public toggleCarnialNervers(item: any): void {
    if (this.selectedCarnialNervers.has(item.code)) {
      this.selectedCarnialNervers.delete(item.code);
    } else {
      this.selectedCarnialNervers.add(item.code);
    }
    this.updateEffortChestExpansion();
  }

  private updateEffortChestExpansion(): void {
    const statements: string[] = [];
    this.cranialNervesTagList.forEach(item => {
      if (this.selectedCarnialNervers.has(item.code)) {
        statements.push(this.cranialNervesStatements[item.code]);
      }
    });
    this.neurologicalForm.patchValue({
      cranialNerves: statements.join(' ')
    }, { emitEvent: false });
  }

  public selectedMentalStatusOrientation = new Set<string>();
  public toggleMentalStatusOrientation(item: any): void {
    if (this.selectedMentalStatusOrientation.has(item.code)) {
      this.selectedMentalStatusOrientation.delete(item.code);
    } else {
      this.selectedMentalStatusOrientation.add(item.code);
    }
    this.updateMentalStatusOrientation();
  }

  private updateMentalStatusOrientation(): void {
    const statements: string[] = [];
    this.mentalStatusTagList.forEach(item => {
      if (this.selectedMentalStatusOrientation.has(item.code)) {
        statements.push(this.mentalStatusStatements[item.code]);
      }
    });
    this.neurologicalForm.patchValue({
      mentalStatusOrientation: statements.join(' ')
    }, { emitEvent: false });
  }

  public selectedMotorStrengthMatrix = new Set<string>();
  public toggleMotorStrengthMatrix(item: any): void {
    if (this.selectedMotorStrengthMatrix.has(item.code)) {
      this.selectedMotorStrengthMatrix.delete(item.code);
    } else {
      this.selectedMotorStrengthMatrix.add(item.code);
    }
    this.updateMotorStrengthMatrix();
  }

  private updateMotorStrengthMatrix(): void {
    const statements: string[] = [];
    this.motorStrengthTagList.forEach(item => {
      if (this.selectedMotorStrengthMatrix.has(item.code)) {
        statements.push(this.motorStrengthStatements[item.code]);
      }
    });
    this.neurologicalForm.patchValue({
      motorStrengthMatrix: statements.join(' ')
    }, { emitEvent: false });
  }

  public selectedDeepTendonReflexes = new Set<string>();
  public toggleDeepTendonReflexes(item: any): void {
    if (this.selectedDeepTendonReflexes.has(item.code)) {
      this.selectedDeepTendonReflexes.delete(item.code);
    } else {
      this.selectedDeepTendonReflexes.add(item.code);
    }
    this.updateDeepTendonReflexes();
  }

  private updateDeepTendonReflexes(): void {
    const statements: string[] = [];
    this.deepTendonReflexesTagList.forEach(item => {
      if (this.selectedDeepTendonReflexes.has(item.code)) {
        statements.push(this.deepTendonReflexesStatements[item.code]);
      }
    });
    this.neurologicalForm.patchValue({
      deepTendonReflexes: statements.join(' ')
    }, { emitEvent: false });
  }

  public selectedSensoryExam = new Set<string>();
  public toggleSensoryExam(item: any): void {
    if (this.selectedSensoryExam.has(item.code)) {
      this.selectedSensoryExam.delete(item.code);
    } else {
      this.selectedSensoryExam.add(item.code);
    }
    this.updateSensoryExam();
  }

  private updateSensoryExam(): void {
    const statements: string[] = [];
    this.sensoryExamTagList.forEach(item => {
      if (this.selectedSensoryExam.has(item.code)) {
        statements.push(this.sensoryExamStatements[item.code]);
      }
    });
    this.neurologicalForm.patchValue({
      sensoryExam: statements.join(' ')
    }, { emitEvent: false });
  }

  public selectedCoordinationCerebellarFunction = new Set<string>();
  public toggleCoordinationCerebellarFunction(item: any): void {
    if (this.selectedCoordinationCerebellarFunction.has(item.code)) {
      this.selectedCoordinationCerebellarFunction.delete(item.code);
    } else {
      this.selectedCoordinationCerebellarFunction.add(item.code);
    }
    this.updateCoordinationCerebellarFunction();
  }

  private updateCoordinationCerebellarFunction(): void {
    const statements: string[] = [];
    this.coordinationGaitTagList.forEach(item => {
      if (this.selectedCoordinationCerebellarFunction.has(item.code)) {
        statements.push(this.coordinationGaitStatements[item.code]);
      }
    });
    this.neurologicalForm.patchValue({
      coordinationCerebellarFunction: statements.join(' ')
    }, { emitEvent: false });
  }

  private randomItem<T>(items: T[]): T {
    return items[Math.floor(Math.random() * items.length)];
  }

  generateRandomDummyData(): void {

    const cranialNerves = [
      {
        text: 'Cranial nerves II-XII intact.',
        normal: true
      },
      {
        text: 'Mild right facial weakness involving CN VII.',
        normal: false
      },
      {
        text: 'Left lateral gaze palsy with diplopia.',
        normal: false
      },
      {
        text: 'Normal cranial nerve examination.',
        normal: true
      }
    ];

    const mentalStatus = [
      {
        text: 'Alert and oriented to person, place and time.',
        normal: true
      },
      {
        text: 'Mild confusion with impaired short-term memory.',
        normal: false
      },
      {
        text: 'Drowsy but arousable.',
        normal: false
      },
      {
        text: 'Normal cognition and speech.',
        normal: true
      }
    ];

    const motorStrength = [
      {
        text: 'Motor strength 5/5 in all extremities.',
        normal: true
      },
      {
        text: 'Power 4/5 in right upper limb.',
        normal: false
      },
      {
        text: 'Left lower limb weakness (3/5).',
        normal: false
      },
      {
        text: 'Normal muscle tone and power.',
        normal: true
      }
    ];

    const reflexes = [
      {
        text: 'Deep tendon reflexes 2+ and symmetrical.',
        normal: true
      },
      {
        text: 'Hyperreflexia in both lower limbs.',
        normal: false
      },
      {
        text: 'Absent ankle jerks bilaterally.',
        normal: false
      },
      {
        text: 'Normal reflex examination.',
        normal: true
      }
    ];

    const sensory = [
      {
        text: 'Sensation intact to all modalities.',
        normal: true
      },
      {
        text: 'Reduced pinprick sensation over left foot.',
        normal: false
      },
      {
        text: 'Peripheral stocking-type sensory loss.',
        normal: false
      },
      {
        text: 'Normal sensory examination.',
        normal: true
      }
    ];

    const coordination = [
      {
        text: 'Normal gait and coordination.',
        normal: true
      },
      {
        text: 'Positive Romberg test with impaired balance.',
        normal: false
      },
      {
        text: 'Intention tremor with dysmetria.',
        normal: false
      },
      {
        text: 'Normal finger-to-nose and heel-to-shin tests.',
        normal: true
      }
    ];

    const cn = this.randomItem(cranialNerves);
    const ms = this.randomItem(mentalStatus);
    const motor = this.randomItem(motorStrength);
    const dtr = this.randomItem(reflexes);
    const sensoryExam = this.randomItem(sensory);
    const coord = this.randomItem(coordination);

    this.neurologicalForm.patchValue({

      cranialNerves: cn.text,
      cnNormalAbnormal: cn.normal,

      mentalStatusOrientation: ms.text,
      msoNormalAbnormal: ms.normal,

      motorStrengthMatrix: motor.text,
      msmNormalAbnormal: motor.normal,

      deepTendonReflexes: dtr.text,
      dtrNormalAbnormal: dtr.normal,

      sensoryExam: sensoryExam.text,
      seNormalAbnormal: sensoryExam.normal,

      coordinationCerebellarFunction: coord.text,
      ccfNormalAbnormal: coord.normal

    });
  }

  public resetForm(): void {
    this.neurologicalForm.reset();
    this.neurologicalForm.patchValue({
      patientId: this.patientId
    })
  }
}
