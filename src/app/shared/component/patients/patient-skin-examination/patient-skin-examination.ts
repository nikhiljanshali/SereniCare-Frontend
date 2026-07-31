import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonMethod } from '../../../../core/services/common-method';
import { LocationService } from '../../../../core/services/location-service';
import { EXAMINATION_MASTER } from '../../../methods/pe-request.method';

@Component({
  selector: 'app-patient-skin-examination',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule
  ],
  templateUrl: './patient-skin-examination.html',
  styleUrl: './patient-skin-examination.css',
})
export class PatientSkinExamination {

  @Input() public patientId: string | null = null;
  @Input() public skinExaminationForm!: FormGroup;

  public tabs = [
    { id: 1, title: 'Integrity & Lesion ' },
    { id: 2, title: 'Vascular & Hemodynamic' },
    { id: 3, title: 'Appendage (Hair & Nails) ' },
    { id: 4, title: 'Targeted Lesion Analysis (ABCDE Derm Tool)' },
  ];
  public activeTab: number = 1;

  public skinTagList = EXAMINATION_MASTER.skinExamination.list;
  public skinStatements: Record<string, string> = EXAMINATION_MASTER.skinExamination.statements;

  public PrimaryLocationSiteOptions = EXAMINATION_MASTER.PrimaryLocationSiteOptions;
  public PressureInjuryStageOptions = EXAMINATION_MASTER.PressureInjuryStageOptions;

  public PeripheralEdemaGradeOptions = EXAMINATION_MASTER.PeripheralEdemaGradeOptions;
  public CapillaryRefillTimeOptions = EXAMINATION_MASTER.CapillaryRefillTimeOptions;


  public NailBedAngleOptions = EXAMINATION_MASTER.NailBedAngleOptions;
  public HairDistributionOptions = EXAMINATION_MASTER.HairDistributionOptions;


  public ABCDEScreeningOptions = EXAMINATION_MASTER.ABCDEScreeningOptions;
  public DermatoscopyBiopsyOptions = EXAMINATION_MASTER.DermatoscopyBiopsyOptions;

  constructor(
    private fb: FormBuilder,
    public _locationService: LocationService,
    public _commonMethod: CommonMethod
  ) {
  }

  ngOnInit(): void {
    this.initSkinExaminationForm();
  }

  private initSkinExaminationForm(): void {
    if (this.skinExaminationForm.contains('integrityAssessment') && this.skinExaminationForm.contains('vascularAssessment') && this.skinExaminationForm.contains('appendageAssessment')) {
      return;
    }
    this.skinExaminationForm.addControl('patientId', this.fb.control(this.patientId));

    /* ===========================
       Integrity Assessment
    =========================== */

    this.skinExaminationForm.addControl(
      'integrityAssessment',
      this.fb.control('', Validators.required)
    );

    this.skinExaminationForm.addControl(
      'iaNormalAbnormal',
      this.fb.control(null)
    );

    this.skinExaminationForm.addControl(
      'primaryLocationSite',
      this.fb.control([])
    );

    this.skinExaminationForm.addControl(
      'pressureInjuryStaging',
      this.fb.control('', Validators.required)
    );

    /* ===========================
       Vascular Assessment
    =========================== */

    this.skinExaminationForm.addControl(
      'vascularAssessment',
      this.fb.control('', Validators.required)
    );

    this.skinExaminationForm.addControl(
      'vaNormalAbnormal',
      this.fb.control(null)
    );

    this.skinExaminationForm.addControl(
      'peripheralEdemaGrade',
      this.fb.control('', Validators.required)
    );

    this.skinExaminationForm.addControl(
      'capillaryRefillTime',
      this.fb.control('', Validators.required)
    );

    /* ===========================
       Appendage Assessment
    =========================== */

    this.skinExaminationForm.addControl(
      'appendageAssessment',
      this.fb.control('', Validators.required)
    );

    this.skinExaminationForm.addControl(
      'aaNormalAbnormal',
      this.fb.control(null)
    );

    this.skinExaminationForm.addControl(
      'nailBedAngle',
      this.fb.control('', Validators.required)
    );

    this.skinExaminationForm.addControl(
      'hairDistribution',
      this.fb.control('', Validators.required)
    );

    /* ===========================
       Lesions / Moles
    =========================== */

    this.skinExaminationForm.addControl(
      'lesionsMoles',
      this.fb.control([])
    );

    this.skinExaminationForm.addControl(
      'dermatoscopy',
      this.fb.control('', Validators.required)
    );
  }

