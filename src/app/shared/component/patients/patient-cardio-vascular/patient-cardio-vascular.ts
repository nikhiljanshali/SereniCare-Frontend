import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocationService } from '../../../../core/services/location-service';
import { CommonMethod } from '../../../../core/services/common-method';
import { EXAMINATION_MASTER } from '../../../methods/pe-request.method';

@Component({
  selector: 'app-patient-cardio-vascular',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule
  ],
  templateUrl: './patient-cardio-vascular.html',
  styleUrl: './patient-cardio-vascular.css',
})
export class PatientCardioVascular {
  @Input() public patientId: string | null = null;
  @Input() public cardiovascularForm!: FormGroup;

  public activeTab: number = 1;

  public tabs = [
    { id: 1, title: 'Heart Sounds & Auscultation' },
    { id: 2, title: 'Peripheral Pulses & Perfusion' },
    { id: 3, title: 'Extremities & Dependent Edema Tracking' },
  ];

  public heartSoundsList = EXAMINATION_MASTER.cardiovascular.heartSound.list;
  public heartSoundStatements: Record<string, string> = EXAMINATION_MASTER.cardiovascular.heartSound.statements;

  public pulsesPerfusionList = EXAMINATION_MASTER.cardiovascular.pulsePrefusion.list;
  public pulsesPerfusionStatements: Record<string, string> = EXAMINATION_MASTER.cardiovascular.pulsePrefusion.statements;

  public edemaExtremitiesList = EXAMINATION_MASTER.cardiovascular.edemaExtremities.list;
  public edemaExtremitiesStatements: Record<string, string> = EXAMINATION_MASTER.cardiovascular.edemaExtremities.statements;
  public heartSoundOption = EXAMINATION_MASTER.HeartSoundOption;
  public heartRhythm = EXAMINATION_MASTER.HeartRhythm;
  public heartMurmurs = EXAMINATION_MASTER.HeartMurmurs;
  public CardiovascularSide = EXAMINATION_MASTER.CardiovascularSide;
  public PulseQuality = EXAMINATION_MASTER.PulseQuality;
  public PerfusionFindingsNormal = EXAMINATION_MASTER.PerfusionFindings.filter(x => x.category === 'Normal');
  public PerfusionFindingsAbnormal = EXAMINATION_MASTER.PerfusionFindings.filter(x => x.category === 'Abnormal');
  public PerfusionFindingsOther = EXAMINATION_MASTER.PerfusionFindings.filter(x => x.category === 'Other');
  public EdemaGrades = EXAMINATION_MASTER.EdemaGrades;
  public EdemaLocations = EXAMINATION_MASTER.EdemaLocations;
  public EdemaRiskFindings = EXAMINATION_MASTER.EdemaRiskFindings;
  public gradeOptions = EXAMINATION_MASTER.GradeOptions



  private selectedHeartSounds = new Set<string>();
  private selectedPeripheralPulsesPerfusion = new Set<string>();
  private selectedExtremitiesDependentEdemaTracking = new Set<string>();

  constructor(
    private fb: FormBuilder,
    public _locationService: LocationService,
    public _commonMethod: CommonMethod
  ) {
  }

  ngOnInit(): void {
    this.initCardiovascularForm();
  }

  public changeTab(id: number) {
    this.activeTab = id;
  }

  private initCardiovascularForm(): void {
    if (this.cardiovascularForm.contains('heartSoundAuscultation') && this.cardiovascularForm.contains('peripheralPulsesPerfusion') && this.cardiovascularForm.contains('extremitiesDependentEdemaTracking')) {
      return;
    }
    this.cardiovascularForm.addControl('patientId', this.fb.control(this.patientId));
    // --- Heart Sound Auscultation Section ---
    this.cardiovascularForm.addControl('heartSoundAuscultation', this.fb.control('', Validators.required));
    this.cardiovascularForm.addControl('heartSounds', this.fb.control('', Validators.required));
    this.cardiovascularForm.addControl('heartRhythm', this.fb.control('', Validators.required));
    this.cardiovascularForm.addControl('heartMurmurs', this.fb.control('', Validators.required));
    this.cardiovascularForm.addControl('heartRate', this.fb.control('', Validators.required));
    this.cardiovascularForm.addControl('hsaNormalAbnormal', this.fb.control(null));

    // --- Peripheral Pulses & Perfusion Section ---
    this.cardiovascularForm.addControl('peripheralPulsesPerfusion', this.fb.control('', Validators.required));
    this.cardiovascularForm.addControl('perfusionSide', this.fb.control('', Validators.required));
    this.cardiovascularForm.addControl('perfusionfindingNotes', this.fb.control('', Validators.required));
    this.cardiovascularForm.addControl('pulseQuality', this.fb.control('', Validators.required));
    this.cardiovascularForm.addControl('pppNormalAbnormal', this.fb.control(null));
    this.cardiovascularForm.addControl('pppNormalValue', this.fb.control(''));
    this.cardiovascularForm.addControl('pppAbNormalValue', this.fb.control(''));
    this.cardiovascularForm.addControl('otherFindding', this.fb.control(''));

    // Added: Quick Pulse Grading (0-4+) fields matching the grid columns
    this.cardiovascularForm.addControl('radialPulse', this.fb.control(null, Validators.required));
    this.cardiovascularForm.addControl('dorsalisPedisPulse', this.fb.control(null, Validators.required));
    this.cardiovascularForm.addControl('postTibialPulse', this.fb.control(null, Validators.required));

    // --- Extremities Dependent Edema Tracking Section ---
    this.cardiovascularForm.addControl('extremitiesDependentEdemaTracking', this.fb.control('', Validators.required));
    this.cardiovascularForm.addControl('edetNormalAbnormal', this.fb.control(null));
    this.cardiovascularForm.addControl('edemaSide', this.fb.control('', Validators.required));
    this.cardiovascularForm.addControl('edemafindingNotes', this.fb.control('', Validators.required));
    this.cardiovascularForm.addControl('edemafindingGrade', this.fb.control('', Validators.required));
    this.cardiovascularForm.addControl('edemafindingLocation', this.fb.control('', Validators.required));
    this.cardiovascularForm.addControl('riskFindings', this.fb.control('', Validators.required));
  }


