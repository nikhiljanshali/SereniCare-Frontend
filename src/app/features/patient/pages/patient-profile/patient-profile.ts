import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { IPatientsData, IPastMedicalHistoryDetails, IPastSurgicalHistoryDetails, IVitalsDetails } from '../../../../core/interface/basic.interface';
import { DoctorService } from '../../../../core/services/doctor';
import { FamilyHistoryService } from '../../../../core/services/family-history';
import { FamilyHistoryLineageService } from '../../../../core/services/family-history-lineage';
import { LocationService } from '../../../../core/services/location-service';
import { ModalService } from '../../../../core/services/modal-service';
import { NotificationServices } from '../../../../core/services/notification-services';
import { PastMedicalService } from '../../../../core/services/past-medical';
import { PastSurgicalService } from '../../../../core/services/past-surgical';
import { PatientAllergiesService } from '../../../../core/services/patient-allergies';
import { PatientDrugReactionService } from '../../../../core/services/patient-drug-reaction';
import { PatientRiskService } from '../../../../core/services/patient-risk';
import { PatientService } from '../../../../core/services/patients';
import { StorageOperation } from '../../../../core/services/storage-operation';
import { FamilyHistoryLineage } from '../../../../shared/component/patients/family-history-lineage/family-history-lineage';
import { FamilyHistory } from '../../../../shared/component/patients/family-history/family-history';
import { PatientAllergies } from '../../../../shared/component/patients/patient-allergies/patient-allergies';
import { PatientDrugReaction } from '../../../../shared/component/patients/patient-drug-reaction/patient-drug-reaction';
import { PatientRisk } from '../../../../shared/component/patients/patient-risk/patient-risk';
import { PastSurgical } from '../../../../shared/component/patients/past-surgical/past-surgical';
import { PastMedical } from '../../../../shared/component/patients/past-medical/past-medical';

