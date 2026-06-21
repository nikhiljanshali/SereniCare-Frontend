import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { BloodGroupService } from '../../../../core/services/blood-group';
import { IBloodGroupData, IDoctors, ILimitedDocotorsData, IPrimaryConditionData } from '../../../../core/interface/basic.interface';
import { PrimaryConditionService } from '../../../../core/services/primary-condition';
import { DoctorService } from '../../../../core/services/doctor';
import { PatientService } from '../../../../core/services/patients';
import { Observable, retry, Subject, takeUntil } from 'rxjs';
import { LocationService } from '../../../../core/services/location-service';
import { take } from 'rxjs';
import { Router } from '@angular/router';
import { Roles } from '../../../../core/enum/common.enum';
import { StorageOperation } from '../../../../core/services/storage-operation';
import { CommonMethod } from '../../../../core/services/common-method';

@Component({
  selector: 'app-patient-registration',
  // imports: [],
  standalone: false,
  templateUrl: './patient-registration.html',
  styleUrl: './patient-registration.css',
})
export class PatientRegistration {

  public patientForm!: FormGroup;
  public currentStep = 1;
  public bloodGroups: IBloodGroupData[] = [];
  public primaryConditions: IPrimaryConditionData[] = [];
  public doctorsList: ILimitedDocotorsData[] = [];


