import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClinicTypeService } from '../../../../core/services/clinic-type';
import { take } from 'rxjs';
import { IClinicType, IClinicTypeData } from '../../../../core/interface/basic.interface';
import { NotificationServices } from '../../../../core/services/notification-services';
import { PrimaryConditionService } from '../../../../core/services/primary-condition';

@Component({
  selector: 'app-primary-condition',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './primary-condition.html',
  styleUrl: './primary-condition.css',
})
export class PrimaryCondition {
  primaryConditionForm!: FormGroup;
  primaryConditionList: IClinicTypeData[] = [];
  isEdit: boolean = false;
  selectedId: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _primaryCondition: PrimaryConditionService,
    private _notificationServices: NotificationServices
  ) {
  }


  ngOnInit() {
    this.initForm();
    this.getAllClinicTypes();
  }


  initForm() {
    this.primaryConditionForm = this.fb.group({
      name: ['', Validators.required],
      code: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(8)]],
      description: [{ value: '', disabled: false }]
    });

    // 🔥 Auto-generate code when name changes
    this.primaryConditionForm.get('name')?.valueChanges.subscribe(name => {
      if (name) {
        const generatedCode = this.generateCode(name);
        this.primaryConditionForm.get('code')?.setValue(generatedCode, { emitEvent: false });
        const generatedDescription = this.generateDescription(name);
        this.primaryConditionForm.get('description')?.setValue(generatedDescription, { emitEvent: false });
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
    return this.primaryConditionForm.controls;
  }
  onSubmit() {
    if (this.primaryConditionForm.invalid) {
      this.primaryConditionForm.markAllAsTouched();
      return;
    }
    if (this.isEdit) {
      this._primaryCondition.updatePrimaryCondition(this.selectedId, this.primaryConditionForm.getRawValue())
        .pipe(take(1))
        .subscribe({
          next: (data) => {
            this.primaryConditionForm.reset();
            this.getAllClinicTypes();
          },
          error: (err) => {
            console.error('Signup failed:', err);
          }
        });
    } else {
      this._primaryCondition.createPrimaryCondition(this.primaryConditionForm.getRawValue())
        .pipe(take(1))
        .subscribe({
          next: (data) => {
            this.primaryConditionForm.reset();
            this.getAllClinicTypes();
          },
          error: (err) => {
            console.error('Signup failed:', err);
          }
        });
    }
  }

  private getAllClinicTypes(): void {
    this._primaryCondition.getAllPrimaryCondition().subscribe({
      next: (res: IClinicType) => {
        this.isEdit = false;
        this.primaryConditionList = res.data ?? [];
      },
      error: (err) => {
        console.error('Error fetching clinic types:', err);
        this.primaryConditionList = [];
      }
    });
  }

  public patchDataToForm(ctypes: IClinicTypeData): void {
    this.isEdit = true;
    this.selectedId = ctypes._id;
    this.primaryConditionForm.patchValue(ctypes);
  }

  public deleteRecord(ctypes: IClinicTypeData): void {
    this.selectedId = ctypes._id;
    this._notificationServices.confirm('Delete', 'Are you sure you want to delete this record?').then((result) => {
      if (result.isConfirmed) {
        this._primaryCondition.deletePrimaryCondition(this.selectedId)
          .pipe(take(1))
          .subscribe({
            next: (data) => {
              this.getAllClinicTypes();
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
