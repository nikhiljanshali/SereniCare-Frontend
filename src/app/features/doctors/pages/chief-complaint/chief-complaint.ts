import { Data } from './../../../../../../node_modules/hono/dist/types/context.d';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DoctorService } from '../../../../core/services/doctor';
import { StorageOperation } from '../../../../core/services/storage-operation';
import { IChiefComplaintList } from '../../../../core/interface/basic.interface';

@Component({
  selector: 'app-chief-complaint',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './chief-complaint.html',
  styleUrl: './chief-complaint.css',
})
export class ChiefComplaint {

  @Input() patientDetails: any;

  public chiefComplaintForm!: FormGroup;
  public chiefComplaintList: IChiefComplaintList[] = [];

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
    this.getChiefComplaintList();
  }

  public initForm(): void {
    this.chiefComplaintForm = this.fb.group({
      doctorId: [{ value: this._storageOperation.get<any>('userDetails').id, disabled: false }, [Validators.required]],
      patientId: [{ value: this.patientDetails?.patient?._id, disabled: false }, [Validators.required]],
      appointmentId: [{ value: this.patientDetails?.appointment?._id, disabled: false }, [Validators.required]],
      complaint: [{ value: '', disabled: false }, [Validators.required]],
      isActive: [{ value: true, disabled: false }, [Validators.required]]
    })
  }

  private getChiefComplaintList(): void {
    this._doctorService.getChiefComplaintsByPatientId(this.patientDetails?.patient?._id).subscribe((res => {
      console.log(res);
      if (res.success) {
        this.chiefComplaintList = res.data;
      }
    }))
  }

  public AddComplaint(): void {
    const complaint = this.chiefComplaintForm.get('complaint')?.value?.trim();
    if (!complaint) { return; }
    this._doctorService.createChiefComplaint(this.chiefComplaintForm.value).subscribe((res => {
      this.getChiefComplaintList();
    }))
    this.chiefComplaintForm.get('complaint')?.reset();
  }

  public removeComplaint(index: number, complaint: IChiefComplaintList): void {
    this.chiefComplaintList.splice(index, 1);
    this._doctorService.deleteChiefComplaint(complaint._id).subscribe((res => {
      this.getChiefComplaintList()
    }))
  }
}
