import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { LocationService } from '../../../../core/services/location-service';

@Component({
  selector: 'app-nurse-registration',
  standalone: false,
  templateUrl: './nurse-registration.html',
  styleUrl: './nurse-registration.css',
})
export class NurseRegistration {

  public currentStep = 1;
  public nurseForm!: FormGroup;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private _LocationService: LocationService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }


  private initForm(): void {
    this.nurseForm = this.fb.group({
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
      dateOfJoin: [
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
        [Validators.required, Validators.email]
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

      // 🔹 Identification & Professional Info
      aadhaarNumber: [''],
      licenseNumber: ['', Validators.required],
      licenseExpiryDate: [''],
      departmentId: ['', Validators.required],
      assignedWard: [''],
      employmentType: ['Full-Time', Validators.required],
      shiftType: ['Day', Validators.required],
      experience: [0, [Validators.min(0)]],

      // 🔹 Emergency Contact Info
      emergencyContactName: [''],
      emergencyContactRelation: [''],
      emergencyContactPhone: [''],

      // 🔹 Status Info
      status: ['inactive'],
      officeStatus: ['On Duty'],

      // 🔹 Array Sub-Schemas (FormArray)
      qualifications: this.fb.array([this.createQualificationGroup()]),
      certifications: this.fb.array([this.createCertificationGroup()]),

      // 🔹 Terms
      term: [false, Validators.requiredTrue]
    });

    // React to country changes
    this.nurseForm.get('country')!.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((id: number | null) => {
        this.nurseForm.patchValue({ state: null, city: null }, { emitEvent: false });
        this._LocationService.selectICountry(id);
      });

    // React to state changes
    this.nurseForm.get('state')!.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((id: number | null) => {
        this.nurseForm.patchValue({ city: null }, { emitEvent: false });
        this._LocationService.selectIState(id);
      });

    // React to city changes
    this.nurseForm.get('city')!.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((id: number | null) => this._LocationService.selectICity(id));
  }

  // 🔹 FormArray Item Generators
  private createQualificationGroup(): FormGroup {
    return this.fb.group({
      degree: ['', Validators.required],
      institution: ['', Validators.required],
      yearObtained: [null]
    });
  }

  private createCertificationGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      issuedDate: [null],
      expiryDate: [null]
    });
  }

  // 🔹 Getters for Template Access
  get qualificationsArray(): FormArray {
    return this.nurseForm.get('qualifications') as FormArray;
  }

  get certificationsArray(): FormArray {
    return this.nurseForm.get('certifications') as FormArray;
  }

  // 🔹 Helper methods to dynamically add/remove Array elements
  addQualification(): void {
    this.qualificationsArray.push(this.createQualificationGroup());
  }

  removeQualification(index: number): void {
    this.qualificationsArray.removeAt(index);
  }

  addCertification(): void {
    this.certificationsArray.push(this.createCertificationGroup());
  }

  removeCertification(index: number): void {
    this.certificationsArray.removeAt(index);
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

  onSubmit() {
  }
}
