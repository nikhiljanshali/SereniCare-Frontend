import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonMethod } from '../../../../core/services/common-method';
import { LocationService } from '../../../../core/services/location-service';
import { PatientService } from '../../../../core/services/patients';
import { EXAMINATION_MASTER } from '../../../methods/pe-request.method';

@Component({
  selector: 'app-patient-respiratory',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule
  ],
  templateUrl: './patient-respiratory.html',
  styleUrl: './patient-respiratory.css',
})
export class PatientRespiratory {
  @Input() public patientId: string | null = null;
  @Input() public respiratoryForm!: FormGroup;

  public activeTab: number = 1;

  public tabs = [
    { id: 1, title: 'Effort & Chest Expansion' },
    { id: 2, title: 'Lung Auscultation / Breath Sounds' },
  ];

  public respiratoryEffortList = EXAMINATION_MASTER.respiratory.respiratoryEffort.list;
  public respiratoryEffortStatements: Record<string, string> = EXAMINATION_MASTER.respiratory.respiratoryEffort.statements;

  public lungAuscultationList = EXAMINATION_MASTER.respiratory.lungAuscultation.list;
  public lungAuscultationStatements: Record<string, string> = EXAMINATION_MASTER.respiratory.lungAuscultation.statements;
  public Symmetry = EXAMINATION_MASTER.Symmetry;
  public EffertsNormal = EXAMINATION_MASTER.EffertsNormal;
  public IncreaseWorkOfBreathing = EXAMINATION_MASTER.IncreaseWorkOfBreathing;
  public ChestWallAbnormality = EXAMINATION_MASTER.ChestWallAbnormality;
  public AdventitiousSounds = EXAMINATION_MASTER.AdventitiousSounds;
  public AirwayDiminished = EXAMINATION_MASTER.AirwayDiminished;
  public LungNormal = EXAMINATION_MASTER.LungNormal;

  public gradeOptions = EXAMINATION_MASTER.GradeOptions

