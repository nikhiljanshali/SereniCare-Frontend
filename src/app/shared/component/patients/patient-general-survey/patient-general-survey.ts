import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocationService } from '../../../../core/services/location-service';
import { CommonMethod } from '../../../../core/services/common-method';
import { EXAMINATION_MASTER } from '../../../methods/pe-request.method';

@Component({
  selector: 'app-patient-general-survey',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
  ],
  templateUrl: './patient-general-survey.html',
  styleUrl: './patient-general-survey.css',
})
export class PatientGeneralSurvey {
  @Input() public patientId: string | null = null;

  public generalAppearanceList = EXAMINATION_MASTER.generalAppearance.list;
  public medicalPhrases: { [key: string]: string } = EXAMINATION_MASTER.generalAppearance.statements;
  public Consciousness = EXAMINATION_MASTER.Consciousness;
  public Orientation = EXAMINATION_MASTER.Orientation;
  public NutritionalStatusOptions = EXAMINATION_MASTER.NutritionalStatusOptions;
  public HydrationStatusOptions = EXAMINATION_MASTER.HydrationStatusOptions;
  public MobilityOptions = EXAMINATION_MASTER.MobilityOptions
  public GaitOptions = EXAMINATION_MASTER.GaitOptions;
  public painCharacterOptions = EXAMINATION_MASTER.PainCharacterOptions;
  public painScoreOptions = EXAMINATION_MASTER.PainScoreOptions;
  public DistressLevelOptions = EXAMINATION_MASTER.DistressLevelOptions;
  public HygieneGroomingOptions = EXAMINATION_MASTER.HygieneGroomingOptions;
  public SpeechOptions = EXAMINATION_MASTER.SpeechOptions;
  public MoodBehaviorOptions = EXAMINATION_MASTER.MoodBehaviorOptions;
  public SkinColorPerfusionOptions = EXAMINATION_MASTER.SkinColorPerfusionOptions;

