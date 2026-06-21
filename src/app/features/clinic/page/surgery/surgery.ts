import { ISurgery, ISurgeryData } from './../../../../core/interface/basic.interface';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { NotificationServices } from '../../../../core/services/notification-services';
import { SurgeryService } from '../../../../core/services/surgery';

@Component({
  selector: 'app-surgery',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './surgery.html',
  styleUrl: './surgery.css',
})
export class Surgery {

  surgeryForm!: FormGroup;
  SurgeryList: ISurgeryData[] = [];
  isEdit: boolean = false;
  selectedId: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _surgeryService: SurgeryService,
    private _notificationServices: NotificationServices
  ) {
  }


  ngOnInit() {
    this.initForm();
    this.getAllSurgery();
  }


  initForm() {
    this.surgeryForm = this.fb.group({
      name: ['', Validators.required],
      code: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(8)]],
      description: [{ value: '', disabled: false }]
    });

    // 🔥 Auto-generate code when name changes
    this.surgeryForm.get('name')?.valueChanges.subscribe(name => {
      if (name) {
        const generatedCode = this.generateCode(name);
        this.surgeryForm.get('code')?.setValue(generatedCode, { emitEvent: false });
        const generatedDescription = this.generateDescription(name);
        this.surgeryForm.get('description')?.setValue(generatedDescription, { emitEvent: false });
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
    return this.surgeryForm.controls;
  }
  onSubmit() {
    if (this.surgeryForm.invalid) {
      this.surgeryForm.markAllAsTouched();
      return;
    }
    if (this.isEdit) {
      this._surgeryService.updateSurgery(this.selectedId, this.surgeryForm.getRawValue())
        .pipe(take(1))
        .subscribe({
          next: (data) => {
            this.surgeryForm.reset();
            this.getAllSurgery();
          },
          error: (err) => {
            console.error('Signup failed:', err);
          }
        });
    } else {
      this._surgeryService.createSurgery(this.surgeryForm.getRawValue())
        .pipe(take(1))
        .subscribe({
          next: (data) => {
            this.surgeryForm.reset();
            this.getAllSurgery();
          },
          error: (err) => {
            console.error('Signup failed:', err);
          }
        });
    }
  }

  private getAllSurgery(): void {
    this._surgeryService.getAllSurgery().subscribe({
      next: (res: ISurgery) => {
        this.isEdit = false;
        this.SurgeryList = res.data ?? [];
      },
      error: (err) => {
        console.error('Error fetching clinic types:', err);
        this.SurgeryList = [];
      }
    });
  }

  public patchDataToForm(ctypes: any): void {
    this.isEdit = true;
    this.selectedId = ctypes._id;
    this.surgeryForm.patchValue(ctypes);
  }

  public deleteRecord(ctypes: any): void {
    this.selectedId = ctypes._id;
    this._notificationServices.confirm('Delete', 'Are you sure you want to delete this record?').then((result) => {
      if (result.isConfirmed) {
        this._surgeryService.deleteSurgery(this.selectedId)
          .pipe(take(1))
          .subscribe({
            next: (data) => {
              this.getAllSurgery();
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
