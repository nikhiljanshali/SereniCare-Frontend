import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, computed, effect, Input, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EXAMINATION_MASTER } from '../../../methods/pe-request.method';
import { GeneralAppearanceList, IGeneralAppearance, IPatientsData, IPhysicalExamination, IPhysicalExaminationData, LocalizedSigns, SensoryExamination } from '../../../../core/interface/basic.interface';
import { PhysicalExamination } from '../../../../core/services/physical-examination';
import { ApiStateService } from '../../../../core/services/api-state-service';
import { DoctorService } from '../../../../core/services/doctor';
import { PatientDetailHeader } from '../../patient-detail-header/patient-detail-header';

@Component({
  selector: 'app-patient-phycial-examiantion-details',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, PatientDetailHeader
  ],
  templateUrl: './patient-phycial-examiantion-details.html',
  styleUrl: './patient-phycial-examiantion-details.css',
})
export class PatientPhycialExamiantionDetails {

  @Input() public patientId: string | null = null;
  @Input() public patientDetails: IPatientsData | null = null;

  public tabs = [
    { id: 1, title: 'General Survey & Appearance' },
    { id: 2, title: 'Cardiovascular Assessment' },
    { id: 3, title: 'Respiratory / Pulmonary Matrix' },
    { id: 4, title: 'Neurological Status Check' },
    { id: 5, title: 'Gastrointestinal / Abdominal Exam' },
    { id: 6, title: 'Head, Eyes, Ears, Nose & Throat (HEENT)' },
    { id: 7, title: 'Genitourinary (GU) System Exam' },
    { id: 8, title: 'Musculoskeletal Examination' },
    { id: 9, title: 'Skin & Integumentary Examination' },
    { id: 10, title: 'Psychiatric / Mental Status Examination' },
  ];
  public activeTab: number = 1;

  public physicalExaminationReport?: IPhysicalExaminationData;
  public generalAppearance: GeneralAppearanceList[] = [];
  public doctorQualificaion = '';

  public gradeOptions = EXAMINATION_MASTER.GradeOptions;
  private lastPatientId: string | null = null;

  public generalAppearanceList = EXAMINATION_MASTER.generalAppearance.list;
  public GaitPatternList = EXAMINATION_MASTER.GaitPatternList;
  pulseGrading = [
    { site: 'Radial', grade: '3+' },
    { site: 'Dorsalis Pedis', grade: '2+' },
    { site: 'Posterior Tibial', grade: '1+' }
  ];

  activeIndex = signal<number | null>(0);

  public NeurologicalOptions: any[] = [
    { id: 1, title: 'Cranial Nerves' },
    { id: 2, title: 'Mental Status' },
    { id: 3, title: 'Motor Strength' },
    { id: 4, title: 'DTR' },
    { id: 5, title: 'Sensory Exam' },
    { id: 6, title: 'Coordination & Cerebellar' },
  ];

  public GastrointestinalAbdominalExamOptions: any[] = [
    { id: 1, title: 'Percussion & Ascites' },
    { id: 2, title: 'Special Abdominal Signs' },
    { id: 3, title: 'Hernia Assessment' },
    { id: 4, title: 'Surgical Scars' },
    { id: 5, title: 'Anorectal / Rectal Examination' },
  ];

  public HEENTOptions: any[] = [
    { id: 1, title: 'Head' },
    { id: 2, title: 'Eyes' },
    { id: 3, title: 'Ears' },
    { id: 4, title: 'Nose' },
    { id: 5, title: 'Throat' },
  ];
  public GenitourinarySystemExamOptions: any[] = [
    { id: 1, title: ' Urinary System ' },
    { id: 2, title: 'CVA / Kidney ' },
    { id: 3, title: 'Male Reproductive & Genital Assessment ' },
    { id: 4, title: 'Point-of-Care Urinalysis (Dipstick)' },
    { id: 5, title: ' Imaging & Procedures' },
  ];

  public MusculoskeletalExaminationOptions: any[] = [
    { id: 1, title: ' Spine & Axial Skeleton ' },
    { id: 2, title: 'Upper Extremities ' },
    { id: 3, title: 'Lower Extremities ' },
  ];

  public SkinIntegumentaryExaminationOptions: any[] = [
    { id: 1, title: 'Integrity & Lesion ' },
    { id: 2, title: 'Vascular & Hemodynamic' },
    { id: 3, title: 'Appendage (Hair & Nails) ' },
    { id: 4, title: 'Targeted Lesion Analysis (ABCDE Derm Tool)' },
  ];

