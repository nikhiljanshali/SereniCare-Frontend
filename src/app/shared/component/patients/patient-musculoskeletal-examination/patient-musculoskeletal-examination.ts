import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonMethod } from '../../../../core/services/common-method';
import { LocationService } from '../../../../core/services/location-service';
import { EXAMINATION_MASTER } from '../../../methods/pe-request.method';

@Component({
  selector: 'app-patient-musculoskeletal-examination',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule
  ],
  templateUrl: './patient-musculoskeletal-examination.html',
  styleUrl: './patient-musculoskeletal-examination.css',
})
export class PatientMusculoskeletalExamination {

  @Input() public patientId: string | null = null;
  @Input() public musculoskeletalForm!: FormGroup;
  public tabs = [
    { id: 1, title: ' Spine & Axial Skeleton ' },
    { id: 2, title: 'Upper Extremities ' },
    { id: 3, title: 'Lower Extremities ' },
  ];
  public activeTab: number = 1;

  public mskTagList = EXAMINATION_MASTER.musculoskeletalExamination.list;
  public mskStatements: Record<string, string> = EXAMINATION_MASTER.musculoskeletalExamination.statements;

  public SpineRegionOptions = EXAMINATION_MASTER.SpineRegionOptions;
  public CervicalRomOptions = EXAMINATION_MASTER.CervicalRomOptions;
  public LumbarRomOptions = EXAMINATION_MASTER.LumbarRomOptions;
  public SpineSpecialTestOptions = EXAMINATION_MASTER.SpineSpecialTestOptions;
  public UpperExtremityRegionOptions = EXAMINATION_MASTER.UpperExtremityRegionOptions;
  public RotatorCuffTestOptions = EXAMINATION_MASTER.RotatorCuffTestOptions;
  public ElbowHandNerveTestOptions = EXAMINATION_MASTER.ElbowHandNerveTestOptions;
  public LowerExtremityRegionOptions = EXAMINATION_MASTER.LowerExtremityRegionOptions;
  public KneeInstabilityTestOptions = EXAMINATION_MASTER.KneeInstabilityTestOptions;
  public HipFootVascularTestOptions = EXAMINATION_MASTER.HipFootVascularTestOptions;


  constructor(
    private fb: FormBuilder,
    public _locationService: LocationService,
    public _commonMethod: CommonMethod
  ) {
  }

  ngOnInit(): void {
    this.initMusculoskeletalFormForm();
  }

  private initMusculoskeletalFormForm(): void {
    if (
      this.musculoskeletalForm.contains('spineAssessment') &&
      this.musculoskeletalForm.contains('upperExtremityAssessment') &&
      this.musculoskeletalForm.contains('lowerExtremityAssessment')
    ) {
      return;
    }
    // this.musculoskeletalForm.addControl('patientId', this.fb.control(this.patientId));
    // this.musculoskeletalForm.addControl('spineAssessment', this.fb.control('', Validators.required));
    // this.musculoskeletalForm.addControl('saNormalAbnormal', this.fb.control(null));
    // this.musculoskeletalForm.addControl('upperExtremityAssessment', this.fb.control('', Validators.required));
    // this.musculoskeletalForm.addControl('ueaNormalAbnormal', this.fb.control(null));
    // this.musculoskeletalForm.addControl('lowerExtremityAssessment', this.fb.control('', Validators.required));
    // this.musculoskeletalForm.addControl('leaNormalAbnormal', this.fb.control(null));
    this.musculoskeletalForm.addControl('patientId', this.fb.control(this.patientId));

    /* ===========================
       Spine Assessment
    =========================== */
    this.musculoskeletalForm.addControl(
      'spineAssessment',
      this.fb.control('', Validators.required)
    );

    this.musculoskeletalForm.addControl(
      'saNormalAbnormal',
      this.fb.control(null)
    );

    this.musculoskeletalForm.addControl(
      'regionsExamined',
      this.fb.control([])
    );

    this.musculoskeletalForm.addControl(
      'cervicalMotion',
      this.fb.control('', Validators.required)
    );

    this.musculoskeletalForm.addControl(
      'lumbarMotion',
      this.fb.control('', Validators.required)
    );

    this.musculoskeletalForm.addControl(
      'specialTest',
      this.fb.control('', Validators.required)
    );

    /* ===========================
       Upper Extremity Assessment
    =========================== */
    this.musculoskeletalForm.addControl(
      'upperExtremityAssessment',
      this.fb.control('', Validators.required)
    );

    this.musculoskeletalForm.addControl(
      'ueaNormalAbnormal',
      this.fb.control(null)
    );

    this.musculoskeletalForm.addControl(
      'upperJointsRegionsExamined',
      this.fb.control([])
    );

    this.musculoskeletalForm.addControl(
      'rotatorCuffShoulderProvocative',
      this.fb.control([])
    );

    this.musculoskeletalForm.addControl(
      'elbowHandNerveTests',
      this.fb.control([])
    );

    /* ===========================
       Lower Extremity Assessment
    =========================== */
    this.musculoskeletalForm.addControl(
      'lowerExtremityAssessment',
      this.fb.control('', Validators.required)
    );

    this.musculoskeletalForm.addControl(
      'leaNormalAbnormal',
      this.fb.control(null)
    );

    this.musculoskeletalForm.addControl(
      'lowerJointsRegionsExamined',
      this.fb.control([])
    );

    this.musculoskeletalForm.addControl(
      'kneeInstabilityMeniscalTests',
      this.fb.control([])
    );

    this.musculoskeletalForm.addControl(
      'hipFootVascularTests',
      this.fb.control([])
    );
  }