@Component({
  selector: 'app-patient-profile',
  standalone: false,
  // imports: [],
  templateUrl: './patient-profile.html',
  styleUrl: './patient-profile.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientProfile {
  public activeTab: 'overview' | 'history' | 'timeline' = 'history';

  public patientDetails: IPatientsData | null = null;
  public pastMedicalList: IPastMedicalHistoryDetails[] = [];
  public pastSurgicalList: IPastSurgicalHistoryDetails[] = [];
  public familyHisotyList: any[] = [];
  public patientAllergiesList: any[] = [];
  public patientRiskList: any[] = [];
  public patientDrugReactionList: any[] = [];
  public patientVitalDetails: IVitalsDetails | null = null;
  public familyHistoryLineageList: any[] = [];


  constructor(
    private _patientService: PatientService,
    private _storageOperation: StorageOperation,
    private _locationService: LocationService,
    private _pastMedicalService: PastMedicalService,
    private _pastSurgicalService: PastSurgicalService,
    private _familyHistoryService: FamilyHistoryService,
    private _patientAllergiesService: PatientAllergiesService,
    private _patientRiskService: PatientRiskService,
    private _patientDrugReaction: PatientDrugReactionService,
    private _notificationServices: NotificationServices,
    private _familyHistoryLineageService: FamilyHistoryLineageService,
    private _doctorService: DoctorService,
    private _modalService: ModalService,
    private cdr: ChangeDetectorRef
  ) {
    const storedDoctorDetails = this._storageOperation.get<any>('userDetails');
    const storedUserDetails = this._storageOperation.get<any>('user');
  }

  ngOnInit(): void {
    this.getProfileDetails();
    this.getPatientVitalDetails();
    this.getPastMedicalHistory();
    this.getPastSurgicalHistory();
    this.getFamilyHistory();
    this.getPatientAllergies();
    this.getPatientRisks();
    this.getPatientAdverseDrugReaction();
    this.getFamilyHistoryLineage();
  }

  public changeTab(tab: 'overview' | 'history' | 'timeline'): void {
    this.activeTab = tab;
  }

  private getProfileDetails(): void {
    this._patientService.getPatientById(this._storageOperation.get<any>('userDetails').id).subscribe((res: any) => {
      const patientDeteils = res.data[0]
      this._locationService.getLocationName(Number(patientDeteils.country), Number(patientDeteils.state), Number(patientDeteils.city)).subscribe((location) => {
        patientDeteils.country = location.country;
        patientDeteils.state = location.state;
        patientDeteils.city = location.city;
      });
      this.patientDetails = patientDeteils;
    })
  }

  private getPatientVitalDetails(): void {
    this._doctorService.getVitalsByPatientId(this._storageOperation.get<any>('userDetails').id).subscribe((res: any) => {
      this.patientVitalDetails = res.data?.[0] ?? null;
    })
  }

  private getPastMedicalHistory(): void {
    this._pastMedicalService.getPastMedicalByPatientId(this._storageOperation.get<any>('userDetails').id)
      .subscribe((res: any) => {
        this.pastMedicalList = [...res.data];
        this.cdr.detectChanges(); // ensure OnPush view refreshes once new data arrives
      });
  }

  private getPastSurgicalHistory(): void {
    this._pastSurgicalService.getPastSurgicalByPatientId(this._storageOperation.get<any>('userDetails').id)
      .subscribe((res: any) => {
        this.pastSurgicalList = [...res.data];
        this.cdr.detectChanges();
      });
  }

  private getFamilyHistory(): void {
    this._familyHistoryService.getFamilyHistoryByPatientId(this._storageOperation.get<any>('userDetails').id)
      .subscribe((res: any) => {
        this.familyHisotyList = [...res.data];
        this.cdr.detectChanges();
      });
  }

  private getPatientAllergies(): void {
    this._patientAllergiesService.getPatientAllergiesByPatientId(this._storageOperation.get<any>('userDetails').id)
      .subscribe((res: any) => {
        this.patientAllergiesList = [...res.data];
        this.cdr.detectChanges();
      });
  }

  private getPatientRisks(): void {
    this._patientRiskService.getPatientRiskByPatientId(this._storageOperation.get<any>('userDetails').id)
      .subscribe((res: any) => {
        this.patientRiskList = [...res.data];
        this.cdr.detectChanges();
      });
  }

  private getPatientAdverseDrugReaction(): void {
    this._patientDrugReaction.getPatientDrugReactionByPatientId(this._storageOperation.get<any>('userDetails').id)
      .subscribe((res: any) => {
        this.patientDrugReactionList = [...res.data];
        this.cdr.detectChanges();
      });
  }

  private getFamilyHistoryLineage(): void {
    this._familyHistoryLineageService.getFamilyHistoryLineageByPatientId(this._storageOperation.get<any>('userDetails').id)
      .subscribe((res: any) => {
        this.familyHistoryLineageList = [...res.data];
        this.cdr.detectChanges();
      });
  }

  get totalCoverageAmount(): number {
    if (!this.patientDetails?.insuranceDetails?.length) {
      return 0;
    }

    return this.patientDetails.insuranceDetails.reduce(
      (sum: number, insurance: any) =>
        sum + Number(insurance.coverageAmount || 0),
      0
    );
  }
  get insuranceCompany(): string {
    if (!this.patientDetails?.insuranceDetails?.length) {
      return '';
    }
    return this.patientDetails.insuranceDetails
      .map((insurance: any) => insurance.providerName)
      .filter((name: string) => !!name)
      .join(', ');
  }

  public openMedicalHistoryPopup(): void {
    const modalRef = this._modalService.openComponentModal(PastMedical, {
      class: 'modal-dialog-centered modal-xl',
      backdrop: 'static',
      keyboard: false,
      initialState: {
        hideList: true,
        patientId: this.patientDetails?._id
      }
    });
    modalRef.content.returnResult.subscribe((data: any) => {
      this.getPastMedicalHistory();
    });
  }


  public openFamilyHistory(): void {
    const modalRef = this._modalService.openComponentModal(FamilyHistory, {
      class: 'modal-dialog-centered modal-xl',
      backdrop: 'static',
      keyboard: false,
      initialState: {
        hideList: true,
        patientId: this.patientDetails?._id
      }
    });
    modalRef.content.returnResult.subscribe((data: any) => {
      this.getFamilyHistory();
    });
  }

  get familyHisoty(): string {
    if (!this.patientDetails?.insuranceDetails?.length) {
      return '';
    }
    return this.patientDetails.insuranceDetails
      .map((insurance: any) => insurance.providerName)
      .filter((name: string) => !!name)
      .join(', ');
  }

  public openFamilyHistoryLineage(): void {
    const modalRef = this._modalService.openComponentModal(FamilyHistoryLineage, {
      class: 'modal-dialog-centered modal-xl',
      backdrop: 'static',
      keyboard: false,
      initialState: {
        hideList: true,
        patientId: this.patientDetails?._id
      }
    });
    modalRef.content.returnResult.subscribe((data: any) => {
      this.getFamilyHistoryLineage();
    });
  }



  public openSurgicalHistory(): void {
    const modalRef = this._modalService.openComponentModal(PastSurgical, {
      class: 'modal-dialog-centered modal-xl',
      backdrop: 'static',
      keyboard: false,
      initialState: {
        hideList: true,
        patientId: this.patientDetails?._id
      }
    });
    modalRef.content.returnResult.subscribe((data: any) => {
      this.getPastSurgicalHistory();
    });
  }

  public openAllergiesHistory(): void {
    const modalRef = this._modalService.openComponentModal(PatientAllergies, {
      class: 'modal-dialog-centered modal-xl',
      backdrop: 'static',
      keyboard: false,
      initialState: {
        hideList: true,
        patientId: this.patientDetails?._id
      }
    });
    modalRef.content.returnResult.subscribe((data: any) => {
      this.getPatientAllergies();
    });
  }

  public openRiskFactor(): void {
    const modalRef = this._modalService.openComponentModal(PatientRisk, {
      class: 'modal-dialog-centered modal-xl',
      backdrop: 'static',
      keyboard: false,
      initialState: {
        hideList: true,
        patientId: this.patientDetails?._id
      }
    });
    modalRef.content.returnResult.subscribe((data: any) => {
      this.getPatientRisks();
    });
  }

  public openAdverseDrugRaction(): void {
    const modalRef = this._modalService.openComponentModal(PatientDrugReaction, {
      class: 'modal-dialog-centered modal-xl',
      backdrop: 'static',
      keyboard: false,
      initialState: {
        hideList: true,
        patientId: this.patientDetails?._id
      }
    });
    modalRef.content.returnResult.subscribe((data: any) => {
      this.getPatientAdverseDrugReaction();
    });
  }

  public deleteRecord(record: any, type: string): void {
    if (type == 'pastMedical') {
      this._notificationServices.confirm('Delete Past Medical History', 'Are you sure you want to delete this record?').then((result) => {
        if (result.isConfirmed) {
          this._pastMedicalService.deletePastMedical(record._id).subscribe({
            next: () => this.getPastMedicalHistory(), // refetch is now self-sufficient
            error: (err) => console.error(err)
          });
        }
      });
    } else if (type == 'familyHistory') {
      this._notificationServices.confirm('Delete Family History', 'Are you sure you want to delete this record?').then((result) => {
        if (result.isConfirmed) {
          this._familyHistoryService.deleteFamilyHistory(record._id).subscribe({
            next: () => this.getFamilyHistory(),
            error: (err) => console.error(err)
          });
        }
      });
    } else if (type == 'pastSurgical') {
      this._notificationServices.confirm('Delete Past Surgical History', 'Are you sure you want to delete this record?').then((result) => {
        if (result.isConfirmed) {
          this._pastSurgicalService.deletePastSurgical(record._id).subscribe({
            next: () => this.getPastSurgicalHistory(),
            error: (err: any) => console.error(err)
          });
        }
      });
    } else if (type == 'pastAllergies') {
      this._notificationServices.confirm('Delete Past Allergies', 'Are you sure you want to delete this record?').then((result) => {
        if (result.isConfirmed) {
          this._patientAllergiesService.deletePatientAllergies(record._id).subscribe({
            next: () => this.getPatientAllergies(),
            error: (err: any) => console.error(err)
          });
        }
      });
    } else if (type == 'pastRisk') {
      this._notificationServices.confirm('Delete Past Risk', 'Are you sure you want to delete this record?').then((result) => {
        if (result.isConfirmed) {
          this._patientRiskService.deletePatientRisk(record._id).subscribe({
            next: () => this.getPatientRisks(),
            error: (err: any) => console.error(err)
          });
        }
      });
    } else if (type == 'adverseDrugReaction') {
      this._notificationServices.confirm('Delete Adverse Drug Reaction', 'Are you sure you want to delete this record?').then((result) => {
        if (result.isConfirmed) {
          this._patientDrugReaction.deletePatientDrugReaction(record._id).subscribe({
            next: () => this.getPatientAdverseDrugReaction(),
            error: (err) => console.error(err)
          });
        }
      });
    }
  }

}
