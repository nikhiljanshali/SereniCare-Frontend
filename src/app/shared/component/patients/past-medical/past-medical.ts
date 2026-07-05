import { IMedicineDetails, IDiseasesData, IDiseases, DoctorId, IDoctors, IDoctorsData, IPastMedicalHistoryDetails } from '../../../../core/interface/basic.interface';
import { Component, EventEmitter, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicineService } from '../../../../core/services/medicine-services';
import { IMedicine } from '../../../../core/interface/basic.interface';
import { DiseasesService } from '../../../../core/services/diseases';
import { DoctorService } from '../../../../core/services/doctor';
import { forkJoin } from 'rxjs';
import { PastMedicalService } from '../../../../core/services/past-medical';
import { CommonMethod } from '../../../../core/services/common-method';
import { NotificationServices } from '../../../../core/services/notification-services';
import { ModalService } from '../../../../core/services/modal-service';

@Component({
  selector: 'app-past-medical',
  standalone: false,
  // imports: [],
  templateUrl: './past-medical.html',
  styleUrl: './past-medical.css',
})
export class PastMedical {
  @Input() hideList: boolean = false;
  @Input() patientId: string | null = null;
  public returnResult = new EventEmitter<any>()

  public pastMedicalForm!: FormGroup;
  public medicineList: IMedicineDetails[] = [];
  public problemList: IDiseasesData[] = [];
  public doctorsList: IDoctorsData[] = [];
  public pastMedicalList: IPastMedicalHistoryDetails[] = [];
  // private patientId: string | null = null;
  public showView: boolean = true;
  public expandedMedicaion: string | null = null;
  public frequencyOptions = [
    'Once Daily', 'Twice Daily', 'Three Times Daily', 'Every 4 Hours', 'Every 6 Hours',
    'Every 8 Hours', 'Every 12 Hours', 'Before Meals', 'After Meals', 'At Bedtime', 'As Needed'
  ];

  public durationUnits = [
    'Days', 'Weeks', 'Months'
  ];

  public dosageUnits: string[] = [
    'mg', 'mcg', 'g', 'kg', 'mL', 'L', 'Tablet', 'Tablets', 'Capsule', 'Capsules', 'Drop', 'Drops', 'Puff',
    'Puffs', 'Patch', 'Patches', 'Suppository', 'Suppositories', 'Injection', 'Injections', 'Unit', 'Units',
    'IU', 'Teaspoon (tsp)', 'Tablespoon (tbsp)', 'Sachet', 'Sachets', 'Ampoule', 'Ampoules', 'Vial', 'Vials'
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _medicineService: MedicineService,
    private _diseasesService: DiseasesService,
    private _dDoctorService: DoctorService,
    private _pastMedicalService: PastMedicalService,
    private _notificationServices: NotificationServices,
    private _commonMethod: CommonMethod,
    public _modalService: ModalService
  ) {
    this.route.paramMap.subscribe(params => {
      const id = params.get('patientId');
      this.patientId = params.get('patientId');
    });
  }

  ngOnInit() {
    this.initForm();
    this.loadMasterData();
  }

  private loadMasterData(): void {
    if (!this.hideList) {
      this._pastMedicalService.getPastMedicalByPatientId(this.patientId ?? '').subscribe({
        next: (res) => {
          this.pastMedicalList = res.data;
        }
      });
    }
    forkJoin({
      doctors: this._dDoctorService.getAllDoctors(),
      diseases: this._diseasesService.getAllDiseases(),
      medicines: this._medicineService.getAllMedicines(),
    }).subscribe({
      next: ({ doctors, diseases, medicines }) => {
        this.doctorsList = doctors.data;
        this.problemList = diseases.data;
        this.medicineList = medicines.data;
      },
      error: (err) => console.error(err)
    });
  }

  private getAllDoctors(): void {
    this._dDoctorService.getAllDoctors().subscribe((res: IDoctors) => {
      this.doctorsList = res.data
    })
  }

  private getProblems(): void {
    this._diseasesService.getAllDiseases().subscribe((res: IDiseases) => {
      this.problemList = res.data
    })
  }

  private getAllMedicine(): void {
    this._medicineService.getAllMedicines().subscribe((res: IMedicine) => {
      this.medicineList = res.data;
    })
  }

  initForm() {
    this.pastMedicalForm = this.fb.group({
      patientId: [this.patientId],
      problem: ['', Validators.required],
      status: ['', Validators.required],
      severity: ['', Validators.required],
      diagnosedBy: ['', Validators.required],
      diagnosedDate: ['', Validators.required],
      ongoing: [false],
      endDate: [{ value: null, disabled: true }],
      // pastMedicalCode: [this.generatePastMedicalCode(), Validators.required],
      outcome: ['', Validators.required],
      remark: ['', Validators.required],
      medications: this.fb.array([]),
      historydocuments: this.fb.array([])
    });
    this.addMedication();

    this.pastMedicalForm.get('ongoing')?.valueChanges.subscribe((value: boolean) => {
      const endDate = this.pastMedicalForm.get('endDate');
      if (value) {
        // Ongoing = true → Enable End Date
        endDate?.enable();
        endDate?.setValidators([Validators.required]);
      } else {
        // Ongoing = false → Disable End Date
        endDate?.reset();
        endDate?.clearValidators();
        endDate?.disable();
      }
      endDate?.updateValueAndValidity();
    });
  }

  private generatePastMedicalCode(): string {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    return `PMH-${yyyy}${mm}${dd}-${hh}${min}${ss}`;
  }

