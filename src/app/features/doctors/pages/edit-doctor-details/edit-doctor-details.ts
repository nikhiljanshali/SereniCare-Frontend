import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DoctorService } from '../../../../core/services/doctor';
import { IPrimarySpeciality, IPrimarySpecialityData } from '../../../../core/interface/basic.interface';
import { PrimarySpecialityService } from '../../../../core/services/primary-speciality';
import { Roles } from '../../../../core/enum/common.enum';
import { APIResponse } from '../../../../core/interface/coreapi.interface';
import { CommonMethod } from '../../../../core/services/common-method';

@Component({
  selector: 'app-edit-doctor-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-doctor-details.html',
  styleUrl: './edit-doctor-details.css',
})
export class EditDoctorDetails {
  @Input() doctorDetails: any;
  @Output() saveSuccess = new EventEmitter<boolean>();

  public doctorProfileForm!: FormGroup;
  public submitted = false;
  public primarySpecialities: IPrimarySpecialityData[] = [];

  constructor(
    private fb: FormBuilder,
    private _doctorService: DoctorService,
    private _commonMethod: CommonMethod,
    private _primarySpecialityService: PrimarySpecialityService
  ) { }

  ngOnInit(): void {
    this.getAllPrimarySpecialities();
    this.initForm();
  }

  private initForm(): void {
    const qualificationString = this.doctorDetails?.qualifications?.map((item: any) => item.name).join(', ');
    const areaofexpertiseString = this.doctorDetails?.areaOfExpertise?.map((item: any) => item.name).join(', ');
    this.doctorProfileForm = this.fb.group({
      dateOfJoin: [this._commonMethod.formatDateForInput(this._commonMethod.formatDateMMDDYYYY(this.doctorDetails?.dateOfJoin))],
      qualifications: [this.doctorDetails?.qualifications ? qualificationString : ''],
      officeNumber: [this.doctorDetails?.officeNumber],
      experience: [this.doctorDetails?.experience],
      residentDoctor: [this.doctorDetails?.residentDoctor],
      officeStatus: [this.doctorDetails?.officeStatus],
      areaOfExpertise: [this.doctorDetails?.areaOfExpertise ? areaofexpertiseString : ''],
      specializations: [this.doctorDetails?.specializations],
    });
  }

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

  get f() {
    return this.doctorProfileForm.controls;
  }

  getInitials(): string {
    const first = this.doctorProfileForm.get('firstName')?.value?.charAt(0) || '';
    const last = this.doctorProfileForm.get('lastName')?.value?.charAt(0) || '';
    return `${first}${last}`.toUpperCase();
  }

  public onSpecializationChange(event: Event): void {

    const selectElement = event.target as HTMLSelectElement;

    const selectedValues = Array.from(selectElement.selectedOptions).map(
      option => this.primarySpecialities.find(
        spec => spec.name === option.text
      )
    );

    this.doctorProfileForm.patchValue({
      specializations: selectedValues
    });

    console.log('Selected Specializations:', selectedValues);
  }

  public onStatusToggle(event: any) {
    const isChecked = event.target.checked;
    this.doctorProfileForm.patchValue({
      status: isChecked ? 'active' : 'inactive'
    });
  }

  private buildDoctorPayload(formValue: any) {
    return {
      userData: {
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        workEmail: formValue.email,
        phone: formValue.phone,
        role: Roles.Doctor
      },
      doctorData: {
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        gender: formValue.gender,
        dateOfBirth: formValue.dateOfBirth,
        dateOfJoin: formValue.dateOfJoin,
        age: formValue.age,
        address: formValue.address,
        city: formValue.city,
        state: formValue.state,
        country: formValue.country,
        pincode: formValue.pincode,
        aadhaarNumber: formValue.aadhaarNumber,
        licenseNumber: formValue.licenseNumber,
        status: formValue.status || 'active',
        specializations:
          formValue.specializations?.map((spec: any) => ({
            name: spec.name,
            code: spec.code
          })) || [],
        officeStatus: formValue.officeStatus,
        qualifications: formValue.qualifications,
        experience: formValue.experience,
        officeNumber: formValue.officeNumber,
        residentDoctor: formValue.residentDoctor,
        areaOfExpertise: formValue.areaOfExpertise
      }
    };
  }
  public saveDoctorProfile(): void {
    this.submitted = true;
    if (this.doctorProfileForm.invalid) {
      if (this.doctorProfileForm.invalid) {
        this.doctorProfileForm.markAllAsTouched();
        Object.keys(this.doctorProfileForm.controls).forEach(key => {
          const control = this.doctorProfileForm.get(key);
          if (control?.invalid) {
            console.log(`${key} is invalid`);
            console.log('Errors:', control.errors);
          }
        });
        return;
      }
    }
    this.doctorProfileForm.value.officeNumber = Number(this.doctorProfileForm.value.officeNumber);
    this.doctorProfileForm.value.experience = Number(this.doctorProfileForm.value.experience);
    const qualifications = this.doctorProfileForm.value.qualifications;
    this.doctorProfileForm.value.qualifications =
      typeof qualifications === 'string'
        ? qualifications.split(',').map((item: string) => ({
          name: item.trim()
        }))
        : qualifications;
    const areaofexpertise = this.doctorProfileForm.value.areaOfExpertise;
    this.doctorProfileForm.value.areaOfExpertise =
      typeof areaofexpertise === 'string'
        ? areaofexpertise.split(',').map((item: string) => ({
          name: item.trim()
        }))
        : areaofexpertise;

    this.doctorDetails = {
      ...this.doctorDetails,
      ...this.doctorProfileForm.value
    };
    const payload = this.buildDoctorPayload(this.doctorDetails);
    // console.log(payload);
    // return
    this._doctorService.updateDoctors(this.doctorDetails._id, payload).subscribe((res: APIResponse) => {
      if (res.success) {
        this.saveSuccess.emit(true);
      }
    });
  }
}
