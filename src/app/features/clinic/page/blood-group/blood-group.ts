import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClinicTypeService } from '../../../../core/services/clinic-type';
import { take } from 'rxjs';
import { IClinicType, IClinicTypeData } from '../../../../core/interface/basic.interface';
import { NotificationServices } from '../../../../core/services/notification-services';
import { BloodGroupService } from '../../../../core/services/blood-group';

@Component({
  selector: 'app-blood-group',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './blood-group.html',
  styleUrl: './blood-group.css',
})
export class BloodGroup {
  bloodGroupForm!: FormGroup;
  bloodGroupList: IClinicTypeData[] = [];
  isEdit: boolean = false;
  selectedId: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _bloodGroup: BloodGroupService,
    private _notificationServices: NotificationServices
  ) {
  }


  ngOnInit() {
    this.initForm();
    this.getAllBloodGroups();
  }


  initForm() {
    this.bloodGroupForm = this.fb.group({
      name: ['', Validators.required],
      code: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(8)]],
      description: [{ value: '', disabled: true }]
    });

    // 🔥 Auto-generate code when name changes
    this.bloodGroupForm.get('name')?.valueChanges.subscribe(name => {
      if (name) {
        const generatedCode = this.generateCode(name);
        this.bloodGroupForm.get('code')?.setValue(generatedCode, { emitEvent: false });
        const generatedDescription = this.generateDescription(name);
        this.bloodGroupForm.get('description')?.setValue(generatedDescription, { emitEvent: false });
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
    return this.bloodGroupForm.controls;
  }
  onSubmit() {
    if (this.bloodGroupForm.invalid) {
      this.bloodGroupForm.markAllAsTouched();
      return;
    }
    if (this.isEdit) {
      this._bloodGroup.updateBloodGroup(this.selectedId, this.bloodGroupForm.getRawValue())
        .pipe(take(1))
        .subscribe({
          next: (data) => {
            this.bloodGroupForm.reset();
            this.getAllBloodGroups();
          },
          error: (err) => {
            console.error('Signup failed:', err);
          }
        });
    } else {
      this._bloodGroup.createBloodGroup(this.bloodGroupForm.getRawValue())
        .pipe(take(1))
        .subscribe({
          next: (data) => {
            this.bloodGroupForm.reset();
            this.getAllBloodGroups();
          },
          error: (err) => {
            console.error('Signup failed:', err);
          }
        });
    }
  }

  private getAllBloodGroups(): void {
    this._bloodGroup.getAllBloodGroup().subscribe({
      next: (res: IClinicType) => {
        this.isEdit = false;
        this.bloodGroupList = res.data ?? [];
      },
      error: (err) => {
        console.error('Error fetching clinic types:', err);
        this.bloodGroupList = [];
      }
    });
  }

  public patchDataToForm(ctypes: IClinicTypeData): void {
    this.isEdit = true;
    this.selectedId = ctypes._id;
    this.bloodGroupForm.patchValue(ctypes);
  }

  public deleteRecord(ctypes: IClinicTypeData): void {
    this.selectedId = ctypes._id;
    this._notificationServices.confirm('Delete', 'Are you sure you want to delete this record?').then((result) => {
      if (result.isConfirmed) {
        this._bloodGroup.deleteBloodGroup(this.selectedId)
          .pipe(take(1))
          .subscribe({
            next: (data) => {
              this.getAllBloodGroups();
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
