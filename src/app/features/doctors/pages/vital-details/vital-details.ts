import { StorageOperation } from './../../../../core/services/storage-operation';
import { DoctorService } from './../../../../core/services/doctor';
import { ModalService } from './../../../../core/services/modal-service';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonMethod } from '../../../../core/services/common-method';
import { StandardVitalInfo } from '../../../../shared/component/standard-vital-info/standard-vital-info';

@Component({
  selector: 'app-vital-details',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './vital-details.html',
  styleUrl: './vital-details.css',
})
export class VitalDetails {
  @Input() patientDetails: any;
  public vitalForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _doctorService: DoctorService,
    private _storageOperation: StorageOperation,
    private _commonMethod: CommonMethod,
    public _modalService: ModalService,
  ) {
    const storedUser = this._storageOperation.get<any>('user');
    const storedUserDetails = this._storageOperation.get<any>('userDetails');
    // console.log(storedUser.role, storedUserDetails);
  }

  ngOnInit(): void {
    console.log(this.patientDetails);
    this.initForm();
    this.subscribeToBMIChanges();
  }

  private subscribeToBMIChanges(): void {
    this.vitalForm.get('weight')?.valueChanges.subscribe(() => {
      this.calculateBMI();
    });

    this.vitalForm.get('height')?.valueChanges.subscribe(() => {
      this.calculateBMI();
    });
  }
  private calculateBMI(): void {
    const weight = Number(this.vitalForm.get('weight')?.value);
    const heightCm = Number(this.vitalForm.get('height')?.value);

    if (weight > 0 && heightCm > 0) {
      const heightM = heightCm / 100;
      const bmi = weight / (heightM * heightM);

      this.vitalForm.patchValue(
        {
          bmi: bmi.toFixed(2)
        },
        { emitEvent: false }
      );
    } else {
      this.vitalForm.patchValue(
        {
          bmi: ''
        },
        { emitEvent: false }
      );
    }
  }

  private initForm(): void {
    this.vitalForm = this.fb.group({
      doctorId: [{ value: this._storageOperation.get<any>('userDetails').id, disabled: false }, [Validators.required]],
      patientId: [{ value: this.patientDetails?.patient?._id, disabled: false }, [Validators.required]],
      description: [{ value: '', disabled: false }, [Validators.required]],
      vitalDate: [{ value: '', disabled: false }, [Validators.required]],
      vitalTime: [{ value: '', disabled: false }, [Validators.required]],
      vitalDateTime: [{ value: '', disabled: false }],
      appointmentId: [{ value: this.patientDetails?.appointment?._id, disabled: false }, [Validators.required]],
      bloodPressure: [{ value: '', disabled: false }, [Validators.required]],
      bloodPressureUnit: [{ value: '', disabled: false }, [Validators.required]],
      pulseRate: [{ value: '', disabled: false }, [Validators.required]],
      pulseRateUnit: [{ value: '', disabled: false }, [Validators.required]],
      temperature: [{ value: '', disabled: false }, [Validators.required]],
      temperatureUnit: [{ value: '', disabled: false }, [Validators.required]],
      respiratoryRate: [{ value: '', disabled: false }, [Validators.required]],
      respiratoryRateUnit: [{ value: '', disabled: false }, [Validators.required]],
      spO2: [{ value: '', disabled: false }, [Validators.required]],
      spO2Unit: [{ value: '', disabled: false }, [Validators.required]],
      weight: [{ value: '', disabled: false }, [Validators.required]],
      weightUnit: [{ value: '', disabled: false }, [Validators.required]],
      height: [{ value: '', disabled: false }, [Validators.required]],
      heightUnit: [{ value: '', disabled: false }, [Validators.required]],
      bmi: [{ value: '', disabled: false }, [Validators.required]],
      bmiUnit: [{ value: '', disabled: false }, [Validators.required]],
    });
  }

  public saveVital(): void {
    if (this.vitalForm.invalid) {
      this.vitalForm.markAllAsTouched();
      this._commonMethod.logInvalidControls(this.vitalForm);
      return;
    }
    const formValue = this.vitalForm.value;
    const vitalDateTime = new Date(`${formValue.vitalDate}T${formValue.vitalTime}:00`);
    const payload = { ...formValue, vitalDateTime };
    this._doctorService.createVitals(payload).subscribe((res: any) => {
      this.vitalForm.reset();
    })
  }

  public vitalHistory(): void {
    const modalRef = this._modalService.openComponentModal(StandardVitalInfo, {
      class: 'modal-dialog-centered modal-lg',
      backdrop: 'static',
      keyboard: false,
      initialState: {
      }
    });

    modalRef.content.returnResult.subscribe((data: any) => {
      console.log(data.length);
    });
  }
}
