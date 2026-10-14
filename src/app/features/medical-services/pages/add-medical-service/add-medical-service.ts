import { Service } from './../../../../core/interface/basic.interface';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../../../../core/services/modal-service';
import { MedicalServices } from '../../../../core/services/medical-services';
import { MedicalServicesDetails } from '../../../../core/interface/basic.interface';

@Component({
  selector: 'app-add-medical-service',
  standalone: false,
  // imports: [],
  templateUrl: './add-medical-service.html',
  styleUrl: './add-medical-service.css',
})
export class AddMedicalService {

  public isEdit: boolean = false;
  public serviceSaved = new EventEmitter<any>()
  public serviceDetail: MedicalServicesDetails | null = null;

  public currentStep = 1;
  readonly totalSteps = 5;
  public MedicalServicesForm!: FormGroup;
  public statusList = [
    { id: 1, key: 'active', value: 'Active' },
    { id: 2, key: 'inactive', value: 'In-Active' },
    { id: 3, key: 'discontinue', value: 'Discontinue' }
  ];

  public categoryList = [
    'Consultation',
    'Laboratory',
    'Radiology',
    'Procedure',
    'Operation Theater',
    'Room Charge',
    'Allied Health',
    'Emergency',
    'Administrative'
  ];

  public departmentList = [
    'Pathology',
    'Radiology',
    'Cardiology',
    'General OPD',
    'IPD Nursing'
  ];

  public calculationTypeList = [
    { id: 1, value: 'Percentage', key: 'Percentage Split (%)' },
    { id: 2, value: 'Fixed', key: 'Fixed Amount' },
    { id: 3, value: 'None', key: 'None' }
  ];

  public codingStandardList = [
    {
      value: 'CPT',
      label: 'CPT (Current Procedural Terminology)'
    },
    {
      value: 'ICD-10',
      label: 'ICD-10 (Clinical Modification)'
    },
    {
      value: 'LOINC',
      label: 'LOINC (Logical Observation Identifiers)'
    },
    {
      value: 'CUSTOM',
      label: 'CUSTOM'
    }
  ];

  constructor(
    private fb: FormBuilder,
    public _modalService: ModalService,
    public _medicalServices: MedicalServices
  ) {
  }

  ngOnInit(): void {
    this.initMedicalServices();
    this.setupTaxConfigListener();

    if (this.serviceDetail) {
      this.isEdit = true;
      this.patchMedicalService(this.serviceDetail);
    }
  }

  private patchMedicalService(service: any): void {
    this.MedicalServicesForm.patchValue({
      serviceCode: service.serviceCode,
      name: service.name,
      description: service.description,
      category: service.category,
      subCategory: service.subCategory,
      department: service.department,
      preparationInstructions: service.preparationInstructions,
      requiresConsentForm: service.requiresConsentForm,
      requiresDoctorOrder: service.requiresDoctorOrder,
      isPackageComponent: service.isPackageComponent,

      basePricing: service.basePricing,
      taxConfig: service.taxConfig,
      doctorShare: service.doctorShare,

      standardMedicalCodes: service.standardMedicalCodes?.[0] || {
        codeType: '',
        code: ''
      },

      status: service.status,
      isActive: service.isActive
    });
  }

  private initMedicalServices(): void {
    this.MedicalServicesForm = this.fb.group({
      serviceCode: [this.generateServiceCode(), [Validators.required, Validators.maxLength(50)]],
      name: ['', [Validators.required, Validators.maxLength(150)]],
      description: [''],
      category: ['', Validators.required],
      subCategory: [''],
      department: ['', Validators.required],
      preparationInstructions: [''],
      requiresConsentForm: [false],
      requiresDoctorOrder: [true],
      isPackageComponent: [true],
      basePricing: this.fb.group({
        opdRate: [0, [Validators.required, Validators.min(0)]],
        ipdRate: [0, [Validators.required, Validators.min(0)]],
        emergencyRate: [0, [Validators.required, Validators.min(0)]],
        dayCareRate: [0, [Validators.min(0)]]
      }),
      // Tax Configuration
      taxConfig: this.fb.group({
        isTaxable: [false],
        taxPercentage: [{ value: 0, disabled: true }, [Validators.min(0), Validators.max(100)]],
        taxCode: [{ value: '', disabled: true }]
      }),
      // Doctor Share
      doctorShare: this.fb.group({
        calculationType: ['None'],
        value: [0, [Validators.min(0)]]
      }),
      // Medical Codes
      standardMedicalCodes: this.fb.group({
        codeType: [''],
        code: ['']
      }),
      // Status
      status: ['Active'],
      isActive: [true]
    });
  }

