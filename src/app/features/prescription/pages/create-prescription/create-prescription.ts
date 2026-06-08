import { Component } from '@angular/core';
import { PatientService } from '../../../../core/services/patients';
import { ActivatedRoute } from '@angular/router';
import { IMedicine, IMedicineDetails, IPatientsData } from '../../../../core/interface/basic.interface';
import { MedicineService } from '../../../../core/services/medicine-services';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { PrescriptionService } from '../../../../core/services/prescription-services';
import { StorageOperation } from '../../../../core/services/storage-operation';

@Component({
  selector: 'app-create-prescription',
  standalone: false,
  // imports: [],
  templateUrl: './create-prescription.html',
  styleUrls: ['./create-prescription.css'],
})
export class CreatePrescription {

  public prescriptionForm!: FormGroup;
  public isMoreMenuOpen = false;
  public patientId: string | null = '';
  public appointmentId: string | null = '';
  public patientsDetails: IPatientsData | null = null;
  public medicineList: IMedicineDetails[] = [];


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _patientService: PatientService,
    private _medicineService: MedicineService,
    private _prescriptionService: PrescriptionService,
    public _storageOperation: StorageOperation
  ) {
    this.route.paramMap.subscribe(params => {
      const patientId = params.get('patientId');
      const appointmentId = params.get('appointmentId');
      this.patientId = patientId;
      this.appointmentId = appointmentId;
    });
  }

  ngOnInit(): void {
    this.getPatientDetails();
    this.getMedicines();
    this.initializePrescriptionForm();
    this.addMedicine();
    this.addInvestigation();
    this.addSymptom();
  }

  private initializePrescriptionForm(): void {
    this.prescriptionForm = this.fb.group({
      prescriptionNumber: ['', Validators.required],
      appointmentId: [this.appointmentId, Validators.required],
      patientId: [this.patientId, Validators.required],
      doctorId: [this._storageOperation.get<any>('userDetails', 'local').id, Validators.required],
      diagnosis: ['', Validators.required],
      symptoms: this.fb.array([]),
      medicines: this.fb.array([]),
      investigations: this.fb.array([]),
      advice: [''],
      followUpDate: [null],
      notes: [''],
      status: ['Completed', Validators.required],
      prescribedDate: [new Date()]
    });
  }

  get symptoms(): FormArray {
    return this.prescriptionForm.get('symptoms') as FormArray;
  }

  get medicines(): FormArray {
    return this.prescriptionForm.get('medicines') as FormArray;
  }

  get investigations(): FormArray {
    return this.prescriptionForm.get('investigations') as FormArray;
  }

  private createMedicineForm(): FormGroup {
    return this.fb.group({
      medicineName: ['', Validators.required],
      dosage: ['', Validators.required],
      dosageUnit: ['', Validators.required],
      frequency: ['', Validators.required],
      frequencyUnit: ['', Validators.required],
      duration: ['', Validators.required],
      durationType: ['', Validators.required],
      instructions: ['']
    });
  }

  private createInvestigationForm(): FormGroup {
    return this.fb.group({
      testName: ['', Validators.required],
      remarks: ['']
    });
  }

  public addMedicine(): void {
    this.medicines.push(this.createMedicineForm());
  }

  public removeMedicine(index: number): void {
    this.medicines.removeAt(index);
  }

  public addInvestigation(): void {
    this.investigations.push(this.createInvestigationForm());
  }

  public removeInvestigation(index: number): void {
    this.investigations.removeAt(index);
  }

  public addSymptom(): void {
    this.symptoms.push(this.fb.control('', Validators.required));
  }

  public removeSymptom(index: number): void {
    this.symptoms.removeAt(index);
  }

  private getMedicines(): void {
    this._medicineService.getActiveMedicines().subscribe((res: IMedicine) => {
      this.medicineList = res.data;
    })
  }

  private getPatientDetails(): void {
    if (!this.patientId) {
      return;
    }
    this._patientService.getPatientById(this.patientId).subscribe((res) => {
      if (res.status) {
        this.patientsDetails = res.data;
      }
    });
  }

  public getPatientTitle(gender: string): string {
    switch (gender?.toLowerCase()) {
      case 'male':
        return 'Mr.';
      case 'female':
        return 'Ms.';
      default:
        return '';
    }
  }

  public onMedicineChange(event: Event): void {
    const medicineId = (event.target as HTMLSelectElement).value;
    const selectedMedicine = this.medicineList.find(
      med => med._id === medicineId
    );
    console.log('Selected Medicine Id:', medicineId);
    console.log('Selected Medicine:', selectedMedicine);
  }

  public generateDummyPrescription(): void {
    const diagnoses = [
      'Viral Fever',
      'Acute Gastritis',
      'Hypertension',
      'Migraine',
      'Upper Respiratory Infection',
      'Type 2 Diabetes',
      'Bronchitis'
    ];

    const symptomsList = [
      'Fever',
      'Headache',
      'Cough',
      'Cold',
      'Body Pain',
      'Vomiting',
      'Nausea',
      'Dizziness',
      'Fatigue'
    ];

    const advices = [
      'Drink plenty of fluids',
      'Take adequate rest',
      'Avoid oily foods',
      'Monitor blood pressure daily',
      'Regular exercise recommended',
      'Follow diabetic diet'
    ];

    const investigationNames = [
      'CBC',
      'Blood Sugar',
      'Urine Routine',
      'Liver Function Test',
      'Kidney Function Test',
      'Chest X-Ray',
      'ECG',
      'Thyroid Profile'
    ];

    const remarks = [
      'Urgent',
      'Routine Check',
      'Review Required',
      'Monitor Closely',
      'Repeat after 1 week'
    ];

    this.initializePrescriptionForm();
    this.symptoms.clear();
    this.medicines.clear();
    this.investigations.clear();

    const selectedSymptoms = symptomsList
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    selectedSymptoms.forEach(symptom => {
      this.symptoms.push(this.fb.control(symptom, Validators.required));
    });

    const medicineCount = this.randomNumber(2, 5);
    for (let i = 0; i < medicineCount; i++) {
      const medicine = this.medicineList[
        Math.floor(Math.random() * this.medicineList.length)
      ];

      const medicineForm = this.createMedicineForm();
      medicineForm.patchValue({
        medicineName: medicine?.medicineName ?? 'Paracetamol',
        dosage: this.randomNumber(1, 2),
        dosageUnit: ['Tablet', 'Capsule', 'ml', 'Drop'][
          Math.floor(Math.random() * 4)
        ],
        frequency: this.randomNumber(1, 3),
        frequencyUnit: ['Daily', 'Hours', 'Weekly'][
          Math.floor(Math.random() * 3)
        ],
        duration: this.randomNumber(3, 10),
        durationType: 'Days',
        instructions: [
          'After Food',
          'Before Food',
          'At Bedtime',
          'With Water'
        ][Math.floor(Math.random() * 4)]
      });

      this.medicines.push(medicineForm);
    }

    const investigationCount = this.randomNumber(1, 4);
    for (let i = 0; i < investigationCount; i++) {
      const investigationForm = this.createInvestigationForm();
      investigationForm.patchValue({
        testName: investigationNames[
          Math.floor(Math.random() * investigationNames.length)
        ],
        remarks: remarks[Math.floor(Math.random() * remarks.length)]
      });

      this.investigations.push(investigationForm);
    }

    this.prescriptionForm.patchValue({
      prescriptionNumber: `PRESCRIP-${this.randomNumber(1000, 9999)}`,
      // appointmentId: `APP-${this.randomNumber(1000, 9999)}`,
      // patientId: this.patientId ?? 'PATIENT-000',
      // doctorId: 'DOCTOR-001',
      diagnosis: diagnoses
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .join(', '),
      advice: advices[Math.floor(Math.random() * advices.length)],
      notes:
        'Patient advised to follow prescribed medications and revisit if symptoms persist.',
      followUpDate: this.getFutureDate(7),
      status: 'Completed'
    });
  }

  private randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private getFutureDate(days: number): string {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
  }


  submitPrescription(): void {
    if (this.prescriptionForm.invalid) {
      Object.keys(this.prescriptionForm.controls).forEach(key => {
        const control = this.prescriptionForm.get(key);
        if (control?.invalid) {
          console.log(`Invalid Control: ${key}`);
          console.log('Errors:', control.errors);
          console.log('Value:', control.value);
        }
      });
      this.prescriptionForm.markAllAsTouched();
      return;
    }
    const payload = this.prescriptionForm.getRawValue();
    // TODO: Replace with actual prescription service call
    this._prescriptionService.createPrescription(payload).subscribe((res) => {
      console.log(res);
      if (res.status) {
        this.prescriptionForm.reset();
      }
    })
  }

}
