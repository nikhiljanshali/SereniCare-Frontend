import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CommonMethod } from '../../../../core/services/common-method';
import { LocationService } from '../../../../core/services/location-service';
import { EXAMINATION_MASTER } from '../../../methods/pe-request.method';

@Component({
  selector: 'app-patient-heent',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule
  ],
  templateUrl: './patient-heent.html',
  styleUrl: './patient-heent.css',
})
export class PatientHeent {
  @Input() public patientId: string | null = null;
  @Input() public heentForm!: FormGroup;

  public tabs = [
    { id: 1, title: 'Head' },
    { id: 2, title: 'Eyes' },
    { id: 3, title: 'Ears' },
    { id: 4, title: 'Nose ' },
    { id: 5, title: 'Throat' },
  ];
  public activeTab: number = 1;

  public headOptions = EXAMINATION_MASTER.HeadOptions;
  public eyesOptions = EXAMINATION_MASTER.EyesOptions;
  public earsOptions = EXAMINATION_MASTER.EarsOptions;
  public noseOptions = EXAMINATION_MASTER.NoseOptions;
  public throatOptions = EXAMINATION_MASTER.ThroatOptions;
  public heentTagList = EXAMINATION_MASTER.heent.list;
  public heentStatements: Record<string, string> = EXAMINATION_MASTER.heent.statements;

  public EyeAssessmentData = EXAMINATION_MASTER.EyeAssessmentData;
  public EyeFindings = EXAMINATION_MASTER.EyeFindings;
  public EarsFindings = EXAMINATION_MASTER.EarsFindings;
  public NoseEpistaxis = EXAMINATION_MASTER.NoseEpistaxis;

  public rednessOptions = [
    { label: 'None', value: 'None' },
    { label: 'L', value: 'L' },
    { label: 'R', value: 'R' },
    { label: 'Bilateral', value: 'Bilateral' }
  ];
  public tonsilSize = [
    { label: '0', value: '0' },
    { label: '1+', value: '1' },
    { label: '2+', value: '2' },
    { label: '3+', value: '3' },
    { label: '4+', value: '4' }
  ];


  constructor(
    private fb: FormBuilder,
    public _locationService: LocationService,
    public _commonMethod: CommonMethod
  ) {
  }

  ngOnInit(): void {
    this.initHeent();
  }

  private initHeent(): void {
    if (this.heentForm.contains('head') && this.heentForm.contains('eyes') && this.heentForm.contains('ears') && this.heentForm.contains('nose') && this.heentForm.contains('throat')) {
      return;
    }

    this.heentForm.addControl('patientId', this.fb.control(this.patientId));

    this.heentForm.addControl('headNoFinding', this.fb.control(false));
    this.heentForm.addControl('headAssessment', this.fb.control('', Validators.required));
    this.heentForm.addControl('headNormalAbnormal', this.fb.control('', Validators.required));

    this.heentForm.addControl('eyesNoFinding', this.fb.control(false));
    this.heentForm.addControl('eyesAssessment', this.fb.control('', Validators.required));
    this.heentForm.addControl('eyesNormalAbnormal', this.fb.control('', Validators.required));
    this.heentForm.addControl('eyesFindingsNotes', this.fb.control(null));
    this.heentForm.addControl('pupilMovementChecklist', this.fb.control(null));
    this.heentForm.addControl('conjunctival', this.fb.array([
      this.fb.group({
        redness: ['None'],
      })
    ]));
    this.heentForm.addControl('eyesOtherFindings', this.fb.control(null));


    this.heentForm.addControl('earsNoFinding', this.fb.control(false));
    this.heentForm.addControl('earsAssessment', this.fb.control('', Validators.required));
    this.heentForm.addControl('earsNormalAbnormal', this.fb.control('', Validators.required));
    this.heentForm.addControl('earsFindingNotes', this.fb.control(null));
    this.heentForm.addControl(
      'infection',
      this.fb.array([
        this.fb.group({
          earCanalInfection: ['None'],
          bulging: ['None'],
        })
      ])
    );
    this.heentForm.addControl('earsOtherFindings', this.fb.control(null));


    this.heentForm.addControl('noseNoFinding', this.fb.control(false));
    this.heentForm.addControl('noseAssessment', this.fb.control('', Validators.required));
    this.heentForm.addControl('noseNormalAbnormal', this.fb.control('', Validators.required));
    this.heentForm.addControl('noseFindingNote', this.fb.control(null));
    this.heentForm.addControl('epistaxis', this.fb.control(null));

    this.heentForm.addControl('throatNoFinding', this.fb.control(false));
    this.heentForm.addControl('throatAssessment', this.fb.control('', Validators.required));
    this.heentForm.addControl('throatNormalAbnormal', this.fb.control('', Validators.required));
    this.heentForm.addControl('throatFindingNotes', this.fb.control(null));
    this.heentForm.addControl('tonsilSize', this.fb.control(null));
  }

  get conjunctival(): FormArray {
    return this.heentForm.get('conjunctival') as FormArray;
  }

  get infection(): FormArray {
    return this.heentForm.get('infection') as FormArray;
  }

  public changeTab(id: number) {
    this.activeTab = id;
  }

