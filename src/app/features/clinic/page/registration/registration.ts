import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Clinics } from '../../../../core/services/clinics';
import { take } from 'rxjs';
import { ClinicTypeService } from '../../../../core/services/clinic-type';
import { IClinicType, IClinicTypeData, IPrimarySpeciality, IPrimarySpecialityData, IRole, IRoleData } from '../../../../core/interface/basic.interface';
import { PrimarySpecialityService } from '../../../../core/services/primary-speciality';
import { RoleService } from '../../../../core/services/role-service';

@Component({
  selector: 'app-registration',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registration.html',
  styleUrl: './registration.css',
})
export class Registration {

  public currentStep = 1;
  public clinicForm!: FormGroup;
  public masterKeyForm!: FormGroup;

  public submitted = false;
  public showPassword = false;
  public showConfirmPassword = false;
  public passwordStrength = 0; // 0 to 4
  public strengthLabel = 'Enter a password';

  public masterKey = 'Clinic@2026';
  public isMasterKeyValid = false;

  constructor(
    private fb: FormBuilder,
    private _clinics: Clinics,
    private _clinicType: ClinicTypeService,
    private _primarySpecialityService: PrimarySpecialityService,
    private _roleService: RoleService,
  ) {

  }

  ngOnInit(): void {
    this.getAllClinicTypes();
    this.getAllPrimarySpecialities();
    this.getAllRoles();
    this.initForms();
  }

  private initForms(): void {
    // 🔐 Master Key Form
    this.masterKeyForm = this.fb.group({
      masterKey: ['']
    });
    this.initClinicRegistrationForm();
    this.clinicForm.get('password')?.valueChanges.subscribe(value => {
      this.calculatePasswordStrength(value || '');
    });
    this.clinicForm.get('primarySpeciality')?.valueChanges.subscribe(value => {
      console.log('Selected Speciality:', value);
    });
    // 🔥 Detect Master Key Change
    this.masterKeyForm.get('masterKey')?.valueChanges.subscribe((value: string) => {
      if (value?.trim() === this.masterKey) {
        this.clinicForm.enable();
        this.isMasterKeyValid = true;
      } else {
        this.clinicForm.disable();
        this.isMasterKeyValid = false;
      }
    });
  }

  private calculatePasswordStrength(password: string) {
    let strength = 0;

    if (!password) {
      this.passwordStrength = 0;
      this.strengthLabel = 'Enter a password';
      return;
    }

    // Rules
    if (password.length >= 8) strength++;                 // length
    if (/[A-Z]/.test(password)) strength++;               // uppercase
    if (/[0-9]/.test(password)) strength++;               // number
    if (/[^A-Za-z0-9]/.test(password)) strength++;        // special char

    this.passwordStrength = strength;

    // Label
    switch (strength) {
      case 0:
      case 1:
        this.strengthLabel = 'Weak';
        break;
      case 2:
        this.strengthLabel = 'Medium';
        break;
      case 3:
        this.strengthLabel = 'Strong';
        break;
      case 4:
        this.strengthLabel = 'Very Strong';
        break;
    }
  }

  get f() {
    return this.clinicForm.controls;
  }