  public toggleHeartSound(item: any): void {
    if (this.selectedHeartSounds.has(item.code)) {
      this.selectedHeartSounds.delete(item.code);
    } else {
      this.selectedHeartSounds.add(item.code);
    }
    this.updateHeartSoundAuscultationText();
  }

  private updateHeartSoundAuscultationText(): void {
    const statements: string[] = [];
    this.heartSoundsList.forEach(item => {
      if (this.selectedHeartSounds.has(item.code)) {
        statements.push(this.heartSoundStatements[item.code]);
      }
    });
    this.cardiovascularForm.patchValue({
      heartSoundAuscultation: statements.join(' ')
    }, { emitEvent: false });
  }

  public togglePeripheralPulsesPerfusion(item: any): void {
    if (this.selectedPeripheralPulsesPerfusion.has(item.code)) {
      this.selectedPeripheralPulsesPerfusion.delete(item.code);
    } else {
      this.selectedPeripheralPulsesPerfusion.add(item.code);
    }
    this.updatePeripheralPulsesPerfusion();
  }

  private updatePeripheralPulsesPerfusion(): void {
    const statements: string[] = [];
    this.pulsesPerfusionList.forEach(item => {
      if (this.selectedPeripheralPulsesPerfusion.has(item.code)) {
        statements.push(this.pulsesPerfusionStatements[item.code]);
      }
    });
    this.cardiovascularForm.patchValue({
      peripheralPulsesPerfusion: statements.join(' ')
    }, { emitEvent: false });
  }

  public toggleExtremitiesDependentEdema(item: any): void {
    if (this.selectedExtremitiesDependentEdemaTracking.has(item.code)) {
      this.selectedExtremitiesDependentEdemaTracking.delete(item.code);
    } else {
      this.selectedExtremitiesDependentEdemaTracking.add(item.code);
    }
    this.updateExtremitiesDependentEdema();
  }

  private updateExtremitiesDependentEdema(): void {
    const statements: string[] = [];
    this.edemaExtremitiesList.forEach(item => {
      if (this.selectedExtremitiesDependentEdemaTracking.has(item.code)) {
        statements.push(this.edemaExtremitiesStatements[item.code]);
      }
    });
    this.cardiovascularForm.patchValue({
      extremitiesDependentEdemaTracking: statements.join(' ')
    }, { emitEvent: false });
  }

  /**
   * Helper function to change the pulse grade value on click
   */
  public setPulseGrade(controlName: string, gradeValue: number): void {
    this.cardiovascularForm.get(controlName)?.setValue(gradeValue);
    this.cardiovascularForm.get(controlName)?.markAsDirty();
  }

  public onCheckboxChange(event: Event, controlName: string, value: string): void {
    const control = this.cardiovascularForm.get(controlName);
    if (!control) return;

    const values = [...(control.value ?? [])];
    const checked = (event.target as HTMLInputElement).checked;

    checked
      ? !values.includes(value) && values.push(value)
      : values.splice(values.indexOf(value), 1);

    control.setValue(values);
  }

  public isCheckboxSelected(controlName: string, value: string): boolean {
    return this.cardiovascularForm.get(controlName)?.value?.includes(value) ?? false;
  }

  private randomItem<T>(items: T[]): T {
    return items[Math.floor(Math.random() * items.length)];
  }

  generateRandomDummyData(): void {
    const heartSounds = [
      { text: 'S1 and S2 normal. Regular rhythm. No murmurs.', normal: true },
      { text: 'Grade II systolic murmur over mitral area.', normal: false },
      { text: 'Irregularly irregular rhythm. Suspected atrial fibrillation.', normal: false },
      { text: 'Normal heart sounds with no added sounds.', normal: true }
    ];
    const pulses = [
      { text: 'Peripheral pulses 2+ bilaterally. Capillary refill <2 seconds.', normal: true },
      { text: 'Weak dorsalis pedis pulse on left foot.', normal: false },
      { text: 'Delayed capillary refill (>3 sec).', normal: false },
      { text: 'Strong peripheral pulses throughout.', normal: true }
    ];
    const edema = [
      { text: 'No edema noted.', normal: true },
      { text: '1+ bilateral ankle edema.', normal: false },
      { text: '2+ pitting edema over both lower limbs.', normal: false },
      { text: 'No cyanosis, clubbing, or edema.', normal: true }
    ];

    const hs = this.randomItem(heartSounds);
    const pp = this.randomItem(pulses);
    const ed = this.randomItem(edema);

    this.cardiovascularForm.patchValue({

      heartSoundAuscultation: hs.text,
      hsaNormalAbnormal: hs.normal,

      peripheralPulsesPerfusion: pp.text,
      pppNormalAbnormal: pp.normal,

      extremitiesDependentEdemaTracking: ed.text,
      edetNormalAbnormal: ed.normal
    });
  }

  public resetForm(): void {
    this.cardiovascularForm.reset();
    this.cardiovascularForm.patchValue({
      patientId: this.patientId
    })
  }
}