  @Input({ required: true }) public generalSurveyForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public _locationService: LocationService,
    public _commonMethod: CommonMethod
  ) {
  }

  ngOnInit(): void {
    this.initGeneralSurveyForm();
  }

  private initGeneralSurveyForm(): void {
    this._commonMethod.addControlIfNotExists(this.generalSurveyForm, 'patientId', this.fb.control(this.patientId));
    this._commonMethod.addControlIfNotExists(this.generalSurveyForm, 'constitutionalState', this.fb.control('', Validators.required));
    this._commonMethod.addControlIfNotExists(this.generalSurveyForm, 'generalAppearance', this.fb.group({
      NORMAL: [false],
      ILL_LOOKING: [false],
      TOXIC_LOOKING: [false],
      DISTRESSED: [false],
      UNCONSCIOUS: [false],
      ALERT: [false],
      ALERT_ORIENTED: [false],
      DROWSY: [false],
      LETHARGIC: [false],
      RESTLESS: [false],
      AGITATED: [false],
      CONFUSED: [false],
      DEHYDRATED: [false],
      WELL_HYDRATED: [false],
      PALE: [false],
      CYANOSED: [false],
      JAUNDICED: [false],
      CACHECTIC: [false],
      OBESE: [false],
      UNDERWEIGHT: [false],
      WELL_NOURISHED: [false],
      MALNOURISHED: [false],
      FEBRILE: [false],
      DIAPHORETIC: [false],
      COMFORTABLE: [false],
      IN_PAIN: [false]
    }));

    this._commonMethod.addControlIfNotExists(this.generalSurveyForm, 'consciousness', this.fb.control('', Validators.required));
    this._commonMethod.addControlIfNotExists(this.generalSurveyForm, 'orientation', this.fb.control('', Validators.required));
    this._commonMethod.addControlIfNotExists(this.generalSurveyForm, 'nutritionalStatus', this.fb.control('', Validators.required));

    this._commonMethod.addControlIfNotExists(this.generalSurveyForm, 'hydrationStatus', this.fb.control('', Validators.required));
    this._commonMethod.addControlIfNotExists(this.generalSurveyForm, 'mobility', this.fb.control('', Validators.required));
    this._commonMethod.addControlIfNotExists(this.generalSurveyForm, 'gait', this.fb.control('', Validators.required));

    this._commonMethod.addControlIfNotExists(this.generalSurveyForm, 'distressLevel', this.fb.control('', Validators.required));
    this._commonMethod.addControlIfNotExists(this.generalSurveyForm, 'hygiene', this.fb.control('', Validators.required));
    this._commonMethod.addControlIfNotExists(this.generalSurveyForm, 'speech', this.fb.control('', Validators.required));

    this._commonMethod.addControlIfNotExists(this.generalSurveyForm, 'painLevel', this.fb.group({
      score: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
      location: ['', Validators.required],
      character: ['', Validators.required]
    }));
    this._commonMethod.addControlIfNotExists(this.generalSurveyForm, 'moodBehavior', this.fb.control('', Validators.required));
    this._commonMethod.addControlIfNotExists(this.generalSurveyForm, 'perfusion', this.fb.control('', Validators.required));

    this._commonMethod.addControlIfNotExists(this.generalSurveyForm, 'notes', this.fb.control('', Validators.required));
    this.generalSurveyForm.get('generalAppearance')?.valueChanges.subscribe(() => {
      this.updateDistressText();
    });
  }

  private updateDistressText(): void {
    const appearance = this.generalSurveyForm.get('generalAppearance')?.value;
    const statements: string[] = [];
    this.generalAppearanceList.forEach(item => {
      if (appearance[item.code]) {
        statements.push(this.medicalPhrases[item.code]);
      }
    });
    this.generalSurveyForm.patchValue({
      constitutionalState: statements.join(' ')
    }, {
      emitEvent: false
    });
  }

  private randomItem<T>(items: T[]): T {
    return items[Math.floor(Math.random() * items.length)];
  }

  generateRandomDummyData(): void {
    const painLocations = ['Head', 'Neck', 'Shoulder', 'Chest', 'Abdomen', 'Lower Back', 'Right Knee', 'Left Ankle'];
    const notes = ['Patient resting comfortably.', 'Continue observation.', 'Advise oral hydration.', 'Follow-up in 24 hours.', 'Monitor vital signs closely.'];

    this.generalSurveyForm.patchValue({
      constitutionalState: 'Patient appears stable and cooperative during examination.',
      consciousness: this.randomItem(this.Consciousness.map(x => x.value)),
      orientation: this.randomItem(this.Orientation.map(x => x.value)),
      nutritionalStatus: this.randomItem(this.NutritionalStatusOptions.map(x => x.value)),
      hydrationStatus: this.randomItem(this.HydrationStatusOptions.map(x => x.value)),
      mobility: this.randomItem(this.MobilityOptions.map(x => x.value)),
      gait: this.randomItem(this.GaitOptions.map(x => x.value)),
      distressLevel: this.randomItem(this.DistressLevelOptions.map(x => x.value)),
      hygiene: this.randomItem(this.HygieneGroomingOptions.map(x => x.value)),
      speech: this.randomItem(this.SpeechOptions.map(x => x.value)),
      moodBehavior: this.randomItem(this.MoodBehaviorOptions.map(x => x.value)),
      perfusion: this.randomItem(this.SkinColorPerfusionOptions.map(x => x.value)),

      painLevel: {
        score: Math.floor(Math.random() * 10) + 1,
        location: this.randomItem(painLocations),
        character: this.randomItem(this.painCharacterOptions.map(x => x.value))
      },

      notes: this.randomItem(notes)
    });

    const appearance = this.generalSurveyForm.get('generalAppearance');

    if (appearance) {
      Object.keys(appearance.value).forEach(key => {
        appearance.get(key)?.setValue(Math.random() > 0.75);
      });
    }
  }

  public resetForm(): void {
    this.generalSurveyForm.reset();
    this.generalSurveyForm.patchValue({
      patientId: this.patientId
    })
  }
}