  setupTaxConfigListener(): void {
    const taxConfig = this.MedicalServicesForm.get('taxConfig');
    const isTaxableControl = taxConfig?.get('isTaxable');
    const taxPercentageControl = taxConfig?.get('taxPercentage');
    const taxCodeControl = taxConfig?.get('taxCode');
    isTaxableControl?.valueChanges.subscribe((isTaxable: boolean) => {
      if (isTaxable) {
        // Enable tax fields
        taxPercentageControl?.enable();
        taxCodeControl?.enable();
      } else {
        // Disable tax fields
        taxPercentageControl?.disable();
        taxCodeControl?.disable();
        // Optional: reset values when tax is disabled
        taxPercentageControl?.setValue(0);
        taxCodeControl?.setValue('');
      }
    });
  }

  public onStatusToggle(event: any) {
    const isChecked = event.target.checked;
    this.MedicalServicesForm.patchValue({
      status: isChecked ? 'active' : 'inactive'
    });
  }

  public closeModePopup(): void {
    // Logic to close the modal popup
    this._modalService.closeComponentModal();
  }

  public nextStep(): void {
    // Validate current step before proceeding
    if (!this.validateCurrentStep()) {
      return;
    }
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  public previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  public goToStep(step: number): void {
    if (step < 1 || step > this.totalSteps) {
      return;
    }
    // Only allow moving to previous/current step directly
    if (step <= this.currentStep) {
      this.currentStep = step;
    }
  }

  public validateCurrentStep(): boolean {
    let controlsToValidate: string[] = [];
    switch (this.currentStep) {
      case 1:
        controlsToValidate = [
          'serviceCode',
          'name',
          'category',
          'department',
          'status'
        ];
        break;

      case 2:
        controlsToValidate = [
          'basePricing.opdRate',
          'basePricing.ipdRate',
          'basePricing.emergencyRate'
        ];
        break;

      case 3:
        // Tax fields are optional according to your form.
        // No mandatory validation needed here.
        return true;

      case 4:
        // Your current calculationType has no required validator
        return true;

      case 5:
        return true;
    }
    let isValid = true;
    controlsToValidate.forEach(controlName => {
      const control = this.MedicalServicesForm.get(controlName);
      if (control) {
        control.markAsTouched();
        control.updateValueAndValidity();
        if (control.invalid) {
          isValid = false;
        }
      }
    });
    return isValid;
  }

  private checkInvalidControls(): void {
    Object.keys(this.MedicalServicesForm.controls).forEach(key => {
      const control = this.MedicalServicesForm.get(key);
      if (control?.invalid) {
        console.log({
          control: key,
          value: control.value,
          errors: control.errors
        });
        control.markAsTouched();
      }
    });
  }

  public saveMedicalService(): void {
    if (this.MedicalServicesForm.invalid) {
      this.checkInvalidControls();
      this.MedicalServicesForm.markAllAsTouched();
      return;
    }
    const payload = this.MedicalServicesForm.getRawValue();
    if (!this.isEdit) {
      this._medicalServices.createService(payload).subscribe({
        next: (res: any) => {
          console.log(res);
          this.serviceSaved.emit(true);
        }, error: (error) => {
          console.error('Error fetching doctor availability:', error);
        },
        complete: () => {
          this.isEdit = false;
          this.serviceSaved.emit();
          this.closeModePopup();
        },
      });
    } else {
      const serviceId = this.serviceDetail?._id;
      if (!serviceId) {
        console.error('Service ID is missing');
        return;
      }
      this._medicalServices.updateService(serviceId, payload).subscribe({
        next: (res: any) => {
          console.log(res);
          this.serviceSaved.emit(true);
        },
        error: (error) => {
          console.error('Error updating medical service:', error);
        },
        complete: () => {
          this.isEdit = false;
          this.serviceSaved.emit();
          this.closeModePopup();
        }
      });
    }
  }
  private generateServiceCode(): string {
    const randomNumber = (min: number, max: number): number => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    return `MED-${Date.now().toString().slice(-6)}-${randomNumber(10, 99)}`;
  }

  generateDummyMedicalService(): void {
    const randomNumber = (min: number, max: number): number => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    const randomItem = <T>(items: T[]): T => {
      return items[Math.floor(Math.random() * items.length)];
    };
    const serviceCode = this.generateServiceCode();
    // Dummy master data
    const categories = [
      'Consultation',
      'Laboratory',
      'Radiology',
      'Procedure',
      'Operation Theater',
      'Room Charge',
      'Allied Health',
      'Emergency',
      'Administrative'
    ];

    const departments = [
      'General Medicine',
      'Cardiology',
      'Radiology',
      'Laboratory',
      'Emergency',
      'Orthopedics',
      'Pediatrics',
      'Neurology',
      'Dermatology',
      'Gynecology'
    ];

    const serviceNames: Record<string, string[]> = {
      Consultation: [
        'General Physician Consultation',
        'Specialist Consultation',
        'Follow-up Consultation',
        'Initial Medical Consultation',
        'Senior Consultant Review'
      ],

      Laboratory: [
        'Complete Blood Count',
        'Liver Function Test',
        'Kidney Function Test',
        'Blood Glucose Test',
        'Lipid Profile',
        'Thyroid Function Test'
      ],

      Radiology: [
        'Chest X-Ray',
        'Abdominal Ultrasound',
        'CT Scan Brain',
        'MRI Brain',
        'MRI Spine',
        'Pelvic Ultrasound'
      ],

      Procedure: [
        'Wound Dressing',
        'IV Cannulation',
        'Catheterization',
        'Minor Surgical Procedure',
        'Biopsy Procedure'
      ],

      'Operation Theater': [
        'Minor Surgery',
        'Major Surgery',
        'Laparoscopic Procedure',
        'Emergency Surgery'
      ],

      'Room Charge': [
        'General Ward Room',
        'Private Room',
        'Deluxe Room',
        'ICU Room',
        'Isolation Room'
      ],

      'Allied Health': [
        'Physiotherapy Session',
        'Dietitian Consultation',
        'Speech Therapy',
        'Occupational Therapy',
        'Respiratory Therapy'
      ],

      Emergency: [
        'Emergency Consultation',
        'Emergency Treatment',
        'Trauma Assessment',
        'Emergency Procedure'
      ],

      Administrative: [
        'Medical Certificate',
        'Health Checkup Package',
        'Medical Report',
        'Insurance Medical Assessment'
      ]
    };

    const category = randomItem(categories);
    const name = randomItem(serviceNames[category]);

    // Pricing
    const opdRate = randomNumber(100, 2000);
    const ipdRate = randomNumber(200, 3000);
    const emergencyRate = randomNumber(300, 5000);
    const dayCareRate = randomNumber(100, 2500);

    // Tax
    const isTaxable = randomItem([true, false]);

    const taxPercentage = isTaxable
      ? randomItem([5, 10, 12, 18])
      : 0;

    const taxCode = isTaxable
      ? randomItem(['GST5', 'GST10', 'GST12', 'GST18'])
      : '';

    // Doctor share
    const calculationType = randomItem([
      'Percentage',
      'Fixed',
      'None'
    ]);

    let doctorShareValue = 0;

    if (calculationType === 'Percentage') {
      doctorShareValue = randomItem([10, 15, 20, 25, 30, 40]);
    }

    if (calculationType === 'Fixed') {
      doctorShareValue = randomNumber(100, 1000);
    }

    // Medical coding
    const codingData = this.getDummyMedicalCode(category);

    // Populate form
    this.MedicalServicesForm.patchValue({

      // Basic Information
      serviceCode,

      name,

      description:
        `${name} service provided under ${category} department.`,

      category,

      subCategory:
        randomItem([
          'Routine',
          'Diagnostic',
          'Specialist',
          'General',
          'Advanced',
          'Emergency'
        ]),

      department:
        randomItem(departments),

      preparationInstructions:
        randomItem([
          'No special preparation required.',
          'Patient should remain fasting for 8 hours.',
          'Bring previous medical reports if available.',
          'Patient should follow physician instructions.',
          'Arrive 15 minutes before the scheduled appointment.'
        ]),

      // Requirements
      requiresConsentForm:
        randomItem([true, false]),

      requiresDoctorOrder:
        randomItem([true, true, false]),

      isPackageComponent:
        randomItem([true, false]),

      // Pricing
      basePricing: {
        opdRate,
        ipdRate,
        emergencyRate,
        dayCareRate
      },

      // Tax
      taxConfig: {
        isTaxable,
        taxPercentage,
        taxCode
      },

      // Doctor Share
      doctorShare: {
        calculationType,
        value: doctorShareValue
      },

      // Medical Codes
      standardMedicalCodes: codingData,

      // Status
      status:
        randomItem(['Active', 'Active', 'Active', 'Inactive']),

      isActive: true
    });

    // Because taxPercentage and taxCode are disabled initially,
    // enable/disable them based on isTaxable.
    const taxConfig = this.MedicalServicesForm.get('taxConfig');

    if (isTaxable) {
      taxConfig?.get('taxPercentage')?.enable();
      taxConfig?.get('taxCode')?.enable();
    } else {
      taxConfig?.get('taxPercentage')?.disable();
      taxConfig?.get('taxCode')?.disable();
    }

    console.log(
      'Generated Dummy Medical Service:',
      this.MedicalServicesForm.getRawValue()
    );
  }

  // ---------------------------------------
  // Random Helpers
  // ---------------------------------------

  private randomItem<T>(items: T[]): T {
    return items[Math.floor(Math.random() * items.length)];
  }

  private randomNumber(min: number, max: number): number {
    return Math.floor(
      Math.random() * (max - min + 1)
    ) + min;
  }


  private getDummyMedicalCode(category: string): {
    codeType: string;
    code: string;
  } {

    const codingData: Record<string, { codeType: string; code: string }[]> = {

      Consultation: [
        { codeType: 'CPT', code: '99201' },
        { codeType: 'CPT', code: '99202' },
        { codeType: 'CPT', code: '99203' },
        { codeType: 'CPT', code: '99204' },
        { codeType: 'CPT', code: '99205' }
      ],

      Laboratory: [
        { codeType: 'LOINC', code: '718-7' },
        { codeType: 'LOINC', code: '4548-4' },
        { codeType: 'LOINC', code: '2093-3' },
        { codeType: 'LOINC', code: '2160-0' },
        { codeType: 'LOINC', code: '3051-0' }
      ],

      Radiology: [
        { codeType: 'CPT', code: '71046' },
        { codeType: 'CPT', code: '74177' },
        { codeType: 'CPT', code: '70551' },
        { codeType: 'CPT', code: '72148' }
      ],

      Procedure: [
        { codeType: 'CPT', code: '12001' },
        { codeType: 'CPT', code: '36415' },
        { codeType: 'CPT', code: '51701' }
      ],

      'Operation Theater': [
        { codeType: 'CPT', code: '47562' },
        { codeType: 'CPT', code: '44970' }
      ],

      'Room Charge': [
        { codeType: 'CUSTOM', code: 'ROOM-GEN-001' },
        { codeType: 'CUSTOM', code: 'ROOM-PRV-001' },
        { codeType: 'CUSTOM', code: 'ROOM-ICU-001' }
      ],

      'Allied Health': [
        { codeType: 'CPT', code: '97110' },
        { codeType: 'CPT', code: '97140' }
      ],

      Emergency: [
        { codeType: 'CPT', code: '99281' },
        { codeType: 'CPT', code: '99282' },
        { codeType: 'CPT', code: '99283' }
      ],

      Administrative: [
        { codeType: 'CUSTOM', code: 'ADMIN-MED-001' },
        { codeType: 'CUSTOM', code: 'MED-CERT-001' }
      ]
    };

    return this.randomItem(
      codingData[category] || [
        {
          codeType: 'CUSTOM',
          code: `CUSTOM-${Math.floor(Math.random() * 99999)}`
        }
      ]
    );
  }


}
