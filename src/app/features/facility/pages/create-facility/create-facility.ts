import { SurgeryService } from './../../../../core/services/surgery';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FacilityTypeServices } from '../../../../core/services/facility-type-service';
import { ModalService } from '../../../../core/services/modal-service';
import { FacilityServices } from '../../../../core/services/facility-service';
import { FacilityTypeMaster, IFacility, ISurgeryData, IUser, SubFacilityMaster } from '../../../../core/interface/basic.interface';
import { Authentication } from '../../../../core/services/authentication';

@Component({
  selector: 'app-create-facility',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-facility.html',
  styleUrl: './create-facility.css',
})
export class CreateFacility {
  public isModel: boolean = false;

  // Enums for Select dropdowns
  readonly daysOfWeek = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
  // readonly facilityTypes = ['CLINICAL', 'DIAGNOSTIC', 'ADMINISTRATIVE', 'FINANCIAL'];
  // readonly facilitySubTypes = [
  //   'OPD', 'IPD', 'EMERGENCY', 'EHR', 'LABORATORY', 'RADIOLOGY',
  //   'PHARMACY', 'BLOOD_BANK', 'BED_MANAGEMENT', 'OPERATION_THEATER',
  //   'INVENTORY', 'HR_PAYROLL', 'BILLING', 'INSURANCE_TPA', 'MIS_ANALYTICS',
  // ];
  readonly equipmentStatuses = ['OPERATIONAL', 'CALIBRATING', 'OUT_OF_SERVICE'];
  readonly facilityStatuses = ['active', 'inactive', 'maintenance', 'full_capacity'];

  // Root Form
  public facilityForm!: FormGroup;

  public facilityTypes: FacilityTypeMaster[] = [];
  public facilitySubTypes: SubFacilityMaster[] = [];
  public userList: IUser[] = [];
  public surgeryList: ISurgeryData[] = [];
  public facilitySaved = new EventEmitter<any>()
  public facility: IFacility | null = null;
  public isEdit: boolean = false;

  constructor(
    private fb: FormBuilder,
    public _modalService: ModalService,
    public _facilityTypeServices: FacilityTypeServices,
    public _facilityServices: FacilityServices,
    public _authentication: Authentication,
    public _surgeryService: SurgeryService,
  ) {

  }

  ngOnInit(): void {
    this.initForm();
    this.getType();
    this.getUsers();
    this.getSurgeries();

    if (this.facility) {
      this.isEdit = true;
      this.patchFacilityForm(this.facility);
    }
  }

  private getType(): void {
    this._facilityTypeServices.getAllFacilities().subscribe((res: any) => {
      this.facilityTypes = res.data;
    })
  }

  public getFacility(): void {
    const selectedType = this.facilityForm.get('type')?.value;
    if (!selectedType) { return; }
    this.fetchFacilityDetails(selectedType);
  }

  public fetchFacilityDetails(facilityType: string): void {
    this._facilityTypeServices.getSubFacilitiesByFacilityName(facilityType).subscribe({
      next: (result) => {
        console.log(result.data);
        this.facilitySubTypes = result.data;
      },
      error: (err) => { console.error(err) }
    });
  }

  public getUsers(): void {
    this._authentication.getAllUsers().subscribe({
      next: (result) => {
        this.userList = result.filter((user: any) =>
          ['Doctor', 'Nurse'].includes(user.role)
        );
      },
      error: (err) => { console.error(err) }
    });
  }

  public getSurgeries(): void {
    this._surgeryService.getAllSurgery().subscribe({
      next: (result) => {
        console.log(result);
        this.surgeryList = result.data;
      },
      error: (err) => { console.error(err) }
    });
  }

