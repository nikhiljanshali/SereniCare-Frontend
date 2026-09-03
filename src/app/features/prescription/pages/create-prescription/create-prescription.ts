import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { IPatientsData, IMedicineDetails, IMedicine, SymptomCategory } from '../../../../core/interface/basic.interface';
import { MedicineService } from '../../../../core/services/medicine-services';
import { PatientService } from '../../../../core/services/patients';
import { PrescriptionService } from '../../../../core/services/prescription-services';
import { StorageOperation } from '../../../../core/services/storage-operation';
import { CommonMethod } from '../../../../core/services/common-method';

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
  public appointmentId: string | null = '';
  public clinicId: string | null = '';
  public patientsDetails: IPatientsData | null = null;
  public medicineList: IMedicineDetails[] = [];

  public doctorId: string | null = null;
  public patientId: string | null = null;
  public systemId: string | null = null;
  public userRole: string = '';
  public doctorName: string = '';
  public isEdit: boolean = false;
  public prescriptionId: string = '';

  public suggestions: string[] = [
    'Fever', 'Cough', 'Shortness of Breath', 'Fatigue',
    'Headache', 'Sore Throat', 'Runny Nose', 'Body Ache',
    'Chest Pain', 'Nausea', 'Vomiting', 'Abdominal Pain',
    'Diarrhea', 'Dizziness', 'Chills', 'Loss of Taste/Smell'
  ];

  public symptomCategories: SymptomCategory[] = [
    {
      category: 'General & Systemic',
      symptoms: ['Fever', 'Fatigue', 'Chills', 'Night Sweats', 'Unexplained Weight Loss', 'Dizziness', 'Malaise']
    },
    {
      category: 'Respiratory',
      symptoms: ['Cough (Dry)', 'Cough (Productive)', 'Shortness of Breath', 'Sore Throat', 'Runny Nose', 'Nasal Congestion', 'Wheezing']
    },
    {
      category: 'Cardiovascular',
      symptoms: ['Chest Pain', 'Chest Tightness', 'Palpitations', 'Leg Swelling']
    },
    {
      category: 'Gastrointestinal',
      symptoms: ['Nausea', 'Vomiting', 'Abdominal Pain', 'Diarrhea', 'Constipation', 'Heartburn', 'Loss of Appetite', 'Bloating']
    },
    {
      category: 'Musculoskeletal & Neurological',
      symptoms: ['Headache', 'Body Ache', 'Joint Pain', 'Back Pain', 'Neck Stiffness', 'Numbness / Tingling', 'Confusion']
    },
    {
      category: 'Skin & Allergy',
      symptoms: ['Skin Rash', 'Itching', 'Hives', 'Redness / Inflammation']
    }
  ];


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _patientService: PatientService,
    private _medicineService: MedicineService,
    private _prescriptionService: PrescriptionService,
    public _storageOperation: StorageOperation,
    private router: Router,
    private _commonMethod: CommonMethod
  ) {
    this.route.paramMap.subscribe(params => {
      const patientId = params.get('patientId');
      const appointmentId = params.get('appointmentId');
      const clinicId = params.get('clinicId');
      this.patientId = patientId;
      this.appointmentId = appointmentId;
      this.clinicId = clinicId;
    });

    // 1. Get URL Path Parameters
    this.patientId = this.route.snapshot.paramMap.get('patientId') || '';
    this.appointmentId = this.route.snapshot.paramMap.get('appointmentId') || '';
    this.clinicId = this.route.snapshot.paramMap.get('clinicId') || '';

    // 2. Get Dynamic State Data passed during navigation
    this.isEdit = history.state?.['isEdit'];
    this.prescriptionId = history.state?.['prescriptionId'];
  }

  ngOnInit(): void {
    this.setUserDetails();
    this.getPatientDetails();
    this.getMedicines();
    this.initializePrescriptionForm();
    // this.addInvestigation();
    this.addSymptom();
    if (this.isEdit) {
      this.getExistingPrescriptionDetails();
    }
  }

  private setUserDetails(): void {
    const storedUser = this._storageOperation.get<any>('user');
    const storedUserDetails = this._storageOperation.get<any>('userDetails');
    this.userRole = storedUser?.role || '';
    if (storedUser) {
      const userId = storedUserDetails.id || '';
      switch (this.userRole) {
        case 'Patient':
          this.patientId = userId;
          break;
        case 'Doctor':
          this.doctorId = userId;
          this.doctorName = storedUser.firstName + '' + storedUser.lastName;
          break;
        case 'System Admin':
          this.systemId = storedUser.id;
          break;
        default:
          break;
      }
    }
  }

  private getExistingPrescriptionDetails(): void {
    this._prescriptionService.getPrescriptionById(this.prescriptionId).subscribe((res: any) => {
      console.log(res.data);
      this.patchPrescriptionData(res.data);
    })
  }

  private patchPrescriptionData(prescription: any): void {
    // Simple fields
    this.prescriptionForm.patchValue({
      clinicId: prescription.clinicId,
      prescriptionNumber: prescription.prescriptionNumber,
      appointmentId: prescription.appointmentId?._id,
      patientId: prescription.patientId?._id,
      doctorId: prescription.doctorId?._id,
      // Your API has diagnosis as an array
      diagnosis: prescription.diagnosis?.[0] ?? '',
      advice: prescription.advice ?? '',
      followUpDate: prescription.followUpDate
        ? new Date(prescription.followUpDate).toISOString().split('T')[0]
        : null,
      notes: prescription.notes ?? '',
      status: prescription.status ?? 'Completed',
      prescribedDate: prescription.prescribedDate ? new Date(prescription.prescribedDate) : new Date()
    });
    // ============================
    // Symptoms
    // ============================
    const symptomsArray = this.prescriptionForm.get('symptoms') as FormArray;
    symptomsArray.clear();
    (prescription.symptoms ?? []).forEach((symptom: string) => {
      symptomsArray.push(
        this.fb.control(symptom, Validators.required)
      );
    });
    // ============================
    // Medicines
    // ============================
    const medicinesArray = this.prescriptionForm.get('medicines') as FormArray;
    medicinesArray.clear();
    (prescription.medicines ?? []).forEach((medicine: any) => {
      medicinesArray.push(this.fb.group({
        medicineName: [medicine.medicineName ?? '', Validators.required],
        dosage: [medicine.dosage ?? ''], dosageUnit: [medicine.dosageUnit ?? ''],
        frequency: [medicine.frequency ?? ''],
        frequencyUnit: [medicine.frequencyUnit ?? ''],
        duration: [medicine.duration ?? ''],
        durationType: [medicine.durationType ?? ''],
        instructions: [medicine.instructions ?? '']
      }));
    });
    // ============================
    // Patch Investigations
    // ============================

    // Clear existing investigation rows
    this.investigations.clear();

    // Add and patch each investigation
    (prescription.investigations ?? []).forEach((investigation: any) => {

      // Add a new investigation form using your existing method
      this.addInvestigation();

      // Get the newly added FormGroup
      const index = this.investigations.length - 1;

      const investigationForm =
        this.investigations.at(index) as FormGroup;

      // Patch API data
      investigationForm.patchValue({
        testName: investigation.testName ?? '',
        remarks: investigation.remarks ?? ''
      });

    });

    console.log('Investigations:', this.investigations.value);
  }

  private initializePrescriptionForm(): void {
    this.prescriptionForm = this.fb.group({
      clinicId: [this.clinicId, Validators.required],
      prescriptionNumber: [`PRESCRIP-${this.randomNumber(1000, 9999)}`, Validators.required],
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

  public addSuggestion(tag: string) {
    const currentVal = this.prescriptionForm.get('diagnosis')?.value || '';
    if (!currentVal) {
      this.prescriptionForm.get('diagnosis')?.setValue(tag);
    } else if (!currentVal.includes(tag)) {
      // Append tag with a comma if text already exists
      this.prescriptionForm.get('diagnosis')?.setValue(`${currentVal.trim().replace(/,$/, '')}, ${tag}`);
    }
  }

  // Helper method to append clicked tag to textarea
  public addSymptoms(tag: string) {
    const control = this.prescriptionForm.get('diagnosis');
    const currentVal = control?.value || '';

    if (!currentVal.trim()) {
      control?.setValue(tag);
    } else {
      const existingTags = currentVal.split(',').map((item: string) => item.trim());
      if (!existingTags.includes(tag)) {
        control?.setValue(`${currentVal.trim().replace(/,$/, '')}, ${tag}`);
      }
    }
  }

  // private createMedicineForm(): FormGroup {
  //   return this.fb.group({
  //     medicineName: ['', Validators.required],
  //     dosage: ['', Validators.required],
  //     dosageUnit: ['', Validators.required],
  //     frequency: ['', Validators.required],
  //     frequencyUnit: ['', Validators.required],
  //     duration: ['', Validators.required],
  //     durationType: ['', Validators.required],
  //     instructions: ['']
  //   });
  // }

  public addMedicine(): void {
    this.medicines.push(this.createMedicineForm());
  }

  private createMedicineForm(): FormGroup {
    return this.fb.group({
      medicineName: ['', Validators.required],
      dosage: ['', [Validators.required, Validators.min(0.01), Validators.max(9999)]],
      dosageUnit: ['', Validators.required],
      frequency: ['', [Validators.required, Validators.min(1), Validators.max(24)]],
      frequencyUnit: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1), Validators.max(999)]],
      durationType: ['', Validators.required],
      instructions: ['']
    });
  }

  public removeMedicine(index: number): void {
    this.medicines.removeAt(index);
  }

  public addInvestigation(): void {
    this.investigations.push(this.createInvestigationForm());
  }

  private createInvestigationForm(): FormGroup {
    return this.fb.group({
      testName: ['', Validators.required],
      remarks: ['']
    });
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
    this._patientService.getPatientById(this.patientId).subscribe((res: any) => {
      if (res.status) {
        this.patientsDetails = res.data[0];
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

    // const symptomsList = [
    //   'Fever',
    //   'Headache',
    //   'Cough',
    //   'Cold',
    //   'Body Pain',
    //   'Vomiting',
    //   'Nausea',
    //   'Dizziness',
    //   'Fatigue'
    // ];

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

    const allSymptoms = this.symptomCategories.flatMap(cat => cat.symptoms);

    // Pick 3 unique random symptoms without sorting the entire array
    const selectedSymptoms: string[] = [];
    const symptomsCopy = [...allSymptoms];

    for (let i = 0; i < 3 && symptomsCopy.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * symptomsCopy.length);
      selectedSymptoms.push(symptomsCopy.splice(randomIndex, 1)[0]);
    }

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
    if (this.isEdit) {
      this._prescriptionService.updatePrescription(this.prescriptionId, payload).subscribe((res) => {
        if (res.status) {
          this.prescriptionForm.reset();
          this.router.navigate(['/layout/prescription/master/list']);
        }
      })
    } else {
      this._prescriptionService.createPrescription(payload).subscribe((res) => {
        if (res.status) {
          this.prescriptionForm.reset();
        }
      })
    }
  }

}
