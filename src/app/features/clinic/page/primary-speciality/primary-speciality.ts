import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { PrimarySpecialityService } from '../../../../core/services/primary-speciality';
import { IPrimarySpeciality, IPrimarySpecialityData } from '../../../../core/interface/basic.interface';
import { NotificationServices } from '../../../../core/services/notification-services';

@Component({
  selector: 'app-primary-speciality',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './primary-speciality.html',
  styleUrl: './primary-speciality.css',
})
export class PrimarySpeciality {

  primarySpecialityForm!: FormGroup;
  primarySpecialityList: IPrimarySpecialityData[] = [];
  isEdit: boolean = false;
  selectedId: string = '';


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
          next: (data) => {
            this.primarySpecialityForm.reset();
            this.getAllPrimarySpeciality();
          },
          error: (err) => {
            console.error('Primary Speciality failed:', err);
          }
        });
    }
  }

  private getAllPrimarySpeciality(): void {
    this._primarySpecialityService.getAllPrimarySpeciality().subscribe({
      next: (res: IPrimarySpeciality) => {
        this.primarySpecialityList = res.data ?? [];
      },
      error: (err) => {
        console.error('Error fetching clinic types:', err);
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
            next: (data) => {
              this.getAllPrimarySpeciality();
            },
            error: (err) => {
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