  private initClinicRegistrationForm(): void {

    this.clinicForm = this.fb.group(
      {
        // 🔹 STEP 1 — Clinic Details
        clinicName: [
          { value: '', disabled: true },
          [Validators.required]
        ],

        registrationNumber: [
          { value: '', disabled: true },
          [Validators.required]
        ],

        clinicType: [
          { value: null, disabled: true },
          [Validators.required]
        ],

        address: [
          { value: '', disabled: true },
          [Validators.required]
        ],

        city: [
          { value: '', disabled: true },
          [Validators.required]
        ],

        pincode: [
          { value: '', disabled: true },
          [Validators.required]
        ],

        phone: [
          { value: '', disabled: true },
          [Validators.required]
        ],

        clinicEmail: [
          { value: '', disabled: true },
          [Validators.required, Validators.email]
        ],

        primarySpeciality: [
          { value: null, disabled: true },
          [Validators.required]
        ],

        // 🔹 STEP 2 — Admin Details
        firstName: [
          { value: '', disabled: true },
          [Validators.required]
        ],

        lastName: [
          { value: '', disabled: true },
          [Validators.required]
        ],

        role: [
          { value: null, disabled: true },
          [Validators.required]
        ],

        adminEmail: [
          { value: '', disabled: true },
          [Validators.required, Validators.email]
        ],

        mobile: [
          { value: '', disabled: true },
          [Validators.required]
        ],

        password: [
          { value: '', disabled: true },
          [Validators.required, Validators.minLength(8)]
        ],

        confirmPassword: [
          { value: '', disabled: true },
          [Validators.required]
        ],

        // 🔹 Terms
        terms: [
          { value: false, disabled: true },
          [Validators.requiredTrue]
        ]
      },
      // {
      //   validators: this.passwordMatchValidator
      // }
    );
    // this.clinicForm = this.fb.group({
    //   // STEP 1
    //   clinicName: [{ value: '', Validators.required }],
    //   registrationNumber: ['', Validators.required],
    //   clinicType: ['', Validators.required],
    //   address: ['', Validators.required],
    //   city: ['', Validators.required],
    //   pincode: ['', Validators.required],
    //   phone: ['', Validators.required],
    //   clinicEmail: ['', [Validators.required, Validators.email]],
    //   primarySpeciality: ['', Validators.required],

    //   // STEP 2
    //   firstName: ['', Validators.required],
    //   lastName: ['', Validators.required],
    //   role: ['', Validators.required],
    //   adminEmail: ['', [Validators.required, Validators.email]],
    //   mobile: ['', Validators.required],
    //   password: ['', [Validators.required, Validators.minLength(8)]],
    //   confirmPassword: ['', Validators.required]
    // });


  }

  // 👉 Next Step
  public nextStep() {
    if (this.currentStep === 1 && this.isStep1Valid()) {
      this.currentStep = 2;
    } else if (this.currentStep === 2 && this.isStep2Valid()) {
      this.currentStep = 3;
    }
    console.log(this.clinicForm.getRawValue());
  }

  // 👉 Previous Step
  public prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  // 👉 Step Validations
  public isStep1Valid(): boolean {
    const controls = [
      'clinicName', 'registrationNumber', 'clinicType',
      'address', 'city', 'pincode', 'phone', 'clinicEmail', 'primarySpeciality'
    ];
    controls.forEach(c => this.clinicForm.get(c)?.markAsTouched());
    return controls.every(c => this.clinicForm.get(c)?.valid);
  }

  public isStep2Valid(): boolean {
    const controls = [
      'firstName', 'lastName', 'role',
      'adminEmail', 'mobile', 'password', 'confirmPassword'
    ];
    controls.forEach(c => this.clinicForm.get(c)?.markAsTouched());
    return controls.every(c => this.clinicForm.get(c)?.valid);
  }

  public togglePassword() {
    this.showPassword = !this.showPassword;
  }

  public toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  public onSpecialityChange(event: any) {
    const selected = this.clinicForm.get('primarySpeciality')?.value;
    console.log('Selected Speciality Object:', selected);
    // Explicit patch (optional, Angular already does it)
    this.clinicForm.patchValue({
      primarySpeciality: selected
    });
  }
  public clinicTypeList: IClinicTypeData[] = [];
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

  public primarySpecialities: IPrimarySpecialityData[] = [];
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

  public rolesList: IRoleData[] = [];
  private getAllRoles(): void {
    this._roleService.getAllRoles().subscribe({
      next: (res: IRole) => {
        this.rolesList = res.data ?? [];
      },
      error: (err) => {
        console.error('Error fetching clinic types:', err);
        this.rolesList = [];
      }
    });
  }