  public onCheckboxChange(event: Event, controlName: string, value: string): void {
    const control = this.heentForm.get(controlName);
    if (!control) return;

    const values = [...(control.value ?? [])];
    const checked = (event.target as HTMLInputElement).checked;

    checked
      ? !values.includes(value) && values.push(value)
      : values.splice(values.indexOf(value), 1);

    control.setValue(values);
  }

  public isCheckboxSelected(controlName: string, value: string): boolean {
    return this.heentForm.get(controlName)?.value?.includes(value) ?? false;
  }

  public toggleNoFinding(controlName: string): void {
    const control = this.heentForm.get(controlName);
    if (control) {
      control.setValue(!control.value);
    }
  }

  public selectedTags = new Set<string>();
  public toggleTags(item: any, type: string): void {
    if (this.selectedTags.has(item.code)) {
      this.selectedTags.delete(item.code);
    } else {
      this.selectedTags.add(item.code);
    }
    this.selectedTags = new Set(this.selectedTags);
    this.updateTags(type);
  }

  private updateTags(type: string): void {
    const statements: string[] = [];

    const filteredTags = this.heentTagList.filter(item => item.type === type);

    filteredTags.forEach(item => {
      if (this.selectedTags.has(item.code)) {
        statements.push(this.heentStatements[item.code]);
      }
    });

    const formControlMapping: Record<string, string> = {
      Head: 'headAssessment',
      Eyes: 'eyesAssessment',
      Ears: 'earsAssessment',
      Nose: 'noseAssessment',
      Throat: 'throatAssessment'
    };

    const controlName = formControlMapping[type];

    const targetControl = this.heentForm.get(controlName);

    // Directly call setValue/patchValue on the isolated AbstractControl reference
    if (targetControl) {
      targetControl.setValue(statements.join(' '), { emitEvent: false });
    } else {
      console.error(`Control named "${controlName}" was not found on this form!`);
    }
  }


  private randomItem<T>(items: T[]): T {
    return items[Math.floor(Math.random() * items.length)];
  }

  generateRandomDummyData(): void {

    const headData = [
      {
        status: 'NORMAL',
        assessment: 'Normocephalic and atraumatic. No scalp lesions.',
        normal: true
      },
      {
        status: 'TENDERNESS',
        assessment: 'Scalp tenderness over left parietal region.',
        normal: false
      },
      {
        status: 'SWELLING',
        assessment: 'Soft tissue swelling over frontal scalp.',
        normal: false
      }
    ];

    const eyesData = [
      {
        status: 'NORMAL',
        assessment: 'PERRLA. Extraocular movements intact.',
        normal: true
      },
      {
        status: 'CONJUNCTIVITIS',
        assessment: 'Bilateral conjunctival congestion with watery discharge.',
        normal: false
      },
      {
        status: 'ICTERUS',
        assessment: 'Mild scleral icterus noted.',
        normal: false
      },
      {
        status: 'CATARACT',
        assessment: 'Early cataract changes in both eyes.',
        normal: false
      }
    ];

    const earsData = [
      {
        status: 'NORMAL',
        assessment: 'Ear canals clear. Tympanic membranes intact.',
        normal: true
      },
      {
        status: 'OTITIS_MEDIA',
        assessment: 'Bulging erythematous tympanic membrane on right side.',
        normal: false
      },
      {
        status: 'CERUMEN',
        assessment: 'Impacted cerumen in left external auditory canal.',
        normal: false
      }
    ];

    const noseData = [
      {
        status: 'NORMAL',
        assessment: 'Septum midline. Nasal mucosa healthy.',
        normal: true
      },
      {
        status: 'RHINITIS',
        assessment: 'Congested nasal mucosa with watery discharge.',
        normal: false
      },
      {
        status: 'DEVIATED_SEPTUM',
        assessment: 'Deviated nasal septum to the left.',
        normal: false
      },
      {
        status: 'SINUS_TENDERNESS',
        assessment: 'Maxillary sinus tenderness present.',
        normal: false
      }
    ];

    const throatData = [
      {
        status: 'NORMAL',
        assessment: 'Oral mucosa moist. Oropharynx clear.',
        normal: true
      },
      {
        status: 'PHARYNGITIS',
        assessment: 'Erythematous pharynx with enlarged tonsils.',
        normal: false
      },
      {
        status: 'TONSILLITIS',
        assessment: 'Bilateral enlarged tonsils with exudates.',
        normal: false
      },
      {
        status: 'ORAL_ULCER',
        assessment: 'Small aphthous ulcer over buccal mucosa.',
        normal: false
      }
    ];

    const head = this.randomItem(headData);
    const eyes = this.randomItem(eyesData);
    const ears = this.randomItem(earsData);
    const nose = this.randomItem(noseData);
    const throat = this.randomItem(throatData);

    this.heentForm.patchValue({

      head: head.status,
      headAssessment: head.assessment,
      headNormalAbnormal: head.normal,

      eyes: eyes.status,
      eyesAssessment: eyes.assessment,
      eyesNormalAbnormal: eyes.normal,

      ears: ears.status,
      earsAssessment: ears.assessment,
      earsNormalAbnormal: ears.normal,

      nose: nose.status,
      noseAssessment: nose.assessment,
      noseNormalAbnormal: nose.normal,

      throat: throat.status,
      throatAssessment: throat.assessment,
      throatNormalAbnormal: throat.normal

    });

  }

  public resetForm(): void {
    this.heentForm.reset();
    this.heentForm.patchValue({
      patientId: this.patientId
    })
  }
}
