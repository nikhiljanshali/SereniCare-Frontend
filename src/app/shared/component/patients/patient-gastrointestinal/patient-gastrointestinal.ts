import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonMethod } from '../../../../core/services/common-method';
import { LocationService } from '../../../../core/services/location-service';
import { EXAMINATION_MASTER } from '../../../methods/pe-request.method';

@Component({
  selector: 'app-patient-gastrointestinal',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule
  ],
  templateUrl: './patient-gastrointestinal.html',
  styleUrl: './patient-gastrointestinal.css',
})
export class PatientGastrointestinal {
  @Input() public patientId: string | null = null;
  @Input() public gastrointestinalForm!: FormGroup;

  public tabs = [
    { id: 1, title: 'Percussion & Ascites' },
    { id: 2, title: 'Special Abdominal Signs' },
    { id: 3, title: 'Hernia Assessment' },
    { id: 4, title: 'Surgical Scars' },
    { id: 5, title: 'Anorectal / Rectal Examination' },
  ];
  public activeTab: number = 1;

  public percussionAscitesTagList = EXAMINATION_MASTER.gastrointestinal.percussionAscites.list;
  public percussionAscitesStatements: Record<string, string> = EXAMINATION_MASTER.gastrointestinal.percussionAscites.statements;
  public specialAbdominalSignsTagList = EXAMINATION_MASTER.gastrointestinal.specialAbdominalSigns.list;
  public specialAbdominalSignsStatements: Record<string, string> = EXAMINATION_MASTER.gastrointestinal.specialAbdominalSigns.statements;

  public herniaSurgicalScarsTagList = EXAMINATION_MASTER.gastrointestinal.herniaSurgicalScars.list;
  public herniaSurgicalScarsStatements: Record<string, string> = EXAMINATION_MASTER.gastrointestinal.herniaSurgicalScars.statements;

  public anorectalRectalExaminationTagList = EXAMINATION_MASTER.gastrointestinal.anorectalRectalExamination.list;
  public anorectalRectalExaminationStatements: Record<string, string> = EXAMINATION_MASTER.gastrointestinal.anorectalRectalExamination.statements;

  public AscitesSigns = EXAMINATION_MASTER.AscitesSigns;
  public OtherFindings = EXAMINATION_MASTER.OtherFindings;
  public ScarCharacter = EXAMINATION_MASTER.ScarCharacter;
  public WoundConcerns = EXAMINATION_MASTER.WoundConcerns;
  public ExternalInspection = EXAMINATION_MASTER.ExternalInspection;
  public DreFindings = EXAMINATION_MASTER.DreFindings;
  public ProstateFindings = EXAMINATION_MASTER.ProstateFindings;

  public localizedSignsList = [
    { label: 'Rebound Tenderness', control: 'reboundTenderness' },
    { label: 'McBurney Point Tenderness', control: 'mcBurneyPointTenderness' },
    { label: 'Murphy Sign', control: 'murphySign' },
    { label: 'Rovsing Sign', control: 'rovsingSign' },
    { label: 'Psoas Sign', control: 'psoasSign' },
    { label: 'Obturator Sign', control: 'obturatorSign' }
  ];
  public herniaTypeList = [
    { label: 'Inguinal Hernia', control: 'inguinalHernia' },
    { label: 'Femoral Hernia', control: 'femoralHernia' },
    { label: 'Umbilical Hernia', control: 'umbilicalHernia' },
    { label: 'Incisional / Ventral Hernia', control: 'incisionalVentralHernia' },
  ];
  public signOptions = ['Negative', 'Positive'];
  public herniaSpecificSigns = [
    { label: 'Cough Impulse', control: 'coughImpulse', options: ['Absent', 'Present'], normalValue: 'Absent' },
    { label: 'Bowel Sounds at Site', control: 'bowelSoundsatSite', options: ['Absent', 'Present'], normalValue: 'Present' },
    { label: 'Tenderness', control: 'tenderness', options: ['None', 'Present'], normalValue: 'None' }
  ];
  public scarLocations = [
    { key: 'RUQ', label: 'Right Upper' },
    { key: 'LUQ', label: 'Left Upper' },
    { key: 'RLQ', label: 'Right Lower' },
    { key: 'LLQ', label: 'Left Lower' }
  ];
  public anorectalRectalExamination = {
    sphincterTone: [
      { id: 1, label: 'Absent', value: 'Absent' },
      { id: 2, label: 'Decreased', value: 'Decreased' },
      { id: 3, label: 'Normal', value: 'Normal' },
      { id: 4, label: 'Increased', value: 'Increased' }
    ]
  };
  public bloodSections = [
    {
      label: 'Gross Blood',
      control: 'grossBlood',
      normalValue: 'Absent',
      options: ['Absent', 'Present']
    },
    {
      label: 'Occult Blood Test',
      control: 'occultBloodTest',
      normalValue: 'Negative',
      options: ['Negative', 'Positive']
    }
  ];
  public selectedMode: 'deferred' | 'normal' | null = null;

