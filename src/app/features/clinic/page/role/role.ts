import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { RoleService } from '../../../../core/services/role-service';
import { IRole, IRoleData } from '../../../../core/interface/basic.interface';
import { NotificationServices } from '../../../../core/services/notification-services';

@Component({
  selector: 'app-role',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './role.html',
  styleUrl: './role.css',
})
export class Role {

  roleForm!: FormGroup;
  rolesList: IRoleData[] = [];
  isEdit: boolean = false;
  selectedId: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _roleService: RoleService,
    private _notificationServices: NotificationServices
  ) {
  }


  ngOnInit() {
    this.initForm();
    this.getAllRoles();
  }


  initForm() {
    this.roleForm = this.fb.group({
      name: ['', Validators.required],
      code: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(8)]],
      description: [{ value: '', disabled: false }]
    });

    // 🔥 Auto-generate code when name changes
    this.roleForm.get('name')?.valueChanges.subscribe(name => {
      if (name) {
        const generatedCode = this.generateCode(name);
        this.roleForm.get('code')?.setValue(generatedCode, { emitEvent: false });
        const generatedDescription = this.generateDescription(name);
        this.roleForm.get('description')?.setValue(generatedDescription, { emitEvent: false });
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
    return this.roleForm.controls;
  }
  onSubmit() {
    if (this.roleForm.invalid) {
      this.roleForm.markAllAsTouched();
      return;
    }
    if (this.isEdit) {
      this._roleService.updateRole(this.selectedId, this.roleForm.getRawValue())
        .pipe(take(1))
        .subscribe({
          next: (data) => {
            this.roleForm.reset();
            this.getAllRoles();
          },
          error: (err) => {
            console.error('Role failed:', err);
          }
        });
    } else {
      this._roleService.createRole(this.roleForm.getRawValue())
        .pipe(take(1))
        .subscribe({
          next: (data) => {
            this.roleForm.reset();
            this.getAllRoles();
          },
          error: (err) => {
            console.error('Role failed:', err);
          }
        });
    }
  }

  private getAllRoles(): void {
    this._roleService.getAllRoles().subscribe({
      next: (res: IRole) => {
        this.rolesList = res.data ?? [];
      },
      error: (err) => {
        console.error('Error fetching clinic types:', err);
        this.rolesList = [];
      }
    });
  }

  public patchDataToForm(ctypes: IRoleData): void {
    this.isEdit = true;
    this.selectedId = ctypes._id;
    this.roleForm.patchValue(ctypes);
  }

  public deleteRecord(ctypes: IRoleData): void {
    this.selectedId = ctypes._id;
    this._notificationServices.confirm('Delete', 'Are you sure you want to delete this record?').then((result) => {
      if (result.isConfirmed) {
        this._roleService.deleteRole(this.selectedId,)
          .pipe(take(1))
          .subscribe({
            next: (data) => {
              this.getAllRoles();
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