  private transformClinicPayload(data: any): any {
    return {
      clinicName: data.clinicName,
      registrationNumber: data.registrationNumber,
      clinicType: data.clinicType,
      address: data.address,
      city: data.city,
      pincode: Number(data.pincode),
      phone: Number(data.phone),
      clinicEmail: data.clinicEmail,

      primarySpeciality: data.primarySpeciality
        ? [data.primarySpeciality]
        : [],

      admin: {
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
        adminEmail: data.adminEmail,
        mobile: String(data.mobile),
        password: data.password
      }
    };
  }

  // 👉 Submit
  public submit() {
    this.submitted = true;
    if (this.clinicForm.invalid) return;
    console.log(this.clinicForm.getRawValue());
    if (this.clinicForm.valid) {
      let payload = this.transformClinicPayload(this.clinicForm.getRawValue());
      this._clinics.createClinic(payload).pipe(take(1)).subscribe({
        next: (data) => {
          this.clinicForm.reset();
          this.currentStep = 1;
        },
        error: (err) => {
          console.error('Signup failed:', err);
        }
      });
    }
  }

  public patchClinicData(): void {
    const dummyData = this.generateDummyClinicData();
    this.clinicForm.patchValue(dummyData);
  }

  public generateDummyClinicData() {

    const clinicPrefixes = ['Care', 'Life', 'Wellness', 'Health', 'Shree', 'Om', 'Apex'];
    const clinicTypes = ['General Clinic', 'Multi-Specialty', 'Dental', 'Diagnostic Center', 'Hospital'];
    const areas = ['Adajan', 'Vesu', 'Katargam', 'Varachha', 'Pal', 'Udhna'];
    const specialities = ['Cardiology', 'Neurology', 'Orthopedics', 'Pulmonology', 'Ophthalmology', 'General Medicine', 'Pediatrics', 'Gynaecology'];
    const random = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
    const randomNum = (len: number) => Math.floor(Math.random() * Math.pow(10, len));
    const id = Math.floor(100 + Math.random() * 900);
    return {
      clinicName: `${random(clinicPrefixes)} ${random(clinicPrefixes)} Clinic ${id}`,
      registrationNumber: `GJ-CLN-2026-${id}`,
      clinicType: random(clinicTypes),
      address: `${Math.floor(1 + Math.random() * 200)} ${random(areas)} Main Road`,
      city: 'Surat',
      pincode: `3950${Math.floor(10 + Math.random() * 89)}`,
      phone: Number(`9${Math.floor(100000000 + Math.random() * 899999999)}`),
      clinicEmail: `clinic${id}@${random(['gmail.com', 'yahoo.com', 'outlook.com'])}`,
      primarySpeciality: random(specialities)
    };
  }
  public patchAdminData(): void {
    const dummyData = this.generateDummyAdminData();
    this.clinicForm.patchValue(dummyData);
  }

  public generateDummyAdminData() {
    const firstNames = ['Riya', 'Aarav', 'Neha', 'Arjun', 'Priya', 'Karan', 'Sneha', 'Rahul'];
    const lastNames = ['Sharma', 'Patel', 'Mehta', 'Gupta', 'Joshi', 'Desai', 'Kapoor'];
    const roles = ['Chief Medical Officer', 'Clinic Owner', 'Hospital Administrator', 'Head Doctor', 'Practice Manager'];
    const emailDomains = ['gmail.com', 'outlook.com', 'yahoo.com'];
    const random = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
    const firstName = random(firstNames);
    const lastName = random(lastNames);
    const role = random(roles);
    const uniqueId = Math.floor(100 + Math.random() * 900);
    // Strong password generator (8+ chars, mix)
    const password = `Admin123`;
    return {
      firstName,
      lastName,
      role,
      mobile: Number(`9${Math.floor(100000000 + Math.random() * 899999999)}`),
      adminEmail: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${uniqueId}@${random(emailDomains)}`,
      password,
      confirmPassword: password
    };
  }
}