  public changeTab(id: number) {
    this.activeTab = id;
  }

  public onCheckboxChange(event: Event, controlName: string, value: string): void {
    const control = this.skinExaminationForm.get(controlName);
    if (!control) return;

    const values = [...(control.value ?? [])];
    const checked = (event.target as HTMLInputElement).checked;

    checked
      ? !values.includes(value) && values.push(value)
      : values.splice(values.indexOf(value), 1);

    control.setValue(values);
  }

  public isCheckboxSelected(controlName: string, value: string): boolean {
    return this.skinExaminationForm.get(controlName)?.value?.includes(value) ?? false;
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

    const filteredTags = this.skinTagList.filter(item => item.type === type);

    filteredTags.forEach(item => {
      if (this.selectedTags.has(item.code)) {
        statements.push(this.skinStatements[item.code]);
      }
    });

    const formControlMapping: Record<string, string> = {
      integrity: 'integrityAssessment',
      vascular: 'vascularAssessment',
      appendage: 'appendageAssessment',
    };

    const controlName = formControlMapping[type];

    const targetControl = this.skinExaminationForm.get(controlName);

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

    const integrityData = [
      {
        text: 'Skin warm, dry and intact. No lesions or pressure ulcers.',
        normal: true
      },
      {
        text: 'Diffuse erythematous rash over upper extremities.',
        normal: false
      },
      {
        text: 'Stage II pressure ulcer over sacral region.',
        normal: false
      },
      {
        text: 'Multiple healed surgical scars noted over abdomen.',
        normal: false
      },
      {
        text: 'Dry skin with mild excoriations over lower limbs.',
        normal: false
      },
      {
        text: 'Normal skin integrity with good turgor.',
        normal: true
      }
    ];

    const vascularData = [
      {
        text: 'Peripheral pulses 2+ bilaterally. Capillary refill <2 seconds.',
        normal: true
      },
      {
        text: 'Delayed capillary refill (>3 seconds) in both feet.',
        normal: false
      },
      {
        text: 'Bilateral pitting pedal edema (2+).',
        normal: false
      },
      {
        text: 'Peripheral cyanosis involving fingertips.',
        normal: false
      },
      {
        text: 'Lower limb varicose veins with mild edema.',
        normal: false
      },
      {
        text: 'Normal peripheral circulation without edema.',
        normal: true
      }
    ];

    const appendageData = [
      {
        text: 'Hair distribution normal. Nails healthy without clubbing.',
        normal: true
      },
      {
        text: 'Digital clubbing noted in both hands.',
        normal: false
      },
      {
        text: 'Brittle nails with longitudinal ridging.',
        normal: false
      },
      {
        text: 'Patchy alopecia over scalp.',
        normal: false
      },
      {
        text: 'Yellow thickened toenails consistent with fungal infection.',
        normal: false
      },
      {
        text: 'Hair and nails appear healthy.',
        normal: true
      }
    ];

    const integrity = this.randomItem(integrityData);
    const vascular = this.randomItem(vascularData);
    const appendage = this.randomItem(appendageData);

    this.skinExaminationForm.patchValue({

      // Skin Integrity
      integrityAssessment: integrity.text,
      iaNormalAbnormal: integrity.normal,

      // Vascular Assessment
      vascularAssessment: vascular.text,
      vaNormalAbnormal: vascular.normal,

      // Hair & Nails
      appendageAssessment: appendage.text,
      aaNormalAbnormal: appendage.normal

    });
  }

  public resetForm(): void {
    this.skinExaminationForm.reset();
    this.skinExaminationForm.patchValue({
      patientId: this.patientId
    })
  }

}
