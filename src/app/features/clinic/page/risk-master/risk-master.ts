import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { IDiseases } from '../../../../core/interface/basic.interface';
import { NotificationServices } from '../../../../core/services/notification-services';
import { RiskMasterService } from '../../../../core/services/risk-master';

@Component({
  selector: 'app-risk-master',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './risk-master.html',
  styleUrl: './risk-master.css',
})
export class RiskMaster {

  riskesForm!: FormGroup;
  DiseasesList: any[] = [];
  isEdit: boolean = false;
  selectedId: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _riskMasterService: RiskMasterService,
    private _notificationServices: NotificationServices
  ) { }


  ngOnInit() {
    this.initForm();
    this.getAllRiskMaster();
  }


  initForm() {
    this.riskesForm = this.fb.group({
      name: ['', Validators.required],
      code: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(8)]],
      description: [{ value: '', disabled: false }]
    });

    // 🔥 Auto-generate code when name changes
    this.riskesForm.get('name')?.valueChanges.subscribe(name => {
      if (name) {
        const generatedCode = this.generateCode(name);
        this.riskesForm.get('code')?.setValue(generatedCode, { emitEvent: false });
        const generatedDescription = this.generateDescription(name);
        this.riskesForm.get('description')?.setValue(generatedDescription, { emitEvent: false });
      }
    });
  }

  // 🔹 Code generator method (Mehdo style)
  generateCode(name: string): string {
    const prefix = name
      .trim()
      .toUpperCase()
      .split(' ')
      .filter(word => word)
      .map(word => word.substring(0, 3))
      .join('_');

    const randomNumber = Math.floor(1000 + Math.random() * 9000);

    return `${prefix}_${randomNumber}`;
  }

  generateDescription(name: string): string {
    return name.trim().toUpperCase().split(' ').filter(word => word).join(' ');
  }

  // easy access
  get f() {
    return this.riskesForm.controls;
  }
  onSubmit() {
    if (this.riskesForm.invalid) {
      this.riskesForm.markAllAsTouched();
      return;
    }
    if (this.isEdit) {
      this._riskMasterService.updateRiskMaster(this.selectedId, this.riskesForm.getRawValue())
        .pipe(take(1))
        .subscribe({
          next: (data) => {
            this.riskesForm.reset();
            this.getAllRiskMaster();
          },
          error: (err) => {
            console.error('Signup failed:', err);
          }
        });
    } else {
      this._riskMasterService.createRiskMaster(this.riskesForm.getRawValue())
        .pipe(take(1))
        .subscribe({
          next: (data) => {
            this.riskesForm.reset();
            this.getAllRiskMaster();
          },
          error: (err) => {
            console.error('Signup failed:', err);
          }
        });
    }
  }

  private getAllRiskMaster(): void {
    this._riskMasterService.getAllRiskMaster().subscribe({

      next: (res: IDiseases) => {
        this.isEdit = false;
        this.DiseasesList = res.data ?? [];
      },
      error: (err) => {
        console.error('Error fetching clinic types:', err);
        this.DiseasesList = [];
      }
    });
  }

  public patchDataToForm(ctypes: any): void {
    this.isEdit = true;
    this.selectedId = ctypes._id;
    this.riskesForm.patchValue(ctypes);
  }

  public deleteRecord(ctypes: any): void {
    this.selectedId = ctypes._id;
    this._notificationServices.confirm('Delete', 'Are you sure you want to delete this record?').then((result) => {
      if (result.isConfirmed) {
        this._riskMasterService.deleteRiskMaster(this.selectedId)
          .pipe(take(1))
          .subscribe({
            next: (data) => {
              this.getAllRiskMaster();
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
