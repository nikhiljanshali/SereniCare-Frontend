import { Component, EventEmitter } from '@angular/core';
import { ModalService } from '../../../../core/services/modal-service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InsuranceTpaService } from '../../../../core/services/insurace-tpa';
import { InsuranceTAPDetails } from '../../../../core/interface/basic.interface';

@Component({
  selector: 'app-add-insurance-tpa',
  standalone: false,
  // imports: [],
  templateUrl: './add-insurance-tpa.html',
  styleUrl: './add-insurance-tpa.css',
})
export class AddInsuranceTPA {

  public isEdit: boolean = false;
  public insuranceTPASaved = new EventEmitter<any>()
  public tpaForm!: FormGroup;
  public currentStep = 1;
  readonly totalSteps = 7;


  // Dropdown Enums
  public tpaTypes: string[] = ['Insurance Provider', 'TPA', 'Government Scheme', 'Corporate Direct'];
  public roomTypes: string[] = ['General Ward', 'Semi-Private', 'Private', 'ICU', 'Deluxe'];
  public contractStatuses: string[] = ['Active', 'Suspended', 'Expired', 'Under Negotiation'];

  public insuranceDetail: InsuranceTAPDetails | null = null;

  constructor(
    private fb: FormBuilder,
    public _modalService: ModalService,
    public _insuranceTpaService: InsuranceTpaService
  ) {

  }

  ngOnInit(): void {
    this.initForm();
    if (this.insuranceDetail) {
      console.log(this.insuranceDetail);
      this.isEdit = true;
      this.patchFormValue(this.insuranceDetail);
    }
  }