  public changeTab(id: number) {
    this.activeTab = id;
  }

  public onCheckboxChange(event: Event, controlName: string, value: string): void {
    const control = this.musculoskeletalForm.get(controlName);
    if (!control) return;

    const values = [...(control.value ?? [])];
    const checked = (event.target as HTMLInputElement).checked;

    checked
      ? !values.includes(value) && values.push(value)
      : values.splice(values.indexOf(value), 1);

    control.setValue(values);
  }

  public isCheckboxSelected(controlName: string, value: string): boolean {
    return this.musculoskeletalForm.get(controlName)?.value?.includes(value) ?? false;
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

    const filteredTags = this.mskTagList.filter(item => item.type === type);

    filteredTags.forEach(item => {
      if (this.selectedTags.has(item.code)) {
        statements.push(this.mskStatements[item.code]);
      }
    });

    const formControlMapping: Record<string, string> = {
      spine: 'spineAssessment',
      upper: 'upperExtremityAssessment',
      lower: 'lowerExtremityAssessment',
    };

    const controlName = formControlMapping[type];

    const targetControl = this.musculoskeletalForm.get(controlName);

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

    const spineData = [
      {
        text: 'Spine aligned with normal curvature. No tenderness. Full painless range of motion.',
        normal: true
      },
      {
        text: 'Lumbar paraspinal muscle spasm with localized tenderness.',
        normal: false
      },
      {
        text: 'Thoracic kyphosis with restricted spinal movements.',
        normal: false
      },
      {
        text: 'Mild scoliosis noted with reduced lateral flexion.',
        normal: false
      },
      {
        text: 'No spinal deformity or tenderness.',
        normal: true
      }
    ];

    const upperData = [
      {
        text: 'Upper extremities with full range of motion and normal muscle strength.',
        normal: true
      },
      {
        text: 'Painful right shoulder abduction with restricted movement.',
        normal: false
      },
      {
        text: 'Swelling and tenderness over the left wrist.',
        normal: false
      },
      {
        text: 'Bilateral hand deformities consistent with osteoarthritis.',
        normal: false
      },
      {
        text: 'No joint swelling or tenderness.',
        normal: true
      }
    ];

    const lowerData = [
      {
        text: 'Lower extremities with full range of motion. Normal gait and muscle strength.',
        normal: true
      },
      {
        text: 'Right knee swelling with painful flexion.',
        normal: false
      },
      {
        text: 'Left ankle tenderness with mild edema.',
        normal: false
      },
      {
        text: 'Antalgic gait due to left hip pain.',
        normal: false
      },
      {
        text: 'No lower limb deformity or instability.',
        normal: true
      }
    ];

    const spine = this.randomItem(spineData);
    const upper = this.randomItem(upperData);
    const lower = this.randomItem(lowerData);

    this.musculoskeletalForm.patchValue({

      // Spine
      spineAssessment: spine.text,
      saNormalAbnormal: spine.normal,

      // Upper Extremities
      upperExtremityAssessment: upper.text,
      ueaNormalAbnormal: upper.normal,

      // Lower Extremities
      lowerExtremityAssessment: lower.text,
      leaNormalAbnormal: lower.normal

    });

  }

  public resetForm(): void {
    this.musculoskeletalForm.reset();
    this.musculoskeletalForm.patchValue({
      patientId: this.patientId
    })
  }
}
