import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { IAllergiesData, IClinicType, IDiseases, IDiseasessData } from '../../../../core/interface/basic.interface';
import { NotificationServices } from '../../../../core/services/notification-services';
import { AllergiesServices } from '../../../../core/services/allergies';
import { DiseasesService } from '../../../../core/services/diseases';

@Component({
  selector: 'app-diseases',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './diseases.html',
  styleUrl: './diseases.css',
})
export class Diseases {
  diseasesForm!: FormGroup;
  DiseasesList: IDiseasessData[] = [];
  isEdit: boolean = false;
  selectedId: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _diseasesService: DiseasesService,
    private _notificationServices: NotificationServices
  ) { }


  ngOnInit() {
    this.initForm();
    this.getAllDiseases();
  }


  initForm() {
    this.diseasesForm = this.fb.group({
      name: ['', Validators.required],
      code: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(8)]],
      description: [{ value: '', disabled: false }]
    });

    // 🔥 Auto-generate code when name changes
    this.diseasesForm.get('name')?.valueChanges.subscribe(name => {
      if (name) {
        const generatedCode = this.generateCode(name);
        this.diseasesForm.get('code')?.setValue(generatedCode, { emitEvent: false });
        const generatedDescription = this.generateDescription(name);
        this.diseasesForm.get('description')?.setValue(generatedDescription, { emitEvent: false });
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
    return this.diseasesForm.controls;
  }
  onSubmit() {
    if (this.diseasesForm.invalid) {
      this.diseasesForm.markAllAsTouched();
      return;
    }
    if (this.isEdit) {
      this._diseasesService.updateDiseases(this.selectedId, this.diseasesForm.getRawValue())
        .pipe(take(1))
        .subscribe({
          next: (data) => {
            this.diseasesForm.reset();
            this.getAllDiseases();
          },
          error: (err) => {
            console.error('Signup failed:', err);
          }
        });
    } else {
      this._diseasesService.createDiseases(this.diseasesForm.getRawValue())
        .pipe(take(1))
        .subscribe({
          next: (data) => {
            this.diseasesForm.reset();
            this.getAllDiseases();
          },
          error: (err) => {
            console.error('Signup failed:', err);
          }
        });
    }
  }

  private getAllDiseases(): void {
    this._diseasesService.getAllDiseases().subscribe({

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

  public patchDataToForm(ctypes: IAllergiesData): void {
    this.isEdit = true;
    this.selectedId = ctypes._id;
    this.diseasesForm.patchValue(ctypes);
  }

  public deleteRecord(ctypes: IAllergiesData): void {
    this.selectedId = ctypes._id;
    this._notificationServices.confirm('Delete', 'Are you sure you want to delete this record?').then((result) => {
      if (result.isConfirmed) {
        this._diseasesService.deleteDiseases(this.selectedId)
          .pipe(take(1))
          .subscribe({
            next: (data) => {
              this.getAllDiseases();
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