  constructor(
    private fb: FormBuilder,
    public _locationService: LocationService,
    public _commonMethod: CommonMethod
  ) {
  }

  ngOnInit(): void {
    this.selectedMode = 'normal';
    this.initGastrointestinal();
  }

  private initGastrointestinal(): void {
    if (
      this.gastrointestinalForm.contains('percussionAscitesAssessment') &&
      this.gastrointestinalForm.contains('specialAbdominalSigns') &&
      this.gastrointestinalForm.contains('herniaSurgicalScars') &&
      this.gastrointestinalForm.contains('anorectalRectalExamination')
    ) { return; }

    this.gastrointestinalForm.addControl('patientId', this.fb.control(this.patientId));

    this.gastrointestinalForm.addControl('ppaNoFinding', this.fb.control(false));
    this.gastrointestinalForm.addControl('ppaAllNormal', this.fb.control('', Validators.required));
    this.gastrointestinalForm.addControl('percussionAscitesAssessment', this.fb.control('', Validators.required));
    this.gastrointestinalForm.addControl('paaNormalAbnormal', this.fb.control(null));
    // Quadrant Percussion Map
    this.gastrointestinalForm.addControl(
      'quadrantPercussionMap',
      this.fb.group({
        RUQ: this.fb.control('Tympanic'),
        LUQ: this.fb.control('Tympanic'),
        RLQ: this.fb.control('Tympanic'),
        LLQ: this.fb.control('Tympanic')
      })
    );

    // Findings Notes
    this.gastrointestinalForm.addControl('findingsNotes', this.fb.control(''));
    // Ascites Signs (Multiple Selection)
    this.gastrointestinalForm.addControl('ascitesSigns', this.fb.control([]));
    // Other Findings (Multiple Selection)
    this.gastrointestinalForm.addControl('otherFindings', this.fb.control([]));


    this.gastrointestinalForm.addControl('ssNoFinding', this.fb.control(false));
    this.gastrointestinalForm.addControl('specialAbdominalSigns', this.fb.control('', Validators.required));
    this.gastrointestinalForm.addControl('sasNormalAbnormal', this.fb.control(null));
    this.gastrointestinalForm.addControl('ssFindingNotes', this.fb.control(null));
    // Localized Signs
    this.gastrointestinalForm.addControl(
      'localizedSigns',
      this.fb.group({
        reboundTenderness: this.fb.control('Negative'),
        mcBurneyPointTenderness: this.fb.control('Negative'),
        murphySign: this.fb.control('Negative'),
        rovsingSign: this.fb.control('Negative'),
        psoasSign: this.fb.control('Negative'),
        obturatorSign: this.fb.control('Negative')
      })
    );
    this.gastrointestinalForm.addControl('peritonealFindings', this.fb.control(null));

    this.gastrointestinalForm.addControl('hssNoFinding', this.fb.control(false));
    this.gastrointestinalForm.addControl('herniaSurgicalScars', this.fb.control('', Validators.required));
    this.gastrointestinalForm.addControl('hssNormalAbnormal', this.fb.control(null));
    this.gastrointestinalForm.addControl(
      'herniaTypes',
      this.fb.group({
        inguinalHernia: this.fb.control('Negative'),
        femoralHernia: this.fb.control('Negative'),
        umbilicalHernia: this.fb.control('Negative'),
        incisionalVentralHernia: this.fb.control('Negative'),
      })
    );
    this.gastrointestinalForm.addControl('coughImpulse', this.fb.control('Absent'));
    this.gastrointestinalForm.addControl('bowelSoundsatSite', this.fb.control('Absent'));
    this.gastrointestinalForm.addControl('tenderness', this.fb.control('Absent'));
    this.gastrointestinalForm.addControl('hssFindingNotes', this.fb.control(null));

    this.gastrointestinalForm.addControl('scarNoFinding', this.fb.control(false));
    this.gastrointestinalForm.addControl(
      'scarLocation',
      this.fb.group({
        RUQ: this.fb.control(false),
        LUQ: this.fb.control(false),
        RLQ: this.fb.control(false),
        LLQ: this.fb.control(false)
      })
    );
    this.gastrointestinalForm.addControl('scarCharacter', this.fb.control([]));
    this.gastrointestinalForm.addControl('woundConcerns', this.fb.control([]));
    this.gastrointestinalForm.addControl('scarFindingsNotes', this.fb.control(''));

    // this.gastrointestinalForm.addControl('anorectalRectalExamination', this.fb.control('', Validators.required));
    // this.gastrointestinalForm.addControl('areNormalAbnormal', this.fb.control(null));
    // Anorectal / Rectal Examination
    this.gastrointestinalForm.addControl('anorectalRectalExamination', this.fb.control('', Validators.required));
    this.gastrointestinalForm.addControl('areNormalAbnormal', this.fb.control(null));
    this.gastrointestinalForm.addControl('areDifferedNormal', this.fb.control(null));
    this.gastrointestinalForm.addControl('sphincterTone', this.fb.control('Normal'));
    this.gastrointestinalForm.addControl('grossBlood', this.fb.control('Absent'));
    this.gastrointestinalForm.addControl('occultBloodTest', this.fb.control('Negative'));
    this.gastrointestinalForm.addControl('externalInspection', this.fb.control([]));
    this.gastrointestinalForm.addControl('dreFindings', this.fb.control([]));
    this.gastrointestinalForm.addControl('prostateFindings', this.fb.control([]));
    this.gastrointestinalForm.addControl('areFindingsNotes', this.fb.control(''));
    this.gastrointestinalForm.addControl('reasonforDeferral', this.fb.control(''));
  }