  private initForm(): void {
    this.facilityForm = this.fb.group({
      facilityCode: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9-_]+$/)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      type: ['', Validators.required],
      subType: ['', Validators.required],
      contactExtension: [''],
      departmentHeadId: [''],
      status: ['active', Validators.required],

      // Nested Object: Location
      location: this.fb.group({
        building: ['', Validators.required],
        floor: [null, [Validators.required, Validators.min(0)]],
        roomNumber: [''],
        wing: [''],
      }),

      // Nested Object: Operational Hours
      operationalHours: this.fb.group({
        is24x7: [false],
        schedule: this.fb.array([]),
      }),

      // Object IDs Array
      assignedStaff: this.fb.array<FormControl<string>>([]),

      // Type-Specific Configuration Payload
      configuration: this.fb.group({
        capacity: this.fb.group({
          totalBeds: [0, [Validators.min(0)]],
          occupiedBeds: [0, [Validators.min(0)]],
          icuBeds: [0, [Validators.min(0)]],
        }),
        equipmentList: this.fb.array([]),
        pharmacyLicenseNo: [''],
        hasColdStorage: [false],
        supportedSurgeries: this.fb.array<FormControl<string>>([]),
      }),
    });
  }

  // --- FormArray Getters ---
  get scheduleArray(): FormArray {
    return this.facilityForm.get('operationalHours.schedule') as FormArray;
  }

  get assignedStaffArray(): FormArray<FormControl<string>> {
    return this.facilityForm.get('assignedStaff') as FormArray<FormControl<string>>;
  }

  get equipmentArray(): FormArray {
    return this.facilityForm.get('configuration.equipmentList') as FormArray;
  }

  get surgeriesArray(): FormArray<FormControl<string>> {
    return this.facilityForm.get('configuration.supportedSurgeries') as FormArray<FormControl<string>>;
  }

  // --- Dynamic Item Adders & Removers ---

  // Operational Schedule
  addScheduleItem(): void {
    const itemGroup = this.fb.group({
      dayOfWeek: ['MONDAY', Validators.required],
      openTime: ['08:00', Validators.required],
      closeTime: ['17:00', Validators.required],
    });
    this.scheduleArray.push(itemGroup);
  }

  removeScheduleItem(index: number): void {
    this.scheduleArray.removeAt(index);
  }

  // Staff Object IDs
  addStaffId(id: string = ''): void {
    this.assignedStaffArray.push(this.fb.control(id, { nonNullable: true }));
  }

  removeStaffId(index: number): void {
    this.assignedStaffArray.removeAt(index);
  }

  // Equipment Items
  addEquipmentItem(): void {
    const equipGroup = this.fb.group({
      name: ['', Validators.required],
      model: [''],
      lastCalibrated: [''],
      status: ['OPERATIONAL', Validators.required],
    });
    this.equipmentArray.push(equipGroup);
  }

  removeEquipmentItem(index: number): void {
    this.equipmentArray.removeAt(index);
  }

  // Supported Surgeries String Array
  addSurgery(name: string = ''): void {
    this.surgeriesArray.push(this.fb.control(name, { nonNullable: true }));
  }

  removeSurgery(index: number): void {
    this.surgeriesArray.removeAt(index);
  }

  private patchFacilityForm(data: any): void {
    if (!data) {
      return;
    }

    // --------------------------------------------------
    // 1. Clear existing FormArrays
    // --------------------------------------------------
    this.scheduleArray.clear();
    this.assignedStaffArray.clear();
    this.equipmentArray.clear();
    this.surgeriesArray.clear();

    // --------------------------------------------------
    // 2. Patch normal + nested FormGroup fields
    // --------------------------------------------------
    this.facilityForm.patchValue({
      facilityCode: data.facilityCode ?? '',
      name: data.name ?? '',
      type: data.type ?? '',
      subType: data.subType ?? '',
      contactExtension: data.contactExtension ?? '',
      departmentHeadId: data.departmentHeadId?._id ?? data.departmentHeadId ?? '',
      status: data.status ?? 'active',

      location: {
        building: data.location?.building ?? '',
        floor: data.location?.floor ?? null,
        roomNumber: data.location?.roomNumber ?? '',
        wing: data.location?.wing ?? '',
      },

      operationalHours: {
        is24x7: data.operationalHours?.is24x7 ?? false,
      },

      configuration: {
        capacity: {
          totalBeds: data.configuration?.capacity?.totalBeds ?? 0,
          occupiedBeds: data.configuration?.capacity?.occupiedBeds ?? 0,
          icuBeds: data.configuration?.capacity?.icuBeds ?? 0,
        },
        pharmacyLicenseNo:
          data.configuration?.pharmacyLicenseNo ?? '',
        hasColdStorage:
          data.configuration?.hasColdStorage ?? false,
      },
    });

    // --------------------------------------------------
    // 3. Patch Operational Schedule
    // --------------------------------------------------
    if (Array.isArray(data.operationalHours?.schedule)) {
      data.operationalHours.schedule.forEach((schedule: any) => {
        const scheduleGroup = this.fb.group({
          dayOfWeek: [
            schedule?.dayOfWeek ?? 'MONDAY',
            Validators.required
          ],
          openTime: [
            schedule?.openTime ?? '08:00',
            Validators.required
          ],
          closeTime: [
            schedule?.closeTime ?? '17:00',
            Validators.required
          ],
        });

        this.scheduleArray.push(scheduleGroup);
      });
    }

    // --------------------------------------------------
    // 4. Patch Assigned Staff
    // --------------------------------------------------
    if (Array.isArray(data.assignedStaff)) {
      data.assignedStaff.forEach((staff: any) => {
        const staffId = staff?._id ?? staff?.id ?? staff;

        if (staffId) {
          this.addStaffId(staffId);
        }
      });
    }

    // --------------------------------------------------
    // 5. Patch Equipment List
    // --------------------------------------------------
    if (Array.isArray(data.configuration?.equipmentList)) {
      data.configuration.equipmentList.forEach((equipment: any) => {
        const equipmentGroup = this.fb.group({
          name: [
            equipment?.name ?? '',
            Validators.required
          ],
          model: [
            equipment?.model ?? ''
          ],
          lastCalibrated: [
            equipment?.lastCalibrated
              ? this.formatDateForInput(equipment.lastCalibrated)
              : ''
          ],
          status: [
            equipment?.status ?? 'OPERATIONAL',
            Validators.required
          ],
        });

        this.equipmentArray.push(equipmentGroup);
      });
    }

    // --------------------------------------------------
    // 6. Patch Supported Surgeries
    // --------------------------------------------------
    if (Array.isArray(data.configuration?.supportedSurgeries)) {
      data.configuration.supportedSurgeries.forEach((surgery: any) => {

        // Handles normal string values
        if (typeof surgery === 'string') {
          this.addSurgery(surgery);
          return;
        }

        // Handles object values if API returns objects
        if (surgery && typeof surgery === 'object') {
          const surgeryName =
            surgery?.name ??
            surgery?.surgeryName ??
            surgery?._id ??
            '';

          if (surgeryName) {
            this.addSurgery(surgeryName);
          }
        }
      });
    }

    // --------------------------------------------------
    // 7. Update validation state
    // --------------------------------------------------
    this.facilityForm.updateValueAndValidity();
  }

  private formatDateForInput(date: string | Date): string {
    if (!date) {
      return '';
    }

    const d = new Date(date);

    if (isNaN(d.getTime())) {
      return '';
    }

    return d.toISOString().split('T')[0];
  }

  generateDummyFacilityData(): void {
    // --- Helper Functions ---
    const randomNumber = (min: number, max: number): number => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const randomItem = <T>(items: T[]): T => {
      return items[Math.floor(Math.random() * items.length)];
    };

    const randomSubarray = <T>(items: T[], min = 1, max = items.length): T[] => {
      const shuffled = [...items].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, randomNumber(min, Math.min(max, items.length)));
    };

    // --- Master Reference Data ---
    const facilityTypes = ['Inpatient (IPD)', 'Outpatient (OPD)', 'Diagnostic', 'Emergency Care'];
    const subTypesMap: Record<string, string[]> = {
      'Inpatient (IPD)': ['General Ward', 'ICU', 'NICU', 'Post-Op Care', 'Surgical Ward'],
      'Outpatient (OPD)': ['General Consultation', 'Specialty Clinic', 'Pediatric Clinic', 'Dental Wing'],
      'Diagnostic': ['Radiology Center', 'Pathology Lab', 'MRI Unit', 'Ultrasonography'],
      'Emergency Care': ['Trauma Bay', 'Triage Center', 'Critical Care Unit']
    };

    const facilityPrefixes = ['Central', 'North Wing', 'Metro', 'St. Jude', 'Apex', 'CareFirst', 'Horizon'];
    const buildings = ['Block A', 'Block B', 'Main Pavilion', 'East Tower', 'Diagnostic Center', 'Surgical Complex'];
    const wings = ['North Wing', 'South Wing', 'East Wing', 'West Wing'];

    const daysOfWeek = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];

    const equipmentMaster = [
      { name: 'X-Ray Machine', model: 'XR-2000' },
      { name: 'CT Scanner', model: 'CT-3000X' },
      { name: 'ECG Monitor', model: 'ECG-v5' },
      { name: 'Patient Monitor', model: 'PM-800' },
      { name: 'Infusion Pump', model: 'IP-100' },
      { name: 'Ventilator', model: 'Vent-Pro' },
      { name: 'Defibrillator', model: 'DF-500' },
      { name: 'Ultrasound Machine', model: 'US-Sonix' }
    ];

    const surgeriesMaster = [
      'Appendectomy',
      'Cholecystectomy',
      'Laparoscopy',
      'Hernia Repair',
      'C-Section',
      'Cataract Surgery',
      'Tonsillectomy',
      'Angioplasty'
    ];

    const staffIds = [
      'STF-65f1a23b-01',
      'STF-65f1a23b-02',
      'STF-65f1a23b-03',
      'STF-65f1a23b-04',
      'STF-65f1a23b-05'
    ];

    // --- Random Payload Selection ---
    const type = randomItem(facilityTypes);
    const subType = randomItem(subTypesMap[type]);
    const facilityCode = `FAC-${type.substring(0, 3).toUpperCase()}-${randomNumber(100, 999)}`;
    const name = `${randomItem(facilityPrefixes)} ${subType}`;

    const is24x7 = randomItem([true, false]);

    // --- Dynamic FormArray Population ---

    // 1. Reset and Populate Schedule Array
    this.scheduleArray.clear();
    if (!is24x7) {
      const selectedDays = randomSubarray(daysOfWeek, 3, 6);
      selectedDays.forEach((day) => {
        this.scheduleArray.push(
          this.fb.group({
            dayOfWeek: [day, Validators.required],
            openTime: ['08:00', Validators.required],
            closeTime: ['18:00', Validators.required]
          })
        );
      });
    }

    // 2. Reset and Populate Assigned Staff FormArray
    this.assignedStaffArray.clear();
    const selectedStaff = randomSubarray(staffIds, 1, 4);
    selectedStaff.forEach((staffId) => {
      this.addStaffId(staffId);
    });

    // 3. Reset and Populate Equipment FormArray
    this.equipmentArray.clear();
    const selectedEquipment = randomSubarray(equipmentMaster, 1, 4);
    selectedEquipment.forEach((item) => {
      this.equipmentArray.push(
        this.fb.group({
          name: [item.name, Validators.required],
          model: [item.model],
          lastCalibrated: [`2025-0${randomNumber(1, 9)}-15`],
          status: [randomItem(["OPERATIONAL", "CALIBRATING", "OUT_OF_SERVICE"]), Validators.required]
        })
      );
    });

    // 4. Reset and Populate Surgeries String FormArray
    this.surgeriesArray.clear();
    if (type === 'Inpatient (IPD)' || type === 'Emergency Care') {
      const selectedSurgeries = randomSubarray(surgeriesMaster, 2, 5);
      selectedSurgeries.forEach((surgery) => {
        this.addSurgery(surgery);
      });
    }

    // --- Beds Calculations ---
    const totalBeds = randomNumber(10, 100);
    const occupiedBeds = randomNumber(0, totalBeds);
    const icuBeds = randomNumber(2, 15);

    // --- Form Patching ---
    this.facilityForm.patchValue({
      facilityCode,
      name,
      type,
      subType,
      contactExtension: `EXT-${randomNumber(1000, 9999)}`,
      departmentHeadId: `DOC-${randomNumber(100, 999)}`,
      status: randomItem(['active', 'active', 'inactive']),

      location: {
        building: randomItem(buildings),
        floor: randomNumber(0, 8),
        roomNumber: `RM-${randomNumber(100, 499)}`,
        wing: randomItem(wings)
      },

      operationalHours: {
        is24x7
      },

      configuration: {
        capacity: {
          totalBeds,
          occupiedBeds,
          icuBeds
        },
        pharmacyLicenseNo: `PH-LIC-${randomNumber(10000, 99999)}`,
        hasColdStorage: randomItem([true, false])
      }
    });
  }

  // Submit Handler
  public submit(): void {
    // Recalculate validation
    this.facilityForm.updateValueAndValidity();
    // Stop submission if form is invalid
    if (this.facilityForm.invalid) {
      this.markInvalidControlsDirty(this.facilityForm);
      console.log('Form is invalid');
      // Optional: log invalid controls
      this.logInvalidControls(this.facilityForm);
      return;
    }
    // Form is valid
    const payload = this.facilityForm.getRawValue();
    if (this.isEdit) {
      const facilityId = this.facility?._id;
      if (!facilityId) {
        console.error('Cannot update facility without an ID.');
        return;
      }
      this._facilityServices.updateFacility(facilityId, payload).subscribe({
        next: (res) => {
          this.resetForm();
          if (this.isModel) {
            this.facilitySaved.emit(true);
            this._modalService.closeComponentModal();
          }
        },
        error: (err) => {
          console.error('Error creating facility:', err);
        }
      });
    } else {
      this._facilityServices.createFacility(payload).subscribe({
        next: (res) => {
          this.resetForm();
          if (this.isModel) {
            this.facilitySaved.emit(true);
            this._modalService.closeComponentModal();
          }
        },
        error: (err) => {
          console.error('Error creating facility:', err);
        }
      });
    }
  }

  private markInvalidControlsDirty(control: AbstractControl): void {
    if (control instanceof FormGroup) {
      Object.keys(control.controls).forEach(key => {
        const childControl = control.controls[key];
        if (childControl) {
          this.markInvalidControlsDirty(childControl);
        }
      });
      return;
    }

    if (control instanceof FormArray) {
      control.controls.forEach(childControl => {
        this.markInvalidControlsDirty(childControl);
      });
      return;
    }

    if (control.invalid) {
      control.markAsDirty();
      control.markAsTouched();
    }
  }

  private logInvalidControls(control: AbstractControl, path: string = ''): void {
    if (control instanceof FormGroup) {
      Object.keys(control.controls).forEach(key => {
        const childControl = control.get(key);
        const currentPath = path ? `${path}.${key}` : key;
        if (childControl) {
          if (childControl.invalid) {
            console.log(
              `Invalid control: ${currentPath}`,
              childControl.errors
            );
          }
          this.logInvalidControls(childControl, currentPath);
        }
      });
    }
    if (control instanceof FormArray) {
      control.controls.forEach((childControl, index) => {
        const currentPath = `${path}[${index}]`;
        if (childControl.invalid) {
          console.log(
            `Invalid control: ${currentPath}`,
            childControl.errors
          );
        }
        this.logInvalidControls(childControl, currentPath);
      });
    }
  }

  public resetForm(): void {
    this.initForm();
    this.facilitySubTypes = [];
  }

  public closeModePopup(): void {
    // Logic to close the modal popup
    this._modalService.closeComponentModal();
  }
}