  public countries: any[] = [];
  public states: any[] = [];
  public cities: string[] = [];
  // Expose service streams directly to the template
  countries$!: Observable<any[]>;
  states$!: Observable<any[]>;
  cities$!: Observable<any[]>;
  selection$!: Observable<any>;
  loading$!: Observable<boolean>;
  error$!: Observable<any>;
  destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _bloodGroupService: BloodGroupService,
    private _primaryConditonService: PrimaryConditionService,
    private _doctorService: DoctorService,
    private _LocationService: LocationService,
    private _patientService: PatientService,
    public _storageOperation: StorageOperation,
    private _commonMethod: CommonMethod
  ) {
    this.countries$ = this._LocationService.countries$;
    this.states$ = this._LocationService.states$;
    this.cities$ = this._LocationService.cities$;
    this.selection$ = this._LocationService.selection$;
    this.loading$ = this._LocationService.loading$;
    this.error$ = this._LocationService.error$;

    const storedUser = this._storageOperation.get<any>('user');
    const storedUserDetails = this._storageOperation.get<any>('userDetails');
    console.log(storedUser.role, storedUserDetails);
  }

  ngOnInit() {
    this.initForm();
    this.getBloodGroup();
    this.getPrimaryCondition();
    this.getDoctors();
  }

  private getBloodGroup(): void {
    this._bloodGroupService.getAllBloodGroup().subscribe((res: any) => {
      this.bloodGroups = res.data;
    });
  }
  private getPrimaryCondition(): void {
    this._primaryConditonService.getAllPrimaryCondition().subscribe((res: any) => {
      this.primaryConditions = res.data;
    });
  }

  private getDoctors(): void {
    this._doctorService.getAllLimitedDoctors().subscribe((res: IDoctors) => {
      this.doctorsList = res.data;
    });
  }

  onCountryChange() {
    const countryName = this.patientForm.value.country;
    const country = this.countries.find(c => c.name === countryName);
    this.states = country ? country.states : [];
    this.cities = [];
    this.patientForm.patchValue({ state: '', city: '' });
  }

  onStateChange() {
    const stateName = this.patientForm.value.state;
    const state = this.states.find(s => s.name === stateName);
    this.cities = state ? state.cities : [];
    this.patientForm.patchValue({ city: '' });
  }

  initForm() {
    let docId: string = '';
    if (this._storageOperation.get<any>('user').role == Roles.SystemAdmin) {
      docId = '';
    } else if (this._storageOperation.get<any>('user').role == Roles.Doctor) {
      docId = this._storageOperation.get<any>('userDetails').id;
    }
    this.patientForm = this.fb.group({
      // 🔹 Basic Info
      firstName: [
        { value: '', disabled: false },
        [Validators.required]
      ],
      middleName: [{ value: '', disabled: false }, [Validators.required]],
      lastName: [
        { value: '', disabled: false },
        [Validators.required]
      ],
      gender: [
        { value: '', disabled: false },
        [Validators.required]
      ],
      dateOfBirth: [{ value: '', disabled: false },
      [Validators.required]],
      age: [
        { value: '', disabled: false },
        [Validators.required]
      ],
      role: 'patient',
      // 🔹 Contact Info
      phone: [{ value: '', disabled: false }, [Validators.required]],
      email: [{ value: '', disabled: false }, [Validators.required, Validators.email]],
      address: [{ value: '', disabled: false }],
      country: [{ value: '', disabled: false }, [Validators.required]],
      state: [{ value: '', disabled: false }, [Validators.required]],
      city: [{ value: '', disabled: false }, [Validators.required]],
      pincode: [{ value: '', disabled: false }, [Validators.required]],
      // 🔹 Identification
      patientCode: [''],
      aadhaarNumber: [''],
      // 🔹 Emergency Contact (Nested)
      emergencyContact: this.fb.group({
        name: [''],
        relation: [''],
        phone: ['']
      }),
      // 🔹 Status
      status: ['active'],
      // 🔹 Mapping
      clinicId: ['', Validators.required],
      primaryDoctorId: [
        { value: docId, disabled: false },
        [Validators.required]
      ],
      // 🔹 Medical History (FormArray)
      medicalHistories: this.fb.array([this.createMedicalHistory()]),
      // 🔹 Insurance (FormArray)
      insuranceDetails: this.fb.array([this.createInsurance()]),
      term: [false, Validators.required]

    });

    this.patientForm.get('country')!.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((id: number | null) => {
        this.patientForm.patchValue({ state: null, city: null }, { emitEvent: false });
        this._LocationService.selectICountry(id);
      });

    // React to state changes
    this.patientForm.get('state')!.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((id: number | null) => {
        this.patientForm.patchValue({ city: null }, { emitEvent: false });
        this._LocationService.selectIState(id);
      });

    // React to city changes
    this.patientForm.get('city')!.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((id: number | null) => this._LocationService.selectICity(id));
  }

  createMedicalHistory(): FormGroup {
    return this.fb.group({
      bloodType: [{ value: '', disabled: false }],
      condition: [{ value: '', disabled: false }],
      allergies: [{ value: '', disabled: false }],
      medications: [{ value: '', disabled: false }],
      surgeries: [{ value: '', disabled: false }],
      familyHistory: [{ value: '', disabled: false }],

      lifestyle: this.fb.group({
        smoking: this.fb.group({
          status: [false],
          frequency: [{ value: '', disabled: false }],
          durationYears: [null]
        }),
        alcohol: this.fb.group({
          status: [false],
          frequency: [{ value: '', disabled: false }]
        }),
        activityLevel: [{ value: '', disabled: false }],
        dietType: [{ value: '', disabled: false }],
        exerciseFrequency: [{ value: '', disabled: false }], // Daily / Weekly / Rare
        sleepHours: [null],
        stressLevel: [{ value: '', disabled: false }], // Low / Medium / High
        caffeineIntake: [{ value: '', disabled: false }], // Low / Moderate / High
        waterIntake: [null], // liters
        occupationType: [{ value: '', disabled: false }], // Desk / Field
        hobbies: this.fb.array([]),
        substanceUse: this.fb.group({
          tobacco: [false],
          drugs: [false]
        })
      }),
      notes: [{ value: '', disabled: false }],
    });
  }

  createInsurance(): FormGroup {
    return this.fb.group({
      providerName: [{ value: '', disabled: false }],
      policyNumber: [{ value: '', disabled: false }],
      policyHolderName: [{ value: '', disabled: false }],
      relationToPatient: [{ value: '', disabled: false }],
      coverageAmount: [null],
      coverageDetails: [{ value: '', disabled: false }],
      validFrom: [{ value: '', disabled: false }],
      validTo: [{ value: '', disabled: false }],
      status: ['active']
    });
  }

  onInsuranceStatusToggle(event: any, index: number) {
    const isChecked = event.target.checked;
    const status = isChecked ? 'active' : 'inactive';
    this.insuranceDetails.at(index).patchValue({
      status
    });
  }

  get medicalHistories(): FormArray {
    return this.patientForm.get('medicalHistories') as FormArray;
  }

  get insuranceDetails(): FormArray {
    return this.patientForm.get('insuranceDetails') as FormArray;
  }
  get hobbies(): FormArray {
    return this.patientForm.get('lifestyle.hobbies') as FormArray;
  }

  addHobby(hobby: string) {
    this.hobbies.push(this.fb.control(hobby));
  }

  removeHobby(index: number) {
    this.hobbies.removeAt(index);
  }

  addMedicalHistory() {
    this.medicalHistories.push(this.createMedicalHistory());
  }

  removeMedicalHistory(index: number) {
    this.medicalHistories.removeAt(index);
  }

  addInsurance() {
    this.insuranceDetails.push(this.createInsurance());
  }

  removeInsurance(index: number) {
    this.insuranceDetails.removeAt(index);
  }

  onDobChange(event: any) {
    const dob = new Date(event.target.value);
    if (!dob) return;
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    // adjust if birthday not yet occurred this year
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    this.patientForm.patchValue({
      age: age >= 0 ? age : null
    });
  }

  onStatusToggle(event: any) {
    const isChecked = event.target.checked;
    this.patientForm.patchValue({
      status: isChecked ? 'active' : 'inactive'
    });
  }

  setDeceased() {
    this.patientForm.patchValue({
      status: 'deceased'
    });
  }

  nextStep() {
    if (this.currentStep < 4) this.currentStep++;
  }

  prevStep() {
    if (this.currentStep > 1) this.currentStep--;
  }

  get isLastStep() {
    return this.currentStep === 4;
  }

  private getRandomItem(arr: any[]) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  private getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  public generateDummyPatient() {
    const firstNames = ['Amit', 'Priya', 'Rahul', 'Sneha', 'Vikram', 'Neha'];
    const middleNames = ['Kumar', 'Raj', 'Anil', 'Sunil', 'Devi'];
    const lastNames = ['Sharma', 'Patel', 'Verma', 'Gupta', 'Mehta', 'Reddy'];

    const genders = ['Male', 'Female', 'Non-binary'];
    const relations = ['Self', 'Spouse', 'Parent', 'Child'];
    const providers = ['Star Health', 'HDFC Ergo', 'Bajaj Allianz', 'Niva Bupa'];
    const hobbiesList = ['Reading', 'Traveling', 'Music', 'Sports'];

    const firstName = this.getRandomItem(firstNames);
    const middleName = this.getRandomItem(middleNames);
    const lastName = this.getRandomItem(lastNames);

    const age = this.getRandomNumber(18, 80);
    const dob = this.getDOBFromAge(age);

    // Clear arrays
    this.medicalHistories.clear();
    this.insuranceDetails.clear();

    // Add fresh controls
    this.medicalHistories.push(this.createMedicalHistory());
    this.insuranceDetails.push(this.createInsurance());

    // Patch main form
    this.patientForm.patchValue({
      firstName,
      middleName,
      lastName,
      gender: this.getRandomItem(genders),
      dateOfBirth: dob,
      age,
      role: Roles.Patient,

      phone: `9${this.getRandomNumber(100000000, 999999999)}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@mail.com`,
      address: `Street ${this.getRandomNumber(1, 200)}, City Area`,
      country: 1,
      state: 101,
      city: 1001,
      pincode: `${this.getRandomNumber(100000, 999999)}`,

      patientCode: `PAT-${this.getRandomNumber(1000, 9999)}`,
      aadhaarNumber: `${this.getRandomNumber(1000, 9999)} ${this.getRandomNumber(1000, 9999)} ${this.getRandomNumber(1000, 9999)}`,

      status: 'active',
      clinicId: 'CLINIC123', // ⚠️ replace with real value
      // primaryDoctorId: this._storageOperation.get<any>('userDetails', 'local').id || null,

      term: true,

      emergencyContact: {
        name: `${this.getRandomItem(firstNames)} ${this.getRandomItem(lastNames)}`,
        relation: this.getRandomItem(relations),
        phone: `9${this.getRandomNumber(100000000, 999999999)}`
      }
    });

    // 🔹 Medical History
    const mh = this.medicalHistories.at(0);

    // Add hobbies dynamically
    const hobbiesArray = mh.get('lifestyle.hobbies') as FormArray;
    hobbiesArray.clear();
    hobbiesArray.push(this.fb.control(this.getRandomItem(hobbiesList)));
    hobbiesArray.push(this.fb.control(this.getRandomItem(hobbiesList)));

    mh.patchValue({
      bloodType: this.getRandomItem(['A+', 'B+', 'O+', 'AB+']),
      condition: 'Diabetes',
      allergies: 'Dust, Pollen',
      medications: 'Metformin',
      surgeries: 'Appendectomy 2018',
      familyHistory: 'Hypertension',

      lifestyle: {
        smoking: {
          status: Math.random() > 0.5,
          frequency: 'Occasional',
          durationYears: this.getRandomNumber(1, 10)
        },
        alcohol: {
          status: Math.random() > 0.5,
          frequency: 'Weekly'
        },
        activityLevel: this.getRandomItem(['Sedentary', 'Moderate', 'Active']),
        dietType: this.getRandomItem(['Veg', 'Non-Veg', 'Vegan']),
        exerciseFrequency: this.getRandomItem(['Daily', 'Weekly', 'Rare']),
        sleepHours: this.getRandomNumber(5, 9),
        stressLevel: this.getRandomItem(['Low', 'Medium', 'High']),
        caffeineIntake: this.getRandomItem(['Low', 'Moderate', 'High']),
        waterIntake: this.getRandomNumber(2, 5),
        occupationType: this.getRandomItem(['Desk', 'Field']),
        substanceUse: {
          tobacco: Math.random() > 0.7,
          drugs: false
        }
      },

      notes: 'Auto-generated dummy data'
    });

    // 🔹 Insurance
    const ins = this.insuranceDetails.at(0);
    ins.patchValue({
      providerName: this.getRandomItem(providers),
      policyNumber: `POL-${this.getRandomNumber(10000, 99999)}`,
      policyHolderName: `${firstName} ${lastName}`,
      relationToPatient: 'Self',
      coverageAmount: this.getRandomNumber(100000, 500000),
      coverageDetails: 'Health Insurance Plan',
      validFrom: this.getRandomDate(),
      validTo: this.getRandomFutureDate(),
      status: 'active'
    });
  }

  private getDOBFromAge(age: number): string {
    const today = new Date();
    const birthYear = today.getFullYear() - age;

    const randomMonth = this.getRandomNumber(0, 11);
    const randomDay = this.getRandomNumber(1, 28);

    const dob = new Date(birthYear, randomMonth, randomDay);
    return dob.toISOString().split('T')[0];
  }

  private getRandomDate(): string {
    const start = new Date(2015, 0, 1);
    const end = new Date();
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().split('T')[0];
  }

  private getRandomFutureDate(): string {
    const today = new Date();
    const future = new Date(today.setFullYear(today.getFullYear() + 2));
    return future.toISOString().split('T')[0];
  }

  registerPatientSubmit() {
    if (this.patientForm.invalid) {
      this.patientForm.markAllAsTouched();
      this._commonMethod.logInvalidControls(this.patientForm);
      return;
    }


    console.log(this.patientForm.getRawValue());
    this._patientService.createPatient(this.patientForm.getRawValue()).pipe(take(1)).subscribe({
      next: (data) => {
        this.patientForm.reset();
        this.currentStep = 1;
        this.router.navigate(['/layout/patients/master/list']);
      },
      error: (err) => {
        console.error('Patient Registration failed:', err);
      }
    });
  }

}
