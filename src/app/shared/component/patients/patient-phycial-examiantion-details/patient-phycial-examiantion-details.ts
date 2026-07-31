import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, computed, effect, Input, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EXAMINATION_MASTER } from '../../../methods/pe-request.method';
import { GeneralAppearanceList, IGeneralAppearance, IPatientsData, IPhysicalExamination, IPhysicalExaminationData } from '../../../../core/interface/basic.interface';
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
  pulseGrading = [
    { site: 'Radial', grade: '3+' },
    { site: 'Dorsalis Pedis', grade: '2+' },
    { site: 'Posterior Tibial', grade: '1+' }
  ];


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
}
