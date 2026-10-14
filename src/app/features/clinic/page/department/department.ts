import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { DepartmentTypeDetails, DepartmentType, DepartmentTypeGroup } from '../../../../core/interface/basic.interface';
import { NotificationServices } from '../../../../core/services/notification-services';
import { DepartmentTypeService } from '../../../../core/services/department-type';

@Component({
  selector: 'app-department',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './department.html',
  styleUrl: './department.css',
})
export class Department {

  public departmentForm!: FormGroup;
  // public ClinicTypeList: IClinicTypeData[] = [];
  public isEdit: boolean = false;
  public selectedId: string = '';
  public DepartmetnList: DepartmentTypeGroup[] = [];
  public departmentCount: number = 0;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _departmentTypeService: DepartmentTypeService,
    private _notificationServices: NotificationServices
  ) {
  }


  ngOnInit() {
    this.initForm();
    this.getAllDepartments();
  }


  initForm() {
    this.departmentForm = this.fb.group({
      type: ['', Validators.required],
      name: ['', Validators.required],
      code: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(8)]],
      description: [{ value: '', disabled: false }]
    });

    // 🔥 Auto-generate code when name changes
    this.departmentForm.get('name')?.valueChanges.subscribe(name => {
      if (name) {
        const generatedCode = this.generateCode(name);
        this.departmentForm.get('code')?.setValue(generatedCode, { emitEvent: false });
        const generatedDescription = this.generateDescription(name);
        this.departmentForm.get('description')?.setValue(generatedDescription, { emitEvent: false });
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
    return this.departmentForm.controls;
  }
  onSubmit() {
    if (this.departmentForm.invalid) {
      this.departmentForm.markAllAsTouched();
      return;
    }
    if (this.isEdit) {
      this._departmentTypeService.updateDepartmentType(this.selectedId, this.departmentForm.getRawValue())
        .pipe(take(1))
        .subscribe({
          next: (data) => {
            // this.departmentForm.reset();
            this.getAllDepartments();
          },
          error: (err) => {
            console.error('Signup failed:', err);
          }
        });
    } else {
      this._departmentTypeService.createDepartmentType(this.departmentForm.getRawValue())
        .pipe(take(1))
        .subscribe({
          next: (data) => {
            // this.departmentForm.reset();
            this.getAllDepartments();
          },
          error: (err) => {
            console.error('Signup failed:', err);
          }
        });
    }
  }

  private getAllDepartments(): void {
    this._departmentTypeService.getDepartmentAllType().subscribe({
      next: (res: DepartmentType) => {
        this.isEdit = false;
        const departmentType = Array.isArray(res?.data) ? res.data : [];
        this.departmentCount = departmentType.length;

        if (!departmentType.length) {
          this.DepartmetnList = [{ type: 'Department', items: [], expanded: true }];
          return;
        }

        const grouped = departmentType.reduce((acc: Record<string, DepartmentTypeDetails[]>, department: DepartmentTypeDetails) => {
          const group = department?.type ?? 'Department';
          if (!acc[group]) {
            acc[group] = [];
          }
          acc[group].push(department);
          return acc;
        }, {});

        this.DepartmetnList = Object.keys(grouped).map((type, index) => ({
          type,
          items: grouped[type],
          expanded: index === 0
        }));
      },
      error: (err) => {
        console.error('Error fetching department types:', err);
        this.departmentCount = 0;
        this.DepartmetnList = [{ type: 'Department', items: [], expanded: true }];
      }
    });
  }

  public patchDataToForm(ctypes: DepartmentTypeDetails): void {
    this.isEdit = true;
    this.selectedId = ctypes._id;
    this.departmentForm.patchValue(ctypes);
  }

  public deleteRecord(ctypes: DepartmentTypeDetails): void {
    this.selectedId = ctypes._id;
    this._notificationServices.confirm('Delete', 'Are you sure you want to delete this record?').then((result) => {
      if (result.isConfirmed) {
        this._departmentTypeService.deleteDepartmentType(this.selectedId).pipe(take(1)).subscribe({
          next: (data) => {
            this.getAllDepartments();
          },
          error: (err) => {
            console.error('Delete failed:', err);
          }
        });
      }
    });
  }

  gobackToClickRegistration(): void {
    this.router.navigate(['auth/signin']);
  }

}
