import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SideBarPatientHeader } from '../../../../shared/component/side-bar-patient-header/side-bar-patient-header';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-patient-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SideBarPatientHeader],
  templateUrl: './patient-edit.html',
  styleUrl: './patient-edit.css',
})
export class PatientEdit {
  @Input() patientDetails: any | null = null;

  patientForm!: FormGroup;

  constructor(private fb: FormBuilder) { }


  ngOnInit(): void {
    this.createForm();
    if (this.patientDetails) {
      this.patchPatientData(this.patientDetails);
    }
  }


  private createForm(): void {
    this.patientForm = this.fb.group({

      // =========================
      // Personal Information
      // =========================
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],

      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      age: [{ value: '', disabled: true }],

      phone: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/)
      ]],

      email: ['', [
        Validators.required,
        Validators.email
      ]],

      aadhaarNumber: [''],

      // =========================
      // Address
      // =========================
      address: [''],
      country: ['India'],
      state: [''],
      city: [''],
      pincode: ['', Validators.pattern(/^[0-9]{6}$/)],

      // =========================
      // Emergency Contact
      // =========================
      emergencyContact: this.fb.group({
        name: ['', Validators.required],
        relation: ['', Validators.required],
        phone: ['', [
          Validators.required,
          Validators.pattern(/^[0-9]{10}$/)
        ]]
      }),

      // =========================
      // Medical History
      // =========================
      medicalHistory: this.fb.group({

        condition: [''],

        bloodGroup: [''],

        allergies: [''],

        medications: [''],

        surgeries: [''],

        familyHistory: [''],

        notes: [''],

        // =========================
        // Lifestyle
        // =========================
        lifestyle: this.fb.group({

          smoking: this.fb.group({
            status: [false],
            frequency: [''],
            durationYears: [null]
          }),

          alcohol: this.fb.group({
            status: [false],
            frequency: ['']
          }),

          substanceUse: this.fb.group({
            tobacco: [false],
            drugs: [false]
          }),

          activityLevel: [''],
          dietType: [''],
          exerciseFrequency: [''],

          sleepHours: [null],
          stressLevel: [''],
          caffeineIntake: [''],
          waterIntake: [null],
          occupationType: [''],

          hobbies: this.fb.array<FormControl<string | null>>([])
        })
      }),

      // =========================
      // Insurance
      // =========================
      insuranceDetails: this.fb.array([])
    });
  }

  // =====================================================
  // Getters
  // =====================================================

  get insuranceDetails(): FormArray {
    return this.patientForm.get('insuranceDetails') as FormArray;
  }

  get hobbies(): FormArray<FormControl<string | null>> {
    return this.patientForm.get(
      'medicalHistory.lifestyle.hobbies'
    ) as FormArray<FormControl<string | null>>;
  }

  // =====================================================
  // Insurance Form
  // =====================================================

  private createInsuranceForm(data?: any): FormGroup {
    return this.fb.group({
      _id: [data?._id || null],

      providerName: [
        data?.providerName || '',
        Validators.required
      ],

      policyNumber: [
        data?.policyNumber || '',
        Validators.required
      ],

      policyHolderName: [
        data?.policyHolderName || '',
        Validators.required
      ],

      coverageAmount: [
        data?.coverageAmount || null,
        [Validators.required, Validators.min(0)]
      ],

      coverageDetails: [
        data?.coverageDetails || ''
      ],

      validFrom: [
        this.formatDate(data?.validFrom)
      ],

      validTo: [
        this.formatDate(data?.validTo)
      ],

      status: [
        data?.status || 'active'
      ]
    });
  }

  addInsurance(): void {
    this.insuranceDetails.push(
      this.createInsuranceForm()
    );
  }

  removeInsurance(index: number): void {
    this.insuranceDetails.removeAt(index);
  }

  // =====================================================
  // Hobby Form
  // =====================================================

  addHobby(value: string = ''): void {
    this.hobbies.push(
      this.fb.control(value)
    );
  }

  removeHobby(index: number): void {
    this.hobbies.removeAt(index);
  }

  // =====================================================
  // Patch API Response
  // =====================================================

  patchPatientData(response: any): void {

    const patient = response?.patient ?? response;

    if (!patient) {
      return;
    }

    // Clear existing arrays
    this.insuranceDetails.clear();
    this.hobbies.clear();

    const medicalHistory =
      patient.medicalHistories?.[0];

    const lifestyle =
      medicalHistory?.lifestyle;

    // Add hobbies
    lifestyle?.hobbies?.forEach((hobby: string) => {
      this.addHobby(hobby);
    });

    // Add insurance policies
    patient.insuranceDetails?.forEach((insurance: any) => {
      this.insuranceDetails.push(
        this.createInsuranceForm(insurance)
      );
    });

    // Patch main form
    this.patientForm.patchValue({

      firstName: patient.firstName,
      middleName: patient.middleName,
      lastName: patient.lastName,

      dateOfBirth: this.formatDate(
        patient.dateOfBirth
      ),

      gender: patient.gender,
      age: patient.age,

      phone: patient.phone,
      email: patient.email,

      aadhaarNumber: patient.aadhaarNumber,

      address: patient.address,
      country: patient.country,
      state: patient.state,
      city: patient.city,
      pincode: patient.pincode,

      emergencyContact: {
        name: patient.emergencyContact?.name,
        relation: patient.emergencyContact?.relation,
        phone: patient.emergencyContact?.phone
      },

      medicalHistory: {

        condition: medicalHistory?.condition,
        bloodGroup: medicalHistory?.bloodGroup,

        // Convert array to comma separated string
        allergies:
          medicalHistory?.allergies?.join(', ') || '',

        medications:
          medicalHistory?.medications?.join(', ') || '',

        surgeries:
          medicalHistory?.surgeries?.join(', ') || '',

        familyHistory:
          medicalHistory?.familyHistory || '',

        notes:
          medicalHistory?.notes || '',

        lifestyle: {

          smoking: {
            status:
              lifestyle?.smoking?.status ?? false,

            frequency:
              lifestyle?.smoking?.frequency || '',

            durationYears:
              lifestyle?.smoking?.durationYears ?? null
          },

          alcohol: {
            status:
              lifestyle?.alcohol?.status ?? false,

            frequency:
              lifestyle?.alcohol?.frequency || ''
          },

          substanceUse: {
            tobacco:
              lifestyle?.substanceUse?.tobacco ?? false,

            drugs:
              lifestyle?.substanceUse?.drugs ?? false
          },

          activityLevel:
            lifestyle?.activityLevel || '',

          dietType:
            lifestyle?.dietType || '',

          exerciseFrequency:
            lifestyle?.exerciseFrequency || '',

          sleepHours:
            lifestyle?.sleepHours ?? null,

          stressLevel:
            lifestyle?.stressLevel || '',

          caffeineIntake:
            lifestyle?.caffeineIntake || '',

          waterIntake:
            lifestyle?.waterIntake ?? null,

          occupationType:
            lifestyle?.occupationType || ''
        }
      }
    });
  }

  // =====================================================
  // Update
  // =====================================================

  updatePatient(): void {

    if (this.patientForm.invalid) {
      this.patientForm.markAllAsTouched();
      return;
    }

    // getRawValue() is used because age is disabled
    const formValue = this.patientForm.getRawValue();

    const payload = {
      ...formValue,

      // Convert comma-separated values back to arrays
      medicalHistory: {
        ...formValue.medicalHistory,

        allergies: this.convertToArray(
          formValue.medicalHistory.allergies
        ),

        medications: this.convertToArray(
          formValue.medicalHistory.medications
        ),

        surgeries: this.convertToArray(
          formValue.medicalHistory.surgeries
        )
      }
    };

    console.log('UPDATE PATIENT PAYLOAD:', payload);

    // Call your API here
    //
    // this.patientService.updatePatient(
    //   patientId,
    //   payload
    // ).subscribe(...)
  }

  // =====================================================
  // Helpers
  // =====================================================

  private convertToArray(value: string): string[] {
    if (!value) {
      return [];
    }

    return value
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0);
  }

  private formatDate(date: string | null | undefined): string {
    if (!date) {
      return '';
    }

    return new Date(date)
      .toISOString()
      .split('T')[0];
  }
}
