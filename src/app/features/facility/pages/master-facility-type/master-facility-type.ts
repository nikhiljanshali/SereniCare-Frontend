import { CommonModule } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalService } from '../../../../core/services/modal-service';
import { FacilityType } from '../../../../core/interface/basic.interface';
import { FacilityTypeServices } from '../../../../core/services/facility-type-service';

@Component({
  selector: 'app-master-facility-type',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './master-facility-type.html',
  styleUrl: './master-facility-type.css',
})
export class MasterFacilityType {

  public facilityTypeSaved = new EventEmitter<any>()
  public facilityForm!: FormGroup;
  public isModel: boolean = false;
  public facilityTypeData: FacilityType | null = null;
  public isEdit: boolean = false;

  constructor(
    private fb: FormBuilder,
    public _modalService: ModalService,
    public _facilityTypeServices: FacilityTypeServices,
  ) {

  }

  ngOnInit(): void {
    this.initForm();
    if (this.facilityTypeData) {
      this.isEdit = true;
      this.patchFacilityTypeData();
    }
  }

  initForm(): void {
    this.facilityForm = this.fb.group({
      category: ['', Validators.required],

      facility: this.fb.group({
        name: ['', Validators.required],

        subFacilities: this.fb.array([
          this.createSubFacility()
        ])
      })
    });
  }

  private patchFacilityTypeData(): void {
    // Early return if facilityTypeData is null or undefined
    if (!this.facilityTypeData) {
      return;
    }

    const data = this.facilityTypeData;
    const subFacilities = this.facilityForm.get(
      'facility.subFacilities'
    ) as FormArray;

    subFacilities.clear();

    data.facility?.subFacilities?.forEach((subFacility: any) => {
      subFacilities.push(
        this.fb.group({
          _id: [subFacility._id],
          name: [subFacility.name, Validators.required]
        })
      );
    });

    this.facilityForm.patchValue({
      category: data.category,
      facility: {
        name: data.facility?.name
      }
    });
  }

  createSubFacility(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required]
    });
  }

  get subFacilities(): FormArray {
    return this.facilityForm.get(
      'facility.subFacilities'
    ) as FormArray;
  }

  addSubFacility(): void {
    this.subFacilities.push(
      this.createSubFacility()
    );
  }

  removeSubFacility(index: number): void {
    if (this.subFacilities.length > 1) {
      this.subFacilities.removeAt(index);
    }
  }


  submit(): void {
    if (this.facilityForm.invalid) {
      this.facilityForm.markAllAsTouched();
      return;
    }
    const payload: FacilityType = this.facilityForm.value;
    console.log('MongoDB Payload:', payload);
    if (!this.isEdit) {
      // Example:
      this._facilityTypeServices.createFacilityType(payload).subscribe({
        next: (response) => {
          console.log('Facility created', response);
          this.resetForm();
          this.facilityTypeSaved.emit(true);
          this._modalService.closeComponentModal();
        },
        error: (error) => {
          console.error(error);
        }
      });
    } else {
      const facilityTypeId = this.facilityTypeData?._id;
      if (!facilityTypeId) {
        console.error('Facility Type ID is required for update.');
        return;
      }
      this._facilityTypeServices.updateFacilityType(facilityTypeId, payload).subscribe({
        next: (response) => {
          this.resetForm();
          this.facilityTypeSaved.emit(true);
          this._modalService.closeComponentModal();
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }


  resetForm(): void {
    this.facilityForm.reset();
    this.subFacilities.clear();
    this.subFacilities.push(
      this.createSubFacility()
    );
  }

  public closeModePopup(): void {
    // Logic to close the modal popup
    this._modalService.closeComponentModal();
  }

}