  public PsychiatricMentalStatusExaminationOptions: any[] = [
    { id: 1, title: 'Integrity & Lesion ' },
    { id: 2, title: 'Vascular & Hemodynamic' },
    { id: 3, title: 'Cognition, Orientation & Judgment' },
    { id: 4, title: 'Targeted Lesion Analysis (ABCDE Derm Tool)' },
  ];


  // Config arrays for rendering options 1-N
  eyeOptions = [1, 2, 3, 4];
  verbalOptions = [1, 2, 3, 4, 5];
  motorOptions = [1, 2, 3, 4, 5, 6];
  strengthOptions = [0, 1, 2, 3, 4, 5];

  // Typing `control` as keyof SensoryExamination restricts keys to exact properties
  sensationTypes: Array<{ label: string; control: keyof SensoryExamination }> = [
    { label: 'Light Touch', control: 'lightTouch' },
    { label: 'Pinprick', control: 'pinprick' },
    { label: 'Vibration', control: 'vibration' },
    { label: 'Proprioception', control: 'proprioception' }
  ];

  sensationStatus = [
    { value: 'I', class: 'status-intact' },
    { value: 'D', class: 'status-decreased' },
    { value: 'A', class: 'status-absent' }
  ];

  public rombergTestOptions = [
    { label: 'Negative', value: 'Negative' },
    { label: 'Positive', value: 'Positive' }
  ];

  public tandemGaitOptions = [
    { label: 'Normal', value: 'Normal' },
    { label: 'Abnormal', value: 'Abnormal' }
  ];

  public sideOptions = [
    { label: 'L', value: 'L' },
    { label: 'R', value: 'R' },
    { label: 'None', value: 'None' }
  ];

  public quadrantPercussionMap = {
    RUQ: 'Tympanic',
    LUQ: 'Tympanic',
    RLQ: 'Tympanic',
    LLQ: 'Tympanic'
  };

  // Key-value pairs for looping
  public quadrantList: Array<{ key: 'RUQ' | 'LUQ' | 'RLQ' | 'LLQ'; label: string }> = [
    { key: 'RUQ', label: 'Right Upper' },
    { key: 'LUQ', label: 'Left Upper' },
    { key: 'RLQ', label: 'Right Lower' },
    { key: 'LLQ', label: 'Left Lower' }
  ];

  signOptions: string[] = ['Negative', 'Positive'];
  localizedSignsList: Array<{ control: keyof LocalizedSigns; label: string }> = [
    { control: 'reboundTenderness', label: 'Rebound Tenderness' },
    { control: 'mcBurneyPointTenderness', label: "McBurney's Point Tenderness" },
    { control: 'murphySign', label: "Murphy's Sign" },
    { control: 'rovsingSign', label: "Rovsing's Sign" },
    { control: 'psoasSign', label: 'Psoas Sign' },
    { control: 'obturatorSign', label: 'Obturator Sign' }
  ];

  herniaTypeList = [
    { control: 'inguinalHernia', label: 'Inguinal Hernia' },
    { control: 'femoralHernia', label: 'Femoral Hernia' },
    { control: 'umbilicalHernia', label: 'Umbilical Hernia' },
    { control: 'incisionalVentralHernia', label: 'Incisional / Ventral Hernia' }
  ];

  herniaSpecificSigns = [
    {
      control: 'coughImpulse',
      label: 'Cough Impulse',
      options: ['Absent', 'Present'],
      normalValue: 'Absent'
    },
    {
      control: 'bowelSoundsatSite',
      label: 'Bowel Sounds at Site',
      options: ['Present', 'Absent'],
      normalValue: 'Present'
    },
    {
      control: 'tenderness',
      label: 'Tenderness',
      options: ['None', 'Mild', 'Severe'],
      normalValue: 'None'
    }
  ];

  scarLocations = [
    { key: 'RUQ', label: 'Right Upper' },
    { key: 'LUQ', label: 'Left Upper' },
    { key: 'RLQ', label: 'Right Lower' },
    { key: 'LLQ', label: 'Left Lower' }
  ];

  public ScarCharacter = EXAMINATION_MASTER.ScarCharacter;

  public rednessOptions = [
    { label: 'None', value: 'None' },
    { label: 'L', value: 'L' },
    { label: 'R', value: 'R' },
    { label: 'Bilateral', value: 'Bilateral' }
  ];
  public NoseEpistaxis = EXAMINATION_MASTER.NoseEpistaxis;