  get medications(): FormArray {
    return this.pastMedicalForm.get('medications') as FormArray;
  }

  createMedication(): FormGroup {
    return this.fb.group({
      medicineName: ['', Validators.required],
      dosage: [''],
      dosageUnit: [''],
      frequency: [''],
      duration: [''],
      durationUnit: ['']
    });
  }

  addMedication(): void {
    this.medications.push(this.createMedication());
  }

  removeMedication(index: number): void {
    this.medications.removeAt(index);
  }

  get historyDocuments(): FormArray {
    return this.pastMedicalForm.get('historydocuments') as FormArray;
  }

  createDocument(): FormGroup {
    return this.fb.group({
      fileName: ['', Validators.required],
      fileType: ['', Validators.required],
      fileSize: [0],
      fileData: ['', Validators.required],
      uploadedAt: [new Date()]
    });
  }

  addDocument(): void {
    this.historyDocuments.push(this.createDocument());
  }

  removeDocument(index: number): void {
    this.historyDocuments.removeAt(index);
  }

  getMedicineDetails(event: Event, index: number): void {
    const selectedMedicineName = (event.target as HTMLSelectElement).value;
    const medicine = this.medicineList.find(
      x => x.medicineName === selectedMedicineName
    );
    if (!medicine) return;
    const medicationGroup = this.medications.at(index);
    // medicationGroup.patchValue({
    //   dosage: medicine.defaultDosage || '',
    //   frequency: medicine.defaultFrequency || '',
    //   duration: medicine.defaultDuration || ''
    // });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.historyDocuments.push(
        this.fb.group({
          fileName: [file.name, Validators.required],
          fileType: [file.type, Validators.required],
          fileSize: [file.size],
          fileData: [reader.result?.toString().split(',')[1], Validators.required],
          uploadedAt: [new Date()]
        })
      );
    };
    reader.readAsDataURL(file);
  }

  public savePastMedical(): void {
    if (this.pastMedicalForm.invalid) {
      this.pastMedicalForm.markAllAsTouched();
      this._commonMethod.logInvalidControls(this.pastMedicalForm);
      return;
    }
    if (!this.isEdit) {
      const payload = this.pastMedicalForm.value;
      this._pastMedicalService.createPastMedical(payload).subscribe((res: any) => {
        this.showView = true;
        this.loadMasterData();
        if (this.hideList) {
          this.returnResult.emit(true);
          this._modalService.closeComponentModal();
        }
      });
    } else {
      const payload = this.pastMedicalForm.getRawValue();
      this._pastMedicalService.updatePastMedical(this.selectedPastMedical?._id!, payload).subscribe((res: any) => {
        this.showView = true;
        this.isEdit = false;
        this.loadMasterData();
      });
    }
  }

  public getStatusClass(status: string): string {
    const classes: any = {
      'Active': 'status-active',
      'Resolved': 'status-resolved',
      'Chronic': 'status-chronic',
      'In Remission': 'status-remission'
    };
    return classes[status] || '';
  }

  public getSeverityClass(severity: string): string {
    const classes: Record<string, string> = {
      'Mild': 'severity-mild',
      'Moderate': 'severity-moderate',
      'Severe': 'severity-severe',
      'Critical': 'severity-critical'
    };

    return classes[severity] || '';
  }

  public getOutcomeClass(outcome: string): string {
    const classes: Record<string, string> = {
      'Recovered': 'outcome-recovered',
      'Improved': 'outcome-improved',
      'Stable': 'outcome-stable',
      'Worsened': 'outcome-worsened',
      'Under Treatment': 'outcome-treatment'
    };

    return classes[outcome] || '';
  }

  public toggleView(): void {
    this.showView = !this.showView;
    this.pastMedicalForm.reset();
    this.pastMedicalForm.patchValue({
      patientId: this.patientId
    })
  }

  public isEdit: boolean = false;
  public selectedPastMedical: IPastMedicalHistoryDetails | null = null;

  public editPastMedical(pastMedical: IPastMedicalHistoryDetails): void {
    this.selectedPastMedical = pastMedical;
    this.isEdit = true;
    this.showView = false;
    pastMedical.diagnosedDate = this._commonMethod.formatDateForInput(pastMedical.diagnosedDate);
    const medicationsData = pastMedical.medications;
    this.pastMedicalForm.patchValue({
      ...pastMedical,
      diagnosedBy: pastMedical.diagnosedBy?._id,
    });
    this.patchMedications(medicationsData);
  }
  patchMedications(medicationsData: any[]) {
    const medicationsArray = this.medications;
    medicationsArray.clear();
    medicationsData.forEach((medication) => {
      medicationsArray.push(
        this.fb.group({
          medicineName: [medication.medicineName],
          dosage: [medication.dosage],
          dosageUnit: [medication.dosageUnit],
          frequency: [medication.frequency],
          duration: [medication.duration],
          durationUnit: [medication.durationUnit],
        })
      );
    });
  }

  public openMedicationDetails(id: string) {
    this.expandedMedicaion = this.expandedMedicaion === id ? null : id;
  }

  public deletePastmedical(pastMedical: IPastMedicalHistoryDetails): void {
    this._notificationServices.confirm('Delete', 'Are you sure you want to delete this record?').then((result) => {
      if (result.isConfirmed) {
        this._pastMedicalService.deletePastMedical(pastMedical._id).subscribe((res: any) => {
          this.loadMasterData();
        })
      }
    });
  }

  public closeModePopup(): void {
    // Logic to close the modal popup
    this._modalService.closeComponentModal();
  }

  public refresh(): void {
    this.loadMasterData();
  }
}
