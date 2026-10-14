import { Component, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../../../../core/services/modal-service';
import { MedicalServices } from '../../../../core/services/medical-services';
import { MedicalServicesDetails } from '../../../../core/interface/basic.interface';

@Component({
  selector: 'app-add-packages',
  standalone: false,
  templateUrl: './add-packages.html',
  styleUrl: './add-packages.css',
})
export class AddPackages {

  public packageSaved = new EventEmitter<any>()
  public packageForm!: FormGroup;
  public availableServices: any[] = [];
  public isEditMode: boolean = false;
  public packageId: string | null = null;
  public loading: boolean = false;

  public genderOptions: string[] = ['All', 'Male', 'Female'];
  public statusOptions: string[] = ['Active', 'Inactive'];

  public medicalServicesDetailsList: MedicalServicesDetails[] = [];

  constructor(
    private fb: FormBuilder,
    public _modalService: ModalService,
    public _medicalServices: MedicalServices,
  ) {

  }

  ngOnInit(): void {
    this.initForm();
    this.getAllMedicalServices();
  }

  public getAllMedicalServices(): void {
    this._medicalServices.getAllServices().subscribe({
      next: (response) => {
        this.medicalServicesDetailsList = response.data;
      },
      error: (error) => {
        console.error('Failed to load medical services', error);
      }
    });
  }

  /* -------------------------------------------------------------------------- */
  /*                            Form Initialization                             */
  /* -------------------------------------------------------------------------- */

  private initForm(): void {
    this.packageForm = this.fb.group({
      packageCode: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_-]+$/)]],
      packageName: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      includedServices: this.fb.array([], [Validators.required]),
      totalIndividualCost: [{ value: 0, disabled: true }, [Validators.required, Validators.min(0)]],
      packagePrice: [0, [Validators.required, Validators.min(0)]],
      genderRestriction: ['All', [Validators.required]],
      status: ['Active', [Validators.required]],
      isActive: [true]
    });
    this.addServiceItem();
  }

  get includedServices(): FormArray {
    return this.packageForm.get('includedServices') as FormArray;
  }

  private createPackageItem(serviceId: string = '', quantity: number = 1, baseprice: number = 0): FormGroup {
    const itemGroup = this.fb.group({
      service: [serviceId, [Validators.required]],
      quantity: [quantity, [Validators.required, Validators.min(1)]],
      basePrice: [0] // Keep enabled or use getRawValue() when calculating
    });

    // Recalculate cost dynamically when service selection or quantity changes
    itemGroup.valueChanges.subscribe(() => {
      this.calculateTotalIndividualCost();
    });

    return itemGroup;
  }

  /* -------------------------------------------------------------------------- */
  /*                            FormArray Actions                               */
  /* -------------------------------------------------------------------------- */

  public addServiceItem(serviceId: string = '', quantity: number = 1): void {
    this.includedServices.push(this.createPackageItem(serviceId, quantity));
    this.calculateTotalIndividualCost();
  }

  public removeServiceItem(index: number): void {
    this.includedServices.removeAt(index);
    this.calculateTotalIndividualCost();
  }

  /**
  * Triggered on service change or quantity input.
  * Finds service details and patches basePrice to the specific row index.
  */
  onServiceChange(index: number): void {
    const rowGroup = this.includedServices.at(index) as FormGroup;
    if (!rowGroup) return;
    const selectedServiceId = rowGroup.get('service')?.value;
    const quantity = rowGroup.get('quantity')?.value || 1;
    // Find service (String conversion prevents Number vs String mismatch)
    const selectedService = this.medicalServicesDetailsList.find(
      (srv) => String(srv._id) === String(selectedServiceId)
    );
    if (selectedService) {
      // Extract price property (check if property is price, rate, or basePrice)
      const unitPrice = quantity * (selectedService?.basePricing?.opdRate ?? 0);
      // Patch specifically to the target row
      rowGroup.patchValue({
        basePrice: unitPrice
      });
    } else {
      rowGroup.patchValue({
        basePrice: 0
      });
    }
    // Recalculate package total cost
    this.calculateTotalIndividualCost();
  }

  /**
   * Calculates sum of (basePrice * quantity) across all dynamic rows
   */
  calculateTotalIndividualCost(): void {
    let grandTotal = 0;
    this.includedServices.controls.forEach((control) => {
      const rowValues = control.getRawValue(); // gets disabled values like basePrice
      const qty = rowValues.quantity || 0;
      const price = rowValues.basePrice || 0;

      grandTotal += qty * price;
    });

    this.packageForm.patchValue(
      { totalIndividualCost: grandTotal },
      { emitEvent: false }
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                              Form Submission                               */
  /* -------------------------------------------------------------------------- */
  public onSubmit(): void {
    if (this.packageForm.invalid) {
      this.packageForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    const formData = this.packageForm.getRawValue(); // gets disabled fields as well

    // if (this.isEditMode && this.packageId) {
    //   this.servicePackageService.updatePackage(this.packageId, formData).subscribe({
    //     next: () => (this.loading = false),
    //     error: () => (this.loading = false)
    //   });
    // } else {
    this._medicalServices.createPackage(formData).subscribe({
      next: (res: any) => {
        this.packageSaved.emit(true);
      }, error: (error) => {
        console.error('Error fetching doctor availability:', error);
      },
      complete: () => {
        this.packageSaved.emit();
        this.closeModePopup();
      },
    });
    // }
  }

  public resetForm(): void {
    this.packageForm.reset({
      genderRestriction: 'All',
      status: 'Active',
      isActive: true,
      totalIndividualCost: 0,
      packagePrice: 0
    });
    this.includedServices.clear();
  }

  public closeModePopup(): void {
    this.resetForm();
    // Logic to close the modal popup
    this._modalService.closeComponentModal();
  }
  public generateDummyData(): void {
    const getRandomNumber = (min: number, max: number): number =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    // 1. Clear existing FormArray items
    this.includedServices.clear();

    // 2. Add 2 mock service rows from available list (or generate fallback items)
    const availableServices = this.medicalServicesDetailsList.length > 0
      ? this.medicalServicesDetailsList
      : [
        { _id: '650f1a2b3c4d5e6f7a8b9c0d', name: 'General OPD Consultation', basePricing: { opdRate: 500 } },
        { _id: '650f9z8y7x6w5v4u3t2s1r0q', name: 'Complete Blood Count (CBC)', basePricing: { opdRate: 350 } }
      ];

    // Pick up to 2 services safely
    const selectedServices = availableServices.slice(0, 2);

    selectedServices.forEach((service) => {
      const qty = getRandomNumber(1, 3);
      const unitPrice = service?.basePricing?.opdRate ?? getRandomNumber(200, 1000);

      // Push FormGroups matching your form structure
      const rowGroup = this.fb.group({
        service: [service._id, [Validators.required]],
        quantity: [qty, [Validators.required, Validators.min(1)]],
        basePrice: [{ value: unitPrice * qty, disabled: false }]
      });

      this.includedServices.push(rowGroup);
    });

    // 3. Patch top-level form values
    const randomSuffix = getRandomNumber(100, 999);

    this.packageForm.patchValue({
      packageCode: `PKG-EXEC-${randomSuffix}`,
      packageName: `Executive Health Checkup ${randomSuffix}`,
      description: 'Comprehensive wellness package including standard diagnostics and consultations.',
      packagePrice: getRandomNumber(800, 2500),
      genderRestriction: this.genderOptions?.length ? this.genderOptions[0] : 'All',
      status: this.statusOptions?.length ? this.statusOptions[0] : 'Active'
    });

    // 4. Calculate total calculated cost across generated services
    this.calculateTotalIndividualCost();
  }


}
