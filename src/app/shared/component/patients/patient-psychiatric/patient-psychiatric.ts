import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonMethod } from '../../../../core/services/common-method';
import { LocationService } from '../../../../core/services/location-service';
import { EXAMINATION_MASTER } from '../../../methods/pe-request.method';

@Component({
  selector: 'app-patient-psychiatric',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule
  ],
  templateUrl: './patient-psychiatric.html',
  styleUrl: './patient-psychiatric.css',
})
export class PatientPsychiatric {

  @Input() public patientId: string | null = null;
  @Input() public psychiatricForm!: FormGroup;

  public tabs = [
    { id: 1, title: 'Integrity & Lesion ' },
    { id: 2, title: 'Vascular & Hemodynamic' },
    { id: 3, title: 'Cognition, Orientation & Judgment' },
    { id: 4, title: 'Targeted Lesion Analysis (ABCDE Derm Tool)' },
  ];
  public activeTab: number = 1;

  public psychTagList = EXAMINATION_MASTER.psychiatric.list;
  public psychStatements: Record<string, string> = EXAMINATION_MASTER.psychiatric.statements;

  public StatedMoodOptions = EXAMINATION_MASTER.StatedMoodOptions;
  public ObservedAffectOptions = EXAMINATION_MASTER.ObservedAffectOptions;

  public SafetyRiskAssessmentOptions = EXAMINATION_MASTER.SafetyRiskAssessmentOptions;

  public OrientationDomainOptions = EXAMINATION_MASTER.OrientationDomainOptions;

  public SafetyPlanOptions = EXAMINATION_MASTER.SafetyPlanOptions;


  constructor(
    private fb: FormBuilder,
    public _locationService: LocationService,
    public _commonMethod: CommonMethod
  ) {
  }

  ngOnInit(): void {
    this.initpsychiatricForm();
  }

  private initpsychiatricForm(): void {
    if (this.psychiatricForm.contains('behaviorAssessment') &&
      this.psychiatricForm.contains('thoughtAssessment') &&
      this.psychiatricForm.contains('cognitionAssessment')) {
      return;
    }
    this.psychiatricForm.addControl('patientId', this.fb.control(this.patientId));

    /* ===========================
       Behavior Assessment
    =========================== */

    this.psychiatricForm.addControl(
      'behaviorAssessment',
      this.fb.control('', Validators.required)
    );

    this.psychiatricForm.addControl(
      'baNormalAbnormal',
      this.fb.control(null)
    );

    this.psychiatricForm.addControl(
      'statedMood',
      this.fb.control('', Validators.required)
    );

    this.psychiatricForm.addControl(
      'observedAffect',
      this.fb.control('', Validators.required)
    );

    /* ===========================
       Thought Assessment
    =========================== */

    this.psychiatricForm.addControl(
      'thoughtAssessment',
      this.fb.control('', Validators.required)
    );

    this.psychiatricForm.addControl(
      'taNormalAbnormal',
      this.fb.control(null)
    );

    this.psychiatricForm.addControl(
      'safetyRiskAssessment',
      this.fb.control([])
    );

    /* ===========================
       Cognition Assessment
    =========================== */

    this.psychiatricForm.addControl(
      'cognitionAssessment',
      this.fb.control('', Validators.required)
    );

    this.psychiatricForm.addControl(
      'caNormalAbnormal',
      this.fb.control(null)
    );

    this.psychiatricForm.addControl(
      'orientationDomains',
      this.fb.control([])
    );

    /* ===========================
       Diagnosis & Safety Plan
    =========================== */

    this.psychiatricForm.addControl(
      'diagnosticImpression',
      this.fb.control('', Validators.required)
    );
    this.psychiatricForm.addControl(
      'immediateDisposition',
      this.fb.control('', Validators.required)
    );

    this.psychiatricForm.addControl(
      'safetyPlan',
      this.fb.control('', Validators.required)
    );
  }

  public changeTab(id: number) {
    this.activeTab = id;
  }

  public onCheckboxChange(event: Event, controlName: string, value: string): void {
    const control = this.psychiatricForm.get(controlName);
    if (!control) return;

    const values = [...(control.value ?? [])];
    const checked = (event.target as HTMLInputElement).checked;

    checked
      ? !values.includes(value) && values.push(value)
      : values.splice(values.indexOf(value), 1);

    control.setValue(values);
  }

  public isCheckboxSelected(controlName: string, value: string): boolean {
    return this.psychiatricForm.get(controlName)?.value?.includes(value) ?? false;
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

    const filteredTags = this.psychTagList.filter(item => item.type === type);

    filteredTags.forEach(item => {
      if (this.selectedTags.has(item.code)) {
        statements.push(this.psychStatements[item.code]);
      }
    });

    const formControlMapping: Record<string, string> = {
      behavior: 'behaviorAssessment',
      thought: 'thoughtAssessment',
      cognition: 'cognitionAssessment',
    };

    const controlName = formControlMapping[type];

    const targetControl = this.psychiatricForm.get(controlName);

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

    const behaviorData = [
      {
        text: 'Well-groomed, calm, cooperative with appropriate affect.',
        normal: true
      },
      {
        text: 'Anxious appearance with restless behavior and poor eye contact.',
        normal: false
      },
      {
        text: 'Flat affect with decreased spontaneous interaction.',
        normal: false
      },
      {
        text: 'Agitated and irritable during examination.',
        normal: false
      },
      {
        text: 'Pleasant, cooperative and appropriately dressed.',
        normal: true
      }
    ];

    const thoughtData = [
      {
        text: 'Thought process logical, coherent and goal-directed. No perceptual disturbances.',
        normal: true
      },
      {
        text: 'Racing thoughts with tangential speech.',
        normal: false
      },
      {
        text: 'Auditory hallucinations reported.',
        normal: false
      },
      {
        text: 'Persecutory delusions with impaired reality testing.',
        normal: false
      },
      {
        text: 'No suicidal or homicidal ideation.',
        normal: true
      }
    ];

    const cognitionData = [
      {
        text: 'Alert and oriented ×3. Memory, attention and judgment intact.',
        normal: true
      },
      {
        text: 'Disoriented to time with impaired short-term memory.',
        normal: false
      },
      {
        text: 'Poor insight and impaired judgment noted.',
        normal: false
      },
      {
        text: 'Difficulty maintaining attention during conversation.',
        normal: false
      },
      {
        text: 'Cognition grossly intact with good insight.',
        normal: true
      }
    ];

    const behavior = this.randomItem(behaviorData);
    const thought = this.randomItem(thoughtData);
    const cognition = this.randomItem(cognitionData);

    this.psychiatricForm.patchValue({

      // Behavior, Appearance & Affect
      behaviorAssessment: behavior.text,
      baNormalAbnormal: behavior.normal,

      // Thought Process & Perception
      thoughtAssessment: thought.text,
      taNormalAbnormal: thought.normal,

      // Cognition, Orientation & Judgment
      cognitionAssessment: cognition.text,
      caNormalAbnormal: cognition.normal

    });
  }

  public resetForm(): void {
    this.psychiatricForm.reset();
    this.psychiatricForm.patchValue({
      patientId: this.patientId
    })
  }
}