  public changeTab(id: number) {
    this.activeTab = id;
  }


  public onCheckboxChange(event: Event, controlName: string, value: string): void {
    const control = this.gastrointestinalForm.get(controlName);
    if (!control) return;

    const values = [...(control.value ?? [])];
    const checked = (event.target as HTMLInputElement).checked;

    checked
      ? !values.includes(value) && values.push(value)
      : values.splice(values.indexOf(value), 1);

    control.setValue(values);
  }

  public isCheckboxSelected(controlName: string, value: string): boolean {
    return this.gastrointestinalForm.get(controlName)?.value?.includes(value) ?? false;
  }

  get showAscitesBanner(): boolean {
    const selected: string[] =
      this.gastrointestinalForm.get('ascitesSigns')?.value || [];

    return (
      selected.includes('Positive Fluid Wave') ||
      selected.includes('Generalized Dullness')
    );
  }

  public noFindingControl = 'ssNoFinding';
  public toggleNoFinding(controlName: string): void {
    const control = this.gastrointestinalForm.get(controlName);
    if (control) {
      control.setValue(!control.value);
    }
  }

  public selectedPercussionAscitesAssessment = new Set<string>();
  public togglePercussionAscitesAssessment(item: any): void {
    if (this.selectedPercussionAscitesAssessment.has(item.code)) {
      this.selectedPercussionAscitesAssessment.delete(item.code);
    } else {
      this.selectedPercussionAscitesAssessment.add(item.code);
    }
    this.updatePercussionAscitesAssessment();
  }

  private updatePercussionAscitesAssessment(): void {
    const statements: string[] = [];
    this.percussionAscitesTagList.forEach(item => {
      if (this.selectedPercussionAscitesAssessment.has(item.code)) {
        statements.push(this.percussionAscitesStatements[item.code]);
      }
    });
    this.gastrointestinalForm.patchValue({
      percussionAscitesAssessment: statements.join(' ')
    }, { emitEvent: false });
  }

  public selectedSpecialAbdominalSigns = new Set<string>();
  public toggleSpecialAbdominalSigns(item: any): void {
    if (this.selectedSpecialAbdominalSigns.has(item.code)) {
      this.selectedSpecialAbdominalSigns.delete(item.code);
    } else {
      this.selectedSpecialAbdominalSigns.add(item.code);
    }
    this.updateCoordinationCerebellarFunction();
  }

