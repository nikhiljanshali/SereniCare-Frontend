import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonMethod } from '../../../../core/services/common-method';
import { LocationService } from '../../../../core/services/location-service';
import { EXAMINATION_MASTER } from '../../../methods/pe-request.method';

@Component({
  selector: 'app-patient-genitourinary',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule
  ],
  templateUrl: './patient-genitourinary.html',
  styleUrl: './patient-genitourinary.css',
})
export class PatientGenitourinary {

  @Input() public patientId: string | null = null;
  @Input() public genitourinaryForm!: FormGroup;

  public tabs = [
    { id: 1, title: ' Urinary System ' },
    { id: 2, title: 'CVA / Kidney ' },
    { id: 3, title: 'Reproductive ' },
    { id: 4, title: 'Point-of-Care Urinalysis (Dipstick)' },
    { id: 5, title: ' Imaging & Procedures' },
  ];
  public activeTab: number = 1;

  public guTagList = EXAMINATION_MASTER.genitourinary.list;
  public guStatements: Record<string, string> = EXAMINATION_MASTER.genitourinary.statements;

  public SymptomsChecklist = EXAMINATION_MASTER.SymptomsChecklist;
  public BladderPalpationFindings = EXAMINATION_MASTER.BladderPalpationFindings;
  public CVAFindings = EXAMINATION_MASTER.CVAFindings;
  public KidneyPalpationFindings = EXAMINATION_MASTER.KidneyPalpationFindings;
  public ProstateQuickSelectFindings = EXAMINATION_MASTER.ProstateQuickSelectFindings;
  public EstimatedSizeOptions = EXAMINATION_MASTER.EstimatedSizeOptions;
  public ConsistencyOptions = EXAMINATION_MASTER.ConsistencyOptions;
  public PalpationInspectionFindings = EXAMINATION_MASTER.PalpationInspectionFindings;
  public TransilluminationOptions = EXAMINATION_MASTER.TransilluminationOptions;

  public UrineColorOptions = EXAMINATION_MASTER.UrineColorOptions;
  public UrineClarityOptions = EXAMINATION_MASTER.UrineClarityOptions;

  public LeukocytesOptions = EXAMINATION_MASTER.LeukocytesOptions;
  public NitritesOptions = EXAMINATION_MASTER.NitritesOptions;
  public ProteinOptions = EXAMINATION_MASTER.ProteinOptions;
  public GlucoseOptions = EXAMINATION_MASTER.GlucoseOptions;
  public RbcBloodOptions = EXAMINATION_MASTER.RbcBloodOptions;
  public KetonesOptions = EXAMINATION_MASTER.KetonesOptions;
  public UrineCultureSensitivityOrderedOptions = EXAMINATION_MASTER.UrineCultureSensitivityOrderedOptions;


  constructor(
    private fb: FormBuilder,
    public _locationService: LocationService,
    public _commonMethod: CommonMethod
  ) {
  }

  ngOnInit(): void {
    this.initGenitourinaryForm();
  }

  private initGenitourinaryForm(): void {
    if (this.genitourinaryForm.contains('urinaryAssessment') && this.genitourinaryForm.contains('cvaAssessment') && this.genitourinaryForm.contains('reproductiveAssessment')) {
      return;
    }
    this.genitourinaryForm.addControl('patientId', this.fb.control(this.patientId));

    this.genitourinaryForm.addControl('urinaryAssessment', this.fb.control('', Validators.required));
    this.genitourinaryForm.addControl('uaNormalAbnormal', this.fb.control(null));
    this.genitourinaryForm.addControl('symptomsChecklist', this.fb.control(null));
    this.genitourinaryForm.addControl('bladderPalpationSuprapubic', this.fb.control(null));
    this.genitourinaryForm.addControl('urinaryFindingNotes', this.fb.control(null));

    this.genitourinaryForm.addControl('cvaAssessment', this.fb.control('', Validators.required));
    this.genitourinaryForm.addControl('caNormalAbnormal', this.fb.control(null));
    this.genitourinaryForm.addControl('caRightCVA', this.fb.control(null));
    this.genitourinaryForm.addControl('caLeftCVA', this.fb.control(null));
    this.genitourinaryForm.addControl('kidneyPalpationFindings', this.fb.control(null));
    this.genitourinaryForm.addControl('caFindingNotes', this.fb.control(null));

    this.genitourinaryForm.addControl('reproductiveAssessment', this.fb.control('', Validators.required));
    this.genitourinaryForm.addControl('raNormalAbnormal', this.fb.control(null));
    this.genitourinaryForm.addControl('raQuickSelectFindings', this.fb.control(null));
    this.genitourinaryForm.addControl('raEstimatedSize', this.fb.control(null));
    this.genitourinaryForm.addControl('raConsistency', this.fb.control(null));
    this.genitourinaryForm.addControl('raPalpationInspection', this.fb.control(null));
    this.genitourinaryForm.addControl('raTransillumination', this.fb.control(null));

    this.genitourinaryForm.addControl('pcuColor', this.fb.control(null));
    this.genitourinaryForm.addControl('pcuClarity', this.fb.control(null));
    this.genitourinaryForm.addControl('pcuSpecificGravity', this.fb.control(null));
    this.genitourinaryForm.addControl(
      'dipstickParameters',
      this.fb.group({
        leukocytes: this.fb.control('Neg'),
        nitrites: this.fb.control('Negative'),
        protein: this.fb.control('Neg'),
        glucose: this.fb.control('Normal'),
        rbcBlood: this.fb.control('Neg'),
        ketones: this.fb.control('Neg')
      })
    );

    this.genitourinaryForm.addControl(
      'urineCultureSensitivityOrdered',
      this.fb.control('No')
    );

    this.genitourinaryForm.addControl(
      'postVoidResidual',
      this.fb.group({
        volume: this.fb.control(null),
        indwellingCatheterPresent: this.fb.control(false),
        catheterTypeAndSize: this.fb.control(''),
        urineOutputCharacter: this.fb.control(''),
        bedsideUltrasoundFindings: this.fb.control('')
      })
    );

  }

