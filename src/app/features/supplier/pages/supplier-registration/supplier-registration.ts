import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { SupplierService } from '../../../../core/services/supplier-service';

@Component({
  selector: 'app-supplier-registration',
  // imports: [],
  standalone: false,
  templateUrl: './supplier-registration.html',
  styleUrl: './supplier-registration.css',
})
export class SupplierRegistration {

  public currentStep = 1;
  public openedIndex: number | null = 0;

  public supplierForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _supplierService: SupplierService
  ) { }

  ngOnInit(): void {
    this.initializeSupplierForm();
  }


  private initializeSupplierForm(): void {
    this.supplierForm = this.fb.group({
      /* -------------------------------------------------------------------------- */
      /*                              Basic Information                             */
      /* -------------------------------------------------------------------------- */
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      supplierType: ['', Validators.required],
      registrationNumber: [''],
      gstNumber: [''],
      panNumber: [''],
      drugLicenseNumber: [''],
      website: [''],
      email: ['', Validators.email],
      phoneNumber: [''],
      alternatePhoneNumber: [''],
      role: 'Supplier',
      /* -------------------------------------------------------------------------- */
      /*                                 Contacts                                   */
      /* -------------------------------------------------------------------------- */
      contacts: this.fb.array([
        this.createContactForm()
      ]),
      /* -------------------------------------------------------------------------- */
      /*                             Billing Address                                */
      /* -------------------------------------------------------------------------- */
      billingAddress: this.fb.group({
        addressLine1: [''],
        addressLine2: [''],
        city: [''],
        state: [''],
        country: ['India'],
        postalCode: ['']
      }),
      /* -------------------------------------------------------------------------- */
      /*                             Shipping Address                               */
      /* -------------------------------------------------------------------------- */
      shippingAddress: this.fb.group({
        addressLine1: [''],
        addressLine2: [''],
        city: [''],
        state: [''],
        country: ['India'],
        postalCode: ['']
      }),
      /* -------------------------------------------------------------------------- */
      /*                               Bank Details                                 */
      /* -------------------------------------------------------------------------- */
      bankDetails: this.fb.group({
        bankName: [''],
        accountHolderName: [''],
        accountNumber: [''],
        ifscCode: [''],
        branchName: [''],
        swiftCode: ['']
      }),
      /* -------------------------------------------------------------------------- */
      /*                            Financial Information                           */
      /* -------------------------------------------------------------------------- */
      paymentTerms: ['30 Days'],
      creditLimit: [0],
      openingBalance: [0],
      outstandingBalance: [0],
      /* -------------------------------------------------------------------------- */
      /*                           Categories & Brands                              */
      /* -------------------------------------------------------------------------- */
      suppliedCategories: this.fb.array([]),
      suppliedBrands: this.fb.array([]),
      /* -------------------------------------------------------------------------- */
      /*                              Status & Rating                               */
      /* -------------------------------------------------------------------------- */
      rating: [5],
      status: ['Pending'],
      remarks: [''],
      /* -------------------------------------------------------------------------- */
      /*                                Documents                                   */
      /* -------------------------------------------------------------------------- */
      documents: this.fb.array([]),
      /* -------------------------------------------------------------------------- */
      /*                              Approval Fields                               */
      /* -------------------------------------------------------------------------- */
      // createdBy: [''],
      // approvedBy: [''],
      // approvedAt: [null],
      isActive: [true]
    });
  }


  createContactForm(): FormGroup {
    return this.fb.group({
      contactPersonName: ['', Validators.required],
      designation: [''],
      mobileNumber: ['', Validators.required],
      alternateMobileNumber: [''],
      email: ['', Validators.email],
      isPrimary: [false]
    });
  }

  createDocumentForm(): FormGroup {
    return this.fb.group({
      fileName: [''],
      fileUrl: [''],
      uploadedAt: [new Date()]
    });
  }

  get contacts(): FormArray {
    return this.supplierForm.get('contacts') as FormArray;
  }

  get suppliedCategories(): FormArray {
    return this.supplierForm.get('suppliedCategories') as FormArray;
  }

  get suppliedBrands(): FormArray {
    return this.supplierForm.get('suppliedBrands') as FormArray;
  }

  get documents(): FormArray {
    return this.supplierForm.get('documents') as FormArray;
  }

  get isLastStep() {
    return this.currentStep === 7;
  }

  toggleContact(index: number) {
    this.openedIndex = this.openedIndex === index ? null : index;
  }

  nextStep() {
    if (this.currentStep < 7) this.currentStep++;
  }

  prevStep() {
    if (this.currentStep > 1) this.currentStep--;
  }

  addContact(): void {
    this.contacts.push(this.createContactForm());
  }

  removeContact(index: number): void {
    this.contacts.removeAt(index);
  }

  addCategory(): void {
    this.suppliedCategories.push(
      this.fb.control('')
    );
  }

  removeCategory(index: number): void {
    this.suppliedCategories.removeAt(index);
  }

  addBrand(): void {
    this.suppliedBrands.push(
      this.fb.control('')
    );
  }

  removeBrand(index: number): void {
    this.suppliedBrands.removeAt(index);
  }

  addDocument(file: any): void {
    this.documents.push(
      this.fb.group({
        fileName: [file.fileName],
        fileUrl: [file.fileUrl],
        uploadedAt: [new Date()]
      })
    );
  }

  removeDocument(index: number): void {
    this.documents.removeAt(index);
  }

  onSubmit(): void {
    if (this.supplierForm.invalid) {
      Object.keys(this.supplierForm.controls).forEach(key => {
        const control = this.supplierForm.get(key);
        if (control?.invalid) {
          console.log(`Invalid Control: ${key}`);
          console.log('Errors:', control.errors);
          console.log('Value:', control.value);
        }
      });
      this.supplierForm.markAllAsTouched();
      return;
    }
    const payload = this.supplierForm.getRawValue();
    console.log(payload);
    this._supplierService.addSupplier(payload).subscribe((res: any) => {
      console.log(res);
      if (res.success) {
        this.currentStep = 1;
        this.supplierForm.reset();
      }
    });
  }

  populateDummyData(): void {
    this.contacts.clear();
    this.suppliedBrands.clear();
    this.suppliedCategories.clear();
    const firstNames = [
      'Rajesh',
      'Nikhil',
      'Amit',
      'Vikas',
      'Rahul',
      'Sanjay',
      'Karan'
    ];

    const lastNames = [
      'Patel',
      'Shah',
      'Mehta',
      'Gupta',
      'Jain',
      'Agarwal'
    ];

    const cities = [
      'Surat',
      'Ahmedabad',
      'Vadodara',
      'Rajkot',
      'Mumbai',
      'Pune'
    ];

    const states = [
      'Gujarat',
      'Maharashtra'
    ];

    const banks = [
      'State Bank of India',
      'HDFC Bank',
      'ICICI Bank',
      'Axis Bank',
      'Bank of Baroda'
    ];

    const supplierTypes = [
      'Medicine',
      'Medical Equipment',
      'Laboratory',
      'Consumables',
      'General'
    ];

    const brands = [
      'Sun Pharma',
      'Cipla',
      'Abbott',
      'Dr. Reddy',
      'Torrent',
      'Mankind',
      'Alkem'
    ];

    const categories = [
      'Tablets',
      'Capsules',
      'Injectables',
      'Consumables',
      'Equipment',
      'Surgical Items'
    ];

    const firstName = this.randomItem(firstNames);
    const lastName = this.randomItem(lastNames);
    const fullName = `${firstName} ${lastName}`;

    const city = this.randomItem(cities);
    const state = this.randomItem(states);

    this.supplierForm.patchValue({
      firstName: `${firstName}`,
      lastName: `${lastName}`,
      supplierCode: this.randomSupplierCode(),
      supplierName: `${lastName} Healthcare Supplies`,

      supplierType: this.randomItem(supplierTypes),

      registrationNumber: `REG-${this.randomNumber(10)}`,

      gstNumber: `${this.randomNumber(2)}ABCDE1234F1Z5`,

      panNumber: `ABCDE${this.randomNumber(4)}F`,

      drugLicenseNumber: `DL-${state.substring(0, 2).toUpperCase()}-${this.randomNumber(6)}`,

      website: `https://www.${lastName.toLowerCase()}healthcare.com`,

      email: this.randomEmail(lastName),

      phoneNumber: `9${this.randomNumber(9)}`,

      alternatePhoneNumber: `8${this.randomNumber(9)}`,

      billingAddress: {
        addressLine1: `${Math.floor(Math.random() * 999)} Business Hub`,
        addressLine2: 'Corporate Road',
        city,
        state,
        country: 'India',
        postalCode: this.randomNumber(6)
      },

      shippingAddress: {
        addressLine1: `${Math.floor(Math.random() * 999)} Warehouse Zone`,
        addressLine2: 'Industrial Area',
        city,
        state,
        country: 'India',
        postalCode: this.randomNumber(6)
      },

      bankDetails: {
        bankName: this.randomItem(banks),
        accountHolderName: `${lastName} Healthcare Pvt Ltd`,
        accountNumber: this.randomNumber(12),
        ifscCode: `HDFC${this.randomNumber(7)}`,
        branchName: `${city} Main Branch`,
        swiftCode: `IND${this.randomNumber(6)}`
      },

      paymentTerms: this.randomItem([
        '15 Days',
        '30 Days',
        '45 Days',
        '60 Days'
      ]),

      creditLimit: Math.floor(Math.random() * 1000000),

      openingBalance: Math.floor(Math.random() * 50000),

      outstandingBalance: Math.floor(Math.random() * 200000),

      status: this.randomItem([
        'Pending',
        'Approved',
        'Inactive'
      ]),

      rating: Math.floor(Math.random() * 5) + 1,

      remarks: `Preferred supplier from ${city} for hospital procurement.`,

      isActive: true
    });

    /* -------------------------------------------------------------------------- */
    /* Brands                                                                      */
    /* -------------------------------------------------------------------------- */

    const selectedBrands = brands
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);

    selectedBrands.forEach((brand) => {
      this.suppliedBrands.push(
        this.fb.control(brand)
      );
    });

    /* -------------------------------------------------------------------------- */
    /* Categories                                                                  */
    /* -------------------------------------------------------------------------- */

    const selectedCategories = categories
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    selectedCategories.forEach((category) => {
      this.suppliedCategories.push(
        this.fb.control(category)
      );
    });

    /* -------------------------------------------------------------------------- */
    /* Contacts                                                                    */
    /* -------------------------------------------------------------------------- */

    const contactCount = Math.floor(Math.random() * 3) + 1;

    for (let i = 0; i < contactCount; i++) {

      const contactFirstName = this.randomItem(firstNames);
      const contactLastName = this.randomItem(lastNames);

      this.contacts.push(
        this.fb.group({
          contactPersonName: `${contactFirstName} ${contactLastName}`,
          designation: this.randomItem([
            'Sales Manager',
            'Purchase Manager',
            'Account Manager',
            'Business Head'
          ]),
          mobileNumber: `9${this.randomNumber(9)}`,
          alternateMobileNumber: `8${this.randomNumber(9)}`,
          email: this.randomEmail(
            `${contactFirstName}${contactLastName}`
          ),
          isPrimary: i === 0
        })
      );
    }
  }
  private randomItem<T>(items: T[]): T {
    return items[Math.floor(Math.random() * items.length)];
  }

  private randomNumber(length: number): string {
    return Array.from({ length }, () =>
      Math.floor(Math.random() * 10)
    ).join('');
  }

  private randomSupplierCode(): string {
    return `SUP-${Date.now().toString().slice(-6)}`;
  }

  private randomEmail(name: string): string {
    return `${name.toLowerCase().replace(/\s/g, '')}${Math.floor(Math.random() * 100)}@gmail.com`;
  }
}
