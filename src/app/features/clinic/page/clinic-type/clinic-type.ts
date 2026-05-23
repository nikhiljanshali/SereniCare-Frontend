import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClinicTypeService } from '../../../../core/services/clinic-type';
import { take } from 'rxjs';
import { IClinicType, IClinicTypeData } from '../../../../core/interface/basic.interface';
import { NotificationServices } from '../../../../core/services/notification-services';

@Component({
  selector: 'app-clinic-type',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './clinic-type.html',
  styleUrl: './clinic-type.css',
})
export class ClinicType {

  clinicTypeForm!: FormGroup;
  ClinicTypeList: IClinicTypeData[] = [];
  isEdit: boolean = false;
  selectedId: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _clinicType: ClinicTypeService,
    private _notificationServices: NotificationServices
  ) {
  }


  ngOnInit() {
    this.initForm();
    this.getAllClinicTypes();
  }


  initForm() {
    this.clinicTypeForm = this.fb.group({
      name: ['', Validators.required],
      code: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(8)]],
      description: [{ value: '', disabled: false }]
    });

    // 🔥 Auto-generate code when name changes
    this.clinicTypeForm.get('name')?.valueChanges.subscribe(name => {
      if (name) {
        const generatedCode = this.generateCode(name);
        this.clinicTypeForm.get('code')?.setValue(generatedCode, { emitEvent: false });
        const generatedDescription = this.generateDescription(name);
        this.clinicTypeForm.get('description')?.setValue(generatedDescription, { emitEvent: false });
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
    return this.clinicTypeForm.controls;
  }
  onSubmit() {
    if (this.clinicTypeForm.invalid) {
      this.clinicTypeForm.markAllAsTouched();
      return;
    }
    if (this.isEdit) {
      this._clinicType.updateClinicType(this.selectedId, this.clinicTypeForm.getRawValue())
        .pipe(take(1))
        .subscribe({
          next: (data) => {
            this.clinicTypeForm.reset();
            this.getAllClinicTypes();
          },
          error: (err) => {
            console.error('Signup failed:', err);
          }
        });
    } else {
      this._clinicType.createClinicType(this.clinicTypeForm.getRawValue())
        .pipe(take(1))
        .subscribe({
          next: (data) => {
            this.clinicTypeForm.reset();
            this.getAllClinicTypes();
          },
          error: (err) => {
            console.error('Signup failed:', err);
          }
        });
    }
  }

  private getAllClinicTypes(): void {
    this._clinicType.getCliniAllType().subscribe({
      next: (res: IClinicType) => {
        this.isEdit = false;
        this.ClinicTypeList = res.data ?? [];
      },
      error: (err) => {
        console.error('Error fetching clinic types:', err);
        this.ClinicTypeList = [];
      }
    });
  }

  public patchDataToForm(ctypes: IClinicTypeData): void {
    this.isEdit = true;
    this.selectedId = ctypes._id;
    this.clinicTypeForm.patchValue(ctypes);
  }

  public deleteRecord(ctypes: IClinicTypeData): void {
    this.selectedId = ctypes._id;
    this._notificationServices.confirm('Delete', 'Are you sure you want to delete this record?').then((result) => {
      if (result.isConfirmed) {
        this._clinicType.deleteClinicType(this.selectedId)
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
