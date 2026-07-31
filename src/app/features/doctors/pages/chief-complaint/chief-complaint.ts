import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IChiefComplaintList, IPatientsData } from '../../../../core/interface/basic.interface';
import { DoctorService } from '../../../../core/services/doctor';
import { StorageOperation } from '../../../../core/services/storage-operation';
import { EXAMINATION_MASTER } from '../../../../shared/methods/pe-request.method';
import { SideBarPatientHeader } from '../../../../shared/component/side-bar-patient-header/side-bar-patient-header';

@Component({
  selector: 'app-chief-complaint',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SideBarPatientHeader],
  templateUrl: './chief-complaint.html',
  styleUrl: './chief-complaint.css',
})
export class ChiefComplaint {

  @Input() patientDetails: any | null = null;

  public chiefComplaintForm!: FormGroup;

  public Onset = [
    { id: 1, label: 'Sudden', value: 'Sudden' },
    { id: 2, label: 'Gradual', value: 'Gradual' },
  ];

  public Severity = [
    { id: 1, label: 'Mild', value: 'Mild' },
    { id: 2, label: 'Moderate', value: 'Moderate' },
    { id: 3, label: 'Severe', value: 'Severe' },
  ];

  public AssociatedSymptomsOptions = EXAMINATION_MASTER.AssociatedSymptomsOptions;

  constructor(
    private fb: FormBuilder,
    private _doctorService: DoctorService,
    private _storageOperation: StorageOperation,
  ) {
    const storedUser = this._storageOperation.get<any>('user');
    const storedUserDetails = this._storageOperation.get<any>('userDetails');
    // console.log(storedUser.role, storedUserDetails);
  }

  ngOnInit() {
    console.log(this.patientDetails)
    this.initForm();
  }

  public initForm(): void {
    this.chiefComplaintForm = this.fb.group({
      doctorId: [{ value: this._storageOperation.get<any>('userDetails').id, disabled: false }, [Validators.required]],
      patientId: [{ value: this.patientDetails?.patient?._id, disabled: false }, [Validators.required]],
      appointmentId: [{ value: this.patientDetails?.appointment?._id, disabled: false }, [Validators.required]],
      complaint: [{ value: null, disabled: false }, [Validators.required]],
      duration: [{ value: null, disabled: false }, [Validators.required]],
      onset: [{ value: null, disabled: false }, [Validators.required]],
      severity: [{ value: null, disabled: false }, [Validators.required]],
      associatedSymptoms: [{ value: '', disabled: false }, [Validators.required]],
      patientStatement: [{ value: null, disabled: false }, [Validators.required]],
      isActive: [{ value: true, disabled: false }, [Validators.required]]
    })
  }

  public onCheckboxChange(event: Event, controlName: string, value: string): void {
    const control = this.chiefComplaintForm.get(controlName);

    if (!control) {
      return;
    }

    const selectedValues: string[] = [...(control.value || [])];
    const checked = (event.target as HTMLInputElement).checked;

    if (checked) {
      if (!selectedValues.includes(value)) {
        selectedValues.push(value);
      }
    } else {
      const index = selectedValues.indexOf(value);
      if (index > -1) {
        selectedValues.splice(index, 1);
      }
    }

    control.setValue(selectedValues);
    control.markAsTouched();
    control.updateValueAndValidity();
  }

  public isCheckboxSelected(controlName: string, value: string): boolean {
    const selectedValues: string[] = this.chiefComplaintForm.get(controlName)?.value || [];
    return selectedValues.includes(value);
  }

  public saveChiefOfComplaints(): void {
    const complaint = this.chiefComplaintForm.get('complaint')?.value?.trim();
    if (!complaint) { return; }
    console.log(this.chiefComplaintForm.value);
    this._doctorService.createChiefComplaint(this.chiefComplaintForm.value).subscribe((res => {
      this.resetForm();
    }));
  }

  public resetForm(): void {
    this.chiefComplaintForm.reset();

    this.chiefComplaintForm.patchValue({
      doctorId: this._storageOperation.get<any>('userDetails').id,
      patientId: this.patientDetails?.patient?._id,
      appointmentId: this.patientDetails?.appointment?._id,
      isActive: true
    });
  }
}