  public changeTab(id: number) {
    this.activeTab = id;
  }

  public onCheckboxChange(event: Event, controlName: string, value: string): void {
    const control = this.genitourinaryForm.get(controlName);
    if (!control) return;

    const values = [...(control.value ?? [])];
    const checked = (event.target as HTMLInputElement).checked;

    checked
      ? !values.includes(value) && values.push(value)
      : values.splice(values.indexOf(value), 1);

    control.setValue(values);
  }

  public isCheckboxSelected(controlName: string, value: string): boolean {
    return this.genitourinaryForm.get(controlName)?.value?.includes(value) ?? false;
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

    const filteredTags = this.guTagList.filter(item => item.type === type);

    filteredTags.forEach(item => {
      if (this.selectedTags.has(item.code)) {
        statements.push(this.guStatements[item.code]);
      }
    });

    const formControlMapping: Record<string, string> = {
      urinary: 'urinaryAssessment',
      cva: 'cvaAssessment',
      reproductive: 'reproductiveAssessment',
    };

    const controlName = formControlMapping[type];

    const targetControl = this.genitourinaryForm.get(controlName);

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

    const urinaryData = [
      {
        text: 'Normal urinary frequency and stream. No dysuria, urgency or hematuria.',
        normal: true
      },
      {
        text: 'Complains of burning micturition with increased urinary frequency.',
        normal: false
      },
      {
        text: 'Urinary retention with suprapubic bladder distension.',
        normal: false
      },
      {
        text: 'Intermittent gross hematuria reported.',
        normal: false
      },
      {
        text: 'Normal bladder function without lower urinary tract symptoms.',
        normal: true
      }
    ];

    const cvaData = [
      {
        text: 'No CVA tenderness bilaterally. Renal examination unremarkable.',
        normal: true
      },
      {
        text: 'Right costovertebral angle tenderness suggestive of pyelonephritis.',
        normal: false
      },
      {
        text: 'Left renal angle tenderness on percussion.',
        normal: false
      },
      {
        text: 'Bilateral CVA tenderness with flank pain.',
        normal: false
      },
      {
        text: 'Kidneys non-palpable and non-tender.',
        normal: true
      }
    ];

    const reproductiveData = [
      {
        text: 'External genital examination within normal limits.',
        normal: true
      },
      {
        text: 'Genital erythema with mild tenderness.',
        normal: false
      },
      {
        text: 'Abnormal vaginal discharge noted during examination.',
        normal: false
      },
      {
        text: 'Scrotal swelling with mild tenderness.',
        normal: false
      },
      {
        text: 'No lesions, discharge or inguinal lymphadenopathy.',
        normal: true
      }
    ];

    const urinary = this.randomItem(urinaryData);
    const cva = this.randomItem(cvaData);
    const reproductive = this.randomItem(reproductiveData);

    this.genitourinaryForm.patchValue({

      urinaryAssessment: urinary.text,
      uaNormalAbnormal: urinary.normal,

      cvaAssessment: cva.text,
      caNormalAbnormal: cva.normal,

      reproductiveAssessment: reproductive.text,
      raNormalAbnormal: reproductive.normal

    });

  }

  public resetForm(): void {
    this.genitourinaryForm.reset();
    this.genitourinaryForm.patchValue({
      patientId: this.patientId
    })
  }
}