  private updateCoordinationCerebellarFunction(): void {
    const statements: string[] = [];
    this.specialAbdominalSignsTagList.forEach(item => {
      if (this.selectedSpecialAbdominalSigns.has(item.code)) {
        statements.push(this.specialAbdominalSignsStatements[item.code]);
      }
    });
    this.gastrointestinalForm.patchValue({
      specialAbdominalSigns: statements.join(' ')
    }, { emitEvent: false });
  }


  public selectedHerniaSurgicalScarsAssessment = new Set<string>();
  public toggleHerniaSurgicalScarsAssessment(item: any): void {
    if (this.selectedHerniaSurgicalScarsAssessment.has(item.code)) {
      this.selectedHerniaSurgicalScarsAssessment.delete(item.code);
    } else {
      this.selectedHerniaSurgicalScarsAssessment.add(item.code);
    }
    this.updateHerniaSurgicalScarsAssessment();
  }

  private updateHerniaSurgicalScarsAssessment(): void {
    const statements: string[] = [];
    this.herniaSurgicalScarsTagList.forEach(item => {
      if (this.selectedHerniaSurgicalScarsAssessment.has(item.code)) {
        statements.push(this.herniaSurgicalScarsStatements[item.code]);
      }
    });
    this.gastrointestinalForm.patchValue({
      herniaSurgicalScars: statements.join(' ')
    }, { emitEvent: false });
  }


  public selectedAnorectalRectalExaminationAssessment = new Set<string>();
  public toggleAnorectalRectalExamination(item: any): void {
    if (this.selectedAnorectalRectalExaminationAssessment.has(item.code)) {
      this.selectedAnorectalRectalExaminationAssessment.delete(item.code);
    } else {
      this.selectedAnorectalRectalExaminationAssessment.add(item.code);
    }
    this.updateAnorectalRectalExamination();
  }

  private updateAnorectalRectalExamination(): void {
    const statements: string[] = [];
    this.anorectalRectalExaminationTagList.forEach(item => {
      if (this.selectedAnorectalRectalExaminationAssessment.has(item.code)) {
        statements.push(this.anorectalRectalExaminationStatements[item.code]);
      }
    });
    this.gastrointestinalForm.patchValue({
      anorectalRectalExamination: statements.join(' ')
    }, { emitEvent: false });
  }


  public setMode(mode: 'deferred' | 'normal'): void {
    this.selectedMode = mode;
    // Patch the specific control directly
    this.gastrointestinalForm.get('areDifferedNormal')?.patchValue(mode);
  }



  private randomItem<T>(items: T[]): T {
    return items[Math.floor(Math.random() * items.length)];
  }

  generateRandomDummyData(): void {

    const percussionOptions = [
      {
        text: 'Abdomen tympanic on percussion. No evidence of ascites or shifting dullness.',
        normal: true
      },
      {
        text: 'Positive shifting dullness suggestive of moderate ascites.',
        normal: false
      },
      {
        text: 'Fluid thrill present with generalized abdominal distension.',
        normal: false
      },
      {
        text: 'Normal percussion note throughout abdomen.',
        normal: true
      },
      {
        text: 'Localized dullness over right lower quadrant.',
        normal: false
      }
    ];

    const abdominalSigns = [
      {
        text: 'Murphy, McBurney, Rovsing, Psoas and Obturator signs negative.',
        normal: true
      },
      {
        text: 'Murphy sign positive indicating possible acute cholecystitis.',
        normal: false
      },
      {
        text: 'McBurney tenderness with positive Rovsing sign.',
        normal: false
      },
      {
        text: 'Rebound tenderness and guarding present.',
        normal: false
      },
      {
        text: 'No localized abdominal signs elicited.',
        normal: true
      }
    ];

    const percussion = this.randomItem(percussionOptions);
    const signs = this.randomItem(abdominalSigns);

    this.gastrointestinalForm.patchValue({

      percussionAscitesAssessment: percussion.text,
      paaNormalAbnormal: percussion.normal,

      specialAbdominalSigns: signs.text,
      sasNormalAbnormal: signs.normal

    });

  }

  public resetForm(): void {
    this.gastrointestinalForm.reset();
    this.gastrointestinalForm.patchValue({
      patientId: this.patientId
    })
  }
}