  private initForm(): void {
    this.tpaForm = this.fb.group({
      // Base Info
      tpaCode: ['', [Validators.required, Validators.pattern(/^[A-Z0-9-]+$/)]],
      name: ['', [Validators.required]],
      type: ['TPA', [Validators.required]],
      taxIdOrIRDAI: [''],
      isActive: [true],

      // Contact Details Sub-Group
      contactDetails: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s]{8,15}$/)]],
        tollFreeNumber: [''],
        website: [''],
        claimSubmissionEmail: ['', [Validators.email]],
        preAuthEmail: ['', [Validators.email]]
      }),

      // Address Sub-Group
      address: this.fb.group({
        street: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        zipCode: ['', [Validators.required]],
        country: ['India']
      }),

      // Operational & Policy Rules Sub-Group
      policyRules: this.fb.group({
        defaultCoPayPercentage: [0, [Validators.min(0), Validators.max(100)]],
        preAuthRequired: [true],
        claimSubmissionWindowDays: [30, [Validators.min(0)]],
        paymentTurnaroundDays: [45, [Validators.min(0)]],
        discountPercentage: [0, [Validators.min(0), Validators.max(100)]]
      }),

      // Contract Details Sub-Group
      contractDetails: this.fb.group({
        contractStartDate: ['', [Validators.required]],
        contractEndDate: ['', [Validators.required]],
        creditLimit: [0, [Validators.min(0)]],
        status: ['Active', [Validators.required]]
      }),

      // Form Arrays
      nodalOfficers: this.fb.array([]),
      contractedTariff: this.fb.array([]),
      documents: this.fb.array([])
    });

    // Initialize with one default entry for arrays if required
    this.addNodalOfficer();
  }

  public patchFormValue(tpaData: any): void {
    if (!tpaData) return;

    // 1. Helper to safely format ISO strings for HTML5 date inputs (YYYY-MM-DD)
    const formatDate = (dateString?: string) => {
      if (!dateString) return '';
      return dateString.split('T')[0];
    };

    // 2. Patch top-level properties and nested FormGroups
    this.tpaForm.patchValue({
      tpaCode: tpaData.tpaCode || '',
      name: tpaData.name || '',
      type: tpaData.type || 'TPA',
      taxIdOrIRDAI: tpaData.taxIdOrIRDAI || '',
      isActive: tpaData.isActive ?? true,

      contactDetails: {
        email: tpaData.contactDetails?.email || '',
        phone: tpaData.contactDetails?.phone || '',
        tollFreeNumber: tpaData.contactDetails?.tollFreeNumber || '',
        website: tpaData.contactDetails?.website || '',
        claimSubmissionEmail: tpaData.contactDetails?.claimSubmissionEmail || '',
        preAuthEmail: tpaData.contactDetails?.preAuthEmail || ''
      },

      address: {
        street: tpaData.address?.street || '',
        city: tpaData.address?.city || '',
        state: tpaData.address?.state || '',
        zipCode: tpaData.address?.zipCode || '',
        country: tpaData.address?.country || 'India'
      },

      policyRules: {
        defaultCoPayPercentage: tpaData.policyRules?.defaultCoPayPercentage ?? 0,
        preAuthRequired: tpaData.policyRules?.preAuthRequired ?? true,
        claimSubmissionWindowDays: tpaData.policyRules?.claimSubmissionWindowDays ?? 30,
        paymentTurnaroundDays: tpaData.policyRules?.paymentTurnaroundDays ?? 45,
        discountPercentage: tpaData.policyRules?.discountPercentage ?? 0
      },

      contractDetails: {
        contractStartDate: formatDate(tpaData.contractDetails?.contractStartDate),
        contractEndDate: formatDate(tpaData.contractDetails?.contractEndDate),
        creditLimit: tpaData.contractDetails?.creditLimit ?? 0,
        status: tpaData.contractDetails?.status || 'Active'
      }
    });

    // 3. Populate FormArrays
    this.patchFormArray(
      this.tpaForm.get('nodalOfficers') as FormArray,
      tpaData.nodalOfficers,
      (item) => this.createNodalOfficerGroup(item)
    );

    this.patchFormArray(
      this.tpaForm.get('contractedTariff') as FormArray,
      tpaData.contractedTariff,
      (item) => this.createContractedTariffGroup(item)
    );

    this.patchFormArray(
      this.tpaForm.get('documents') as FormArray,
      tpaData.documents,
      (item) => this.createDocumentGroup(item)
    );
  }

  /**
 * Reusable helper to clear and populate dynamic FormArrays
 */
  private patchFormArray(
    formArray: FormArray,
    items: any[] | undefined,
    factoryFn: (item: any) => FormGroup
  ): void {
    formArray.clear();
    if (items && Array.isArray(items) && items.length > 0) {
      items.forEach((item) => formArray.push(factoryFn(item)));
    }
  }

  private formatDateForInput(dateString: string): string {
    return dateString ? dateString.split('T')[0] : '';
  }

  /**
 * Dynamic FormArray Helper Methods
 */
  private createNodalOfficerGroup(officer?: any): FormGroup {
    return this.fb.group({
      name: [officer?.name || '', [Validators.required]],
      designation: [officer?.designation || ''],
      email: [officer?.email || '', [Validators.email]],
      phone: [officer?.phone || ''],
      isPrimary: [officer?.isPrimary ?? false]
    });
  }

  private createContractedTariffGroup(tariff?: any): FormGroup {
    return this.fb.group({
      roomType: [tariff?.roomType || '', [Validators.required]],
      maxCappedAmountPerDay: [tariff?.maxCappedAmountPerDay || 0, [Validators.min(0)]],
      isCovered: [tariff?.isCovered ?? true]
    });
  }

  private createDocumentGroup(doc?: any): FormGroup {
    return this.fb.group({
      title: [doc?.title || '', [Validators.required]],
      fileUrl: [doc?.fileUrl || '', [Validators.required]],
      uploadedAt: [doc?.uploadedAt ? this.formatDateForInput(doc.uploadedAt) : '']
    });
  }

  /* -------------------------------------------------------------------------- */
  /*                             FormArray Getters                              */
  /* -------------------------------------------------------------------------- */

  get nodalOfficers(): FormArray {
    return this.tpaForm.get('nodalOfficers') as FormArray;
  }

  get contractedTariff(): FormArray {
    return this.tpaForm.get('contractedTariff') as FormArray;
  }

  get documents(): FormArray {
    return this.tpaForm.get('documents') as FormArray;
  }

  /* -------------------------------------------------------------------------- */
  /*                            Dynamic Form Arrays                             */
  /* -------------------------------------------------------------------------- */

  // Nodal Officers
  // createNodalOfficerGroup(): FormGroup {
  //   return this.fb.group({
  //     name: ['', [Validators.required]],
  //     designation: [''],
  //     email: ['', [Validators.email]],
  //     phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s]{8,15}$/)]],
  //     isPrimary: [false]
  //   });
  // }

  addNodalOfficer(): void {
    this.nodalOfficers.push(this.createNodalOfficerGroup());
  }

  removeNodalOfficer(index: number): void {
    this.nodalOfficers.removeAt(index);
  }

  // Contracted Tariff
  createTariffGroup(): FormGroup {
    return this.fb.group({
      roomType: ['General Ward', [Validators.required]],
      maxCappedAmountPerDay: [null, [Validators.min(0)]],
      isCovered: [true]
    });
  }

  addContractedTariff(): void {
    this.contractedTariff.push(this.createTariffGroup());
  }

  removeContractedTariff(index: number): void {
    this.contractedTariff.removeAt(index);
  }

  // Documents
  // createDocumentGroup(): FormGroup {
  //   return this.fb.group({
  //     title: ['', [Validators.required]],
  //     fileUrl: ['', [Validators.required]],
  //     uploadedAt: [new Date().toISOString().substring(0, 10)]
  //   });
  // }

  addDocument(): void {
    this.documents.push(this.createDocumentGroup());
  }

  removeDocument(index: number): void {
    this.documents.removeAt(index);
  }

  /* -------------------------------------------------------------------------- */
  /*                              Form Submission                               */
  /* -------------------------------------------------------------------------- */

  onSubmit(): void {
    if (this.tpaForm.invalid) {
      this.tpaForm.markAllAsTouched();
      return;
    }
    const payload = this.tpaForm.value;
    if (!this.isEdit) {
      this._insuranceTpaService.createInsuranceTPA(payload).subscribe({
        next: (res: any) => {
          this.insuranceTPASaved.emit(true);
        }, error: (error) => {
          console.error('Error fetching doctor availability:', error);
        },
        complete: () => {
          // Notify parent
          this.insuranceTPASaved.emit();
          this.closeModePopup();
        },
      });
    } else {
      const insuranceId = this.insuranceDetail?._id;
      if (!insuranceId) {
        console.error('Insurance ID is missing');
        return;
      }
      this._insuranceTpaService.updateContractedTariff(insuranceId, payload).subscribe({
        next: (res: any) => {
          this.insuranceTPASaved.emit(true);
        }, error: (error) => {
          console.error('Error fetching doctor availability:', error);
        },
        complete: () => {
          // Notify parent
          this.insuranceTPASaved.emit();
          this.closeModePopup();
        },
      });
    }
  }

  public validateCurrentStep(): boolean {
    let isValid = true;

    switch (this.currentStep) {
      case 1: {
        // Step 1: Base Information
        const baseControls = ['tpaCode', 'name', 'type', 'taxIdOrIRDAI'];
        isValid = this.validateControls(baseControls);
        break;
      }

      case 2: {
        // Step 2: Contact Details
        const contactGroup = this.tpaForm.get('contactDetails') as FormGroup;
        if (contactGroup) {
          contactGroup.markAllAsTouched();
          isValid = contactGroup.valid;
        }
        break;
      }

      case 3: {
        // Step 3: Address
        const addressGroup = this.tpaForm.get('address') as FormGroup;
        if (addressGroup) {
          addressGroup.markAllAsTouched();
          isValid = addressGroup.valid;
        }
        break;
      }

      case 4: {
        // Step 4: Policy Rules
        const policyGroup = this.tpaForm.get('policyRules') as FormGroup;
        if (policyGroup) {
          policyGroup.markAllAsTouched();
          isValid = policyGroup.valid;
        }
        break;
      }

      case 5: {
        // Step 5: Contract Details
        const contractGroup = this.tpaForm.get('contractDetails') as FormGroup;
        if (contractGroup) {
          contractGroup.markAllAsTouched();
          isValid = contractGroup.valid;
        }
        break;
      }

      case 6: {
        // Step 6: Dynamic FormArray - Nodal Officers
        this.nodalOfficers.markAllAsTouched();
        isValid = this.nodalOfficers.valid;
        break;
      }

      case 7: {
        // Step 7: Dynamic FormArray - Contracted Tariff
        this.contractedTariff.markAllAsTouched();
        isValid = this.contractedTariff.valid;
        break;
      }

      default:
        isValid = true;
        break;
    }

    return isValid;
  }

  /**
   * Helper method to validate top-level control names
   */
  private validateControls(controlNames: string[]): boolean {
    let valid = true;
    controlNames.forEach((controlName) => {
      const control = this.tpaForm.get(controlName);
      if (control) {
        control.markAsTouched();
        control.updateValueAndValidity();
        if (control.invalid) {
          valid = false;
        }
      }
    });
    return valid;
  }

  public nextStep(): void {
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
    // Allow navigation backwards or to steps that have already passed validation
    if (step <= this.currentStep) {
      this.currentStep = step;
    }
  }

  /**
 * Populates the tpaForm with dynamic mock data for testing purposes.
 */
  public generateDummyData(): void {
    // Helper functions for dynamic random generation
    const getRandomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
    const getRandomNumber = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;
    const getRandomPhone = (): string => `+91 ${getRandomNumber(7000000000, 9999999999)}`;

    const companyNames = ['Star Care', 'HDFC ERGO', 'ICICI Lombard', 'Religare Health', 'Niva Bupa', 'Care Insurance', 'United India', 'Medi Assist', 'Paramount Health', 'Vipul Medcorp'];
    const cities = ['Mumbai', 'Delhi', 'Bengaluru', 'Ahmedabad', 'Chennai', 'Hyderabad', 'Kolkata', 'Pune'];
    const states = ['Maharashtra', 'Delhi', 'Karnataka', 'Gujarat', 'Tamil Nadu', 'Telangana', 'West Bengal'];
    const firstNames = ['Rajesh', 'Priya', 'Amit', 'Neha', 'Sanjay', 'Ananya', 'Vikram', 'Pooja', 'Rohan', 'Sneha'];
    const lastNames = ['Sharma', 'Patel', 'Verma', 'Gupta', 'Mehta', 'Rao', 'Nair', 'Joshi', 'Singh', 'Deshmukh'];
    const designations = ['Nodal Officer', 'TPA Desk Manager', 'Insurance Coordinator', 'Claims Manager', 'Relationship Manager'];

    // Dynamic values
    const selectedCompany = getRandomItem(companyNames);
    const companySlug = selectedCompany.toLowerCase().replace(/[^a-z0-9]/g, '');
    const randomSuffix = getRandomNumber(100, 999);
    const dynamicTpaCode = `${companySlug.substring(0, 4).toUpperCase()}-${randomSuffix}`;

    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endDate = new Date(today.getFullYear() + getRandomNumber(1, 3), today.getMonth(), today.getDate());

    // 1. Populate standard FormGroups
    this.tpaForm.patchValue({
      tpaCode: dynamicTpaCode,
      name: `${selectedCompany} TPA Services`,
      type: getRandomItem(this.tpaTypes),
      taxIdOrIRDAI: `IRDAI/TPA/${getRandomNumber(1000, 9999)}/${getRandomNumber(20, 26)}`,
      isActive: Math.random() > 0.1, // 90% chance of active

      contactDetails: {
        email: `contact@${companySlug}tpa.com`,
        phone: getRandomPhone(),
        tollFreeNumber: `1800-${getRandomNumber(100, 999)}-${getRandomNumber(1000, 9999)}`,
        website: `https://www.${companySlug}tpa.com`,
        claimSubmissionEmail: `claims@${companySlug}tpa.com`,
        preAuthEmail: `preauth@${companySlug}tpa.com`
      },

      address: {
        street: `${getRandomNumber(101, 999)}, Tech Park Phase ${getRandomNumber(1, 4)}, S.G. Highway`,
        city: getRandomItem(cities),
        state: getRandomItem(states),
        zipCode: `${getRandomNumber(380001, 600001)}`,
        country: 'India'
      },

      policyRules: {
        defaultCoPayPercentage: getRandomItem([0, 5, 10, 15, 20]),
        preAuthRequired: Math.random() > 0.2,
        claimSubmissionWindowDays: getRandomItem([15, 30, 45, 60]),
        paymentTurnaroundDays: getRandomItem([15, 30, 45, 60]),
        discountPercentage: getRandomItem([0, 5, 10, 12, 15])
      },

      contractDetails: {
        contractStartDate: startDate.toISOString().substring(0, 10),
        contractEndDate: endDate.toISOString().substring(0, 10),
        creditLimit: getRandomNumber(5, 50) * 100000, // 5 Lakhs to 50 Lakhs
        status: getRandomItem(this.contractStatuses)
      }
    });

    // 2. Populate FormArray: Nodal Officers
    this.nodalOfficers.clear();
    const officerCount = getRandomNumber(1, 3);
    for (let i = 0; i < officerCount; i++) {
      const fName = getRandomItem(firstNames);
      const lName = getRandomItem(lastNames);
      const officerGroup = this.createNodalOfficerGroup();
      officerGroup.patchValue({
        name: `${fName} ${lName}`,
        designation: getRandomItem(designations),
        email: `${fName.toLowerCase()}.${lName.toLowerCase()}@${companySlug}tpa.com`,
        phone: getRandomPhone(),
        isPrimary: i === 0 // First officer marked as primary
      });
      this.nodalOfficers.push(officerGroup);
    }

    // 3. Populate FormArray: Contracted Tariff
    this.contractedTariff.clear();
    // Pick 2-4 unique room types
    const shuffledRoomTypes = [...this.roomTypes].sort(() => 0.5 - Math.random());
    const selectedRoomTypes = shuffledRoomTypes.slice(0, getRandomNumber(2, 4));

    selectedRoomTypes.forEach((room) => {
      const tariffGroup = this.createTariffGroup();
      tariffGroup.patchValue({
        roomType: room,
        maxCappedAmountPerDay: getRandomNumber(20, 150) * 100, // ₹2,000 to ₹15,000
        isCovered: Math.random() > 0.1
      });
      this.contractedTariff.push(tariffGroup);
    });

    // 4. Populate FormArray: Documents
    this.documents.clear();
    const docTypes = ['MOU Contract', 'IRDAI License', 'Rate Card Annexure', 'Tax Certificate'];
    const docCount = getRandomNumber(1, 2);

    for (let i = 0; i < docCount; i++) {
      const docGroup = this.createDocumentGroup();
      const docTitle = docTypes[i];
      docGroup.patchValue({
        title: `${docTitle} - ${selectedCompany}`,
        fileUrl: `https://docs.${companySlug}tpa.com/files/${docTitle.toLowerCase().replace(/\s+/g, '_')}_${randomSuffix}.pdf`,
        uploadedAt: new Date().toISOString().substring(0, 10)
      });
      this.documents.push(docGroup);
    }
  }

  public closeModePopup(): void {
    // Logic to close the modal popup
    this._modalService.closeComponentModal();
  }

}
