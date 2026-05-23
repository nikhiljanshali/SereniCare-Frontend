import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IClinicType, IClinicTypeData, IPrimarySpeciality, IPrimarySpecialityData } from '../../../../core/interface/basic.interface';
import { ClinicTypeService } from '../../../../core/services/clinic-type';
import { PrimarySpecialityService } from '../../../../core/services/primary-speciality';
import { LocationService } from '../../../../core/services/location-service';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { DoctorService } from '../../../../core/services/doctor';
import { Router } from '@angular/router';
import { Roles } from '../../../../core/enum/common.enum';


@Component({
  selector: 'app-doctor-registration',
  // imports: [],
  standalone: false,
  templateUrl: './doctor-registration.html',
  styleUrl: './doctor-registration.css',
})
export class DoctorRegistration {

  public doctorForm!: FormGroup;
  public currentStep = 1;
  public openedIndex: number | null = 0;
  public primarySpecialities: IPrimarySpecialityData[] = [];
  public clinicTypeList: IClinicTypeData[] = [];

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

  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _clinicType: ClinicTypeService,
    private _primarySpecialityService: PrimarySpecialityService,
    private _doctorService: DoctorService,
    private _LocationService: LocationService,
  ) {

    this.countries$ = this._LocationService.countries$;
    this.states$ = this._LocationService.states$;
    this.cities$ = this._LocationService.cities$;
    this.selection$ = this._LocationService.selection$;
    this.loading$ = this._LocationService.loading$;
    this.error$ = this._LocationService.error$;
  }

  ngOnInit() {
    this.initForm();
    this.getAllPrimarySpecialities();
    this.getAllClinicTypes();
  }

  private initForm(): void {
    this.doctorForm = this.fb.group({
      // 🔹 Basic Info
      firstName: [
        { value: '', disabled: false },
        [Validators.required]
      ],
      lastName: [
        { value: '', disabled: false },
        [Validators.required]
      ],
      gender: [
        { value: '', disabled: false },
        [Validators.required]
      ],
      dateOfBirth: [
        { value: '', disabled: false },
        [Validators.required]
      ],
      age: [
        { value: '', disabled: false },
        [Validators.required]
      ],
      // 🔹 Contact Info
      phone: [
        { value: '', disabled: false },
        [Validators.required]
      ],
      email: [
        { value: '', disabled: false },
        [Validators.required]
      ],
      address: [
        { value: '', disabled: false },
        [Validators.required]
      ],
      city: [
        { value: '', disabled: false },
        [Validators.required]
      ],
      state: [
        { value: '', disabled: false },
        [Validators.required]
      ],
      country: [
        { value: '', disabled: false },
        [Validators.required]
      ],
      pincode: [
        { value: '', disabled: false },
        [Validators.required]
      ],
      // 🔹 Identification
      aadhaarNumber: [''],
      licenseNumber: ['', Validators.required],
      doctorSpecialization: ['', Validators.required],
      // 🔹 Status
      status: ['active'],
      // 🔹 Clinic Details (FormArray)
      clinicDetails: this.fb.array([this.createClinicDetails()]),
      term: [false, Validators.required]

    });
    // React to country changes
    this.doctorForm.get('country')!.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((id: number | null) => {
        this.doctorForm.patchValue({ state: null, city: null }, { emitEvent: false });
        this._LocationService.selectICountry(id);
      });

    // React to state changes
    this.doctorForm.get('state')!.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((id: number | null) => {
        this.doctorForm.patchValue({ city: null }, { emitEvent: false });
        this._LocationService.selectIState(id);
      });

    // React to city changes
    this.doctorForm.get('city')!.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((id: number | null) => this._LocationService.selectICity(id));
  }

  private createClinicDetails(): FormGroup {
    return this.fb.group({
      clinicName: [''],
      registrationNumber: [''],
      clinicType: [''],
      address: [''],
      city: [''],
      pincode: [''],
      phone: [''],
      clinicEmail: [''],
      primarySpeciality: [''],
    });
  }

  get clinicDetails(): FormArray {
    return this.doctorForm.get('clinicDetails') as FormArray;
  }


  private getAllPrimarySpecialities(): void {
    this._primarySpecialityService.getAllPrimarySpeciality().subscribe({
      next: (res: IPrimarySpeciality) => {
        this.primarySpecialities = res.data ?? [];
      },
      error: (err) => {
        console.error('Error fetching primary specialities:', err);
        this.primarySpecialities = [];
      }
    });
  }


  private getAllClinicTypes(): void {
    this._clinicType.getCliniAllType().subscribe({
      next: (res: IClinicType) => {
        this.clinicTypeList = res.data ?? [];
      },
      error: (err) => {
        console.error('Error fetching clinic types:', err);
        this.clinicTypeList = [];
      }
    });
  }

  addClinic() {
    this.clinicDetails.push(this.createClinicDetails());
  }

  removeClinic(index: number) {
    this.clinicDetails.removeAt(index);
  }

  nextStep() {
    if (this.currentStep < 3) this.currentStep++;
  }

  prevStep() {
    if (this.currentStep > 1) this.currentStep--;
  }

  get isLastStep() {
    return this.currentStep === 3;
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
    this.doctorForm.patchValue({
      age: age >= 0 ? age : null
    });
  }

  onStatusToggle(event: any) {
    const isChecked = event.target.checked;
    this.doctorForm.patchValue({
      status: isChecked ? 'active' : 'inactive'
    });
  }

  setDeceased() {
    this.doctorForm.patchValue({
      status: 'deceased'
    });
  }

  onCountryChange() {
    const countryName = this.doctorForm.value.country;

    const country = this.countries.find(c => c.name === countryName);

    this.states = country ? country.states : [];
    this.cities = [];

    this.doctorForm.patchValue({ state: '', city: '' });
  }

  onStateChange() {
    const stateName = this.doctorForm.value.state;

    const state = this.states.find(s => s.name === stateName);

    this.cities = state ? state.cities : [];

    this.doctorForm.patchValue({ city: '' });
  }

  toggleClinic(index: number) {
    this.openedIndex = this.openedIndex === index ? null : index;
  }

  public onSpecialityChange() {
    const selected = this.doctorForm.get('primarySpeciality')?.value;
    console.log('Selected Speciality Object:', selected);
    // Explicit patch (optional, Angular already does it)
    this.doctorForm.patchValue({
      primarySpeciality: selected
    });
  }

  public onSpecializationChange() {
    const selected = this.doctorForm.get('doctorSpecialization')?.value;
    console.log('Selected Specialization Object:', selected);
    // Explicit patch (optional, Angular already does it)
    this.doctorForm.patchValue({
      doctorSpecialization: selected
    });
  }

  public onCountrySelect() {
    const selected = this.doctorForm.get('country')?.value;
    console.log('Selected Country Object:', selected);
    this.doctorForm.patchValue({
      country: selected
    })
  }

  public onStatSelect() {
    const selected = this.doctorForm.get('state')?.value;
    console.log('Selected State Object:', selected);
    this.doctorForm.patchValue({
      state: selected
    })
  }

  public onCitySelect() {
    const selected = this.doctorForm.get('city')?.value;
    console.log('Selected City Object:', selected);
    this.doctorForm.patchValue({
      city: selected
    })
  }

  private dummyCounter = 0;
  generateClinicName(city: string): string {
    const prefixes = ['Care', 'Health', 'Wellness', 'Med', 'Life', 'Prime', 'Plus'];
    const suffixes = ['Center', 'Clinic', 'Hospital', 'Hub', 'Point', 'Zone'];

    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    const randomNumber = Math.floor(Math.random() * 100);

    return `${city} ${randomPrefix} ${randomSuffix} ${randomNumber}`;
  }

  private generateDummyDoctor() {
    const rand = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    const pick = (arr: any[]) => arr[rand(0, arr.length - 1)];

    // 🔥 Unique seed (NO DUPLICATES)
    this.dummyCounter++;
    const unique =
      Date.now().toString() +
      this.dummyCounter +
      rand(100, 999).toString();

    const firstNames = ['Nikhil', 'Rahul', 'Amit', 'Priya', 'Sneha', 'Arjun'];
    const lastNames = ['Sharma', 'Patel', 'Verma', 'Reddy', 'Mehta'];

    const genders = ['Male', 'Female'];
    const clinicTypes = ['Private', 'Hospital', 'Government'];

    const specialities = [
      { name: 'Cardiology', code: 'CARD' },
      { name: 'Dermatology', code: 'DERM' },
      { name: 'Orthopedic', code: 'ORTHO' },
      { name: 'Neurology', code: 'NEURO' }
    ];

    const cities = ['Surat', 'Ahmedabad', 'Mumbai', 'Delhi'];
    const pincodes = ['395006', '380001', '400001', '110001'];

    const firstName = pick(firstNames);
    const lastName = pick(lastNames);
    const gender = pick(genders);

    const year = rand(1980, 2000);
    const month = rand(1, 12).toString().padStart(2, '0');
    const day = rand(1, 28).toString().padStart(2, '0');
    const dob = `${year}-${month}-${day}`;

    const age = new Date().getFullYear() - year;

    const generateClinic = (index: number) => {
      const city = pick(cities);
      const pincode = pick(pincodes);
      const speciality = pick(specialities);

      return {
        clinicName: this.generateClinicName(city),
        registrationNumber: `REG-${unique}-${index}`,
        clinicType: pick(clinicTypes),
        primarySpeciality: speciality,
        address: `${rand(10, 999)} Health Street`,
        city,
        pincode,
        phone: `0${rand(20, 99)}${rand(10000000, 99999999)}`,
        clinicEmail: `clinic${unique}-${index}@mail.com`
      };
    };

    const clinicCount = rand(1, 3);

    return {
      firstName,
      lastName,
      dateOfBirth: dob,
      gender,
      age,
      phone: `9${rand(100000000, 999999999)}`,
      email: `${firstName.toLowerCase()}${unique}@mail.com`,
      address: `${rand(1, 999)} Main Street`,
      country: 1,
      state: rand(1, 20),
      city: rand(100, 999),
      pincode: pick(pincodes),
      aadhaarNumber: `${rand(1000, 9999)}-${rand(1000, 9999)}-${rand(1000, 9999)}`,
      licenseNumber: `LIC-${unique}`,
      clinicDetails: Array.from({ length: clinicCount }, (_, i) =>
        generateClinic(i)
      )
    };
  }


  public fillDummyData() {
    const data = this.generateDummyDoctor();

    // Patch Step 1 fields
    this.doctorForm.patchValue({
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      age: data.age,
      phone: data.phone,
      email: data.email,
      address: data.address,
      country: data.country,
      state: data.state,
      city: data.city,
      pincode: data.pincode,
      aadhaarNumber: data.aadhaarNumber,
      licenseNumber: data.licenseNumber
    });

    // Clear existing clinics
    this.clinicDetails.clear();

    // Add clinics
    data.clinicDetails.forEach(clinic => {
      this.clinicDetails.push(this.fb.group({
        clinicName: [clinic.clinicName],
        registrationNumber: [clinic.registrationNumber],
        clinicType: [clinic.clinicType],
        primarySpeciality: [clinic.primarySpeciality],
        address: [clinic.address],
        city: [clinic.city],
        pincode: [clinic.pincode],
        phone: [clinic.phone],
        clinicEmail: [clinic.clinicEmail]
      }));
    });

    // Open first accordion by default
    this.openedIndex = 0;
  }

  private buildDoctorPayload(formValue: any) {
    return {
      userData: {
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        workEmail: formValue.email,
        phone: formValue.phone,
        role: Roles.Doctor
      },

      doctorData: {
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        gender: formValue.gender,
        dateOfBirth: formValue.dateOfBirth,
        age: formValue.age,
        address: formValue.address,
        city: formValue.city,
        state: formValue.state,
        country: formValue.country,
        pincode: formValue.pincode,
        aadhaarNumber: formValue.aadhaarNumber,
        licenseNumber: formValue.licenseNumber,
        status: formValue.status || 'active',
        specializations: formValue.doctorSpecialization
          ? [{
            name: formValue.doctorSpecialization.name,
            code: formValue.doctorSpecialization.code
          }]
          : []
      },

      clinics: (formValue.clinicDetails || []).map((c: any) => ({
        clinicName: c.clinicName,
        registrationNumber: c.registrationNumber,
        clinicType: c.clinicType,
        address: c.address,
        city: c.city,
        pincode: c.pincode,
        phone: c.phone,
        clinicEmail: c.clinicEmail,
        specializations: c.primarySpeciality
          ? [{
            name: c.primarySpeciality.name,
            code: c.primarySpeciality.code
          }]
          : []
      }))
    };
  }

  onSubmit() {
    const payload = this.buildDoctorPayload(this.doctorForm.value);
    console.log('Submitting Doctor Payload:', payload);
    // return;
    this._doctorService.createDoctors(payload).pipe(take(1)).subscribe({
      next: (data) => {
        this.doctorForm.reset();
        this.currentStep = 1;
        this.router.navigate(['/layout/doctors/master/list']);
      },
      error: (err) => {
        console.error('Doctor Registration failed:', err);
      }
    });
  }

}