  constructor(
    private _physicalExamination: PhysicalExamination,
    private cdr: ChangeDetectorRef,
    private _apiStateService: ApiStateService,
  ) {
    effect(() => {
      const patient = this._apiStateService.apiData();

      if (!patient || this.lastPatientId === patient._id) {
        return;
      }

      this.lastPatientId = patient._id;
      this.patientDetails = patient;
      this.patientId = patient._id;

      this.getPatientPhysicalExaminationDetails(patient._id);
    });
  }

  ngOnInit(): void {
    // No code required
  }

  public changeTab(id: number) {
    this.activeTab = id;
  }

  public toggle(index: number): void {
    // Toggle off if clicking the already open item, otherwise set new active index
    this.activeIndex.update(current => (current === index ? null : index));
  }

  private getPatientPhysicalExaminationDetails(patientId: string): void {
    console.log(patientId);
    this._physicalExamination.getPhysicalExaminationByPatientId(patientId).subscribe((res: IPhysicalExamination) => {
      this.physicalExaminationReport = res.data[0];
      console.log(this.physicalExaminationReport);
      this.generalAppearance = this.getSelectedGeneralAppearance(
        this.physicalExaminationReport.generalSurvey[0].generalAppearance
      );
      this.doctorQualificaion = this.patientDetails?.doctorDetails.qualifications.map((q: any) => q.name).join(', ');
      this.cdr.markForCheck();
    });
  }

  private getSelectedGeneralAppearance(
    generalAppearance: IGeneralAppearance
  ): GeneralAppearanceList[] {
    return EXAMINATION_MASTER.generalAppearance.list.filter(
      item => generalAppearance[item.code as keyof IGeneralAppearance]
    );
  }

  public getPainScoreStyle(score: number | undefined | null): { [key: string]: string } {
    const value = Math.max(0, Math.min(score ?? 0, 10)); // Limit between 0 and 10
    const percentage = value * 10;

    let color = '#28a745'; // Green

    if (value >= 1 && value <= 3) {
      color = '#28a745'; // Mild
    } else if (value >= 4 && value <= 6) {
      color = '#ffc107'; // Moderate
    } else if (value >= 7) {
      color = '#dc3545'; // Severe
    }

    return {
      background: `conic-gradient(${color} 0 ${percentage}%, #E6EFEC ${percentage}% 100%)`
    };
  }

  isGeneralAppearanceActive(code: string): boolean {
    return !!this.physicalExaminationReport?.generalSurvey?.[0]?.generalAppearance?.[
      code as keyof IGeneralAppearance
    ];
  }

  // Getter for Total GCS Score
  get totalGcsScore(): number {
    const gcs = this.physicalExaminationReport?.neurological?.[0]?.glasgowComaScale?.[0];
    if (!gcs) return 0;
    return (gcs.eyeResponse || 0) + (gcs.verbalResponse || 0) + (gcs.motorResponse || 0);
  }
  // Helper method to safely access values in strict template mode
  getSignValue(controlName: keyof LocalizedSigns): string | undefined {
    const signs = this.physicalExaminationReport?.gastrointestinal?.[0]?.localizedSigns;
    return signs ? signs[controlName] : undefined;
  }

  // Helper method taking string to avoid TypeScript strict index errors
  getHerniaValue(controlName: string): string | undefined {
    const herniaData = this.physicalExaminationReport?.gastrointestinal?.[0]?.herniaTypes;
    return herniaData
      ? (herniaData as unknown as Record<string, string>)[controlName]
      : undefined;
  }

  // Helper method to safely access properties dynamically
  getHerniaSignValue(controlName: string): string | undefined {
    const data = this.physicalExaminationReport?.gastrointestinal?.[0];
    return data
      ? (data as unknown as Record<string, string>)[controlName]
      : undefined;
  }

  // Helper method to safely read boolean scar location values
  getScarLocationValue(key: string): boolean {
    const scarData = this.physicalExaminationReport?.gastrointestinal?.[0]?.scarLocation;
    return scarData
      ? !!(scarData as unknown as Record<string, boolean>)[key]
      : false;
  }

  // Helper method to safely access boolean properties for scar character/quadrants
  isScarCharacterSelected(value: string): boolean {
    const scarData = this.physicalExaminationReport?.gastrointestinal?.[0]?.scarCharacter;
    return scarData
      ? !!(scarData as unknown as Record<string, boolean>)[value]
      : false;
  }
}