  private selectedEffortChestExpansion = new Set<string>();
  private selectedLungAuscultation = new Set<string>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _patientService: PatientService,
    public _locationService: LocationService,
    public _commonMethod: CommonMethod
  ) {
  }

  ngOnInit(): void {
    this.initRespiratoryForm();
  }

  public changeTab(id: number) {
    this.activeTab = id;
  }

  private initRespiratoryForm(): void {
    if (this.respiratoryForm.contains('effertsNChestExpansion') && this.respiratoryForm.contains('lungAuscultation')) { return; }

    this.respiratoryForm.addControl('patientId', this.fb.control(this.patientId));

    this.respiratoryForm.addControl('effertsNChestExpansion', this.fb.control('', Validators.required));
    this.respiratoryForm.addControl('eceNormalAbnormal', this.fb.control(null));
    this.respiratoryForm.addControl('respatoryRate', this.fb.control(null));
    this.respiratoryForm.addControl('spo2', this.fb.control(null));
    this.respiratoryForm.addControl('symmetry', this.fb.control(null));
    this.respiratoryForm.addControl('effertsNormal', this.fb.control(null));
    this.respiratoryForm.addControl('effertsFindingNotes', this.fb.control(null));
    this.respiratoryForm.addControl('effertsIncreaseWorkOfBreathing', this.fb.control(null));
    this.respiratoryForm.addControl('chestWallAbnormality', this.fb.control(null));


    this.respiratoryForm.addControl('lungAuscultation', this.fb.control('', Validators.required));
    this.respiratoryForm.addControl('laNormalAbnormal', this.fb.control(null));
    this.respiratoryForm.addControl('lungFindingsNotes', this.fb.control(null));
    this.respiratoryForm.addControl('upperLR', this.fb.control(null));
    this.respiratoryForm.addControl('midLR', this.fb.control(null));
    this.respiratoryForm.addControl('baseLR', this.fb.control(null));
    this.respiratoryForm.addControl('lungNormal', this.fb.control(null));
    this.respiratoryForm.addControl('adventitiousSounds', this.fb.control(null));
    this.respiratoryForm.addControl('airwayDiminished', this.fb.control(null));
  }

  public toggleEffortChestExpansion(item: any): void {
    const phrase = this.respiratoryEffortStatements[item.code];
    if (this.selectedEffortChestExpansion.has(item.code)) {
      this.selectedEffortChestExpansion.delete(item.code);
    } else {
      this.selectedEffortChestExpansion.add(item.code);
    }
    this.updateEffortChestExpansion();
  }

  private updateEffortChestExpansion(): void {
    const statements: string[] = [];
    this.respiratoryEffortList.forEach(item => {
      if (this.selectedEffortChestExpansion.has(item.code)) {
        statements.push(this.respiratoryEffortStatements[item.code]);
      }
    });
    this.respiratoryForm.patchValue({
      effertsNChestExpansion: statements.join(' ')
    }, { emitEvent: false });
  }

  public toggleLungAuscultation(item: any): void {
    const phrase = this.lungAuscultationStatements[item.code];
    if (this.selectedLungAuscultation.has(item.code)) {
      this.selectedLungAuscultation.delete(item.code);
    } else {
      this.selectedLungAuscultation.add(item.code);
    }
    this.updateLungAuscultation();
  }

  private updateLungAuscultation(): void {
    const statements: string[] = [];
    this.lungAuscultationList.forEach(item => {
      if (this.selectedLungAuscultation.has(item.code)) {
        statements.push(this.lungAuscultationStatements[item.code]);
      }
    });
    this.respiratoryForm.patchValue({
      lungAuscultation: statements.join(' ')
    }, { emitEvent: false });
  }


  /**
  * Helper function to change the pulse grade value on click
  */
  public setPulseGrade(controlName: string, gradeValue: number): void {
    this.respiratoryForm.get(controlName)?.setValue(gradeValue);
    this.respiratoryForm.get(controlName)?.markAsDirty();
  }

  public onCheckboxChange(event: Event, controlName: string, value: string): void {
    const control = this.respiratoryForm.get(controlName);
    if (!control) return;

    const values = [...(control.value ?? [])];
    const checked = (event.target as HTMLInputElement).checked;

    checked
      ? !values.includes(value) && values.push(value)
      : values.splice(values.indexOf(value), 1);

    control.setValue(values);
  }

  public isCheckboxSelected(controlName: string, value: string): boolean {
    return this.respiratoryForm.get(controlName)?.value?.includes(value) ?? false;
  }


  private randomItem<T>(items: T[]): T {
    return items[Math.floor(Math.random() * items.length)];
  }

  generateRandomDummyData(): void {
    const effortOptions = [
      { text: 'Normal respiratory effort. Chest expansion symmetrical. No accessory muscle use.', normal: true },
      { text: 'Mild tachypnea with slight use of accessory muscles.', normal: false },
      { text: 'Labored breathing with reduced left chest expansion.', normal: false },
      { text: 'Respiratory effort normal with equal bilateral chest expansion.', normal: true },
      { text: 'Shallow respirations with decreased chest expansion.', normal: false }
    ];
    const lungOptions = [
      { text: 'Breath sounds clear bilaterally. No adventitious sounds.', normal: true },
      { text: 'Fine bibasal crackles heard in both lower lung fields.', normal: false },
      { text: 'Diffuse expiratory wheeze bilaterally.', normal: false },
      { text: 'Reduced air entry over the right lower lobe.', normal: false },
      { text: 'Normal vesicular breath sounds throughout all lung fields.', normal: true },
      { text: 'Scattered rhonchi heard over both lungs.', normal: false }
    ];

    const effort = this.randomItem(effortOptions);
    const lungs = this.randomItem(lungOptions);
    this.respiratoryForm.patchValue({
      effertsNChestExpansion: effort.text,
      eceNormalAbnormal: effort.normal,
      lungAuscultation: lungs.text,
      laNormalAbnormal: lungs.normal
    });
  }

  public resetForm(): void {
    this.respiratoryForm.reset();
    this.respiratoryForm.patchValue({
      patientId: this.patientId
    })
  }

}
