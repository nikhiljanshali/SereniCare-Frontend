import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { IAllergiesData, IClinicType } from '../../../../core/interface/basic.interface';
import { NotificationServices } from '../../../../core/services/notification-services';
import { AllergiesServices } from '../../../../core/services/allergies';

@Component({
  selector: 'app-allergies',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './allergies.html',
  styleUrl: './allergies.css',
})
export class Allergies {

  allergiesForm!: FormGroup;
  AllergiesList: IAllergiesData[] = [];
  isEdit: boolean = false;
  selectedId: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _allergies: AllergiesServices,
    private _notificationServices: NotificationServices
  ) {
  }


  ngOnInit() {
    this.initForm();
    this.getAllAllergies();
  }


  initForm() {
    this.allergiesForm = this.fb.group({
      name: ['', Validators.required],
      code: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(8)]],
      description: [{ value: '', disabled: false }]
    });

    // 🔥 Auto-generate code when name changes
    this.allergiesForm.get('name')?.valueChanges.subscribe(name => {
      if (name) {
        const generatedCode = this.generateCode(name);
        this.allergiesForm.get('code')?.setValue(generatedCode, { emitEvent: false });
        const generatedDescription = this.generateDescription(name);
        this.allergiesForm.get('description')?.setValue(generatedDescription, { emitEvent: false });
      }
    });
  }

  // 🔹 Code generator method (Mehdo style)
  generateCode(name: string): string {
    return name.trim().toUpperCase().split(' ').filter(word => word).map(word => word.substring(0, 3)).join('_');
  }

  generateDescription(name: string): string {
    return name.trim().toUpperCase().split(' ').filter(word => word).join(' ');
  }

  // easy access
  get f() {
    return this.allergiesForm.controls;
  }
  onSubmit() {
    if (this.allergiesForm.invalid) {
      this.allergiesForm.markAllAsTouched();
      return;
    }
    if (this.isEdit) {
      this._allergies.updateAllergies(this.selectedId, this.allergiesForm.getRawValue())
        .pipe(take(1))
        .subscribe({
          next: (data) => {
            this.allergiesForm.reset();
            this.getAllAllergies();
          },
          error: (err) => {
            console.error('Signup failed:', err);
          }
        });
    } else {
      this._allergies.createAllergies(this.allergiesForm.getRawValue())
        .pipe(take(1))
        .subscribe({
          next: (data) => {
            this.allergiesForm.reset();
            this.getAllAllergies();
          },
          error: (err) => {
            console.error('Signup failed:', err);
          }
        });
    }
  }

  private getAllAllergies(): void {
    this._allergies.getAllAllergies().subscribe({
      next: (res: IClinicType) => {
        this.isEdit = false;
        this.AllergiesList = res.data ?? [];
      },
      error: (err) => {
        console.error('Error fetching clinic types:', err);
        this.AllergiesList = [];
      }
    });
  }

  public patchDataToForm(ctypes: IAllergiesData): void {
    this.isEdit = true;
    this.selectedId = ctypes._id;
    this.allergiesForm.patchValue(ctypes);
  }

  public deleteRecord(ctypes: IAllergiesData): void {
    this.selectedId = ctypes._id;
    this._notificationServices.confirm('Delete', 'Are you sure you want to delete this record?').then((result) => {
      if (result.isConfirmed) {
        this._allergies.deleteAllergies(this.selectedId)
          .pipe(take(1))
          .subscribe({
            next: (data) => {
              this.getAllAllergies();
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
