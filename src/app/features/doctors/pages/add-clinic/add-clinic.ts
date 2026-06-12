import { FormBuilder, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { IPrimarySpecialityData, IClinicTypeData, IClinicType, IPrimarySpeciality } from '../../../../core/interface/basic.interface';
import { Router } from '@angular/router';
import { ClinicTypeService } from '../../../../core/services/clinic-type';
import { PrimarySpecialityService } from '../../../../core/services/primary-speciality';

@Component({
  selector: 'app-add-clinic',
  standalone: false,
  // imports: [],
  templateUrl: './add-clinic.html',
  styleUrl: './add-clinic.css',
})
export class AddClinic {

  public clinicForm!: FormGroup;
  public primarySpecialities: IPrimarySpecialityData[] = [];
  public clinicTypeList: IClinicTypeData[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _clinicType: ClinicTypeService,
    private _primarySpecialityService: PrimarySpecialityService,
  ) {

  }

  ngOnInit(): void {
    this.getAllPrimarySpecialities();
    this.getAllClinicTypes();
    this.initForm();
  }

  private initForm(): void {
    this.clinicForm = this.fb.group({
      clinicName: [''],
      registrationNumber: [''],
      clinicType: [''],
      address: [''],
      city: [''],
      pincode: [''],
      phone: [''],
      clinicEmail: [''],
      primarySpeciality: [''],
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


  private getAllClinicTypes(): void {
    this._clinicType.getCliniAllType().subscribe({
      next: (res: IClinicType) => {
        this.clinicTypeList = res.data ?? [];
      },
      error: (err) => {
        // console.error('Error fetching clinic types:', err);
        this.clinicTypeList = [];
      }
    });
  }

  public onSpecialityChange() {
    const selected = this.clinicForm.get('primarySpeciality')?.value;
    console.log('Selected Speciality Object:', selected);
    // Explicit patch (optional, Angular already does it)
    this.clinicForm.patchValue({
      primarySpeciality: selected
    });
  }

}
