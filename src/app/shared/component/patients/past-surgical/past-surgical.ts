import { IDoctorsData, IPastSurgicalHistoryDetails, ISurgeryData, SurgeonName } from '../../../../core/interface/basic.interface';
import { Component, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from '../../../../core/services/doctor';
import { forkJoin } from 'rxjs';
import { PastSurgicalService } from '../../../../core/services/past-surgical';
import { SurgeryService } from '../../../../core/services/surgery';
import { CommonMethod } from '../../../../core/services/common-method';
import { NotificationServices } from '../../../../core/services/notification-services';
import { ModalService } from '../../../../core/services/modal-service';
import { StorageOperation } from '../../../../core/services/storage-operation';

@Component({
  selector: 'app-past-surgical',
  standalone: false,
  // imports: [],
  templateUrl: './past-surgical.html',
  styleUrl: './past-surgical.css',
})
export class PastSurgical {
  @Input() hideList: boolean = false;
  @Input() patientId: string | null = null;
  public returnResult = new EventEmitter<any>()

  public pastSurgicalForm!: FormGroup;
  public surgeryList: ISurgeryData[] = [];
  public doctorsList: IDoctorsData[] = [];
  public pastSurgicalList: IPastSurgicalHistoryDetails[] = [];
  // private patientId: string | null = null;
  public showView: boolean = true;
  public expanded: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _surgeryService: SurgeryService,
    private _dDoctorService: DoctorService,
    private _pastSurgicalService: PastSurgicalService,
    private _notificationServices: NotificationServices,
    private _commonMethod: CommonMethod,
    public _modalService: ModalService,
    private _storageOperation: StorageOperation,
  ) {
    this.route.paramMap.subscribe(params => {
      const routePatientId = params.get('patientId');
      this.patientId =
        this.patientId ||
        routePatientId ||
        this._storageOperation.get<any>('userDetails').id;
      console.log('Patient ID:', this.patientId);
    });
  }

  ngOnInit() {
    this.initForm();
    this.loadMasterData();
  }

  private loadMasterData(): void {
    if (!this.hideList) {
      this._pastSurgicalService.getPastSurgicalByPatientId(this.patientId ?? '').subscribe({
        next: (res) => {
          this.pastSurgicalList = res.data;
        }
      });
    }
    forkJoin({
      doctors: this._dDoctorService.getAllDoctors(),
      surgeries: this._surgeryService.getAllSurgery(),
    }).subscribe({
      next: ({ doctors, surgeries }) => {
        this.doctorsList = doctors.data;
        this.surgeryList = surgeries.data;
      },
      error: (err) => console.error(err)
    });
  }


  initForm() {
    this.pastSurgicalForm = this.fb.group({
      patientId: [this.patientId],
      surgeryName: ['', Validators.required],
      surgeryDate: ['', Validators.required],
      surgeonName: ['', Validators.required],
      hospitalName: ['', Validators.required],
      remarks: ['', Validators.required],
      outcome: ['', Validators.required],
      complications: ['', Validators.required],
      complicationDetails: ['', Validators.required],
      anesthesiaType: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  public savePastSurgical(): void {
    if (this.pastSurgicalForm.invalid) {
      this.pastSurgicalForm.markAllAsTouched();
      this._commonMethod.logInvalidControls(this.pastSurgicalForm);
      return;
    }
    if (!this.isEdit) {
      const payload = this.pastSurgicalForm.value;
      this._pastSurgicalService.createPastSurgical(payload).subscribe((res: any) => {
        this.showView = true;
        this.loadMasterData();
        if (this.hideList) {
          this.returnResult.emit(true);
          this._modalService.closeComponentModal();
        }
      });
    } else {
      const payload = this.pastSurgicalForm.getRawValue();
      this._pastSurgicalService.updatePastSurgical(this.selectedPastSurgical?._id!, payload).subscribe((res: any) => {
        this.showView = true;
        this.isEdit = false;
        this.loadMasterData();
      });
    }

  }

  public getStatusClass(status: string): string {
    const classes: any = {
      'Active': 'status-active',
      'Resolved': 'status-resolved',
      'Chronic': 'status-chronic',
      'In Remission': 'status-remission'
    };
    return classes[status] || '';
  }

  public getSeverityClass(severity: string): string {
    const classes: Record<string, string> = {
      'Mild': 'severity-mild',
      'Moderate': 'severity-moderate',
      'Severe': 'severity-severe',
      'Critical': 'severity-critical'
    };

    return classes[severity] || '';
  }

  public getOutcomeClass(outcome: string): string {
    const classes: Record<string, string> = {
      'Recovered': 'outcome-recovered',
      'Improved': 'outcome-improved',
      'Stable': 'outcome-stable',
      'Worsened': 'outcome-worsened',
      'Under Treatment': 'outcome-treatment'
    };

    return classes[outcome] || '';
  }

  public refresh(): void {
    this.loadMasterData();
  }

  public toggleView(): void {
    this.showView = !this.showView;
    this.pastSurgicalForm.reset();
    this.pastSurgicalForm.patchValue({
      patientId: this.patientId
    })
  }

  public isEdit: boolean = false;
  public selectedPastSurgical: IPastSurgicalHistoryDetails | null = null;
  public editPastSurgical(pastSurgical: IPastSurgicalHistoryDetails): void {
    this.selectedPastSurgical = pastSurgical;
    this.isEdit = true;
    this.showView = false;
    pastSurgical.surgeryDate = this._commonMethod.formatDateForInput(pastSurgical.surgeryDate);
    // const medicationsData = pastSurgical.medications;
    this.pastSurgicalForm.patchValue({
      ...pastSurgical,
      surgeonName: pastSurgical.surgeonName._id
    });
  }

  public deletePastSurgical(pastSurgical: IPastSurgicalHistoryDetails): void {
    this._notificationServices.confirm('Delete', 'Are you sure you want to delete this record?').then((result) => {
      if (result.isConfirmed) {
        this._pastSurgicalService.deletePastSurgical(pastSurgical._id).subscribe((res: any) => {
          this.loadMasterData();
          console.log(res);
        })
      }
    });
  }

  public closeModePopup(): void {
    // Logic to close the modal popup
    this._modalService.closeComponentModal();
  }


  public toggleRow(id: string) {
    this.expanded = this.expanded === id ? null : id;
  }
}
