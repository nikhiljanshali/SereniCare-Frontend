import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SupplierService } from '../../../../core/services/supplier-service';
import { ISupplierDetails } from '../../../../core/interface/basic.interface';
import { MedicineService } from '../../../../core/services/medicine-services';

@Component({
  selector: 'app-add-medicine',
  standalone: false,
  // imports: [],
  templateUrl: './add-medicine.html',
  styleUrl: './add-medicine.css',
})
export class AddMedicine {

  public currentStep = 1;
  public medicineForm!: FormGroup;
  public medicineCategories = [
    'Tablet',
    'Capsule',
    'Syrup',
    'Injection',
    'Drops',
    'Cream',
    'Ointment',
    'Powder',
    'Inhaler',
    'Solution'
  ];

  public medicineUnits = [
    'mg',
    'mcg',
    'g',
    'ml',
    'unit',
    'tablet',
    'capsule',
    'vial',
    'ampoule'
  ];

  public suppliers: ISupplierDetails[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _supplierService: SupplierService,
    private _medicineService: MedicineService
  ) {

  }

  ngOnInit(): void {
    this.getSuppliers();
    this.initializeMedicineForm();
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

  private getSuppliers(): void {
    this._supplierService.getAllSuppliers().subscribe((res) => {
      if (res.success) {
        this.suppliers = res.data;
      }
    })
  }


  initializeMedicineForm(): void {
    this.medicineForm = this.fb.group({
      medicineCode: ['', Validators.required],
      medicineName: ['', Validators.required],
      genericName: ['', Validators.required],
      brandName: [''],
      category: ['', Validators.required],
      therapeuticClass: [''],
      strength: [''],
      unit: [''],
      manufacturer: [''],
      supplierId: [''],
      hsnCode: [''],
      gstPercentage: [0, [Validators.min(0), Validators.max(100)]],
      purchasePrice: [0, Validators.min(0)],
      sellingPrice: [0, Validators.min(0)],
      reorderLevel: [10, Validators.min(0)],
      maxStockLevel: [null, Validators.min(0)],
      storageCondition: [''],
      requiresPrescription: [true],
      isControlledDrug: [false],
      contraindications: this.fb.array([]),
      sideEffects: this.fb.array([]),
      drugInteractions: this.fb.array([]),
      dosageInstructions: [''],
      isActive: [true]
    });
  }

  get contraindications(): FormArray {
    return this.medicineForm.get(
      'contraindications'
    ) as FormArray;
  }

  get sideEffects(): FormArray {
    return this.medicineForm.get(
      'sideEffects'
    ) as FormArray;
  }

  get drugInteractions(): FormArray {
    return this.medicineForm.get(
      'drugInteractions'
    ) as FormArray;
  }

  addContraindication(value: string = ''): void {
    this.contraindications.push(
      this.fb.control(value)
    );
  }

  removeContraindication(index: number): void {
    this.contraindications.removeAt(index);
  }

  addSideEffect(value: string = ''): void {
    this.sideEffects.push(
      this.fb.control(value)
    );
  }

  removeSideEffect(index: number): void {
    this.sideEffects.removeAt(index);
  }

  addDrugInteraction(value: string = ''): void {
    this.drugInteractions.push(
      this.fb.control(value)
    );
  }

  removeDrugInteraction(index: number): void {
    this.drugInteractions.removeAt(index);
  }

  onRequiresPrescriptionToggle(event: any) {
    const isChecked = event.target.checked;
    this.medicineForm.patchValue({
      requiresPrescription: isChecked ? true : false
    });
  }

  onControlledDrugToggle(event: any) {
    const isChecked = event.target.checked;
    this.medicineForm.patchValue({
      isControlledDrug: isChecked ? true : false
    });
  }

  onActiveDoggle(event: any) {
    const isChecked = event.target.checked;
    this.medicineForm.patchValue({
      isActive: isChecked ? true : false
    });
  }

  submitMedicine(): void {

    if (this.medicineForm.invalid) {
      Object.keys(this.medicineForm.controls).forEach(key => {
        const control = this.medicineForm.get(key);
        if (control?.invalid) {
          console.log(`Invalid Control: ${key}`);
          console.log('Errors:', control.errors);
          console.log('Value:', control.value);
        }
      });
      this.medicineForm.markAllAsTouched();
      return;
    }
    const payload = this.medicineForm.getRawValue();
    // console.log(payload);
    this._medicineService.addMedicine(payload).subscribe((res) => {
      this.currentStep = 1;
      this.medicineForm.reset();
    })
    // this._medicineService.addMedicine(payload)
  }


  populateMedicineDummyData(): void {

    const medicineNames = [
      'Paracetamol',
      'Azithromycin',
      'Amoxicillin',
      'Pantoprazole',
      'Cetirizine',
      'Metformin',
      'Atorvastatin',
      'Dolo',
      'Crocin',
      'Montek LC'
    ];

    const genericNames = [
      'Acetaminophen',
      'Azithromycin',
      'Amoxicillin',
      'Pantoprazole Sodium',
      'Cetirizine Hydrochloride',
      'Metformin Hydrochloride',
      'Atorvastatin Calcium'
    ];

    const brandNames = [
      'Sun Pharma',
      'Cipla',
      'Torrent',
      'Abbott',
      'Zydus',
      'Dr Reddy',
      'Alkem'
    ];

    const manufacturers = [
      'Sun Pharmaceutical Industries',
      'Cipla Ltd',
      'Torrent Pharmaceuticals',
      'Abbott Healthcare',
      'Zydus Lifesciences',
      'Alkem Laboratories'
    ];

    const strengths = [
      '250',
      '500',
      '650',
      '1000',
      '5',
      '10',
      '20',
      '40'
    ];

    const storageConditions = [
      'Store below 25°C',
      'Keep in cool and dry place',
      'Protect from sunlight',
      'Refrigerate between 2°C - 8°C',
      'Store at room temperature'
    ];

    const dosageInstructions = [
      'Take one tablet twice daily after food.',
      'Take before meals.',
      'Apply externally as directed.',
      'Use once daily at bedtime.',
      'Take with plenty of water.'
    ];

    const contraindicationsList = [
      'Pregnancy',
      'Kidney Disease',
      'Liver Disease',
      'Heart Failure',
      'Hypertension',
      'Diabetes'
    ];

    const sideEffectsList = [
      'Headache',
      'Dizziness',
      'Nausea',
      'Vomiting',
      'Constipation',
      'Drowsiness'
    ];

    const drugInteractionsList = [
      'Warfarin',
      'Aspirin',
      'Metformin',
      'Insulin',
      'Ibuprofen',
      'Atorvastatin'
    ];

    const randomItem = (arr: any[]) =>
      arr[Math.floor(Math.random() * arr.length)];

    const randomNumber = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    /* ------------------------------------------------------- */
    /* Clear Existing Arrays                                   */
    /* ------------------------------------------------------- */

    this.contraindications.clear();
    this.sideEffects.clear();
    this.drugInteractions.clear();

    /* ------------------------------------------------------- */
    /* Main Form Values                                        */
    /* ------------------------------------------------------- */

    this.medicineForm.patchValue({

      medicineCode: `MED-${randomNumber(1000, 9999)}`,

      medicineName: randomItem(medicineNames),

      genericName: randomItem(genericNames),

      brandName: randomItem(brandNames),

      category: randomItem(this.medicineCategories),

      therapeuticClass: 'Antibiotic',

      strength: randomItem(strengths),

      unit: randomItem(this.medicineUnits),

      manufacturer: randomItem(manufacturers),

      // supplierId:
      //   this.supplierList?.length > 0
      //     ? this.supplierList[0]._id
      //     : null,

      hsnCode: `${randomNumber(100000, 999999)}`,

      gstPercentage: randomItem([0, 5, 12, 18]),

      purchasePrice: randomNumber(10, 500),

      sellingPrice: randomNumber(50, 1000),

      reorderLevel: randomNumber(10, 50),

      maxStockLevel: randomNumber(100, 1000),

      storageCondition: randomItem(storageConditions),

      requiresPrescription: Math.random() > 0.5,

      isControlledDrug: Math.random() > 0.7,

      dosageInstructions: randomItem(dosageInstructions),

      isActive: true
    });

    /* ------------------------------------------------------- */
    /* Contraindications                                       */
    /* ------------------------------------------------------- */

    const contraindicationCount = randomNumber(2, 4);

    for (let i = 0; i < contraindicationCount; i++) {
      this.contraindications.push(
        this.fb.control(randomItem(contraindicationsList))
      );
    }

    /* ------------------------------------------------------- */
    /* Side Effects                                            */
    /* ------------------------------------------------------- */

    const sideEffectCount = randomNumber(2, 5);

    for (let i = 0; i < sideEffectCount; i++) {
      this.sideEffects.push(
        this.fb.control(randomItem(sideEffectsList))
      );
    }

    /* ------------------------------------------------------- */
    /* Drug Interactions                                       */
    /* ------------------------------------------------------- */

    const interactionCount = randomNumber(2, 4);

    for (let i = 0; i < interactionCount; i++) {
      this.drugInteractions.push(
        this.fb.control(randomItem(drugInteractionsList))
      );
    }
  }
}
