import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { IPrimarySpecialityData, IPrimarySpeciality } from '../../../../core/interface/basic.interface';
import { NotificationServices } from '../../../../core/services/notification-services';
import { PrimarySpecialityService } from '../../../../core/services/primary-speciality';
import { PrimarySpecialityGroup } from '../../../../core/interface/common.interface';

@Component({
  selector: 'app-primary-speciality',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './primary-speciality.html',
  styleUrl: './primary-speciality.css',
})
export class PrimarySpeciality {

  public primarySpecialityForm!: FormGroup;
  // primarySpecialityList: IPrimarySpecialityData[] = [];
  public primarySpecialityList: PrimarySpecialityGroup[] = [];
  public isEdit: boolean = false;
  public selectedId: string = '';
  public primarySpecilityCount: number = 0;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _primarySpecialityService: PrimarySpecialityService,
    private _notificationServices: NotificationServices
  ) {
  }


  ngOnInit() {
    this.initForm();
    this.getAllPrimarySpeciality();
  }


  initForm() {
    this.primarySpecialityForm = this.fb.group({
      name: ['', Validators.required],
      code: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(8)]],
      description: [{ value: '', disabled: false }]
    });

    // 🔥 Auto-generate code when name changes
    this.primarySpecialityForm.get('name')?.valueChanges.subscribe(name => {
      if (name) {
        const generatedCode = this.generateCode(name);
        this.primarySpecialityForm.get('code')?.setValue(generatedCode, { emitEvent: false });
        const generatedDescription = this.generateDescription(name);
        this.primarySpecialityForm.get('description')?.setValue(generatedDescription, { emitEvent: false });
      }
    });
  }

  // 🔹 Code generator method (Mehdo style)
  generateCode(name: string): string {
    return name.trim().toUpperCase().split(' ').filter(word => word).map(word => word.substring(0, 3)).join('_');
  }

  generateDescription(name: string): string {
    if (!name) return '';

    const formatted = name
      .trim()
      .toLowerCase()
      .split(' ')
      .filter(word => word)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return `Description for ${formatted}`;
  }

  // easy access
  get f() {
    return this.primarySpecialityForm.controls;
  }
  onSubmit() {
    if (this.primarySpecialityForm.invalid) {
      this.primarySpecialityForm.markAllAsTouched();
      return;
    }
    if (this.isEdit) {
      this._primarySpecialityService.updateSpeciality(this.selectedId, this.primarySpecialityForm.getRawValue())
        .pipe(take(1))
        .subscribe({
          next: (data) => {
            this.primarySpecialityForm.reset();
            this.getAllPrimarySpeciality();
          },
          error: (err) => {
            console.error('Primary Speciality failed:', err);
          }
        });
    } else {
      console.log(this.primarySpecialityForm.getRawValue());
      this._primarySpecialityService.createSpeciality(this.primarySpecialityForm.getRawValue())
        .pipe(take(1))
        .subscribe({
          next: (data: any) => {
            this.primarySpecialityForm.reset();
            this.getAllPrimarySpeciality();
          },
          error: (err: any) => {
            console.error('Primary Speciality failed:', err);
          }
        });
    }
  }

  private getAllPrimarySpeciality(): void {
    this._primarySpecialityService.getAllPrimarySpeciality().subscribe({
      next: (res: IPrimarySpeciality) => {
        const specialities = res.data ?? [];
        this.primarySpecilityCount = specialities.length;
        const grouped = specialities.reduce((acc: any, speciality: any) => {
          const group = speciality.ClinicType || 'Primary Speciality';
          if (!acc[group]) {
            acc[group] = [];
          }
          acc[group].push(speciality);
          return acc;
        }, {});
        this.primarySpecialityList = Object.keys(grouped).map(clinicType => ({
          clinicType,
          items: grouped[clinicType],
          expanded: clinicType === 'Primary Speciality'
        }));
        console.log(
          'Grouped Primary Specialities:',
          this.primarySpecialityList
        );
      },
      error: (err: any) => {
        console.error('Error fetching primary specialities:', err);
        this.primarySpecialityList = [];
      }
    });
  }

  public patchDataToForm(ctypes: IPrimarySpecialityData): void {
    this.isEdit = true;
    this.selectedId = ctypes._id;
    this.primarySpecialityForm.patchValue(ctypes);
  }

  public deleteRecord(ctypes: IPrimarySpecialityData): void {
    this.selectedId = ctypes._id;
    this._notificationServices.confirm('Delete', 'Are you sure you want to delete this record?').then((result) => {
      if (result.isConfirmed) {
        this._primarySpecialityService.deleteSpeciality(this.selectedId)
          .pipe(take(1))
          .subscribe({
            next: (data: any) => {
              this.getAllPrimarySpeciality();
            },
            error: (err: any) => {
              console.error('Delete failed:', err);
            }
          });
      }
    });
  }

  gobackToClickRegistration(): void {
    this.router.navigate(['clinic/registration']);
  }

}
